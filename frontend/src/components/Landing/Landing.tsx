import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Landing page component.
 * Public marketing page with hero, features, and CTA.
 * TODO: Add Motion animations
 */
export const Landing = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Job Tracker</h1>
      <p className="text-gray-600 mb-8">Track your job applications in one place</p>
      <div className="flex gap-4">
        <Link to="/applications">
          <Button>View Applications</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
