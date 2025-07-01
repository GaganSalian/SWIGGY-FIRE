import React, { useContext } from 'react';
import UserContext from '../utils/UserContext';

const About = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-orange-50 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-orange-600 dark:text-orange-400">
        About Swiggy Fire 🚀
      </h1>

      <p className="text-center text-gray-700 dark:text-gray-300 mb-10 text-lg">
        Welcome to <span className="font-bold text-orange-500">Swiggy Fire</span> — a demo food-ordering
        platform built to learn modern web development using React, Redux, Tailwind CSS, and Cloudflare Workers.
      </p>

      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-inner">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          About This Project
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
          This application is crafted for educational purposes. It simulates a food delivery platform similar
          to Swiggy, featuring:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
          <li>Dynamic restaurant listings fetched via Cloudflare Worker proxy</li>
          <li>Detailed restaurant menus</li>
          <li>Shopping cart functionality with Redux</li>
          <li>Responsive design with Tailwind CSS</li>
          <li>Dark mode support</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
          Logged in as: <span className="font-bold text-orange-600 dark:text-orange-400">{loggedInUser}</span>
        </p>
      </div>
    </div>
  );
};

export default About;
