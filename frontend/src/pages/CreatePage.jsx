import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const {createProduct} = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const {success} = await createProduct(newProduct)
    if(!success){
      enqueueSnackbar('Error', {variant:'error'});
    }else{
      enqueueSnackbar('Product Created Successfully', {variant: 'success'});
      navigate('/');
    }
    
  }

  return (
    <div className='p-4 w-full'>
      <div className='bg-slate-500 p-4 rounded-lg max-w-screen-md mx-auto'>
        <div className="flex justify-center items-center">
          <h2 className='text-2xl p-2'>Create Product</h2>
        </div>

        <div className='p-4'>
          <div className='mb-2'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
          </div>

          <div className='mb-2'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Price</label>
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
          </div>

          <div className='mb-2'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Image URL</label>
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
          </div>

          <div className='mt-4 flex justify-center'>
            <button className='px-8 py-2 bg-blue-400 rounded-lg hover:bg-blue-300' onClick={handleAddProduct}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage