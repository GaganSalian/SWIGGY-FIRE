import React from 'react'
import UserContext from '../utils/UserContext'

const About = () => {
  return (
    <div className='m-10'>
    <UserContext.Consumer>
      {({loggedInUser})=>(
        <h1 className='text-xl font-bold'>{loggedInUser}</h1>
      )}
    </UserContext.Consumer>
      <h1>welco to introduce ourself</h1>
      <p>we are used for learning purposes we are test subject</p>
    </div>
  )
}

export default About
