"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBar({ onSearch, loading }) {
    const [query, setQuery] = useState("");
  
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <Button
          onClick={() => onSearch(query)}
          className={`bg-[#03BFA6] hover:bg-[#03BFA6] text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
    );
  }
  
