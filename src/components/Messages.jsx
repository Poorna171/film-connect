import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Send, Image, Mic, Paperclip, 
  MoreVertical, Phone, Video, X
} from 'lucide-react';

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Mock data for conversations
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
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Casting Director",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      lastMessage: "Can you send your portfolio?",
      timestamp: "3h ago",
      online: true,
      unread: 1
    }
  ];

  // Mock data for messages
  const messages = {
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
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat, messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add message to the chat
      setMessageInput('');
      // In a real app, you would send this to your backend
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full bg-[#0A0F1C] text-white">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-full md:w-80 border-r border-white/10 p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* Conversations */}
          <div className="space-y-2">
            {filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedChat === conv.id 
                    ? 'bg-fuchsia-500/20 border border-fuchsia-500/50' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0F1C]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-400">{conv.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="bg-fuchsia-500 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{conv.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={conversations.find(c => c.id === selectedChat)?.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">
                      {conversations.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {conversations.find(c => c.id === selectedChat)?.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[selectedChat]?.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sent
                          ? 'bg-fuchsia-500 text-white'
                          : 'bg-white/5 text-gray-200'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Image className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 rounded-lg border border-white/10 px-4 py-2 focus:outline-none focus:border-fuchsia-500"
                  />
                  <button className="p-2 hover:bg-white/5 rounded-full">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-full"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 