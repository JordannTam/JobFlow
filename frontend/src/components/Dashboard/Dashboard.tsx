import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../hooks/useApplications';
import { Button } from '@/components/ui/button';

/**
 * Dashboard page component.
 * Displays stats overview with counts by status.
 */
export const Dashboard = (): JSX.Element => {
  const { applications, loading } = useApplications();

  if (loading) {
    return <div className="p-8 text-center text-brand-body">Loading...</div>;
  }

  const statusCounts = {
    applied: applications.filter((app) => app.status === 'applied').length,
    interview: applications.filter((app) => app.status === 'interview').length,
    offer: applications.filter((app) => app.status === 'offer').length,
    rejected: applications.filter((app) => app.status === 'rejected').length,
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-brand-dark">Dashboard</h1>
        <Link to="/applications">
          <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white cursor-pointer">
            View All Applications
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 border rounded-lg bg-white">
          <p className="text-sm text-brand-body/70">Applied</p>
          <p className="text-3xl font-bold text-blue-600">{statusCounts.applied}</p>
        </div>
        <div className="p-6 border rounded-lg bg-white">
          <p className="text-sm text-brand-body/70">Interview</p>
          <p className="text-3xl font-bold text-yellow-600">{statusCounts.interview}</p>
        </div>
        <div className="p-6 border rounded-lg bg-white">
          <p className="text-sm text-brand-body/70">Offer</p>
          <p className="text-3xl font-bold text-green-600">{statusCounts.offer}</p>
        </div>
        <div className="p-6 border rounded-lg bg-white">
          <p className="text-sm text-brand-body/70">Rejected</p>
          <p className="text-3xl font-bold text-red-600">{statusCounts.rejected}</p>
        </div>
      </div>

      <p className="mt-8 text-brand-body text-center">
        Total: {applications.length} applications
      </p>
    </div>
  );
};
