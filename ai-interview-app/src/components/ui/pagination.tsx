import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
}

export function Pagination({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // If there's only one page, don't render pagination
  if (totalPages <= 1) return null

  // Helper function to create a range of numbers safely
  const range = (start: number, end: number): number[] => {
    // Ensure we don't create negative length arrays
    if (end < start) return []
    const length = end - start + 1
    if (length <= 0) return []
    return [...Array(length).keys()].map(i => start + i)
  }

  const pages = range(1, totalPages)

  const renderPage = (pageNumber: number) => {
    const isActive = pageNumber === currentPage
    return (
      <button
        key={pageNumber}
        onClick={() => onPageChange(pageNumber)}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          "flex w-9 h-9 items-center justify-center rounded-md border border-transparent bg-background/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
          isActive && "data-[state=active]"
        )}
      >
        {pageNumber}
      </button>
    )
  }

  const renderEllipsis = () => (
    <span
      className="flex w-9 h-9 items-center justify-center rounded-md text-muted-foreground"
    >
      …
    </span>
  )

  return (
    <nav
      className="flex items-center justify-center space-x-1"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "flex w-9 h-9 items-center justify-center rounded-md border border-transparent bg-background/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* First Page Button */}
      {pages[0] > 1 + boundaryCount + siblingCount && (
        <>
          {renderPage(1)}
          {pages[0] > 1 + boundaryCount + siblingCount + 1 && renderEllipsis()}
        </>
      )}

      {/* Sibling Pages Before Current Page */}
      {range(
        Math.max(2, currentPage - siblingCount),
        Math.min(totalPages - 1, currentPage - 1)
      ).map(renderPage)}

      {/* Current Page */}
      {renderPage(currentPage)}

      {/* Sibling Pages After Current Page */}
      {range(
        Math.max(2, currentPage + 1),
        Math.min(totalPages - 1, currentPage + siblingCount)
      ).map(renderPage)}

      {/* Last Page Button */}
      {pages[pages.length - 1] < totalPages - boundaryCount - siblingCount && (
        <>
          {pages[pages.length - 1] < totalPages - boundaryCount - siblingCount - 1 && renderEllipsis()}
          {renderPage(totalPages)}
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "flex w-9 h-9 items-center justify-center rounded-md border border-transparent bg-background/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}