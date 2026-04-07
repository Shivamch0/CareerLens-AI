import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import logo from "../assets/logo.png"

function Navbar() {
  return (
    <header className='  mt-4 p-2'>
      <nav className='flex items-center justify-between'>

        <div className='flex items-center '>
          <img className='w-12 h-12 rounded-full' src={logo} alt="" /><h3 className='text-2xl font-bold text-blue-600'>CAREER</h3><p className='text-2xl font-bold '>LENS</p>
        </div>

        <div className='flex gap-10 bg-white/10 border-white/20 py-1 px-4 rounded-full text-sm'>
          <Link to={'/learning'} className='py-2 px-3'>Learning</Link>
          <Link to={'/courses'} className=' py-2 px-3'>Courses</Link>
          <Link to={'/skills'} className=' py-2 px-3'>Skills</Link>
          <Link to={'/interview'} className=' py-2 px-3'>Interview</Link>
          <Link to={'/resume'} className=' py-2 px-3'>Resume</Link>
        </div>

        <div className='flex gap-5' >
          <Button title="Get Started" />
          <button>Toggle</button>
        </div>

      </nav>
    </header>
  )
}

export default Navbar