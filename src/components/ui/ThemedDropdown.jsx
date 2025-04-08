import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';

/**
 * ThemedDropdown - A reusable dropdown component with dark mode styling
 * 
 * @param {Object} props
 * @param {string} props.label - Label for the dropdown
 * @param {Array} props.options - Array of options {id, label}
 * @param {string|number} props.value - Currently selected value
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} props.variant - Visual variant (default, filter, sort)
 * @param {string} props.placeholder - Placeholder text when nothing is selected
 * @param {boolean} props.disabled - Whether the dropdown is disabled
 * @param {string} props.className - Additional classes to apply
 */
const ThemedDropdown = ({
  label,
  options = [],
  value,
  onChange,
  variant = 'default',
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => 
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange(options[focusedIndex].id);
            setIsOpen(false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, options, onChange]);

  // Get selected option label
  const selectedOption = options.find(option => option.id === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'filter':
        return {
          button: 'bg-white/5 hover:bg-white/10 text-gray-300',
          option: 'hover:bg-white/10',
          selected: 'bg-fuchsia-500/20 text-fuchsia-400',
          active: 'bg-fuchsia-500/30 text-fuchsia-300'
        };
      case 'sort':
        return {
          button: 'bg-white/5 hover:bg-white/10 text-gray-300',
          option: 'hover:bg-white/10',
          selected: 'bg-blue-500/20 text-blue-400',
          active: 'bg-blue-500/30 text-blue-300'
        };
      default:
        return {
          button: 'bg-white/5 hover:bg-white/10 text-gray-300',
          option: 'hover:bg-white/10',
          selected: 'bg-gradient-to-r from-fuchsia-900/50 to-blue-900/50 text-white',
          active: 'bg-gradient-to-r from-fuchsia-900/70 to-blue-900/70 text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => setFocusedIndex(-1)}
        className={`
          w-full flex items-center justify-between px-4 py-2.5 rounded-lg
          border border-white/10 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${styles.button}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-[#1A1F2E] rounded-lg shadow-lg border border-white/10 overflow-hidden"
          >
            <ul
              role="listbox"
              className="py-1 max-h-60 overflow-auto"
              tabIndex={-1}
            >
              {options.map((option, index) => (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={option.id === value}
                  className={`
                    px-4 py-2.5 cursor-pointer flex items-center justify-between
                    transition-colors duration-150
                    ${option.id === value ? styles.selected : styles.option}
                    ${index === focusedIndex ? styles.active : ''}
                  `}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span className="truncate">{option.label}</span>
                  {option.id === value && (
                    <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                  )}
                </li>
              ))}
              
              {options.length === 0 && (
                <li className="px-4 py-3 text-center text-gray-500 text-sm">
                  No options available
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemedDropdown; 