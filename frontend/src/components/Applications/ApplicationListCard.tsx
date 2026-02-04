import type { JSX } from 'react';
import type { JobApplication } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { cn } from '@/lib/utils';

interface ApplicationListCardProps {
  application: JobApplication;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Compact card for application list view.
 * Shows company, role, status badge, and date.
 * Supports selected state with accent border.
 */
export const ApplicationListCard = ({
  application,
  isSelected,
  onClick,
}: ApplicationListCardProps): JSX.Element => {
  const formattedDate = application.dateApplied
    ? new Date(application.dateApplied).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-lg border transition-all duration-150 cursor-pointer',
        'hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand/20',
        isSelected
          ? 'border-l-4 border-l-brand border-t-gray-200 border-r-gray-200 border-b-gray-200 bg-brand-light'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-brand-dark truncate">
            {application.company}
          </h3>
          <p className="text-sm text-brand-body truncate mt-0.5">
            {application.role}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={application.status} />
          {formattedDate && (
            <p className="text-xs text-brand-body/60 mt-1 mr-1">{formattedDate}</p>
          )}
        </div>
      </div>
    </button>
  );
};
