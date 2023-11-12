import React from 'react'
import { categories } from '../../utils/constants';

export const SelectCategory = ({ form, funcForm }) => {

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    funcForm({ ...form, [name]: value });
  };

  return (
    <div className='mt-1'>
      <select 
        name='category' 
        value={form.category} 
        required
        className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
        onChange={(e) => handleInputs(e)}
      >
        {
          categories.map((item) => (
            <option key={crypto.randomUUID()} value={item}>{item}</option>
          ))
        }
      </select>
    </div>
  )
}
