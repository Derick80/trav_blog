import React from 'react'
import { updateImageCategory } from '@/app/actions'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { H3 } from './ui/typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export type CategoryContainerProps = {
  role: string
  imageId: string
  allCategories: { id: string; title: string }[]
  pickedCategory?: { id: string; title: string }[]
}
export const CategoryContainer = ({
  role,
  imageId,
  allCategories,
  pickedCategory
}: CategoryContainerProps) => {
  // is admin

  // combine the allcategories and pickedcategories and created a new attribute called selected
  const [dropdown, setDropdown] = React.useState(false)

  const [categories, setCategories] = React.useState(
    allCategories.map((category) => ({
      ...category,
      selected: Boolean(
        pickedCategory?.find((picked) => picked.id === category.id)
      )
    }))
  )

  // this is required to update the selected categories when using the image carousel

  React.useEffect(
    () =>
      setCategories(
        allCategories.map((category) => ({
          ...category,
          selected: Boolean(
            pickedCategory?.find((picked) => picked.id === category.id)
          )
        }))
      ),
    [allCategories, imageId, pickedCategory]
  )

  const handleSelect = (id: string, title: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === id) {
          return {
            ...category,
            selected: !category.selected
          }
        }
        return category
      })
    )
    updateImageCategory({
      imageId,
      categoryId: id,
      title
    })
    setDropdown(false)
  }

  React.useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdown(false)
      }
    }
    document.addEventListener('keydown', handleKeyboardEvent)
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent)
    }
  }, [])
  return (
    <div className='relative flex flex-col justify-between gap-1 p-1'>
      <H3 className='text-left'>Categories</H3>
      <div className='flex w-full items-center justify-between'>
        <div className='w-ful mr-4 flex flex-wrap items-center gap-1'>
          {categories.find((category) => category.selected) ? (
            categories
              .filter((category) => category.selected)
              .map((category) => (
                <Button
                  key={category.id}
                  variant='rounded'
                  size='xs'
                  disabled={role !== 'admin'}
                  className='text-xs'
                  onClick={() => handleSelect(category.id, category.title)}
                >
                  {category.title}
                  {role === 'admin' && (
                    <XIcon size={14} className='ml-2 text-red-500' />
                  )}
                </Button>
              ))
          ) : (
            <Button className='' onClick={() => setDropdown(!dropdown)}>
              select Category
            </Button>
          )}
        </div>
        {role === 'admin' && (
          <Tooltip>
            <TooltipTrigger>
              <Button
                className='   '
                variant='outline'
                size='icon'
                onClick={() => setDropdown(!dropdown)}
              >
                {dropdown ? (
                  <ChevronUpIcon size={24} />
                ) : (
                  <ChevronDownIcon size={24} />
                )}{' '}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Click to select categories</span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <ul className='relative top-0 z-40 flex w-full flex-col gap-2 '>
        {dropdown ? (
          <li className='absolute mt-1 w-full flex-col space-y-2 rounded-lg bg-primary'>
            {categories.map((category) => (
              <Badge
                key={category.id}
                onClick={() => handleSelect(category.id, category.title)}
              >
                {category.title}{' '}
                {category.selected && (
                  <XIcon size={14} className='ml-2 text-red-500' />
                )}
              </Badge>
            ))}
          </li>
        ) : (
          <li className='absolute z-20 flex w-full flex-col'></li>
        )}
      </ul>
    </div>
  )
}
