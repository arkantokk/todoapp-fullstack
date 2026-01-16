import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from "../store/slices/authSlice";

export default function SimpleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = localStorage.getItem('theme');

  const dispatch = useDispatch();
  const handleOption = (name) => {
    dispatch(setTheme(name));
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{currentTheme}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={(e) => handleOption(e.target.name)}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              name='dots'
            >
              Dots
            </button>

            <button
              onClick={(e) => handleOption(e.target.name)}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              name='lined'
            >
              Lined
            </button>

            <button
              onClick={(e) => handleOption(e.target.name)}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              name='grid'
            >
              Grid
            </button>

            <button
              onClick={(e) => handleOption(e.target.name)}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              name='default'
            >
              Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}