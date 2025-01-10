// import React from 'react'

// const Shimmer = () => {
//   return (
//     <div className='shimmer-cardboss'>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//             <div className="shimmer-card">
//             <div className="shimmer-image"></div>
//             <div className="shimmer-title"></div>
//             <div className="shimmer-subtitle"></div>
//             </div>
//   </div>
//   )
// }

// export default Shimmer;


import React from 'react';

const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="w-[200px] h-[250px] bg-gray-200 rounded-lg p-4 shadow-md animate-pulse"
        >
          <div className="w-full h-3/5 bg-gray-300 rounded-lg mb-4"></div>
          <div className="w-4/5 h-4 bg-gray-300 rounded-lg mb-2"></div>
          <div className="w-3/5 h-4 bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
