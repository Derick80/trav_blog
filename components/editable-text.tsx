import React from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateInitialValue && updateInitialValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        <Input
          type='text'
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className={cn(
            'h-10 w-full cursor-text focus:border-blue-500',
            className
          )}
        />
      ) : (
        <>
          {label && ( // Conditionally render label if provided
            <div className='mr-2 text-sm font-medium text-gray-700'>
              {label}
            </div>
          )}
          <div
            onClick={handleDoubleClick}
            className={cn(
              'h-10 w-full cursor-text focus:border-blue-500',
              className
            )}
          >
            {value ? value : 'Double click to edit'}
          </div>
        </>
      )}
    </>
  )
}

export default EditableTextField
