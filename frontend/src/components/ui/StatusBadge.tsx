import type { JSX } from 'react';
import type { ApplicationStatus } from '../../types';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusStyles: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  interview: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  offer: 'bg-green-100 text-green-800 hover:bg-green-100',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
};

/**
 * Colored badge showing application status.
 * Uses shadcn Badge with custom status colors.
 */
export const StatusBadge = ({ status }: StatusBadgeProps): JSX.Element => {
  return (
    <Badge variant="secondary" className={statusStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
