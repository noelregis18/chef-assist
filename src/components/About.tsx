
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="py-16 relative overflow-hidden" id="about">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent opacity-30"
        style={{ 
          backgroundSize: "20px 20px", 
          backgroundImage: "radial-gradient(circle, rgba(26, 188, 156, 0.1) 1px, transparent 1px)" 
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal">About ChefAssist</h2>
            <p className="text-lightText mb-4">
              ChefAssist is an advanced AI chatbot designed to enhance customer service for Faasos. 
              Our AI assistant provides instant, accurate information about the restaurant's menu, 
              timing, location, payment options, and more.
            </p>
            <p className="text-lightText mb-6">
              Available 24/7, ChefAssist helps customers get quick answers to their queries, 
              making the dining and ordering experience smoother and more enjoyable. The chatbot 
              is continuously learning to provide better and more personalized responses.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal mr-2"></div>
                <p className="text-lightText">Instant responses to customer queries</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal mr-2"></div>
                <p className="text-lightText">Comprehensive information about Faasos</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal mr-2"></div>
                <p className="text-lightText">Available 24/7 for customer assistance</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal mr-2"></div>
                <p className="text-lightText">Continuously improving through AI learning</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-teal/20 rounded-full blur-3xl"></div>
              <div className="absolute w-full h-full rounded-full overflow-hidden border-2 border-teal/30 glass-effect">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl text-teal opacity-20">AI</div>
                </div>
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-darkBg-darker/50"></div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-darkBg-lighter rounded-full border border-teal/30 flex items-center justify-center glass-effect">
                <div className="text-teal text-3xl">?</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-darkBg-lighter rounded-full border border-teal/30 flex items-center justify-center glass-effect">
                <div className="text-teal text-3xl">!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
