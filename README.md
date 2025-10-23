🎮 ArenaQuest

**Real-time Interactive Quiz Platform with AI-Powered Question Generation**

[![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-orange?logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple?logo=vite)](https://vitejs.dev/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**ArenaQuest** is a modern, real-time quiz platform designed for classrooms, training sessions, and interactive events. With Firebase backend synchronization, AI-generated questions via Google Gemini, and live leaderboards, it provides an engaging quiz experience for both quiz masters and participants.

### ✨ What Makes ArenaQuest Special?

- **🎯 Option-Only Mode**: Display questions on a projector while students see only A/B/C/D buttons
- **🤖 AI Question Generation**: Create quizzes instantly using Google Gemini AI
- **⚡ Real-Time Sync**: All participants stay perfectly synchronized via Firebase
- **🏆 Live Leaderboards**: Rankings update instantly as answers come in
- **📊 Rich Analytics**: Track performance, timing, and response patterns
- **🔐 Admin Controls**: Full control over quiz flow with timer management
- **📱 QR Code Join**: Students can join instantly by scanning QR codes
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn**
- **Firebase Project** (free tier works!)
- **Google Gemini API Key** (optional, for AI question generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/arenaquest.git
cd arenaquest

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with:
# API_KEY=your_google_gemini_api_key

# Start development server
npm run dev

# Build for production
npm run build
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Realtime Database**
4. Enable **Authentication** with Email/Password provider
5. Update Firebase config in `firebase.ts` with your project credentials
6. Deploy database rules:
   ```bash
   npm run firebase:deploy
   ```

### Setting Up Your First Admin

```bash
# Login to Firebase
npm run firebase:login

# Set admin claim for a user
npm run set-admin:js -- --email your-email@example.com --admin true
```

For detailed admin setup instructions, see [Admin Setup Guide](#admin-setup-guide) below.

---

## 🎯 Features

### For Quiz Masters (Admins)

- **✏️ Dual Question Creation**
  - AI-generated questions using Google Gemini
  - Manual question entry with multiple options
  
- **🎮 Quiz Control Panel**
  - Open/Close answer submissions
  - Reveal correct answers
  - Advance to next question
  - Timer management (pause/resume)
  - Real-time participant monitoring

- **📊 Analytics Dashboard**
  - Response time analysis
  - Accuracy tracking
  - Individual student performance
  - Export results

- **🔐 Security Features**
  - Admins cannot join their own quizzes as students
  - Firebase Authentication integration
  - Admin-only routes with role validation

### For Participants (Students)

- **🚀 Easy Join**
  - Join via room code
  - QR code scanning
  - Direct URL links (`?room=CODE`)

- **📱 Interactive Experience**
  - Real-time question display
  - Instant feedback on answers
  - Live leaderboard updates
  - Option-only mode support

- **🏆 Gamification**
  - Points-based scoring
  - Time bonuses
  - Live rankings
  - Final results with animations

---

## 📚 Documentation

### Recent Fixes & Updates

#### ✅ QR Code Join Fix
**Issue**: Students joining via QR code couldn't submit answers because `userRole` wasn't set.

**Solution**: 
- Added `setUserRole` prop to `StudentJoinScreen`
- Auto-set role to `'student'` after successful QR/URL join
- Works for both manual form submission and QR scan

#### ✅ Admin Prevention Fix
**Issue**: Admins could accidentally join their own quiz as students.

**Solution**:
- Added `adminId` field to track quiz creator
- Validate before join - block if user is the quiz master
- Clear error message: "⚠️ You are the Quiz Master of this room!"

See [QR_JOIN_AND_ADMIN_FIX.md](./QR_JOIN_AND_ADMIN_FIX.md) for detailed technical documentation.

### User Flows

#### Admin Flow
```
Login → Dashboard → Create Quiz → Generate/Add Questions → Start Quiz → 
Share Code/QR → Monitor Responses → Reveal Answers → View Results
```

#### Student Flow
```
Home → Join as Participant → Enter Code/Scan QR → Lobby → 
Answer Questions → View Leaderboard → Final Results
```

### Firebase Database Structure

```json
{
  "rooms": {
    "ROOM_CODE": {
      "name": "Quiz Title",
      "code": "ABC123",
      "adminId": "firebase-user-uid",
      "questions": [...],
      "students": {...},
      "currentQuestionIndex": 0,
      "quizActive": true,
      "responses": {...},
      "mode": "option-only"
    }
  }
}
```

---

## 🛠 Tech Stack

### Frontend
- **React 19.2** - Latest React with improved performance
- **TypeScript 5.8** - Type safety and better DX
- **Vite 6.2** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend & Services
- **Firebase Realtime Database** - Real-time data synchronization
- **Firebase Authentication** - Secure user management
- **Google Gemini AI** - AI-powered question generation

### Key Libraries
- `html5-qrcode` - QR code scanning
- `qrcode.react` - QR code generation
- `lucide-react` - Beautiful icons
- `three.js` - 3D background effects

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev                  # Start dev server (localhost:5173)

# Build
npm run build               # Production build
npm run preview             # Preview production build

# Firebase
npm run firebase:login      # Login to Firebase CLI
npm run firebase:emulator   # Run local emulators
npm run firebase:deploy     # Deploy database rules

# Admin Management
npm run set-admin:js -- --email user@example.com --admin true
```

### Project Structure

```
QuizApp/
├── components/          # Reusable UI components
│   ├── icons/          # Custom icon components
│   └── ui/             # UI library components
├── screens/            # Main application screens
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication logic
│   ├── useQuiz.tsx     # Quiz state management
│   └── useToast.tsx    # Toast notifications
├── utils/              # Utility functions
├── constants/          # App constants
├── firebase.ts         # Firebase configuration
├── types.ts            # TypeScript type definitions
└── App.tsx            # Root component
```

---

## 🔐 Admin Setup Guide

### Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Get Started**
4. Enable **Email/Password** sign-in method

### Step 2: Create Admin User

1. In Firebase Console → **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Copy the **User UID**

### Step 3: Download Service Account Key

1. Go to **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Save as `serviceAccountKey.json` in project root
4. ⚠️ **NEVER commit this file** (already in `.gitignore`)

### Step 4: Grant Admin Privileges

```bash
# Set admin claim
npm run set-admin:js -- --email admin@example.com --admin true

# Remove admin claim
npm run set-admin:js -- --email admin@example.com --admin false
```

**Note**: User must sign out and sign back in for changes to take effect.

### Step 5: Test Admin Login

1. Run `npm run dev`
2. Click **Admin Login** (Quiz Master)
3. Enter credentials
4. You should be redirected to the dashboard

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] QR code scan → auto-fill code → join → answer questions
- [ ] URL parameter join (`?room=CODE`) → can submit answers
- [ ] Manual join (Home → Participant → Join) → works correctly
- [ ] Admin cannot join their own quiz
- [ ] Admin can join other admins' quizzes as student
- [ ] Non-logged-in users can join any quiz as student
- [ ] Timer synchronization across all clients
- [ ] Leaderboard updates in real-time
- [ ] Reveal answers works correctly
- [ ] Results screen displays accurately

---

## 🌐 Deployment

### Deploy to Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy everything (hosting + database rules)
firebase deploy
```

### Environment Variables

Create a `.env.local` file:

```env
API_KEY=your_google_gemini_api_key
```

**Important**: Never commit `.env.local` to git!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain consistent code style (Prettier/ESLint)
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues & Future Enhancements

### Planned Features

- [ ] **Admin Display**: Show admin name in lobby
- [ ] **Co-hosts**: Allow multiple admins for a single quiz
- [ ] **Transfer Ownership**: Transfer quiz to another admin
- [ ] **Anonymous Students**: Allow joining without name
- [ ] **Rejoin Protection**: Allow students to rejoin if disconnected
- [ ] **Question Bank**: Save and reuse questions
- [ ] **Quiz Templates**: Pre-built quiz templates
- [ ] **Export Results**: Download as CSV/PDF
- [ ] **Dark Mode**: Theme toggle
- [ ] **Multi-language Support**: Internationalization

### Known Issues

None at the moment! 🎉 All critical bugs have been resolved.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Aditya Kumar**  
Frontend Engineer

- 📧 Email: adityaissc7@gmail.com
- 🔗 LinkedIn: [Connect with me](https://www.linkedin.com/in/aditya-kumar)
- 🐦 Twitter: [@adityakumar](https://twitter.com/adityakumar)

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Google Gemini AI](https://ai.google.dev/) - AI question generation
- [Vercel](https://vercel.com/) - Hosting platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- All contributors and users of ArenaQuest!

---

## 📊 Project Stats

- **Version**: 1.0.0
- **Last Updated**: October 2025
- **Status**: ✅ Production Ready
- **Build**: ✅ All Tests Passing

---

<div align="center">

**Made with ❤️ by Aditya Kumar**

[⬆ Back to Top](#-arenaquest)

</div>
