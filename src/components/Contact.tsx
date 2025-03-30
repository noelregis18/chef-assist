
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-3 rounded-lg bg-darkBg-lighter border border-white/5 hover:border-teal/30 transition-colors hover:bg-darkBg glass-effect group"
    >
      <div className="text-teal group-hover:text-teal-light transition-colors">
        {icon}
      </div>
      <span className="text-lightText group-hover:text-teal transition-colors">{label}</span>
      <ExternalLink className="w-4 h-4 text-lightText-muted ml-auto group-hover:text-teal transition-colors" />
    </a>
  );
};

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // Create a mailto link
      const mailtoLink = `mailto:noel.regis04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
      
      // Open the default mail client
      window.open(mailtoLink, "_blank");
      
      toast({
        title: "Success!",
        description: "Your email client has been opened with the message details.",
      });
      
      // Clear form
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-16 relative" id="contact">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal">Get In Touch</h2>
          <p className="text-lg text-lightText-muted max-w-2xl mx-auto">
            Connect with me through any of these platforms. I'm always open to discussing new projects or opportunities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SocialLink 
              href="https://www.linkedin.com/in/noel-regis-aa07081b1/" 
              icon={<Linkedin className="w-5 h-5" />} 
              label="LinkedIn" 
            />
            
            <SocialLink 
              href="https://github.com/noelregis18" 
              icon={<Github className="w-5 h-5" />} 
              label="GitHub" 
            />
            
            <SocialLink 
              href="https://x.com/NoelRegis8" 
              icon={<Twitter className="w-5 h-5" />} 
              label="Twitter" 
            />
            
            <SocialLink 
              href="http://topmate.io/noel_regis" 
              icon={<ExternalLink className="w-5 h-5" />} 
              label="Topmate" 
            />
          </div>
          
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-darkBg-lighter border border-white/5 glass-effect">
              <h3 className="text-xl font-bold mb-4 text-teal">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <p className="font-medium text-lightText">Email</p>
                    <a 
                      href="mailto:noel.regis04@gmail.com" 
                      className="text-lightText-muted hover:text-teal transition-colors"
                    >
                      noel.regis04@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <p className="font-medium text-lightText">Phone</p>
                    <a 
                      href="tel:+917319546900" 
                      className="text-lightText-muted hover:text-teal transition-colors"
                    >
                      +91 7319546900
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <p className="font-medium text-lightText">Location</p>
                    <p className="text-lightText-muted">Asansol, West Bengal, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-darkBg-lighter border border-white/5 glass-effect space-y-4">
              <h3 className="text-xl font-bold mb-4 text-teal">Send Message</h3>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lightText mb-1">Your Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-darkBg border-white/10 focus-visible:ring-teal"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-lightText mb-1">Subject</label>
                <Input 
                  id="subject" 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this regarding?"
                  className="bg-darkBg border-white/10 focus-visible:ring-teal"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-lightText mb-1">Message</label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  className="bg-darkBg border-white/10 focus-visible:ring-teal min-h-[120px]"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-teal hover:bg-teal-light text-darkBg"
                disabled={isSending}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
