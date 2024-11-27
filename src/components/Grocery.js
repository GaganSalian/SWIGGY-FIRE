import React from 'react';

const Grocery = () => {
  return (
    <div className="m-10 p-6 bg-gray-50 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
        A Wide Variety of Groceries
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
        Discover fresh and organic products delivered to your doorstep.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Fruits</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Vegetables</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Dairy</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Grains</h3>
        </div>
      </div>
    </div>
  );
};

export default Grocery;
