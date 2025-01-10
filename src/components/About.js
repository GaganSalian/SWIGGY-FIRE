import React from 'react';
import UserContext from '../utils/UserContext';

const About = () => {
  return (
    <div className="m-10 dark:bg-gray-800 dark:text-white rounded-lg">
      <UserContext.Consumer>
        {({ loggedInUser }) => (
          <h1 className="text-xl font-bold">{loggedInUser}</h1>
        )}
      </UserContext.Consumer>
      <h1 className="text-2xl font-semibold">Welcome to introduce ourselves</h1>
      <p className="text-lg">We are used for learning purposes; we are test subjects.</p>
    </div>
  );
};

export default About;
