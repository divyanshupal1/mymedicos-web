"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export function NewsFilter({ filters, setFilters }) {
  return (
    <div className="flex items-center gap-3">
      <Select onValueChange={(category) => setFilters((prev) => ({ ...prev, category }))}>
        <SelectTrigger className="w-[180px]">
          <Filter className="mr-2 text-gray-500" size={18} />
          <SelectValue placeholder="Filter Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="medicine">Medicine</SelectItem>
          <SelectItem value="research">Research</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
