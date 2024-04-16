'use client'
import { Button } from './ui/button'
import { Small } from './ui/typography'


export const UpdateButton = ({
    title,
    count,
    setCategory
}
    : {
        title: string
        count: number
        setCategory: (title: string) => void}
) => {


    return (
        <Button
            type='button'
            variant='rounded'
            className='bg-primary/70 p-1 hover:bg-primary/30'
            onClick={() => setCategory(title)}
        >
            <Small>
                <span className='mr-1'>{title}</span>
                <span className='mr-1'>{count}</span>
            </Small>
            <span className='absolute bottom-0 translate-x-5 translate-y-1 right-0 rounded-full bg-white px-2 py-1 text-xs text-primary'>
                {count}
            </span>
        </Button>
    )

}