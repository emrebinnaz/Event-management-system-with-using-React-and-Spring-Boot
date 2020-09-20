package com.example.EMS.common.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {

    private SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/websocket-participation-notification")
    //@SendTo("/topic/user")
    public void sendToAll(@Payload String message) {
        messagingTemplate.convertAndSend("/topic",message);
    }

}
