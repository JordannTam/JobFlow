import type { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { ApplicationForm } from '../components/Applications/ApplicationForm';
import type { CreateApplicationInput } from '../types';


export const EditApplicationPage = (): JSX.Element => {
  const { id } = useParams<{id: string}>();
  const { applications, loading, error, updateApplication } = useApplications()
  const navigate = useNavigate()

  const application = applications.find((app) => app.id === id);
  
  const handleSubmit = async (data: CreateApplicationInput) => {
    if (!id) return;
    await updateApplication(id, data);
    navigate('/applications')
  }

  const handleCancel = () => {
    navigate('/applications')
  }
  
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  if (!application) {
    return <div className="p-8 text-center text-red-500">Application not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Application</h1>
      <ApplicationForm
        application={application}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}