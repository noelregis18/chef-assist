
import ChatInterface from "./ChatInterface";

const ChatDemo = () => {
  return (
    <div className="py-16 px-4" id="chat-demo">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal">Try ChefAssist Now</h2>
          <p className="text-lg text-lightText-muted max-w-2xl mx-auto">
            Experience the AI-powered chatbot in action. Ask about Faasos menu, timings, locations, or any other information you need.
            Try asking about "all dishes", "vegetarian options", "breakfast menu", "catering services", or anything else restaurant-related!
          </p>
        </div>
        
        <div className="flex justify-center">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
