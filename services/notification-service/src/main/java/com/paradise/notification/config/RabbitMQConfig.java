package com.paradise.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.queues.admission}")
    private String admissionQueue;

    @Bean
    public TopicExchange piaExchange() {
        return new TopicExchange(exchange, true, false);
    }

    @Bean
    public Queue admissionQueue() {
        return QueueBuilder.durable(admissionQueue).build();
    }

    @Bean
    public Binding admissionBinding(Queue admissionQueue, TopicExchange piaExchange) {
        return BindingBuilder.bind(admissionQueue).to(piaExchange).with("admission.new");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
