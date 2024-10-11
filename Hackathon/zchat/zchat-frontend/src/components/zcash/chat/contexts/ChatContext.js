import React, { createContext, useState, useCallback } from 'react';

// Create Chat Context
export const ChatContext = createContext();

// Create ChatProvider to provide chat state to all components
export const ChatProvider = ({ children }) => {
    const [chatList, setChatList] = useState([]);  // List of all chats with latest messages

    const updateChatList = useCallback((chatUsername, newMessage) => {
        setChatList(prevList => {
            const chatIndex = prevList.findIndex(chat => chat.username === chatUsername);
            if (chatIndex !== -1) {
                const updatedChat = { ...prevList[chatIndex], lastMessage: newMessage };
                const updatedList = [...prevList];
                updatedList[chatIndex] = updatedChat;
                return updatedList;
            } else {
                return [...prevList, { username: chatUsername, lastMessage: newMessage }];
            }
        });
    }, [setChatList])

    return (
        <ChatContext.Provider value={{ chatList, updateChatList }}>
            {children}
        </ChatContext.Provider>
    );
};
