# React Counter Test Task

A modern React TypeScript application featuring a counter component with theme switching capabilities.

## 🚀 Live Demo

**<a href="https://react-test-counter.netlify.app/" target="_blank">View Live App</a>**

## Features Implemented

- **Interactive Counter**: Increment, decrement, and reset functionality with custom input support
- **Theme System**: Light, dark, and system theme modes with persistent storage
- **Modern UI**: Clean interface built with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Comprehensive Testing**: Unit tests for all major components using Jest and React Testing Library
- **Responsive Design**: Mobile-friendly interface with modern styling

## Running the App Locally

### Prerequisites

- Node.js (version 16 or higher)
- npm package manager

### Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

### Additional Commands

- **Run tests:**

  ```bash
  npm test
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

## Project Structure

```
src/
├── components/          # React components
│   ├── Counter.tsx     # Main counter component
│   ├── ThemeProvider.tsx & ThemeToggle.tsx  # Theme system
│   └── ui/             # Reusable UI components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Technologies Used

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Jest & React Testing Library** for testing
- **Lucide React** for icons
