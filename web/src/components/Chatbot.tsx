import React from "react";
import ChatBot, { Flow } from "react-chatbotify";
import iconchat from "./Chat.png";
import { useDispatch } from "react-redux";
import { sendChatMessageAsync } from "../store/chatSlice";
import { AppDispatch } from "../store";

const Chatbot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChatMessage = async (message: string) => {
    return await dispatch(sendChatMessageAsync(message));
  };

  const flow: Flow = {
    start: {
      message: "Hello, I am the AI ChatBot! Ask me any question about books.",
      path: "loop",
    },
    loop: {
      message: async (params) => {
        const response = await handleChatMessage(params.userInput);
        console.log(response);
        return response;
      },
      path: "loop",
    },
  };

  return (
    <ChatBot
      flow={flow}
      settings={{
        general: {
          primaryColor: "#445A9A",
          secondaryColor: "#445A9A",
        },
        chatButton: {
          icon: iconchat,
        },
        tooltip: {
          text: "Chat with the AI ChatBot",
        },
        chatHistory: { storageKey: "chatbot" },
      }}
    />
  );
};

export default Chatbot;

