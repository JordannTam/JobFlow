/**
 * Application-wide constants.
 * All configuration values should be defined here.
 */

// API Configuration
export const API_URL = 'https://j6tss5gko7.execute-api.ap-southeast-2.amazonaws.com/dev';

// Application statuses (must match backend)
export const STATUSES = ['applied', 'interview', 'offer', 'rejected'] as const;

export type StatusType = typeof STATUSES[number];

// Status badge colors (Tailwind classes)
export const STATUS_COLORS: Record<StatusType, string> = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

// Form field definitions for ApplicationForm component
export const APPLICATION_FIELDS = [
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUSES },
  { name: 'link', label: 'Job Link', type: 'url', required: false },
  { name: 'dateApplied', label: 'Date Applied', type: 'date', required: false },
  { name: 'notes', label: 'Notes', type: 'textarea', required: false },
  { name: 'description', label: 'Job Description', type: 'textarea', required: false },
] as const;