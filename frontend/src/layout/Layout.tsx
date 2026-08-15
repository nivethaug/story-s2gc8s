import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Layout component - Immersive storytelling layout
 *
 * Provides a minimal chrome for the bioluminescent rainforest experience.
 * Navigation is designed to be unobtrusive, fading into the background
 * to maintain immersion while remaining accessible.
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Floating navigation - minimal, glassmorphic */}
      <Navbar />

      {/* Main content - full viewport sections */}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
