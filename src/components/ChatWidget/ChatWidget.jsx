import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
        className={`w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col mb-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">დაგვიკავშირდით</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                <p className="text-sm">რა გაინტერესებს?</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="შეიყვანეთ თქვენი შეტყობინება..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 cursor-pointer text-white rounded-lg px-3 py-2 hover:bg-blue-700">
                გაგზავნა
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 cursor-pointer text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;