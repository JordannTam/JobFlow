import { useState, type JSX } from 'react';
import type { JobApplication, CreateApplicationInput, ApplicationStatus } from '../../types';
import { STATUSES } from '../../constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ApplicationFormProps {
  application?: JobApplication;
  onSubmit: (data: CreateApplicationInput) => void;
  onCancel?: () => void;
}

/**
 * Form component for creating/editing job applications.
 * If application prop is provided, form is in edit mode.
 */
export const ApplicationForm = ({ application, onSubmit, onCancel }: ApplicationFormProps): JSX.Element => {
  const [formData, setFormData] = useState<CreateApplicationInput>({
    company: application?.company ?? '',
    role: application?.role ?? '',
    status: application?.status ?? 'applied',
    link: application?.link ?? '',
    dateApplied: application?.dateApplied ?? '',
    notes: application?.notes ?? '',
    description: application?.description ?? '',
  });

  const handleChange = (field: keyof CreateApplicationInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company & Role - side by side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Google"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="Software Engineer"
            required
          />
        </div>
      </div>

      {/* Status & Date Applied - side by side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange('status', value as ApplicationStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateApplied">Date Applied</Label>
          <Input
            id="dateApplied"
            type="date"
            value={formData.dateApplied}
            onChange={(e) => handleChange('dateApplied', e.target.value)}
          />
        </div>
      </div>

      {/* Job Link */}
      <div className="space-y-2">
        <Label htmlFor="link">Job Link</Label>
        <Input
          id="link"
          type="url"
          value={formData.link}
          onChange={(e) => handleChange('link', e.target.value)}
          placeholder="https://careers.google.com/jobs/..."
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Any notes about the application..."
          className="min-h-[80px]"
        />
      </div>

      {/* Description (for AI resume generation later) */}
      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Paste the job description here (useful for AI resume generation later)"
          className="min-h-[120px]"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {application ? 'Update' : 'Create'} Application
        </Button>
      </div>
    </form>
  );
};
