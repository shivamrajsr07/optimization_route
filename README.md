🚀 AI Route Optimizer

A smart, AI-driven route optimization app built using Expo + React Native.

This mobile app lets users enter two locations and instantly receive optimized travel recommendations across multiple transport modes including car, walking, train/metro, and flight.
Designed with smooth animations, gesture interactions, and a clean UI, the app runs seamlessly inside Expo Go on Android, iOS, and Web.

✨ Features
🔍 AI-Style Route Insights

For any two locations, the app generates:

🚗 Car travel time & cost estimation

🚶 Walking feasibility

🚆 Train / Metro travel suggestion

✈ Flight time & approximate pricing

🎯 AI-based recommended best travel mode

🎨 Beautiful UI & Smooth Animations

Animated floating action button

Spring-based gesture animations

Clean and modern dark theme

Haptic feedback for better UX

⚡ Runs Everywhere

Android

iOS

Expo Go app

Web support

No backend, no API keys — full logic runs on-device.

📱 Tech Stack

Expo (React Native)

Expo Router

TypeScript

React Native Reanimated

Expo Haptics

Ionicons

Modern UI components

📁 Project Structure
optimization_route/
   ├── backend/          # Optional server (Express)
   ├── frontend/
   │    ├── app/
   │    │    ├── (tabs)/index.tsx   # Main route optimizer screen
   │    │    ├── _layout.tsx
   │    │    └── modal.tsx
   │    ├── components/
   │    ├── assets/
   │    ├── package.json
   │    └── README.md
   └── README.md

🔧 Installation & Setup
1. Clone the repository
git clone https://github.com/shivamrajsr07/optimization_route.git
cd optimization_route/frontend

2. Install dependencies
npm install

3. Run the project
npx expo start

4. Open the app

Scan QR in Android Expo Go

Or press w to run on Web

Or use emulator (a for Android)

🧠 How It Works

User enters two locations:

From: Bangalore
To: Mumbai


App generates AI-like predictions:

Estimated travel time

Approximate cost

Best recommended travel mode

Smooth animated UI displays results inside a card.

🚀 Future Enhancements

🌍 Google Maps Directions API support

🚌 Multiple intermediate stops

💸 Live flight/train cost from APIs

🗺️ Map rendering for routes

🎙️ Voice-based input

🔄 Offline caching for history

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

📄 License

MIT License © 2025 Shivam Raj
