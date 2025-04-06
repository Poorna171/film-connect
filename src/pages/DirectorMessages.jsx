import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DirectorMessages = () => {
  const { currentUser } = useAuth();
  
  // Mock data for actors
  const [actors] = useState([
    { id: 'actor1', displayName: 'John Smith', email: 'john.smith@example.com' },
    { id: 'actor2', displayName: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
    { id: 'actor3', displayName: 'Michael Brown', email: 'michael.brown@example.com' },
    { id: 'actor4', displayName: 'Emily Davis', email: 'emily.davis@example.com' }
  ]);
  
  // Mock data for messages
  const [messages] = useState([
    {
      id: 'msg1',
      content: "Hi, I'm interested in auditioning for the lead role in The Last Adventure. I have extensive experience in action films.",
      senderId: 'actor1',
      receiverId: currentUser?.uid || 'director1',
      participants: ['actor1', currentUser?.uid || 'director1'],
      timestamp: new Date('2023-06-15T10:30:00')
    },
    {
      id: 'msg2',
      content: "Thanks for your interest! We're currently scheduling auditions for next week. Are you available on Tuesday or Thursday?",
      senderId: currentUser?.uid || 'director1',
      receiverId: 'actor1',
      participants: ['actor1', currentUser?.uid || 'director1'],
      timestamp: new Date('2023-06-15T11:15:00')
    },
    {
      id: 'msg3',
      content: "I've reviewed the script for Midnight Mystery and have some suggestions for the character development. The plot is intriguing, but I think we could strengthen the motivation of the antagonist.",
      senderId: 'actor2',
      receiverId: currentUser?.uid || 'director1',
      participants: ['actor2', currentUser?.uid || 'director1'],
      timestamp: new Date('2023-06-14T14:20:00')
    },
    {
      id: 'msg4',
      content: "I appreciate your feedback on the antagonist's motivation. I agree that this could be strengthened. Would you be available for a call this Friday to discuss your suggestions in detail?",
      senderId: currentUser?.uid || 'director1',
      receiverId: 'actor2',
      participants: ['actor2', currentUser?.uid || 'director1'],
      timestamp: new Date('2023-06-14T16:45:00')
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedActor, setSelectedActor] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedActor) return;
    
    // In a real app, this would send the message to Firebase
    console.log('Sending message:', {
      content: newMessage,
      senderId: currentUser?.uid || 'director1',
      receiverId: selectedActor.id,
      participants: [currentUser?.uid || 'director1', selectedActor.id],
      timestamp: new Date()
    });
    
    setNewMessage('');
  };

  // Filter messages for the selected actor
  const actorMessages = selectedActor 
    ? messages.filter(msg => 
        msg.participants.includes(currentUser?.uid || 'director1') && 
        msg.participants.includes(selectedActor.id)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Actors List */}
          <div className="bg-[#1A1F2C] rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Actors</h2>
            <div className="space-y-2">
              {actors.map(actor => (
                <div
                  key={actor.id}
                  className={`p-3 rounded cursor-pointer ${
                    selectedActor?.id === actor.id
                      ? 'bg-cyan-600'
                      : 'hover:bg-[#2A2F3C]'
                  }`}
                  onClick={() => setSelectedActor(actor)}
                >
                  <p className="font-medium">{actor.displayName || actor.email}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="md:col-span-3 bg-[#1A1F2C] rounded-lg p-4">
            {selectedActor ? (
              <>
                <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
                  {actorMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === (currentUser?.uid || 'director1')
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === (currentUser?.uid || 'director1')
                            ? 'bg-cyan-600'
                            : 'bg-[#2A2F3C]'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-[#2A2F3C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select an actor to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorMessages; 