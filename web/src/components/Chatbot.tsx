import React from 'react';
import ChatBot, { Flow } from 'react-chatbotify';
import iconchat from './Chat.png';
import { useDispatch } from 'react-redux';
import { sendChatMessageAsync } from '../store/chatSlice';
import { AppDispatch } from '../store';

// SVG component
const HeartIcon = () => (
  <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_195_1930" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="2" y="2" width="57" height="57">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.5835 2.58411H58.1071V58.1098H2.5835V2.58411Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_195_1930)">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7803 50.8279C17.2786 50.8279 18.6917 51.3962 20.1875 51.9981C29.3505 56.2348 40.1876 54.3076 47.2479 47.2499C56.5634 37.9293 56.5634 22.7677 47.2479 13.4522C42.7374 8.94169 36.7389 6.45911 30.3529 6.45911C23.9643 6.45911 17.9632 8.94427 13.4553 13.4548C6.39246 20.5124 4.47046 31.3495 8.66838 40.4248C9.27288 41.9205 9.85671 43.3775 9.85671 44.8914C9.85671 46.4026 9.33746 47.9242 8.88021 49.2675C8.50304 50.3732 7.93213 52.042 8.29896 52.4089C8.65804 52.7809 10.3372 52.1944 11.4455 51.8147C12.7759 51.36 14.2845 50.8382 15.7803 50.8279V50.8279ZM30.2883 58.1103C26.341 58.1103 22.3678 57.2759 18.6504 55.5554C17.555 55.1162 16.5295 54.7029 15.7932 54.7029C14.9459 54.708 13.8066 55.1007 12.7061 55.4804C10.4483 56.2554 7.63763 57.2216 5.55804 55.1498C3.48621 53.0754 4.44204 50.2724 5.21188 48.0172C5.59163 46.9064 5.98171 45.7594 5.98171 44.8914C5.98171 44.1784 5.63813 43.269 5.11113 41.9593C0.272542 31.5097 2.50971 18.9159 10.717 10.7139C15.956 5.47227 22.9284 2.58411 30.3503 2.58411C37.7722 2.58411 44.7472 5.46969 49.9862 10.7113C60.8155 21.5406 60.8155 39.1589 49.9862 49.9883C44.6775 55.2996 37.5294 58.1103 30.2883 58.1103V58.1103Z" fill="#F7F5FF"/>
    </g>
  </svg>
);

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
