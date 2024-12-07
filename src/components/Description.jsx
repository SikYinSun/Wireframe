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
    <div className='flex flex-col gap-4'>
      <h2 className='text-center'>Description</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={description.title}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
      <label>
        Drawer:
        <input
          type="text"
          name="drawer"
          value={description.drawer}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          name="department"
          value={description.department}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
      <label>
        Screen Size:
        <input
          type="text"
          name="screenSize"
          value={description.screenSize}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={description.date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
    </div>
  )
}

export default Description
