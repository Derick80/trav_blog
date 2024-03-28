import React from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { PencilIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import clsx from 'clsx'

type EditableTextFieldProps = {
  initialValue?: string
  onUpdate?: (value: string) => void
  updateInitialValue?: (value: string) => void
  className?: string
  label?: string
}

const EditableTextField = ({
  initialValue,
  onUpdate,
  updateInitialValue,
  className,
  label
}: EditableTextFieldProps) => {
  const [value, setValue] = React.useState(initialValue)
  const [isEditing, setIsEditing] = React.useState(false)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    updateInitialValue && updateInitialValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      onUpdate && value && onUpdate(value)
      setValue(event.currentTarget.value) // Call the onUpdate function if it exists
    }
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing ? (
        <Textarea
          value={value}
          onChange={ handleInputChange }
          onKeyDown={handleKeyPress}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className={ clsx(
            'mt-1 h-12 w-full cursor-text focus:border-blue-500 focus:z-50 transition-opacity duration-1000 ease-in-out',
            'opacity-100 scale-100', // Ensure full opacity and scale when editing
          ) }
        />
      ) : (
          <div
          className='flex w-full justify-between pr-1 pl-1'
          >
          {label && ( // Conditionally render label if provided
            <div className='mr-2 text-sm font-medium text-gray-700'>
              {label}
            </div>
            ) }
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                className='w-full'
                >
                  <div
                    onClick={ handleDoubleClick }
                    className={ clsx(
                      'flex items-center justify-between w-full cursor-text',
                      'transition-opacity duration-300 ease-in-out',
                      {
                        'opacity-100': !isEditing,
                        'opacity-0 scale-95': isEditing, // Apply scale and opacity transition when editing
                      }
                    ) }
                  >
                    <span>{ value ? value : 'Double click to edit' }</span>
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <TooltipContent>
                    <span className='text-sm text-gray-500'>Double click to edit</span>
                 </TooltipContent>
                  </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>

        </div>
      )}
    </>
  )
}

export default EditableTextField
