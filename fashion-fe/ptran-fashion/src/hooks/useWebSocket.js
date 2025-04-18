import { Client } from "@stomp/stompjs";
import { set } from "date-fns";
import { de } from "date-fns/locale";
import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";


export const useWebSocket = (url,topic,onMessageReceived) => {
    const[isConnected,setIsConnected] = useState(false);
    const [stompClient,setStompClient] = useState(null);
    const reconnectTimeoutNef = useRef(null); // thường mặc định current là null


    const connect = useCallback(() => { 
        const client = new Client({
            webSocketFactory: () => new SockJS(url), // hàm kêt nối đến server
            reconnectDelay: 5000, // thời gian chờ trước khi kết nối lại
            heartbeatIncoming: 4000, // tần suất gửi heartbeat từ client đến server
            heartbeatOutgoing: 4000,
            onConnect: () => {
                setIsConnected(true);
                topic.forEach(topic => {
                    client.subscribe(topic, (message) => {
                        onMessageReceived(JSON.parse(message.body)); // duyệt các topic để đăng ký và nhận message từ server
                    });
                })
            },
            
            onDisconnect: () => {
                setIsConnected(false);
                reconnectTimeoutNef.current = setTimeout(() => {
                    connect(); // ngắt kết nối  khi không có kết nối và gọi lại hàm connect để kết nối lại
                }, 5000);
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
            },            
        });
        client.activate();
        setStompClient(client);
        return () => {
            client.deactivate(); // ngắt kết nối
            clearTimeout(reconnectTimeoutNef.current); // hủy timeout nếu có
        }
    },[]);
    useEffect(() => {
        const client = connect();
        return client;
    },[connect]); // gọi connect mỗi khi compoennt mount
    const sendMessage = useCallback((destination, body) => {        
        if (stompClient && stompClient.connected) {
            console.log("đã vào trong này heheh");
            console.log(destination);
            console.log(body);
            stompClient.publish({
                destination,
                body: JSON.stringify(body),
            });
            return true;
        }
        return false;
    },[stompClient]); // hàm sendMessage gửi message đến server gồm có url đường dẫn và phần gửi trong body
    return {isConnected,sendMessage}; // trả về các giá trị cần thiết cho component sử dụng gồm có isConnected và sendMessage
}