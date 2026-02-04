import { useCallback, useEffect, useState } from 'react';
import type { JobApplication, CreateApplicationInput, UpdateApplicationInput } from '../types';
import { api } from '../services/api';

/**
 * Return type for useApplications hook.
 *
 * Fields:
 *     applications (JobApplication[]) - List of all applications
 *     loading (boolean)               - True while fetching data
 *     error (string | null)           - Error message if request failed
 *     createApplication (function)    - Creates new application
 *     updateApplication (function)    - Updates existing application
 *     deleteApplication (function)    - Deletes application
 *     refetch (function)              - Manually refetch applications
 */
interface UseApplicationsReturn {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
  createApplication: (data: CreateApplicationInput) => Promise<void>;
  updateApplication: (id: string, data: UpdateApplicationInput) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing job application state and API calls.
 *
 * Arguments: None
 *
 * Return Value:
 *     Returns UseApplicationsReturn object with state and methods
 *
 * Usage:
 *     const { applications, loading, error, createApplication, updateApplication, deleteApplication, refetch } = useApplications();
 */
export const useApplications = (): UseApplicationsReturn => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications])


  const createApplication = useCallback(async (data: CreateApplicationInput) => {
    await api.createApplication(data);
    await fetchApplications();
  }, [fetchApplications]);

  const updateApplication = useCallback(async (id: string, data: UpdateApplicationInput) => {
    await api.updateApplication(id, data);
    await fetchApplications();
  }, [fetchApplications]);

  const deleteApplication = useCallback(async (id: string) => {
    await api.deleteApplication(id);
    await fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    createApplication,
    updateApplication,
    deleteApplication,
    refetch: fetchApplications,
  };
};


