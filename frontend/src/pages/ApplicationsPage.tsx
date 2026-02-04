import { useState, useMemo, useEffect } from 'react';
import type { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { ApplicationListCard } from '../components/Applications/ApplicationListCard';
import { ApplicationDetailPanel } from '../components/Applications/ApplicationDetailPanel';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { SearchInput } from '../components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { STATUSES } from '../constants';
import { api } from '../services/api';
import type { JobApplication } from '../types';

export const ApplicationsPage = (): JSX.Element => {
  const { applications, loading, error, deleteApplication } = useApplications();
  const navigate = useNavigate();
  const { id: selectedId } = useParams<{ id?: string }>();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch application details when selectedId changes
  useEffect(() => {
    if (!selectedId) {
      setSelectedApplication(null);
      return;
    }

    // First try to use cached data from the list
    const cachedApp = applications.find((app) => app.id === selectedId);
    if (cachedApp) {
      setSelectedApplication(cachedApp);
    }

    // Then fetch fresh data from the API
    setDetailLoading(true);
    api.getApplication(selectedId)
      .then((app) => setSelectedApplication(app))
      .catch(() => {
        // If API fails, keep using cached data if available
        if (!cachedApp) {
          setSelectedApplication(null);
        }
      })
      .finally(() => setDetailLoading(false));
  }, [selectedId, applications]);

  const handleEdit = (id: string) => {
    navigate(`/applications/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApplication(id);
      // Navigate back to list after deletion
      navigate('/applications');
    } catch (err) {
      // Error is already captured in useApplications hook state
    }
  };

  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => statusFilter === 'all' || app.status === statusFilter)
      .filter((app) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          app.company.toLowerCase().includes(query) ||
          app.role.toLowerCase().includes(query)
        );
      });
  }, [applications, statusFilter, searchQuery]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-[calc(100vh-73px)] flex overflow-hidden">
      {/* Left panel - Card list (30%) */}
      <div className="w-3/10 border-r border-gray-200 bg-white flex flex-col">
        {/* Controls */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="flex items-center gap-2">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              className="flex-1"
            />
            <Button
              onClick={() => navigate('/applications/new')}
              className="bg-brand hover:bg-brand-dark text-white cursor-pointer"
            >
              + Add
            </Button>
          </div>
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUSES}
          />
        </div>

        {/* Card list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-brand-body">
              <p className="text-lg">No applications yet</p>
              <p className="text-sm mt-1">
                Add your first job application to get started
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {filteredApplications.map((application) => (
                <ApplicationListCard
                  key={application.id}
                  application={application}
                  isSelected={selectedId === application.id}
                  onClick={() => navigate(`/applications/${application.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Detail view (70%) */}
      <div className="w-7/10 bg-gray-50/50 p-6">
        <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <ApplicationDetailPanel
            application={selectedApplication}
            loading={detailLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
