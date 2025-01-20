import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Sample tag suggestions - in a real app, this could come from an API
const TAG_SUGGESTIONS = [
  'javascript', 'react', 'typescript', 'node.js', 'python',
  'web-development', 'programming', 'coding', 'software-engineering',
  'frontend', 'backend', 'fullstack', 'database', 'api', 'design'
];

export function TagInput({ tags, onChange, maxTags = 5 }) {
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const tagInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on input
  const filteredSuggestions = TAG_SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().includes(tagInput.toLowerCase()) &&
    !tags.includes(suggestion)
  );

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target )) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addTag = (tag) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange([...tags, trimmedTag]);
      setTagInput('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSuggestions.length > 0 && showSuggestions) {
        addTag(filteredSuggestions[0]);
      } else {
        addTag(tagInput);
      }
    } else if (e.key === 'Backspace' && !tagInput) {
      e.preventDefault();
      const lastTag = tags[tags.length - 1];
      if (lastTag) {
        removeTag(lastTag);
      }
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative">
      <div className="min-h-[42px] ">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => removeTag(tag)}
              className={"cursor-pointer"}
              variant={"secondary"}
            >
              {tag}              
                <X className="w-4 h-4 ml-2" />
            </Badge>
          ))}
         { tags.length < maxTags && <Input
            ref={tagInputRef}
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={tags.length < maxTags ? "Add tags..." : ""}
            disabled={tags.length >= maxTags}
          />}
        </div>
      </div>
      
      {/* Tag Suggestions */}
      {showSuggestions && tagInput && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}