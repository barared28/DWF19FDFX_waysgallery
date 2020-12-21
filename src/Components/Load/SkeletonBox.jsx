import React from 'react'

function SkeletonBox() {
    return (
        <div className="animate-pulse w-full h-64">
            <div className="w-full h-full bg-blue-100 rounded"></div>
        </div>
    )
}

const Loader = () => {
    return (
      <div className="space-y-3">
        <div className="flex flex-row space-x-3">
          <div className="w-1/3">
            <SkeletonBox />
          </div>
          <div className="w-1/3">
            <SkeletonBox />
          </div>
          <div className="w-1/3">
            <SkeletonBox />
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/4">
            <SkeletonBox />
          </div>
          <div className="w-1/4">
            <SkeletonBox />
          </div>
          <div className="w-1/4">
            <SkeletonBox />
          </div>
          <div className="w-1/4">
            <SkeletonBox />
          </div>
        </div>
      </div>
    );
  };

export default Loader
