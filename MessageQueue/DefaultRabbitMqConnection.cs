namespace MessageQueue;

using Polly;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public interface IRabbitMqConnection
    : IDisposable
{
    bool IsConnected { get; }

    bool TryConnect();

    IModel CreateChannel();
}

public sealed class DefaultRabbitMqConnection : IRabbitMqConnection
{
    private IConnection? _connection;
    private bool _disposed;

    private readonly string _host;

    private readonly string _userName;

    private readonly string _password;

    private readonly object _lock = new();

    public bool IsConnected => _connection is {IsOpen: true} && !_disposed;

    public DefaultRabbitMqConnection(RabbitMqConnectionSettings settings)
    {
        if (settings == null)
        {
            throw new ArgumentNullException(nameof(settings));
        }

        if (string.IsNullOrWhiteSpace(settings.UserName))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", nameof(settings.UserName));
        }

        if (string.IsNullOrWhiteSpace(settings.Password))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", nameof(settings.Password));
        }

        if (string.IsNullOrWhiteSpace(settings.Host))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", nameof(settings.Host));
        }

        _host = settings.Host;
        _userName = settings.UserName;
        _password = settings.Password;
    }

    public bool TryConnect()
    {
        lock (_lock)
        {
            Policy.Handle<Exception>()
                .WaitAndRetry(10, r => TimeSpan.FromSeconds(5))
                .Execute(() =>
                    {
                        var factory = new ConnectionFactory { HostName = _host, UserName = _userName, Password = _password };
                        _connection = factory.CreateConnection();
                    });

            if (IsConnected)
            {
                if (_connection != null)
                {
                    _connection.ConnectionShutdown += OnConnectionShutdown;
                    _connection.CallbackException += OnCallbackException;
                    _connection.ConnectionBlocked += OnConnectionBlocked;
                }

                return true;
            }

            return false;
        }
    }

    private void OnConnectionBlocked(object? sender, ConnectionBlockedEventArgs e)
    {
        if (_disposed)
        {
            return;
        }

        TryConnect();
    }

    private void OnCallbackException(object? sender, CallbackExceptionEventArgs e)
    {
        if (_disposed)
        {
            return;
        }

        TryConnect();
    }

    private void OnConnectionShutdown(object? sender, ShutdownEventArgs e)
    {
        if (_disposed)
        {
            return;
        }

        TryConnect();
    }

    public IModel CreateChannel()
    {
        if (!IsConnected)
        {
            TryConnect();
        }

        if (!IsConnected || _connection == null)
        {
            throw new InvalidOperationException("No RabbitMq connection is available to to create channel");
        }

        return _connection.CreateModel();
    }

    private void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            // dispose managed state (managed objects)
        }

        if (_connection != null)
        {
            _connection.ConnectionShutdown -= OnConnectionShutdown;
            _connection.CallbackException -= OnCallbackException;
            _connection.ConnectionBlocked -= OnConnectionBlocked;
            _connection.Dispose();
        }

        _disposed = true;
    }

    ~DefaultRabbitMqConnection()
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