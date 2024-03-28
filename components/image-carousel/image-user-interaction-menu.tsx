import { FlagIcon, ShareIcon, ThumbsUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'
import { hasLikedImage } from '@/app/actions'
import React from 'react'
import { ShareImageButton } from './share-button'

type ImageIteractionMenuProps = {
  currentImageId: string
  likeCount: number

  onLike: () => void
  onShare: () => void
  onFlag: () => void
}

const ImageUserInteractionMenu = ({
  currentImageId,
  likeCount,
  onLike,
  onShare,
  onFlag
}: ImageIteractionMenuProps) => {
  const [counts, setCounts] = React.useState(likeCount)

  React.useEffect(() => {
    setCounts(likeCount)
  }, [likeCount, currentImageId])

  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) return null
  if (!isSignedIn)
    return (
      <div className='flex w-full items-center justify-between p-2'>
        Log in to like, share, or flag this image
      </div>
    )
  if (user) {
    return (
      <div className='relative flex w-full items-center justify-between p-2'>
        <div className='relative flex items-center justify-center'>
          <Button
            key={currentImageId}
            type='button'
            variant='rounded'
            size='icon'
            className='items-center justify-center rounded-full bg-primary/90 p-1 text-primary-foreground hover:bg-primary '
            onClick={onLike}
          >
            <ThumbsUp className='relative h-6 w-6' />
          </Button>
          {/* Position the count outside the button but visually associated */}
          <span className='absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full bg-white px-2 py-1 text-xs text-primary'>
            {counts}
          </span>
        </div>

        <div className='bottlom-0 absolute right-0 m-2 flex items-center'>
          <ShareImageButton id={currentImageId} />
        </div>
      </div>
    )
  }
  return null
}

export default ImageUserInteractionMenu
