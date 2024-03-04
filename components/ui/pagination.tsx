import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from 'next/link'

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled=false,
  ...props
}: PaginationLinkProps &{disabled?: boolean}) => (
  <PaginationItem>
    <Link
      passHref legacyBehavior
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
        { 'pointer-events-none': disabled },// Conditionally disable pointer events
      )}
      {...props}
    />
  </PaginationItem>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={ cn("gap-1 pl-2.5", className) }
      disabled={disabled} // Pass disabled prop to PaginationLink

    {...props}
  >
    <Button className='z-10 ml-4'
      disabled={disabled}
    >
      <ChevronLeft className="h-8 w-8" />
    </Button>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={ cn("gap-1 pr-2.5", className) }
  disabled={disabled} // Pass disabled prop to PaginationLink
    {...props}
  >
    <Button className='z-10 mr-4'
      disabled={ disabled }
    >
      <ChevronRight className="h-8 w-8" />
    </Button>
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  visiblePages: number;
}

const Paginator = ({ currentPage, totalPages, visiblePages }: PaginatorProps) => {
  const pagesToShow = Math.min(totalPages, visiblePages);
  const halfVisible = Math.floor(visiblePages / 2);

  const startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const paginationLinks = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        href={`/?page=${i}`}
        isActive={i === currentPage}
      >
        {i}
      </PaginationLink>
    );
  }

  return (
    <>
      {startPage > 1 && <PaginationEllipsis />}
      {paginationLinks}
      {endPage < totalPages && <PaginationEllipsis />}
    </>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Paginator,
}
