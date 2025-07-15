'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { statusColorMap } from '../table/blog.table';
import { VisibilityCategoryOption, VisibilitySelectProps } from '@/types';

export const SelectStatus = ({ value, onChange }: VisibilitySelectProps) => {
  const labelMap = {
    show: 'Show',
    hide: 'Hide',
    draft: 'Draft',
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as VisibilityCategoryOption)}
    >
      <SelectTrigger
        className={`w-[100px] ${statusColorMap[value as VisibilityCategoryOption]}`}
      >
        <SelectValue placeholder="Select visibility">
          {labelMap[value as VisibilityCategoryOption]}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="show">Show</SelectItem>
        <SelectItem value="hide">Hide</SelectItem>
      </SelectContent>
    </Select>
  );
};
