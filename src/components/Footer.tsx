
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darkBg-darker py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-teal mb-4">ChefAssist</h3>
            <p className="text-lightText-muted mb-4">
              AI-powered customer service chatbot for Faasos restaurant.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/noel-regis-aa07081b1/"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightText-muted hover:text-teal transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/noelregis18"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightText-muted hover:text-teal transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://x.com/NoelRegis8"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lightText-muted hover:text-teal transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="mailto:noel.regis04@gmail.com"
                className="text-lightText-muted hover:text-teal transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-lightText mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-lightText-muted hover:text-teal transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-lightText-muted hover:text-teal transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="text-lightText-muted hover:text-teal transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-lightText-muted hover:text-teal transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-lightText mb-4">Contact</h3>
            <address className="not-italic text-lightText-muted">
              <p>Asansol, West Bengal, India</p>
              <p className="mt-2">
                <a 
                  href="mailto:noel.regis04@gmail.com" 
                  className="hover:text-teal transition-colors"
                >
                  noel.regis04@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <a 
                  href="tel:+917319546900" 
                  className="hover:text-teal transition-colors"
                >
                  +91 7319546900
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-lightText-muted">
            &copy; {new Date().getFullYear()} ChefAssist. All rights reserved.
          </p>
          <p className="text-xs text-lightText-muted mt-2">
            Designed & Developed by Noel Regis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
