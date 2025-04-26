'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'default';

interface ProductSorterProps {
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
];


export default function ProductSorter({ onSortChange, currentSort }: ProductSorterProps) {
  return (
    <div className="flex items-center gap-2 mb-4 md:mb-0">
       <Label htmlFor="sort-select" className="text-sm font-medium whitespace-nowrap">Sort by:</Label>
       <Select value={currentSort} onValueChange={(value: SortOption) => onSortChange(value)}>
        <SelectTrigger id="sort-select" className="w-[180px]">
            <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
            {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  );
}
