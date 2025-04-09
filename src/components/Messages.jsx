import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Send, Image, Mic, Paperclip, 
  MoreVertical, Phone, Video, X, MessageSquare
} from 'lucide-react';

const Messages = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [callModal, setCallModal] = useState({ isOpen: false, type: null });
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Director",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Looking forward to your audition!",
      timestamp: "2m ago",
      online: true,
      unread: 2
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Actor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Thanks for the opportunity!",
      timestamp: "1h ago",
      online: false,
      unread: 0
    }
  ].filter(conv => {
    // Filter conversations based on user role
    if (userRole === 'actor') {
      return conv.role === 'Director' || conv.role === 'Casting Director';
    } else if (userRole === 'director') {
      return conv.role === 'Actor';
    }
    return true;
  });

  // Mock data for messages
  const messagesData = {
    1: [
      { id: 1, text: "Hi! I saw your profile and I'm interested in casting you for my new film.", sent: false, timestamp: "10:30 AM" },
      { id: 2, text: "That sounds great! I'd love to learn more about the role.", sent: true, timestamp: "10:32 AM" },
      { id: 3, text: "It's a lead role in a psychological thriller. Are you available for an audition next week?", sent: false, timestamp: "10:33 AM" },
      { id: 4, text: "Yes, I'm available! What day works best for you?", sent: true, timestamp: "10:35 AM" },
      { id: 5, text: "Looking forward to your audition!", sent: false, timestamp: "10:36 AM" }
    ]
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleAttachImage = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image selected:', file.name);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement voice recording logic here
    console.log('Started recording...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Implement stop recording logic here
    console.log('Stopped recording');
  };

  const handleVideoCall = () => {
    if (!selectedChat) return;
    setCallModal({ isOpen: true, type: 'video' });
    setCallStatus('calling');
    // Simulate call connection after 2 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleVoiceCall = () => {
    if (!selectedChat) return;
    setCallModal({ isOpen: true, type: 'voice' });
    setCallStatus('calling');
    // Simulate call connection after 2 seconds
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallModal({ isOpen: false, type: null });
      setCallStatus('idle');
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0A0F1C] text-white">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-white/10">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-white/5 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredConversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex items-center space-x-4 hover:bg-white/5 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0F1C]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-fuchsia-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{selectedChat.name}</h2>
                <p className="text-sm text-gray-400">{selectedChat.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleVoiceCall}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={handleVideoCall}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-fuchsia-500'
                      : 'bg-white/10'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-300 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-white/5 rounded-lg flex items-center">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-4 py-2 focus:outline-none resize-none"
                  rows="1"
                />
                <div className="flex items-center space-x-2 px-4">
                  <button
                    onClick={handleAttachFile}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={handleAttachImage}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Image className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onMouseDown={handleStartRecording}
                    onMouseUp={handleStopRecording}
                    className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
                      isRecording ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`p-3 rounded-full ${
                  messageInput.trim()
                    ? 'bg-fuchsia-500 hover:bg-fuchsia-600'
                    : 'bg-white/10 cursor-not-allowed'
                } transition-colors`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p>Select a conversation to start messaging</p>
        </div>
      )}

      {/* Call Modal */}
      <AnimatePresence>
        {callModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2C] rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src={selectedChat?.avatar}
                    alt={selectedChat?.name}
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{selectedChat?.name}</h3>
                <p className="text-gray-400 mb-4">
                  {callStatus === 'calling' && 'Calling...'}
                  {callStatus === 'connected' && `${callModal.type === 'video' ? 'Video' : 'Voice'} call connected`}
                  {callStatus === 'ended' && 'Call ended'}
                </p>
                <div className="flex justify-center space-x-4">
                  {callStatus === 'connected' && callModal.type === 'video' && (
                    <button
                      onClick={() => {}}
                      className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Video className="w-6 h-6" />
                    </button>
                  )}
                  {callStatus === 'connected' && (
                    <button
                      onClick={() => {}}
                      className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                  )}
                  <button
                    onClick={handleEndCall}
                    className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Phone className="w-6 h-6 rotate-[135deg]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages; 