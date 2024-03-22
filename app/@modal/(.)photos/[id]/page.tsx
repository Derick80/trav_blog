/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { getImageById } from '@/app/actions';
import { Modal } from './modal';
import {getImgProps, getImageBuilder} from '@/components/image-carousel/images'
export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
    }) {
const photo = await getImageById(photoId)
if(!photo) return <Modal>Photo not found</Modal>
  return <Modal>
    { photoId }
 <img
              title={photo.title}
              {...getImgProps(
                  getImageBuilder(
                      photo.cloudinaryPublicId,
                        photo.title,
                        {
                            className: 'object-cover w-full h-full'
                        }

                ),
                {
                  widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
                  sizes: [
                    '(max-width:1023px) 80vw',
                    '(min-width:1024px) and (max-width:1620px) 67vw',
                    '1100px'
                  ],
                  transformations: {
                    quality: 'auto',
                    format: 'webp'
                  }
                }
              )}
            />
    </Modal>;
}

// import { DialogDescription,  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Modal } from '../modal';

// export default function PhotoModal({
//   params: { id: photoId },
// }: {
//   params: { id: string };
//     }) {


//   return <Dialog>
//   <DialogTrigger>Open</DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Are you absolutely sure?</DialogTitle>
//       <DialogDescription>
//         This action cannot be undone. This will permanently delete your account
//         and remove your data from our servers.
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>

// }