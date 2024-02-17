import ImageCarousel from '@/components/image-carousel/image-carousel';
import { getAllImages } from './actions';

async function Home () {

  const images = await getAllImages({
    page: 1,
    limit: 10,

  });



  return (
        <div
        className="flex relative justify-center min-w-full">
      <ImageCarousel images={ images }

      />
          </div>

  );
}

export default Home;