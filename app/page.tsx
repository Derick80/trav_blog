import { getAllImages } from './actions';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from
  '@/components/ui/card'
  import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import ImageCarousel from '@/components/image-carousel/image-carousel';

async function Home ({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}) {

  const pages = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10;


  const images = await getAllImages({
    page: pages,
    limit: limit

  });
  if (images.length === 0) {
    return <div>No images found</div>;
  }



  return (

    <>
      <ImageCarousel
        imageArray={images}

      />
    </>

  );
}

export default Home;