
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16" id="home">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-teal/5 via-darkBg to-darkBg z-0"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-teal/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 md:pt-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-lightText block mb-2">Welcome to</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-light">
                ChefAssist
              </span>
            </h1>
            <p className="mt-6 text-xl text-lightText-muted max-w-md mx-auto md:mx-0">
              AI-powered customer service chatbot for Faasos restaurant. Get instant answers 
              about menu, timings, and more.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                className="bg-teal hover:bg-teal-light text-darkBg px-8 py-6 rounded-lg font-medium text-lg"
                onClick={() => document.getElementById("chat-demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Try ChefAssist
              </Button>
              
              <Button 
                variant="outline" 
                className="border-teal text-teal hover:bg-teal/10 hover:text-teal-light px-8 py-6 rounded-lg font-medium text-lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-radial from-teal/10 via-transparent to-transparent"></div>
            
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-teal/20 animate-pulse"></div>
              
              {/* Decorative elements */}
              <div className="absolute w-20 h-20 top-10 right-10 bg-darkBg-lighter rounded-lg border border-teal/20 glass-effect flex items-center justify-center">
                <div className="text-teal text-3xl">?</div>
              </div>
              
              <div className="absolute w-24 h-24 bottom-20 left-0 bg-darkBg-lighter rounded-full border border-teal/20 glass-effect flex items-center justify-center">
                <div className="text-teal text-4xl">AI</div>
              </div>
              
              <div className="absolute w-32 h-16 bottom-0 right-10 bg-darkBg-lighter rounded-lg border border-teal/20 glass-effect flex items-center justify-center">
                <p className="text-teal text-sm">24/7 Support</p>
              </div>
              
              <div className="absolute w-40 h-16 top-32 left-10 bg-darkBg-lighter rounded-lg border border-teal/20 glass-effect flex items-center justify-center">
                <p className="text-teal text-sm">Faasos Customer Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-teal hover:text-teal-light hover:bg-transparent"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
