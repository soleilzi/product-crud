import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  console.log("products", products);

  return (
    <div className='p-4'>
      <div className='max-w-screen-xl mx-auto'>
        <div className=''>
          <h1 className='mb-8 text-3xl font-bold text-center text-blue-400'>Current Products</h1>
        </div>

        {products.length === 0 && (
        <div className="text-xl text-center font-bold my-6">
        <h2>No Products Found</h2>
        <Link to={"/create"}>
          <h3 className='text-slate-400 hover:text-slate-300'>Create a Product?</h3>
        </Link>
      </div>
        )}

        <div className="grid grid-cols-3 gap-10 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage