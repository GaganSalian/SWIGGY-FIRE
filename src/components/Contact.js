import React, { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { name, email, message })
  }

  return (
    <div className="bg-gray-50 py-16 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          We're Here to Help You 24/7
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Whether you have questions, need support, or just want to say hello, we're available anytime!
        </p>

        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg text-gray-800 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-800 mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg text-gray-800 mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Write your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
