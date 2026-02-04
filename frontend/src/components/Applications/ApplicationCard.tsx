import type { JSX } from 'react';
import type { JobApplication } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '@/components/ui/button';

interface ApplicationCardProps {
  application: JobApplication;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Single application row/card component.
 * Displays application details with edit and delete actions.
 */
export const ApplicationCard = ({ application, onEdit, onDelete }: ApplicationCardProps): JSX.Element => {
  const { company, role, status, dateApplied, link } = application;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Left: Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-gray-900 truncate">{company}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-gray-500 truncate">{role}</p>
        {dateApplied && (
          <p className="text-xs text-gray-400 mt-1">
            Applied {new Date(dateApplied).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 ml-4">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Job
          </a>
        )}
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
