// import React, { useState, useEffect, useRef } from 'react';
// import { FiSend } from 'react-icons/fi';
// import { BsRobot } from 'react-icons/bs';
// import { IoSend } from 'react-icons/io5';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Sample API call function (replace with your actual API call)
//   const fetchAIResponse = async (question) => {
//     setIsLoading(true);
//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
      
//       const response = await fetch('your-ai-api-endpoint', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question })
//       });
      
//       const data = await response.json();
//       return data.answer || "I couldn't understand your question. Please try again.";
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//       return "Sorry, I encountered an error. Please try again later.";
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     const userMessage = { text: inputValue, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');

//     // Get AI response
//     const aiResponse = await fetchAIResponse(inputValue);
//     setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
//   };

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">
//         <BsRobot className="robot-icon" />
//         <h2>AI Assistant</h2>
//       </div>

//       <div className="chatbot-messages">
//         {messages.length === 0 ? (
//           <div className="empty-state">
//             <BsRobot className="empty-icon" />
//             <p>How can I help you today?</p>
//           </div>
//         ) : (
//           messages.map((message, index) => (
//             <div 
//               key={index} 
//               className={`message ${message.sender}`}
//             >
//               <div className="message-content">
//                 {message.text}
//               </div>
//             </div>
//           ))
//         )}
//         {isLoading && (
//           <div className="message ai">
//             <div className="message-content typing">
//               <div className="typing-dots">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="chatbot-input">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Type your question here..."
//           disabled={isLoading}
//         />
//         <button type="submit" disabled={isLoading || !inputValue.trim()}>
//           <IoSend className="send-icon" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBot;






import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';

const ChatBot = () => {
  // Load messages from localStorage on initial render
  const initialMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample API call function (replace with your actual API call)
  const fetchAIResponse = async (question) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('https://4251-34-143-234-224.ngrok-free.app/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question })
      });
      
      const data = await response.json();
     const fullResponse = data.response || "I couldn't understand your question.";
    
    // Optional: filter by identifying the first bullet point or sentence after 'The requested information is available.'
    const cleanAnswer = fullResponse.includes("The requested information is available.")
      ? fullResponse.split("The requested information is available.")[1].trim()
      : fullResponse.trim();

    return cleanAnswer;
    
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "Sorry, I encountered an error. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage after adding user message
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    
    setInputValue('');

    // Get AI response
    const aiResponse = await fetchAIResponse(inputValue);
    const finalMessages = [...updatedMessages, { text: aiResponse, sender: 'ai' }];
    setMessages(finalMessages);
    
    // Save to localStorage after adding AI response
    localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to clear chat history
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <BsRobot className="robot-icon" />
        <h2>AI Assistant</h2>
        {/* Added clear chat button */}
        <button 
          onClick={clearChat} 
          className="my-button"
        >
          Clear Chat
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <BsRobot className="empty-icon" />
            <p>How can I help you today?</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.sender}`}
            >
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message ai">
            <div className="message-content typing">
              <div className="typing-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          <IoSend className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;