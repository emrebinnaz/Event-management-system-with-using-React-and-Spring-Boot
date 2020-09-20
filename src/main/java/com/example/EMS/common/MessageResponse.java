package com.example.EMS.common;

import com.example.EMS.common.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class MessageResponse {
    public  String message;
    public  MessageType messageType;
}
