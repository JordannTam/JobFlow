import type { JSX } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  label?: string;
  placeholder?: string;
}

/**
 * Status filter dropdown component.
 * Used to filter applications by status.
 * Wraps shadcn Select with "All" option included.
 *
 * Arguments:
 *     value - Currently selected value ("all" or a status)
 *     onChange - Called when selection changes
 *     options - Available status options (e.g., STATUSES from constants)
 *     label - Optional label displayed above dropdown
 *     placeholder - Optional placeholder text
 */
export const FilterDropdown = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Filter by status',
}: FilterDropdownProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-500">{label}</span>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option} className="capitalize">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
