"use client";

import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewsPagination({ totalPages, currentPage }) {
  const router = useRouter();
  currentPage = parseInt(currentPage);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      router.push(`/news?page=${page}`);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push("...");

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages) pages.push(totalPages);

    return [...new Set(pages)];
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <ChevronFirst className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-1">
        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <ChevronFirst className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  );
}
