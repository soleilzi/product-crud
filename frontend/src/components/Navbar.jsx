import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';

const Navbar = () => {
  return (
    <div className='bg-sky-800 p-4 border-blue-600 border-8'>
      <div className='flex justify-between p-8 text-blue-400'>
        <Link to={'/'}>
          <h1 className='text-3xl font-bold'>Product Store </h1>
        </Link>
        <Link to={"/create"}>
          <CiSquarePlus className='text-5xl'/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar