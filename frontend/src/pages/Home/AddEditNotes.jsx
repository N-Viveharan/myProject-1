import React from 'react'
import TagInput from '../../components/Input/TagInput'

function AddEditNotes() {
  return (
    <div >
        <div className='flex flex-col gap-2'>
        <label className='text-xs text-slate-400'>TITLE</label>
        <input type="text"
        className='text-2xl text-slate-950 outline-none'
        placeholder='Go To Gym At 5' />
    </div>
    <div className='flex flex-col gap-2 mt-4'>
        <label className='text-xs text-slate-400'>CONTENT</label>
        <textarea type="text"
        className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded '
        placeholder='Content'
        rows={10}/>
    </div>
    <div className='mt-3'>
        <label className='text-xs text-slate-400'>TAGG</label>
        <TagInput/>
    </div>
    <button className='font-medium mt-5  w-full text-sm bg-[#2885ff] text-white p-2 rounded my-1 hover:bg-blue-600' onClick={()=>{}}>ADD</button>

    </div>
  )
}

export default AddEditNotes