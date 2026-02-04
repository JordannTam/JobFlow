import type { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink = ({ to, children, isActive }: NavLinkProps): JSX.Element => (
  <Link to={to}>
    <span
      className={cn(
        'text-sm font-medium transition-colors hover:text-brand',
        isActive ? 'text-brand' : 'text-brand-body'
      )}
    >
      {children}
    </span>
  </Link>
);

/**
 * Shared navbar component displayed on all pages.
 * Shows logo, navigation links, and sign in button.
 * Highlights the currently active route.
 */
export const Navbar = (): JSX.Element => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string): boolean => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    if (path === '/applications') {
      return currentPath.startsWith('/applications');
    }
    return currentPath === path;
  };

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-xs sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-brand-dark hover:text-brand transition-colors">
            JobPilot
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
              Dashboard
            </NavLink>
            <NavLink to="/applications" isActive={isActive('/applications')}>
              Applications
            </NavLink>
            <Link to="/applications">
              <Button variant="ghost" size="sm" className="text-brand-body hover:text-brand hover:bg-brand-light cursor-pointer">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};
