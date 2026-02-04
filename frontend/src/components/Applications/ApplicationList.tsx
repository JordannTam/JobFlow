import type { JSX } from 'react';
import type { JobApplication } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ApplicationListProps {
  applications: JobApplication[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Table component that displays all job applications.
 * Uses shadcn Table for clean, Linear-style layout.
 */
export const ApplicationList = ({ applications, onEdit, onDelete }: ApplicationListProps): JSX.Element => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No applications yet</p>
        <p className="text-sm mt-1">Add your first job application to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.company}</TableCell>
              <TableCell>{application.role}</TableCell>
              <TableCell>
                <StatusBadge status={application.status} />
              </TableCell>
              <TableCell>
                {application.dateApplied
                  ? new Date(application.dateApplied).toLocaleDateString()
                  : '—'}
              </TableCell>
              <TableCell>
                {application.link ? (
                  <a
                    href={application.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View Job
                  </a>
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(application.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(application.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
