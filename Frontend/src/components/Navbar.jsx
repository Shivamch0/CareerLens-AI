import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"
import Button from './Button'

function Navbar() {
  return (
    <header>
      <nav className='flex items-center justify-between py-4 px-10'>

        <div>
          <img className='w-20 h-20 rounded-full' src={logo} alt="" />
        </div>

        <div className='flex gap-30'>
          <Link to={'/learning'}>Learning</Link>
          <Link to={'/courses'}>Courses</Link>
          <Link to={'/skills'}>Skills</Link>
          <Link to={'/interview'}>Interview</Link>
          <Link to={'/resume'}>Resume</Link>
          <Button title="Get Started"/>
        </div>

        <div >
          <button>Toggle</button>
        </div>

      </nav>
    </header>
  )
}

export default Navbar