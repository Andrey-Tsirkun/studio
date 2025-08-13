import React from 'react';

const ScrollReveal = () => {
  return (
    <div className="relative">
      <div className="fixed inset-0">
        <div className="absolute inset-0 flex items-center justify-center gap-16 bg-[#f2f2f2]">
          <div className="flex gap-3 items-center">
            <h1 className="text-6xl font-bold text-gray-900 flex items-end">
              Exclamation<span className="text-red-500">!</span> <br />Art
            </h1>
            <span className="w-4 h-65 bg-gray-900" />
            <h1 className="text-6xl font-bold text-gray-900">Studio</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
