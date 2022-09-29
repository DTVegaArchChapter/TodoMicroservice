namespace MessageQueue;

using System.Text;
using System.Text.Json;
using MessageQueue.Events;
using Polly;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public interface IMessageQueueConsumerService<out TEvent> : IDisposable
    where TEvent : EventBase
{
    void ConsumeMessage(ConsumeMessageAction<TEvent> consumeAction);
}

public interface IMessageQueueConsumerService : IDisposable
{
    void ConsumeMessage(ConsumeMessageAction consumeAction);
}

public delegate bool ConsumeMessageAction<in TEvent>(TEvent @event, string eventType);

public delegate bool ConsumeMessageAction(ReadOnlySpan<byte> body, string eventType);

public class RabbitMqGenericMessageQueueConsumerService : IMessageQueueConsumerService
{
    private readonly IRabbitMqConnection _connection;

    private readonly string _queue;

    private bool _disposed;

    private IModel? _channel;

    private string? _consumerTag;

    private readonly bool _singleActiveConsumer;

    private readonly IList<string> _exchanges;

    public RabbitMqGenericMessageQueueConsumerService(IRabbitMqConnection connection, RabbitMqConsumerSettings settings)
    {
        if (settings == null)
        {
            throw new ArgumentNullException(nameof(settings));
        }

        if (string.IsNullOrWhiteSpace(settings.Queue))
        {
            throw new ArgumentException($"Settings.{nameof(settings.Queue)} Value cannot be null or whitespace.", nameof(settings));
        }

        if (settings.Exchanges == null || settings.Exchanges.Count == 0)
        {
            throw new ArgumentException($"Settings.{nameof(settings.Exchanges)} Value cannot be null or empty.", nameof(settings));
        }

        _connection = connection ?? throw new ArgumentNullException(nameof(connection));

        _queue = settings.Queue;
        _exchanges = settings.Exchanges;
        _singleActiveConsumer = settings.SingleActiveConsumer;
    }

    public void ConsumeMessage(ConsumeMessageAction consumeAction)
    {
        if (consumeAction == null)
        {
            throw new ArgumentNullException(nameof(consumeAction));
        }

        Policy
            .Handle<Exception>()
            .WaitAndRetry(10, r => TimeSpan.FromSeconds(5))
            .Execute(
                () =>
                    {
                        _channel = _connection.CreateChannel();

                        foreach (var exchange in _exchanges)
                        {
                            _channel.ExchangeDeclare(exchange, "fanout", true, false, null);
                        }

                        _channel.QueueDeclare(
                            _queue,
                            true,
                            false,
                            false,
                            arguments: new Dictionary<string, object>
                                           {
                                               {"x-single-active-consumer", _singleActiveConsumer}
                                           });

                        foreach (var exchange in _exchanges)
                        {
                            _channel.QueueBind(_queue, exchange, string.Empty);
                        }
                        
                        var consumer = new EventingBasicConsumer(_channel);
                        consumer.Received += (_, e) =>
                            {
                                try
                                {
                                    var ack = consumeAction(e.Body.Span, GetEventName(e));

                                    if (ack)
                                    {
                                        _channel.BasicAck(e.DeliveryTag, false);
                                    }
                                    else
                                    {
                                        _channel.BasicNack(e.DeliveryTag, false, true);
                                    }
                                }
                                catch (Exception)
                                {
                                        _channel.BasicNack(e.DeliveryTag, false, true);

                                        throw;
                                }
                            };
                        _channel.BasicQos(0, 1, false);
                        _consumerTag = _channel.BasicConsume(_queue, false, consumer);
                    });
    }

    private static string GetEventName(BasicDeliverEventArgs e)
    {
        string eventName;
        if (e.BasicProperties.Headers.TryGetValue("EventName", out var eventNameObject)
            && eventNameObject is byte[] eventNameBytes)
        {
            eventName = Encoding.UTF8.GetString(eventNameBytes);
        }
        else
        {
            eventName = "None";
        }

        return eventName;
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                // dispose managed state (managed objects)
            }

            if (_consumerTag != null)
            {
                _channel?.BasicCancel(_consumerTag);
            }

            _channel?.Close(200, "Goodbye");
            _channel?.Dispose();
            _disposed = true;
        }
    }

    ~RabbitMqGenericMessageQueueConsumerService()
    {
        // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        Dispose(false);
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}

public class RabbitMqMessageQueueConsumerService<TEvent> : RabbitMqGenericMessageQueueConsumerService, IMessageQueueConsumerService<TEvent>
    where TEvent : EventBase
{
    public RabbitMqMessageQueueConsumerService(IRabbitMqConnection connection, RabbitMqConsumerSettings settings)
        : base(connection, SetExchangeName(settings))
    {
    }

    public void ConsumeMessage(ConsumeMessageAction<TEvent> consumeAction)
    {
        if (consumeAction == null)
        {
            throw new ArgumentNullException(nameof(consumeAction));
        }

        ConsumeMessage(
            (body, eventType) =>
                {
                    var @event = JsonSerializer.Deserialize<TEvent>(Encoding.UTF8.GetString(body));
                    return @event != null && consumeAction(@event, eventType);
                });
    }

    private static RabbitMqConsumerSettings SetExchangeName(RabbitMqConsumerSettings settings)
    {
        settings.Exchanges = new List<string> {EventNameAttribute.GetEventName<TEvent>()};
        return settings;
    }
}