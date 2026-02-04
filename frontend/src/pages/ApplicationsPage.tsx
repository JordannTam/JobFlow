import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { ApplicationList } from '../components/Applications/ApplicationList';
import { Button } from '@/components/ui/button';

export const ApplicationsPage = (): JSX.Element => {
  const { applications, loading, error, deleteApplication } = useApplications();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/applications/${id}/edit`);
  }

  const handleDelete = async (id: string) => {
    await deleteApplication(id);
  }
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <Button onClick={() => navigate('/applications/new')}>
          Add Application
        </Button>
      </div>
      <ApplicationList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};