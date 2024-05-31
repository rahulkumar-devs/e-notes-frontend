import React from 'react';

interface SpinnerLoaderProps {
  isLoading: boolean;
  size?: string;
  color?: string;
  borderWidth?: string;
  
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ isLoading, size = 'h-8 w-8', color = 'border-gray-900', borderWidth = 'border-2' }) => {
  return (
    <>
      {isLoading && (
        <div
          className={`inline-block animate-spin rounded-full ${size} ${borderWidth} ${color} align-[-0.125em]`}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default SpinnerLoader;
