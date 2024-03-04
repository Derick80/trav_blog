import { getAllImages } from './actions';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from
  '@/components/ui/card'
  import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import ImageCarousel from '@/components/image-carousel/edit-image-carousel';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



async function Home ({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10;


  const {images,totalImages} = await getAllImages({
    page: page,
    limit: limit

  });
  if (images.length === 0) {
    return <div>No images found</div>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(totalImages / limit);

  // Generate pagination links
  const paginationLinks = [];
    const visiblePages = 3; // Number of visible pages
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);
  console.log(endPage,'endPage');

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        href={`/?page=${i}&limit=${limit}`}
        isActive={i === page}
      >
        {i}
      </PaginationLink>
    );
  }




  return (

    <>
      <ImageCarousel
        images={ images }
        totalImages={ totalImages }
        searchParams={ searchParams }
        startPage={ startPage }
        endPage={ endPage }
      />
       <div>

      </div>
    </>

  );
}

export default Home;

