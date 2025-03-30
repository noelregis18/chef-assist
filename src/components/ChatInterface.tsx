
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

// Expanded responses for the chatbot to cover ALL restaurant topics
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
  ],
  // Adding MORE topics to cover everything about the restaurant
  reservation: [
    "Faasos primarily operates as a delivery and takeaway restaurant. Most of our outlets don't offer dine-in services, so reservations aren't typically needed. However, some larger locations may have limited seating available on a first-come, first-served basis.",
    "We focus mainly on delivery and takeaway orders. While reservations aren't available at most locations, you can place your order ahead of time through our app or website for pickup at your convenience.",
  ],
  catering: [
    "Yes, Faasos offers catering services for events and parties! We can accommodate both small gatherings and large corporate events. Our catering menu includes a variety of wraps, platters, rice bowls, and desserts. Please contact us at least 48 hours in advance for catering requests.",
    "Our catering service is perfect for office parties, birthdays, and other events. We offer customizable packages to suit your budget and preferences. For large orders, we recommend placing your request 2-3 days in advance to ensure availability.",
  ],
  hygiene: [
    "Food safety and hygiene are our top priorities at Faasos. All our kitchens follow strict FSSAI guidelines and are regularly audited for cleanliness. Our staff undergoes regular health checks and follows proper hand washing and sanitizing protocols.",
    "We maintain the highest standards of hygiene in all our outlets. Our ingredients are stored at appropriate temperatures, and we have strict protocols for food handling. Our kitchens are designed to prevent cross-contamination and ensure food safety.",
  ],
  ingredients: [
    "Faasos takes pride in using fresh, high-quality ingredients. We source our vegetables daily from trusted suppliers, and our meats are inspected for quality before preparation. We avoid artificial preservatives whenever possible and focus on authentic flavors.",
    "We believe in transparency about our ingredients. Our chicken is hormone-free, and we use cold-pressed oils for cooking. Our sauces and marinades are made in-house using traditional recipes to ensure authentic taste in every bite.",
  ],
  sustainability: [
    "Faasos is committed to reducing our environmental impact. We've been transitioning to eco-friendly packaging made from biodegradable materials. We also optimize delivery routes to reduce carbon emissions and work with suppliers who follow sustainable practices.",
    "Environmental responsibility is important to us. We've implemented waste reduction initiatives in our kitchens, use energy-efficient equipment, and continue to explore innovative ways to make our operations more sustainable without compromising on food quality or service.",
  ],
  app: [
    "The Faasos app offers a convenient way to browse our menu, place orders, and track deliveries in real-time. It's available for both iOS and Android devices. The app also gives you access to exclusive deals and our loyalty program for regular customers.",
    "Our mobile app enhances your ordering experience with features like saved addresses, favorite orders, and scheduled deliveries. You can also use it to provide feedback on your orders and contact customer support directly. Download it from the App Store or Google Play Store.",
  ],
  franchise: [
    "Faasos does offer franchise opportunities for entrepreneurs interested in joining our growing network. Franchise partners receive comprehensive training, marketing support, and access to our established supply chain. For detailed information about franchise requirements and investment, please visit our corporate website.",
    "Becoming a Faasos franchise partner can be a rewarding business opportunity. We look for partners who share our passion for food quality and customer service. The franchise model includes complete operational support and brand recognition benefits. Contact our business development team for more information.",
  ],
  history: [
    "Faasos was founded in 2011 by Jaydeep Barman and Kallol Banerjee. It started as a small quick-service restaurant in Pune, focusing on wraps and rolls. The name 'Faasos' is an acronym for 'Fanatic Activism Against Substandard Occidental Shit,' reflecting the founders' vision to offer quality Indian alternatives to western fast food.",
    "From its humble beginnings as a single outlet in Pune, Faasos has grown into one of India's leading food tech companies. In 2015, it evolved into a full-stack technology company operating under the parent company Rebel Foods, which now runs multiple virtual restaurant brands across several countries.",
  ],
  rewards: [
    "Faasos offers a loyalty program called 'Faasos Rewards' where you earn points on every order. These points can be redeemed for discounts on future orders or special menu items. You also get bonus points for referring friends and family to use our service.",
    "Our rewards program has multiple tiers based on your ordering frequency. Regular customers can unlock special benefits including priority delivery, exclusive menu access, and surprise treats on special occasions. Join the program through our app to start earning rewards immediately.",
  ],
  customization: [
    "Faasos is happy to accommodate customization requests for most of our menu items. You can request modifications like extra or less spice, ingredient substitutions, or additional toppings. Just add your preferences in the order notes section or inform our staff when ordering.",
    "We understand everyone has unique tastes and dietary needs. Our wraps and bowls can be customized to your liking - whether you want to add extra cheese, remove onions, or adjust spice levels. Some customizations may incur additional charges depending on the request.",
  ],
  kids: [
    "While we don't have a dedicated kids' menu, several of our items are popular with younger customers. Our Aloo Tikki Wrap, Cheese Rolls, and milder versions of our wraps are suitable for children. We can also prepare items with reduced spice levels upon request.",
    "For families with children, we recommend our Mini Wraps, which are perfect for smaller appetites. Our French Fries and Cheese Dips are also kid-friendly options. Feel free to ask our staff for recommendations based on your child's preferences.",
  ],
  packaging: [
    "Faasos uses high-quality packaging designed to keep your food fresh and at the right temperature during delivery. Our wraps are carefully packaged to maintain their structure, and our rice bowls come in leak-proof containers. We're also transitioning to more eco-friendly packaging materials.",
    "Our packaging is designed with both functionality and environmental impact in mind. We use specialized wrapping techniques for our rolls to prevent them from becoming soggy. For larger orders, we provide secure packaging that helps maintain food temperature and prevents spills during transit.",
  ],
  breakfast: [
    "Select Faasos outlets offer breakfast options between 7 AM and 11 AM. Our breakfast menu includes Egg Wraps, Breakfast Parathas, and Masala Chai. Check our app to see if breakfast service is available at your nearest location.",
    "Start your day with our nutritious breakfast options! We offer a range of morning favorites including various egg preparations, multi-grain wraps, and fresh beverages. Breakfast availability may vary by location, so please check with your nearest outlet.",
  ],
  events: [
    "Faasos occasionally hosts special events like food festivals, chef's specials, and promotional tastings. These events are typically announced on our social media channels and through the app. We also participate in local food events and festivals in major cities.",
    "Follow us on social media to stay updated on our upcoming events! We regularly introduce limited-time special menus to celebrate festivals and seasons. During these promotions, you can enjoy unique dishes that aren't part of our regular menu.",
  ],
  feedback: [
    "We value your feedback! You can share your experience through our app, website, or by calling our customer service. Your comments help us improve our food and service. For specific concerns, please include your order details so we can address the issue properly.",
    "Customer feedback drives our improvement efforts. After every order, you'll receive a request to rate your experience. For more detailed feedback, you can use the 'Contact Us' section on our website or speak directly with a manager at any of our outlets.",
  ],
  covid: [
    "Since the COVID-19 pandemic, Faasos has implemented enhanced safety protocols. These include daily temperature checks for staff, regular sanitization of kitchen surfaces, contactless delivery options, and sealed packaging. All our staff members are fully vaccinated.",
    "We take the health and safety of our customers and staff very seriously. Our kitchens follow strict sanitization schedules, and all food handlers wear appropriate protective gear. We offer contactless delivery and digital payment options to minimize physical contact.",
  ],
  seasonal: [
    "Faasos introduces seasonal menu items throughout the year to showcase fresh, in-season ingredients. During summer, look for refreshing options like our Mango Desserts, while winter brings warming specials like our Spiced Hot Beverages and heartier wraps.",
    "We love to celebrate India's diverse seasonal produce! Our chefs create special limited-time offerings based on what's fresh and available. These seasonal specials are perfect opportunities to try innovative flavors alongside our regular menu favorites.",
  ],
  calories: [
    "Nutritional information, including calorie counts, is available for all our menu items. You can find this information on our app or website, or ask our customer service representatives. We also offer a range of lighter options under 400 calories for health-conscious customers.",
    "We're transparent about the nutritional content of our food. Our wraps generally range from 300-500 calories, depending on fillings. Rice bowls typically contain 400-600 calories. For detailed information about specific dishes, including macronutrients, please check our digital menu.",
  ],
  halal: [
    "Yes, all meat products served at Faasos are Halal certified. We source our meat from certified Halal suppliers and follow proper preparation methods in accordance with Halal requirements.",
    "Faasos is committed to serving 100% Halal meat across all our outlets. Our suppliers are regularly audited to ensure compliance with Halal standards, and we maintain strict separation protocols in our kitchens.",
  ],
  jain: [
    "Faasos offers several Jain-friendly options that are prepared without root vegetables. Our Jain menu includes specially prepared wraps and bowls that respect Jain dietary restrictions. Please specify 'Jain preparation' when placing your order.",
    "We understand and respect Jain dietary requirements. Our Jain-specific menu items are prepared separately to avoid any cross-contamination with non-Jain ingredients. The Jain options are clearly marked on our menu for easy identification.",
  ],
  vegan: [
    "Faasos has several vegan options available. Our Vegan Delight Wrap, Garden Fresh Roll, and Vegan Rice Bowl are prepared without any animal products. We use separate utensils for vegan food preparation to prevent cross-contamination.",
    "For our vegan customers, we offer a variety of plant-based options that don't compromise on flavor. Our vegan menu uses ingredients like tofu, plant-based proteins, and a variety of fresh vegetables. Just look for the vegan icon on our menu or ask our staff for recommendations.",
  ],
  gluten: [
    "While many of our rice bowls are naturally gluten-free, our wraps and rolls contain gluten. For customers with celiac disease or gluten sensitivity, we recommend our rice-based dishes without soy sauce. Please inform us about your dietary requirements when ordering.",
    "We offer several gluten-free options, primarily our rice bowls when ordered without certain sauces. However, please note that our kitchen handles gluten-containing ingredients, so there is a possibility of cross-contact. We're working on expanding our gluten-free offerings.",
  ],
  party: [
    "Faasos offers special party packages for groups of all sizes. Our party platters include a variety of wraps, sides, and desserts that are perfect for sharing. We recommend placing party orders at least 24 hours in advance to ensure availability.",
    "Planning a party? Our catering team can help you create the perfect menu for your event! We offer bulk discounts for large orders and can provide serving suggestions based on your guest count. Contact us for customized party packages tailored to your budget and preferences.",
  ],
  signature: [
    "Our signature items include the Double Cheese Chicken Wrap, Smoky Paneer Tikka Wrap, and our exclusive Faasos Special Biryani. These dishes showcase our unique flavor profiles and have been customer favorites since our early days.",
    "Faasos is known for our signature wraps with proprietary marinades and sauces developed by our culinary team. Our most iconic creation is the Roomali Wrap, which uses a special thin bread similar to roomali roti that's exclusive to Faasos and perfectly complements our flavorful fillings.",
  ],
  desserts: [
    "Complete your meal with our delicious dessert selection! We offer classic Indian sweets like Gulab Jamun and modern treats like Chocolate Brownies. Our desserts are the perfect way to end your Faasos experience on a sweet note.",
    "Our dessert menu features both traditional and contemporary options. Try our creamy Phirni, indulgent Chocolate Lava Cake, or seasonal fruit-based desserts. We also offer combo deals that include a dessert with your main order at a special price.",
  ],
  drinks: [
    "Faasos offers a variety of beverages to complement your meal. Our drink options include refreshing Mint Chaas, soft drinks, and bottled water. Some locations also offer specialty beverages like cold coffee and fresh fruit juices.",
    "Stay refreshed with our selection of drinks! From traditional options like Masala Chai to cooling beverages like Aam Panna in summer, we have drinks to pair perfectly with your food. Check the beverages section on our menu for the complete selection.",
  ],
  combo: [
    "Our value-for-money combo meals include a main item (wrap or rice bowl), a side, and a beverage at a discounted price. These combos are perfect for a complete meal experience and offer savings compared to ordering items separately.",
    "Faasos combo meals are designed to give you a well-rounded dining experience. Our popular 'Wrap + Wedges + Drink' combo is a customer favorite. We also offer family combos that serve 3-4 people, making them perfect for group orders or family meals.",
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
    return sampleResponses.history[Math.floor(Math.random() * sampleResponses.history.length)];
  } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("support")) {
    return sampleResponses.contact[Math.floor(Math.random() * sampleResponses.contact.length)];
  } else if (query.includes("offer") || query.includes("discount") || query.includes("deal") || query.includes("coupon") || query.includes("promo")) {
    return sampleResponses.offers[Math.floor(Math.random() * sampleResponses.offers.length)];
  } else if (query.includes("allerg") || query.includes("dietary") || query.includes("restrict") || query.includes("gluten")) {
    return sampleResponses.gluten[Math.floor(Math.random() * sampleResponses.gluten.length)];
  } else if (query.includes("bestseller") || query.includes("popular") || query.includes("recommended") || query.includes("favorite")) {
    return sampleResponses.bestsellers[Math.floor(Math.random() * sampleResponses.bestsellers.length)];
  } else if (query.includes("vegetarian") || query.includes("veg ") || query.includes("no meat") || query.includes("no chicken")) {
    return sampleResponses.vegetarian[Math.floor(Math.random() * sampleResponses.vegetarian.length)];
  } else if (query.includes("spicy") || query.includes("hot ") || query.includes("chili") || query.includes("pepper")) {
    return sampleResponses.spicy[Math.floor(Math.random() * sampleResponses.spicy.length)];
  } else if (query.includes("health") || query.includes("calorie") || query.includes("diet") || query.includes("nutrition")) {
    return sampleResponses.calories[Math.floor(Math.random() * sampleResponses.calories.length)];
  } else if (query.includes("machine") || query.includes("equipment") || query.includes("kitchen tech") || query.includes("appliance")) {
    return sampleResponses.machine[Math.floor(Math.random() * sampleResponses.machine.length)];
  } else if (query.includes("reservation") || query.includes("book") || query.includes("table")) {
    return sampleResponses.reservation[Math.floor(Math.random() * sampleResponses.reservation.length)];
  } else if (query.includes("catering") || query.includes("event") || query.includes("party")) {
    return sampleResponses.catering[Math.floor(Math.random() * sampleResponses.catering.length)];
  } else if (query.includes("hygiene") || query.includes("clean") || query.includes("sanit")) {
    return sampleResponses.hygiene[Math.floor(Math.random() * sampleResponses.hygiene.length)];
  } else if (query.includes("ingredients") || query.includes("what's in") || query.includes("whats in")) {
    return sampleResponses.ingredients[Math.floor(Math.random() * sampleResponses.ingredients.length)];
  } else if (query.includes("sustainable") || query.includes("eco") || query.includes("environment")) {
    return sampleResponses.sustainability[Math.floor(Math.random() * sampleResponses.sustainability.length)];
  } else if (query.includes("app") || query.includes("mobile") || query.includes("download")) {
    return sampleResponses.app[Math.floor(Math.random() * sampleResponses.app.length)];
  } else if (query.includes("franchise") || query.includes("business") || query.includes("partner")) {
    return sampleResponses.franchise[Math.floor(Math.random() * sampleResponses.franchise.length)];
  } else if (query.includes("reward") || query.includes("loyal") || query.includes("point")) {
    return sampleResponses.rewards[Math.floor(Math.random() * sampleResponses.rewards.length)];
  } else if (query.includes("custom") || query.includes("modify") || query.includes("change order")) {
    return sampleResponses.customization[Math.floor(Math.random() * sampleResponses.customization.length)];
  } else if (query.includes("kid") || query.includes("child") || query.includes("family")) {
    return sampleResponses.kids[Math.floor(Math.random() * sampleResponses.kids.length)];
  } else if (query.includes("packaging") || query.includes("container") || query.includes("takeaway")) {
    return sampleResponses.packaging[Math.floor(Math.random() * sampleResponses.packaging.length)];
  } else if (query.includes("breakfast") || query.includes("morning") || query.includes("early")) {
    return sampleResponses.breakfast[Math.floor(Math.random() * sampleResponses.breakfast.length)];
  } else if (query.includes("events") || query.includes("special") || query.includes("festival")) {
    return sampleResponses.events[Math.floor(Math.random() * sampleResponses.events.length)];
  } else if (query.includes("feedback") || query.includes("review") || query.includes("suggestion")) {
    return sampleResponses.feedback[Math.floor(Math.random() * sampleResponses.feedback.length)];
  } else if (query.includes("covid") || query.includes("pandemic") || query.includes("safety")) {
    return sampleResponses.covid[Math.floor(Math.random() * sampleResponses.covid.length)];
  } else if (query.includes("seasonal") || query.includes("summer") || query.includes("winter")) {
    return sampleResponses.seasonal[Math.floor(Math.random() * sampleResponses.seasonal.length)];
  } else if (query.includes("halal")) {
    return sampleResponses.halal[Math.floor(Math.random() * sampleResponses.halal.length)];
  } else if (query.includes("jain")) {
    return sampleResponses.jain[Math.floor(Math.random() * sampleResponses.jain.length)];
  } else if (query.includes("vegan")) {
    return sampleResponses.vegan[Math.floor(Math.random() * sampleResponses.vegan.length)];
  } else if (query.includes("party") || query.includes("celebration") || query.includes("gathering")) {
    return sampleResponses.party[Math.floor(Math.random() * sampleResponses.party.length)];
  } else if (query.includes("signature") || query.includes("special") || query.includes("famous")) {
    return sampleResponses.signature[Math.floor(Math.random() * sampleResponses.signature.length)];
  } else if (query.includes("dessert") || query.includes("sweet") || query.includes("treat")) {
    return sampleResponses.desserts[Math.floor(Math.random() * sampleResponses.desserts.length)];
  } else if (query.includes("drink") || query.includes("beverage") || query.includes("juice") || query.includes("water")) {
    return sampleResponses.drinks[Math.floor(Math.random() * sampleResponses.drinks.length)];
  } else if (query.includes("combo") || query.includes("meal") || query.includes("package")) {
    return sampleResponses.combo[Math.floor(Math.random() * sampleResponses.combo.length)];
  } else if (query.includes("nut") || query.includes("allergy")) {
    return sampleResponses.allergens[Math.floor(Math.random() * sampleResponses.allergens.length)];
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

  // Modified: No automatic scrolling to the bottom for new messages
  // Instead, we'll only show the scroll button when needed

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
    
    // Check initially if we need to show the scroll button
    handleScroll();
    
    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, [messages]); // Added messages dependency to update when new messages arrive

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
      
      // After adding a new message, check if we need to show the scroll button
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollButton(isNotAtBottom);
      }
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
