package com.orange.up2you.common.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class CustomDateAndTimeDeserializer extends JsonDeserializer<ZonedDateTime> {

  public static final String SERIALIZED_FORMAT = "yyyy-MM-dd 00:00:00.000Z";

  @Override
  public ZonedDateTime deserialize(JsonParser paramJsonParser,
                                   DeserializationContext paramDeserializationContext)
    throws IOException {

    String str = paramJsonParser.getText().trim();
    ZonedDateTime zonedDateTime = ZonedDateTime.parse(str, DateTimeFormatter.ISO_ZONED_DATE_TIME);
    return zonedDateTime;
  }

}
