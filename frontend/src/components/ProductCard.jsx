import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { useSnackbar } from 'notistack';
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

const ProductCard = ({ product }) => {

  const { enqueueSnackbar } = useSnackbar();
  const { deleteProduct, updateProduct } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success } = await deleteProduct(pid)
    if (!success) {
      enqueueSnackbar('Error', { variant: 'error' });
    } else {
      enqueueSnackbar('Product Deleted Successfully', { variant: 'success' });
    }
  }

  const handleUpdateProduct = async (pid) => {
    const { success } = await updateProduct(pid, updatedProduct)
    if (!success) {
      enqueueSnackbar('Error', { variant: 'error' });
    } else {
      enqueueSnackbar('Product Updated Successfully', { variant: 'success' });
      setIsEdit(false);
    }
  }

  return (

    <div className='h-96 w-full bg-slate-400 overflow-hidden rounded-lg shadow-lg transition duration-300 hover:-translate-y-5 hover:shadow-xl'>
      <img src={product.image} alt={product.name}
        className='h-64 w-full object-cover' />
      <div className='p-6 bg-red-400'>
        <h1 className='font-bold'>{product.name}</h1>
        <h2>${product.price}</h2>
        <span className='flex text-xl py-4'>
          <FaEdit onClick={() => setIsEdit(true)}
            className='mr-4 cursor-pointer' />
          <MdDelete onClick={() => setIsOpen(true)}
            className='cursor-pointer' />
        </span>
      </div>

      {/* Delete Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="transition ease-out duration-800 transform"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-800 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <DialogPanel className="max-w-lg space-y-4 rounded-lg bg-blue-300 p-12">
                <DialogTitle className="font-bold">Delete {product.name}?</DialogTitle>
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                <div className="flex mt-4 gap-4 justify-center">
                  <button
                    className="bg-gray-400 px-4 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-400 px-4 py-2 rounded-lg"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Modal */}
      <Dialog open={isEdit} onClose={() => setIsEdit(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg bg-blue-300 p-12">
            <DialogTitle className="font-bold">Edit {product.name}?</DialogTitle>
            <div className='mb-2'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Product Name</label>
              <input
                type="text"
                placeholder='Name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
            </div>

            <div className='mb-2'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Price</label>
              <input
                type="text"
                placeholder='Price'
                value={updatedProduct.price}
                onChange={(e) => setNewProduct({ ...setUpdatedProduct, price: e.target.value })}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
            </div>

            <div className='mb-2'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="">Image URL</label>
              <input
                type="text"
                placeholder='Image Link'
                value={updatedProduct.image}
                onChange={(e) => setNewProduct({ ...setUpdatedProduct, image: e.target.value })}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
            </div>
            <div className="flex mt-4 gap-4 justify-center">
              <button className='bg-gray-400 px-4 py-2 rounded-lg'
                onClick={() => setIsEdit(false)}>Cancel</button>
              <button className='bg-green-400 px-4 py-2 rounded-lg'
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>

  )
}

export default ProductCard