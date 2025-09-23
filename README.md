# EmpowerHer - Women's Training and Empowerment Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-blue)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.16-purple)](https://www.framer.com/motion/)

A comprehensive, beautifully designed web application dedicated to empowering women through interactive training modules focusing on legal rights, voice assertiveness, and self-defense. Built with React and featuring a modern, elegant UI with gamified elements and personal progress tracking.

## 🌟 Features

### Core Training Modules
- **📚 Legal Rights & Procedures**: Interactive story-based lessons teaching legal rights and procedures
- **🗣️ Voice Assertiveness Training**: Practice exercises for confident communication and boundary setting
- **🛡️ Self Defense Training**: Essential self-defense techniques with step-by-step guides

### Dashboard & Progress Tracking
- **📊 Real-time Progress Tracking**: Visual progress indicators across all modules
- **🏆 Achievement System**: Unlockable badges and level progression
- **🔥 Streak Counter**: Daily learning streak tracking with motivational elements
- **⭐ Confidence Tracking**: Self-assessment tools for building confidence

### Resources & Support
- **📖 Educational Resources**: Downloadable guides, checklists, and workbooks
- **📞 Support Helplines**: Quick access to professional support services
- **🚨 Emergency Contacts**: Customizable emergency contact management
- **💡 Daily Challenges**: Engaging daily tasks for skill reinforcement

### User Experience
- **🎨 Elegant Design**: High-end, modern UI with sophisticated typography and color schemes
- **📱 Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **⚡ Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **🎯 Gamification**: Points, levels, badges, and streak counters for engagement

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.0 with custom design system
- **UI Components**: Shadcn/ui for high-quality, accessible components
- **Icons**: Lucide React for beautiful, consistent iconography
- **Animations**: Framer Motion for smooth transitions and interactions
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks and local storage for data persistence
- **Development**: React Scripts for build tooling

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** (version 8.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd empowerher
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (Button, Card, etc.)
│   ├── dashboard/             # Dashboard-specific components
│   ├── voice/                 # Voice training components
│   ├── defense/               # Self-defense components
│   ├── resources/             # Resources page components
│   ├── emergency/             # Emergency contacts components
│   └── Layout.jsx             # Main application layout
├── pages/
│   ├── Dashboard.jsx          # Main dashboard page
│   ├── LegalRights.jsx        # Legal rights training module
│   ├── VoiceTraining.jsx      # Voice assertiveness module
│   ├── SelfDefense.jsx        # Self-defense training module
│   ├── Resources.jsx          # Resources and support page
│   └── Emergency.jsx          # Emergency contacts page
├── lib/
│   ├── utils.js               # Utility functions and mock backend
│   └── mockData.js            # Sample data and initialization
├── App.js                     # Main application component
└── index.js                   # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Pinks and Purples (#EC4899, #A855F7, #DB2777)
- **Module Colors**:
  - Legal Rights: Blues (#0EA5E9, #2563EB)
  - Voice Training: Violets (#8B5CF6, #7C3AED)
  - Self Defense: Greens (#10B981, #059669)
  - Resources: Oranges (#F97316, #F59E0B)
  - Emergency: Reds (#EF4444, #DC2626)

### Typography
- Clean, modern sans-serif fonts throughout
- Hierarchical text sizing with consistent spacing
- High contrast for accessibility

### Layout
- Generous white space and padding
- Card-based design with subtle shadows
- Responsive grid layouts
- Smooth hover effects and transitions

## 📊 Data Structure

The application uses a mock backend system that simulates real database operations using localStorage. Key entities include:

- **UserStats**: User progress, points, streaks, and achievements
- **TrainingProgress**: Module completion and performance data
- **ChapterProgress**: Detailed chapter-level progress for story modules
- **EmergencyContact**: User-managed emergency contacts
- **StoryContent**: Interactive story scenarios and content

## 🔐 Backend Integration

Currently, the app runs entirely on the frontend with mock data. The architecture is designed to easily integrate with a real backend:

1. Replace mock entity operations in `src/lib/utils.js` with actual API calls
2. Implement user authentication system
3. Add real data persistence and synchronization
4. Integrate with external services for helplines and resources

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build/` directory with optimized production files.

### Deployment Options

- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your git repository for automatic deployments
- **GitHub Pages**: Use the `build/` folder for static hosting
- **Firebase Hosting**: Deploy using Firebase CLI

## 🧪 Testing

The application includes comprehensive testing setup:

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Lucide** for the comprehensive icon set
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

For support, please contact:
- Email: support@empowerher.com
- Documentation: [docs.empowerher.com](https://docs.empowerher.com)
- Issues: [GitHub Issues](https://github.com/empowerher/issues)

---

**EmpowerHer** - Empowering women through education, confidence, and community. 💜
