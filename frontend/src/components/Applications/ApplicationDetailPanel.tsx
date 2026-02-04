import type { JSX } from 'react';
import type { JobApplication } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '@/components/ui/button';

/**
 * Validates URL protocol to prevent XSS via javascript: URLs.
 */
const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

interface ApplicationDetailPanelProps {
  application: JobApplication | null;
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Detail panel showing full application info.
 * Displays on right side (60%) of Discord-style layout.
 * Shows all fields with edit/delete actions.
 */
export const ApplicationDetailPanel = ({
  application,
  loading = false,
  onEdit,
  onDelete,
}: ApplicationDetailPanelProps): JSX.Element => {
  // Show loading state when fetching details
  if (loading && !application) {
    return (
      <div className="h-full flex items-center justify-center text-brand-body/50">
        <div className="text-center">
          <svg
            className="w-8 h-8 mx-auto mb-4 text-brand animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-sm">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="h-full flex items-center justify-center text-brand-body/50">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-brand/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-sm">Select an application to view details</p>
        </div>
      </div>
    );
  }

  const formattedDate = application.dateApplied
    ? new Date(application.dateApplied).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">
              {application.company}
            </h2>
            <p className="text-lg text-brand-body mt-1">{application.role}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6">
        {/* Date Applied */}
        {formattedDate && (
          <div>
            <h3 className="text-sm font-medium text-brand-body/70 uppercase tracking-wide">
              Date Applied
            </h3>
            <p className="mt-1 text-brand-dark">{formattedDate}</p>
          </div>
        )}

        {/* Job Link */}
        {application.link && isValidUrl(application.link) && (
          <div>
            <h3 className="text-sm font-medium text-brand-body/70 uppercase tracking-wide">
              Job Link
            </h3>
            <a
              href={application.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-brand hover:text-brand-dark hover:underline"
            >
              <span>View Posting</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Notes */}
        {application.notes && (
          <div>
            <h3 className="text-sm font-medium text-brand-body/70 uppercase tracking-wide">
              Notes
            </h3>
            <p className="mt-1 text-brand-dark whitespace-pre-wrap">
              {application.notes}
            </p>
          </div>
        )}

        {/* Description */}
        {application.description && (
          <div>
            <h3 className="text-sm font-medium text-brand-body/70 uppercase tracking-wide">
              Job Description
            </h3>
            <p className="mt-1 text-brand-dark whitespace-pre-wrap">
              {application.description}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 flex gap-3">
        <Button
          variant="outline"
          onClick={() => onEdit(application.id)}
          className="flex-1 cursor-pointer border-brand text-brand hover:bg-brand hover:text-white"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(application.id)}
          className="flex-1 cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
