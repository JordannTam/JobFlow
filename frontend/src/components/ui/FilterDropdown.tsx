import type { JSX } from "react";

/**
 * FilterDropdown component props.
 *
 * Fields:
 *     value (string)                    - Currently selected value
 *     onChange ((value: string) => void) - Change handler
 *     options (readonly string[])       - Available options
 *     label (string)                    - Optional, dropdown label
 */
// interface FilterDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
//   options: readonly string[];
//   label?: string;
// }

/**
 * Status filter dropdown component.
 * Used to filter applications by status.
 *
 * Arguments:
 *     props (FilterDropdownProps) - Component props
 *
 * Return Value:
 *     Returns JSX.Element
 */

// { value, onChange, options, label }: FilterDropdownProps
export const FilterDropdown = (): JSX.Element => {
  throw new Error('Not implemented');
};
