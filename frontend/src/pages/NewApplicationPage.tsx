import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { ApplicationForm } from '../components/Applications/ApplicationForm';
import type { CreateApplicationInput } from '../types';

export const NewApplicationPage = (): JSX.Element => {
  const { createApplication } = useApplications();
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateApplicationInput) => {
    await createApplication(data);
    navigate('/applications')
  }

  const handleCancel = () => {
    navigate('/applications')
  }
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Application</h1>
      <ApplicationForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

