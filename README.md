# ChefAssist AI Chat

ChefAssist AI Chat is an AI-powered chatbot web application designed to assist users with customer service queries, specifically tailored for food service businesses like Faasos. It features a modern UI, dark/light theme toggle, and a demo chat interface.

## Features
- AI-powered customer service chatbot
- Modern, responsive design
- Dark/Light mode toggle
- Smooth navigation and animated UI components
- Built with React, Vite, Tailwind CSS, and TypeScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/noelregis18/chef-assist.git
   cd chefassist-ai-chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to [http://localhost:8080](http://localhost:8080)

## Project Structure
- `src/components` - UI components (Navbar, Chat, ThemeToggle, etc.)
- `src/pages` - Main pages (Index, NotFound)
- `src/hooks` - Custom React hooks
- `src/lib` - Utility functions
- `public/` - Static assets (favicon, images)

## Customization
- Update the chatbot logic in `src/components/ChatDemo.tsx` as needed.
- Change theme colors in `tailwind.config.ts` and `index.css`.

## License
This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for ChefAssist AI.
