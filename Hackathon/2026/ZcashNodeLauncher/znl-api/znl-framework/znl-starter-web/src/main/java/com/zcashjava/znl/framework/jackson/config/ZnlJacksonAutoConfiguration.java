package com.zcashjava.znl.framework.jackson.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;
import com.zcashjava.znl.framework.common.util.json.databind.NumberSerializer;
import com.zcashjava.znl.framework.common.util.json.databind.TimestampLocalDateTimeDeserializer;
import com.zcashjava.znl.framework.common.util.json.databind.TimestampLocalDateTimeSerializer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AutoConfiguration(after = JacksonAutoConfiguration.class)
@Slf4j
public class ZnlJacksonAutoConfiguration {

    
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer ldtEpochMillisCustomizer() {
        return builder -> builder
                
                .serializerByType(Long.class, NumberSerializer.INSTANCE)
                .serializerByType(Long.TYPE, NumberSerializer.INSTANCE)
                
                .serializerByType(LocalDate.class, LocalDateSerializer.INSTANCE)
                .deserializerByType(LocalDate.class, LocalDateDeserializer.INSTANCE)
                .serializerByType(LocalTime.class, LocalTimeSerializer.INSTANCE)
                .deserializerByType(LocalTime.class, LocalTimeDeserializer.INSTANCE)
                
                .serializerByType(LocalDateTime.class, TimestampLocalDateTimeSerializer.INSTANCE)
                .deserializerByType(LocalDateTime.class, TimestampLocalDateTimeDeserializer.INSTANCE);
    }

    
    @Bean
    public Module timestampSupportModuleBean() {
        SimpleModule m = new SimpleModule("TimestampSupportModule");
        
        m.addSerializer(Long.class, NumberSerializer.INSTANCE);
        m.addSerializer(Long.TYPE, NumberSerializer.INSTANCE);
        
        m.addSerializer(LocalDate.class, LocalDateSerializer.INSTANCE);
        m.addDeserializer(LocalDate.class, LocalDateDeserializer.INSTANCE);
        m.addSerializer(LocalTime.class, LocalTimeSerializer.INSTANCE);
        m.addDeserializer(LocalTime.class, LocalTimeDeserializer.INSTANCE);
        
        m.addSerializer(LocalDateTime.class, TimestampLocalDateTimeSerializer.INSTANCE);
        m.addDeserializer(LocalDateTime.class, TimestampLocalDateTimeDeserializer.INSTANCE);
        return m;
    }

    
    @Bean
    @SuppressWarnings("InstantiationOfUtilityClass")
    public JsonUtils jsonUtils(ObjectMapper objectMapper) {
        JsonUtils.init(objectMapper);
        log.debug("[init] [initialization of JsonUtils successfully]");
        return new JsonUtils();
    }

}
