import { FlagIcon, ShareIcon, ThumbsUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'
import { hasLikedImage } from '@/app/actions'
import React from 'react'



type ImageIteractionMenuProps = {
    currentImageId: string
    likeCount: number

    onLike: () => void
    onShare: () => void
    onFlag: () => void
}

const ImageUserInteractionMenu =  ({
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


    const { isSignedIn, user, isLoaded } = useUser();


    if (!isLoaded) return null
    if (!isSignedIn) return <div className='flex items-center justify-between w-full p-2'>
        Log in to like, share, or flag this image
    </div>
    if (user ) {



    return (
        <div className='flex relative items-center justify-between w-full p-2'>
            <div className="relative flex items-center justify-center">

            <Button

                key={currentImageId}
                type='button'
                variant='rounded'
                size='icon'
                    className="items-center justify-center bg-primary/90 hover:bg-primary text-white p-1 rounded-full "

                onClick={ onLike }>

                <ThumbsUp className="relative w-6 h-6" />

                </Button>
                {/* Position the count outside the button but visually associated */ }
                <span className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-white text-primary rounded-full px-2 py-1 text-xs">
                    { counts }
                </span>
                </div>

            <div className="absolute bottlom-0 right-0 m-2 flex items-center">
                <Button
                    type='button'
                    variant='rounded'
                    size='icon'
                    onClick={ onShare }>
                    <ShareIcon />
                </Button>
                <Button
                    type='button'
                    variant='rounded'
                    size='icon'
                    onClick={ onFlag }>
                    <FlagIcon />
                </Button>
            </div>


        </div>
    )
    }
    return null
}



export default ImageUserInteractionMenu