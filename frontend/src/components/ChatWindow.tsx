import React, { useEffect, useRef } from 'react';
import { Message } from '../types/game';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  loading?: boolean;
}

export function ChatWindow({ messages, loading = false }: ChatWindowProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Ask a question to start your adventure...</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message message-${message.sender}`}>
              <div className="message-sender">
                {message.sender === 'user' ? 'You' : 'Narrator'}
              </div>
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="message message-bot">
            <div className="message-sender">Narrator</div>
            <div className="message-text loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}
