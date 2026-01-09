import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateEvent = ({userId}) => {
    const [title,setTitle] = useState('');
    const [date,setDate] = useState('');
    const [place, setPlace] = useState('');
    const [desc, setDesc] = useState('');
    const [readMore, setReadMore] = useState('');
    const [img, setImg] = useState(null);
    
    const navigate = useNavigate();
    const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    async function submitHandler(e){
        e.preventDefault();
        const data = new FormData(); //contains the entire Post data
        data.append('title',title );
        data.append('date', date);
        data.append('place', place);
        data.append('desc', desc);
        data.append('readMore',readMore );
        data.append('postedId', userId);
        const postedDate = new Date().getDate();
        const postedMonth = new Date().getMonth();
        const postedYear = new Date().getFullYear();
        const postedOn =`${postedDate} ${months[postedMonth + 1]} ${postedYear}`
        // const postedTime = new Date().getTime();
        data.append('postedOn', postedOn);
        data.append('postedTime', Date.now());
       if(img){ data.append('img',img )};
        console.log('sent')
        // console.log('Form Data: ',data.get('postedTime'));
        
        axios.defaults.withCredentials=true;
        await axios.post('http://localhost:8000/api/posts/new-post', data, {
            headers: { 'Content-Type': 'multipart/form-data' }, withCredentials:true
        })
        .then((res)=>{
            console.log('Form Success:', res.data.message);
            console.log('Form Uploaded By:', res.data.user);
            navigate('/events')
        })
        .catch((err)=>{
            console.log('Form Error: ', err)
        })
    }
  return (
    <div className='create-event' >
            <form action="" className='event-form flex flex-col gap-4' onSubmit={submitHandler}>
                <h4 className='text-center text-xl mb-2 font-medium tracking-wider mt-2'>CREATE EVENT</h4>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="title">Event Title <span className='text-red-500'>*</span> </label>
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} name="title" id="title" className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' placeholder='Event Name' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="date">Event Date <span className='text-red-500'>*</span></label>
                    <input type="Date" value={date} name="date" onChange={(e)=>{setDate(e.target.value)}} id="" placeholder='Event Date' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="place"> Event Place <span className='text-red-500'>*</span></label>
                    <input type="text" value={place} name="place" id="place" onChange={(e)=>{setPlace(e.target.value)}} placeholder='Event Place' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="desc">Event Description <span className='text-red-500'>*</span></label>
                    <textarea maxlength="500" maxLength="800" name="desc" value={desc} id="desc" onChange={(e)=>{setDesc(e.target.value)}} rows={5} placeholder='About the Event' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required></textarea>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="readMore" >Read More Link <span className='text-red-500'>*</span></label>
                    <input type="text" value={readMore} name="readMore" id="readMore" onChange={(e)=>{setReadMore(e.target.value)}} placeholder='Additional links' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="mb-4 flex flex-col gap-1 ">
                    <label htmlFor="img">Event Image <span className='text-red-500'>*</span> <span className='text-xs'>[ jpg, jpeg, png ]</span></label>
                    <input type="file"  name="img" id="img" onChange={(e)=>{setImg(e.target.files[0])}} placeholder='Event-image' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' accept='image/png, image/jpeg, image/jpg' required/>
                </div>

                <button className="event-buttons flex w-full gap-2">
                    <button className='w-1/2 bg-blue-700 py-1 px-2 rounded-sm hover:bg-blue-800 hover:scale-95 transition-all duration-100' onClick={()=>{navigate('/events')}}>Cancel</button>
                    <button type='submit' className='w-1/2  bg-blue-700 py-1 px-2 rounded-sm hover:bg-blue-800 hover:scale-95 transition-all duration-100'>Create</button>
                </button>
            </form>
    </div>
  )
}

export default CreateEvent