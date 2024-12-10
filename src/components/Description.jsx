import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDescription } from '../redux/formSlice';

function Description() {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.form.description);
 
  const handleChange= (e) => {
    const {name, value} = e.target;
    dispatch(updateDescription({[name]: value})); 
  }
  
  return (
    <div className='flex flex-col gap-2 border border-slate-500'>
      <h2 className='ml-2 font-bold'>Description</h2>
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Title
      </label>
      <input
        type="text"
        name="title"
        value={description.title}
        onChange={handleChange}
        className="w-3/4 ml-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Drawer
      </label>
      <input
        type="text"
        name="drawer"
        value={description.drawer}
        onChange={handleChange}
        className="w-3/4 ml-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Department
      </label>
      <input
        type="text"
        name="department"
        value={description.department}
        onChange={handleChange}
        className="w-3/4 ml-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Screen Size
      </label>
      <input
        type="text"
        name="screenSize"
        value={description.screenSize}
        onChange={handleChange}
        className="w-3/4 ml-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Date:
      </label>
      <input
        type="date"
        name="date"
        value={description.date}
        onChange={handleChange}
        className="w-3/4 ml-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}

export default Description
