
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Sample responses for the chatbot
const sampleResponses: Record<string, string[]> = {
  default: [
    "Hello! I'm ChefAssist, your virtual assistant for Faasos. How can I help you today?",
    "I'm here to assist you with any questions about Faasos restaurant. What would you like to know?",
  ],
  greeting: [
    "Hello! Welcome to Faasos. How can I assist you today?",
    "Hi there! Thanks for reaching out. What can I help you with at Faasos?",
  ],
  menu: [
    "Faasos offers a variety of delicious wraps, rolls, and rice bowls. Some popular items include Chicken Tikka Wrap, Paneer Tikka Wrap, and Veg Biryani. Would you like to know more about any specific category?",
    "Our menu includes a range of wraps, rolls, rice dishes, and desserts. We have both vegetarian and non-vegetarian options. Is there something specific you're looking for?",
  ],
  all_dishes: [
    "At Faasos, we offer a wide variety of dishes:\n\n" +
    "🌮 Wraps & Rolls:\n" +
    "- Chicken Tikka Wrap\n" +
    "- Paneer Tikka Wrap\n" +
    "- Egg Bhurji Wrap\n" +
    "- Aloo Tikki Wrap\n" +
    "- Mutton Seekh Wrap\n" +
    "- Double Chicken Classic Wrap\n\n" +
    "🍚 Rice Bowls:\n" +
    "- Veg Biryani\n" +
    "- Chicken Biryani\n" +
    "- Paneer Rice Bowl\n" +
    "- Chicken Rice Bowl\n\n" +
    "🥗 Sides:\n" +
    "- French Fries\n" +
    "- Potato Wedges\n" +
    "- Cheesy Dip\n" +
    "- Mint Chaas\n\n" +
    "🍰 Desserts:\n" +
    "- Chocolate Brownie\n" +
    "- Gulab Jamun\n" +
    "- Choco Lava Cake\n\n" +
    "Would you like to know more about any particular dish?",
  ],
  timing: [
    "Faasos is open from 10:00 AM to 11:00 PM, seven days a week. Our kitchen closes for orders at 10:30 PM.",
    "We're open daily from 10 AM to 11 PM. You can place orders until 10:30 PM.",
  ],
  location: [
    "Faasos has multiple outlets across the city. To find the nearest one, you can use the store locator on our website or app. Can I help you find a specific location?",
    "We have several branches throughout the city. If you share your area, I can help find the closest Faasos outlet to you.",
  ],
  payment: [
    "Faasos accepts various payment methods including credit/debit cards, UPI, digital wallets like Paytm and Google Pay, and cash on delivery.",
    "You can pay using cards, UPI, digital wallets, or cash on delivery. All our delivery personnel carry portable card machines for your convenience.",
  ],
  delivery: [
    "Faasos typically delivers within 30-45 minutes depending on your location and current order volume. You can track your order in real-time through our app.",
    "Our average delivery time is 30-45 minutes. During peak hours or bad weather, it might take slightly longer. You'll receive regular updates on your order status.",
  ],
  about: [
    "Faasos is a quick-service restaurant chain in India that specializes in Indian and fusion wraps, rolls, and rice bowls. It was founded in 2011 and is now part of the Rebel Foods cloud kitchen network.",
    "Faasos started as a quick-service restaurant focusing on wraps and rolls. Today, we're known for our innovative Indian and fusion food offerings, available for delivery across numerous cities in India.",
  ],
  contact: [
    "You can contact Faasos customer service at 1800-XXX-XXXX or email us at support@faasos.com. Our customer service team is available from 9 AM to 12 AM every day.",
    "For any queries or feedback, please call our customer service at 1800-XXX-XXXX or email support@faasos.com. We're available to assist you daily from 9 AM to midnight.",
  ],
  offers: [
    "Faasos regularly has exciting offers! Currently, we have 'Buy 1 Get 1 Free' on selected wraps on Wednesdays, 20% off on your first order through our app, and special discounts for students with valid ID. Check our app for more daily deals!",
    "We have several ongoing promotions! You can enjoy 15% off on orders above ₹300, free delivery on orders above ₹500, and special combo meals at discounted prices. Download our app to access exclusive app-only offers!",
  ],
  allergens: [
    "All our menu items have allergen information available. Our staff can provide detailed information about ingredients in each dish. We take allergies very seriously and can customize dishes to accommodate dietary restrictions when possible.",
    "We maintain comprehensive allergen information for all our dishes. Common allergens like nuts, dairy, gluten, and shellfish are clearly marked on our menu. Please inform our staff about any allergies when placing your order.",
  ],
  bestsellers: [
    "Our most popular items include the Chicken Tikka Wrap, Paneer Tikka Wrap, Double Cheese Veg Roll, Chicken Biryani, and our signature Chocolate Brownie dessert. These have consistently been customer favorites!",
    "Customers love our Butter Chicken Wrap, Aloo Tikki Roll, Chicken Seekh Wrap, Mutton Biryani, and Potato Cheese Shots. These top-selling items have excellent reviews and are must-tries when visiting Faasos!",
  ],
  vegetarian: [
    "Yes, we have plenty of vegetarian options! Our vegetarian menu includes Paneer Tikka Wrap, Veg Deluxe Wrap, Aloo Tikki Roll, Paneer Bhurji Roll, Veg Biryani, Paneer Rice Bowl, and several vegetarian sides and desserts.",
    "Faasos offers an extensive range of vegetarian dishes including various paneer wraps, potato-based rolls, vegetable rice bowls, cheese-filled sides, and sweet desserts. All our vegetarian items are prepared separately from non-vegetarian items.",
  ],
  spicy: [
    "Many of our dishes can be adjusted for spice levels. Our Andhra Chicken Wrap and Schezwan Chicken Roll are among our spiciest offerings. Please specify your spice preference when ordering, and we'll try to accommodate it.",
    "We have several dishes that pack a good amount of heat! Try our Peri Peri Chicken Wrap or our Spicy Paneer Roll if you enjoy spicy food. For milder options, our Classic Rolls and Cheese Wraps are excellent choices.",
  ],
  health: [
    "For health-conscious customers, we offer lighter options like our Whole Wheat Wraps, Grilled Chicken Salad Wrap, and Brown Rice Bowls. We also provide detailed nutritional information on request to help you make informed choices.",
    "We have several healthier alternatives on our menu including protein-rich, low-carb options. Our Lite Wraps, Protein Bowls, and Salad options are designed for health-conscious customers without compromising on taste.",
  ],
  machine: [
    "Our restaurant uses modern kitchen equipment to ensure high-quality food preparation. We have specialized grills for our wraps, professional-grade rice cookers for consistent biryani, and state-of-the-art refrigeration to maintain freshness.",
    "Faasos kitchens are equipped with commercial-grade equipment including automated wrap makers, precision temperature-controlled grills, industrial mixers for our signature sauces, and high-efficiency packaging machines to ensure your food arrives fresh.",
  ]
};

// Function to generate a response based on user query
const generateResponse = (query: string): string => {
  query = query.toLowerCase();
  
  if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
    return sampleResponses.greeting[Math.floor(Math.random() * sampleResponses.greeting.length)];
  } else if (query.includes("all dishes") || query.includes("full menu") || query.includes("everything you have") || query.includes("all food") || query.includes("everything on menu")) {
    return sampleResponses.all_dishes[0];
  } else if (query.includes("menu") || query.includes("food") || query.includes("eat") || query.includes("dish")) {
    return sampleResponses.menu[Math.floor(Math.random() * sampleResponses.menu.length)];
  } else if (query.includes("time") || query.includes("hour") || query.includes("open") || query.includes("close")) {
    return sampleResponses.timing[Math.floor(Math.random() * sampleResponses.timing.length)];
  } else if (query.includes("location") || query.includes("address") || query.includes("where") || query.includes("place")) {
    return sampleResponses.location[Math.floor(Math.random() * sampleResponses.location.length)];
  } else if (query.includes("pay") || query.includes("card") || query.includes("cash") || query.includes("upi")) {
    return sampleResponses.payment[Math.floor(Math.random() * sampleResponses.payment.length)];
  } else if (query.includes("delivery") || query.includes("arrive") || query.includes("when") || query.includes("how long")) {
    return sampleResponses.delivery[Math.floor(Math.random() * sampleResponses.delivery.length)];
  } else if (query.includes("about") || query.includes("history") || query.includes("company") || query.includes("who")) {
    return sampleResponses.about[Math.floor(Math.random() * sampleResponses.about.length)];
  } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("support")) {
    return sampleResponses.contact[Math.floor(Math.random() * sampleResponses.contact.length)];
  } else if (query.includes("offer") || query.includes("discount") || query.includes("deal") || query.includes("coupon") || query.includes("promo")) {
    return sampleResponses.offers[Math.floor(Math.random() * sampleResponses.offers.length)];
  } else if (query.includes("allerg") || query.includes("dietary") || query.includes("restrict") || query.includes("gluten") || query.includes("nut")) {
    return sampleResponses.allergens[Math.floor(Math.random() * sampleResponses.allergens.length)];
  } else if (query.includes("bestseller") || query.includes("popular") || query.includes("recommended") || query.includes("favorite")) {
    return sampleResponses.bestsellers[Math.floor(Math.random() * sampleResponses.bestsellers.length)];
  } else if (query.includes("vegetarian") || query.includes("veg ") || query.includes("no meat") || query.includes("no chicken")) {
    return sampleResponses.vegetarian[Math.floor(Math.random() * sampleResponses.vegetarian.length)];
  } else if (query.includes("spicy") || query.includes("hot ") || query.includes("chili") || query.includes("pepper")) {
    return sampleResponses.spicy[Math.floor(Math.random() * sampleResponses.spicy.length)];
  } else if (query.includes("health") || query.includes("calorie") || query.includes("diet") || query.includes("nutrition")) {
    return sampleResponses.health[Math.floor(Math.random() * sampleResponses.health.length)];
  } else if (query.includes("machine") || query.includes("equipment") || query.includes("kitchen tech") || query.includes("appliance")) {
    return sampleResponses.machine[Math.floor(Math.random() * sampleResponses.machine.length)];
  } else {
    return sampleResponses.default[Math.floor(Math.random() * sampleResponses.default.length)];
  }
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm ChefAssist, your virtual assistant for Faasos. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom automatically when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle scroll button visibility
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isNotAtBottom);
    };

    chatContainer.addEventListener("scroll", handleScroll);
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[650px] w-full max-w-3xl mx-auto bg-darkBg-lighter rounded-xl border border-darkBg-lighter shadow-xl overflow-hidden">
      <div className="bg-darkBg-darker p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="bg-teal w-3 h-3 rounded-full animate-pulse-teal"></div>
          <h2 className="text-lg font-bold text-teal">ChefAssist</h2>
        </div>
        <p className="text-xs text-lightText-muted mt-1">Faasos AI Customer Service</p>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 chat-gradient"
        style={{ position: 'relative', height: 'calc(100% - 130px)' }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2.5 animate-slide-up",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === "bot" && (
              <Avatar className="w-8 h-8 rounded-full bg-teal/10 border border-teal/20 flex-shrink-0">
                <Bot className="h-4 w-4 text-teal" />
              </Avatar>
            )}
            
            <div
              className={cn(
                "max-w-[75%] px-4 py-2 rounded-lg shadow-sm glass-effect",
                message.sender === "user"
                  ? "bg-teal text-darkBg rounded-tr-none"
                  : "bg-darkBg-darker text-lightText rounded-tl-none"
              )}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            
            {message.sender === "user" && (
              <Avatar className="w-8 h-8 rounded-full bg-teal/80 border border-teal flex-shrink-0">
                <User className="h-4 w-4 text-darkBg" />
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-2.5">
            <Avatar className="w-8 h-8 rounded-full bg-teal/10 border border-teal/20 flex-shrink-0">
              <Bot className="h-4 w-4 text-teal" />
            </Avatar>
            <div className="max-w-[75%] px-4 py-2 rounded-lg shadow-sm bg-darkBg-darker text-lightText rounded-tl-none glass-effect">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-teal/60 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-teal/60 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-teal/60 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-6 rounded-full shadow-lg border border-teal/30 bg-darkBg-darker/80 hover:bg-darkBg-darker"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4 text-teal" />
        </Button>
      )}
      
      <div className="p-4 bg-darkBg-darker border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about menu, timings, location, etc..."
            className="flex-1 bg-darkBg-lighter text-lightText border-darkBg-lighter focus-visible:ring-teal"
          />
          <Button 
            onClick={handleSend}
            disabled={input.trim() === ""}
            size="icon"
            className="bg-teal hover:bg-teal-light text-darkBg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
