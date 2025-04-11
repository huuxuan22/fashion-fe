import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useWebSocket } from "./useWebSocket";

export const useTypingIndicator = (productId, currentUserId) => {
    const [typingUsers, setTypingUsers] = useState([]); // Sử dụng object thay vì array
    const typingTimeout = useRef({});

    const handleTypingMessage = useCallback((message) => {
        const { userId, isTyping } = message;
        if (userId === currentUserId) return;

        clearTimeout(typingTimeout.current[userId]);
        
        setTypingUsers(prev => ({
            ...prev,
            [userId]: isTyping // Trực tiếp gán giá trị isTyping
        }));

        // Nếu đang typing, set timeout để tự động tắt sau 3s
        if (isTyping) {
            typingTimeout.current[userId] = setTimeout(() => {
                setTypingUsers(prev => ({
                    ...prev,
                    [userId]: false
                }));
            }, 3000);
        }
    }, [currentUserId]);
    const { sendMessage } = useWebSocket(`http://localhost:8080/ws`, [
        `/topic/typing/${productId}`,
        handleTypingMessage
    ]);

    const sendTypingEvent = useCallback((isTyping) => {
        console.log(`Sending typing event: ${isTyping}`);
        sendMessage(`/app/typing`, {
            userId: currentUserId,
            isTyping,
            productId
        });
    }, [currentUserId, productId, sendMessage]);

    useEffect(() => {
        return () => {
            Object.values(typingTimeout.current).forEach(clearTimeout);
        };
    }, []);

    return {
        typingUsers, // Trả về trực tiếp object thay vì Object.keys()
        sendTypingEvent
    };
};

