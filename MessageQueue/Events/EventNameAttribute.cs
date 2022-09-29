﻿namespace MessageQueue.Events;

using System.Reflection;

[AttributeUsage(AttributeTargets.Class)]
public sealed class EventNameAttribute : Attribute
{
    public string Name { get; }

    public EventNameAttribute(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", nameof(name));
        }

        Name = name;
    }

    public static string GetEventName<TEvent>()
        where TEvent : EventBase
    {
        var eventNameAttribute = typeof(TEvent).GetCustomAttribute<EventNameAttribute>();
        if (eventNameAttribute == null)
        {
            throw new InvalidOperationException($"EventNameAttribute is required for event type {typeof(TEvent)}");
        }

        return eventNameAttribute.Name;
    }
}