namespace MessageQueue;

using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.Json;

using MessageQueue.Events;

using RabbitMQ.Client;

public interface IMessageQueuePublisherService
{
    void PublishMessage<TEvent>([DisallowNull] TEvent @event)
        where TEvent : EventBase;
}

public class RabbitMqMessageQueuePublisherService : IMessageQueuePublisherService
{
    private readonly IRabbitMqConnection _connection;

    public RabbitMqMessageQueuePublisherService(IRabbitMqConnection connection)
    {
        _connection = connection ?? throw new ArgumentNullException(nameof(connection));
    }

    public void PublishMessage<TEvent>([DisallowNull] TEvent @event)
        where TEvent : EventBase
    {
        if (@event == null)
        {
            throw new ArgumentNullException(nameof(@event));
        }

        using var channel = _connection.CreateChannel();

        var eventName = EventNameAttribute.GetEventName<TEvent>();
        channel.ExchangeDeclare(eventName, "fanout", true, false, null);

        var properties = channel.CreateBasicProperties();
        properties.Headers = new Dictionary<string, object> { { "EventName", eventName } };

        channel.BasicPublish(
            eventName,
            string.Empty,
            properties,
            Encoding.UTF8.GetBytes(JsonSerializer.Serialize(@event)));
    }
}