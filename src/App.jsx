/**
 * App.jsx - Main Application Component
 * Sets up routing and global providers for Smart Restart
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Page components
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import GoalSetup from './pages/GoalSetup';
import CourseHome from './pages/CourseHome';
import SmartRestart from './pages/SmartRestart';
import MemoryRefresh from './pages/MemoryRefresh';
import ConfidenceQuiz from './pages/ConfidenceQuiz';
import DecisionScreen from './pages/DecisionScreen';
import Lesson from './pages/Lesson';
import MyPlan from './pages/MyPlan';
import Insights from './pages/Insights';

// Gamification components
import Celebration from './components/gamification/Celebration';
import BadgeUnlock from './components/gamification/BadgeUnlock';

// Import global styles
import './index.css';

import Navbar from './components/common/Navbar';

/**
 * AppContent - Contains routes and global UI elements
 * Separated to access context within
 */
const AppContent = () => {
  const { showCelebration, celebrationMessage, newBadge, dismissBadge } = useApp();

  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      {/* Main Routes */}
      <Routes>
        {/* Entry Flow */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-plan" element={<MyPlan />} />
        <Route path="/insights" element={<Insights />} />

        {/* Course Flow */}
        <Route path="/goal-setup/:courseId" element={<GoalSetup />} />
        <Route path="/course/:courseId" element={<CourseHome />} />

        {/* Smart Restart Flow */}
        <Route path="/smart-restart/:courseId" element={<SmartRestart />} />
        <Route path="/memory-refresh/:courseId" element={<MemoryRefresh />} />
        <Route path="/quiz/:courseId" element={<ConfidenceQuiz />} />
        <Route path="/decision/:courseId" element={<DecisionScreen />} />

        {/* Lesson */}
        <Route path="/lesson/:courseId" element={<Lesson />} />
      </Routes>

      {/* Global Celebration Animation */}
      <Celebration show={showCelebration} message={celebrationMessage} />

      {/* Badge Unlock Modal */}
      <BadgeUnlock
        badge={newBadge}
        show={!!newBadge}
        onDismiss={dismissBadge}
      />
    </>
  );
};

/**
 * App - Root component with providers
 */
function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
