
import { Clock, Globe, CreditCard, UtensilsCrossed, MessageSquare, Map } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-darkBg-lighter border border-white/5 hover:border-teal/20 transition-all hover:shadow-lg hover:shadow-teal/5 glass-effect group">
      <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-teal">{title}</h3>
      <p className="text-lightText-muted">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <UtensilsCrossed className="h-6 w-6 text-teal" />,
      title: "Menu Information",
      description: "Get detailed information about Faasos menu items, ingredients, and pricing.",
    },
    {
      icon: <Clock className="h-6 w-6 text-teal" />,
      title: "Operating Hours",
      description: "Check restaurant timings, delivery hours, and estimated wait times.",
    },
    {
      icon: <Map className="h-6 w-6 text-teal" />,
      title: "Location Services",
      description: "Find the nearest Faasos outlet, parking information, and accessibility details.",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-teal" />,
      title: "Payment Options",
      description: "Learn about available payment methods, offers, and loyalty programs.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-teal" />,
      title: "24/7 Support",
      description: "Get assistance anytime with frequently asked questions and support.",
    },
    {
      icon: <Globe className="h-6 w-6 text-teal" />,
      title: "Accessibility",
      description: "Information about special accommodations and accessibility features.",
    },
  ];

  return (
    <div className="py-16" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal">Features</h2>
          <p className="text-lg text-lightText-muted max-w-3xl mx-auto">
            ChefAssist provides comprehensive information about Faasos to enhance your customer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
