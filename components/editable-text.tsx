import React from 'react';
import { Input } from './ui/input';

type EditableTextFieldProps = {
    initialValue?: string;
    onUpdate?: (value: string) => void;
};

const EditableTextField = ({ initialValue,onUpdate }: EditableTextFieldProps) => {
  const [value, setValue] = React.useState(initialValue);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        setIsEditing(false);
              onUpdate && value && onUpdate(value); // Call the onUpdate function if it exists

    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex">
      {isEditing ? (
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="border-b border-gray-500 focus:border-blue-500 w-full"
        />
      ) : (
        <div
          onClick={handleDoubleClick}
          className="cursor-text border-b border-gray-500 focus:border-blue-500 w-full"
        >
          {value ? value : 'Double click to edit'}
        </div>
      )}
    </div>
  );
};

export default EditableTextField;
