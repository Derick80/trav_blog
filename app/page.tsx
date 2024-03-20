import { getAllImages, whoAmI } from './actions';
import React from 'react'
import ImageCarousel from '@/components/image-carousel/edit-image-carousel';
import {
  PaginationLink,
} from "@/components/ui/pagination"
import { getServerSession } from 'next-auth';
import { H3, Small } from '@/components/ui/typography';



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
    const visiblePages = 3; // Number of visible pages
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);





  return (

    <div
    className='flex flex-col w-full gap-5 py-2'
    >

      {/* { me && <div className="absolute top-0 right-0 p-4 bg-white z-10">Welcome {me}</div>
      } */}
      <div className="flex flex-col items-center ">
        <H3>Progress Notes</H3>
        <Small>View and edit your progress notes</Small>
        </div>
      <ImageCarousel images={ images } totalImages={ totalImages } searchParams={ searchParams } startPage={ startPage } endPage={ endPage }
        pagesToShow={2}
      />


    </div>

  );
}

export default Home;

