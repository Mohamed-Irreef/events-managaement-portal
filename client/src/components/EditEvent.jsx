import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEventForm = ({userId}) => {
    
    const [title,setTitle] = useState('');
    const [date,setDate] = useState('');
    const [place, setPlace] = useState('');
    const [desc, setDesc] = useState('');
    const [readMore, setReadMore] = useState('');
    const [img, setImg] = useState(null);
    const [oldImg, setOldImg] = useState('');
    const [formatedDate, setFormatedDate] = useState('');
    const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const navigate = useNavigate();
    const {id} = useParams();
    // const postId = id;

    async function submitHandler(e){
        e.preventDefault();
        
        // console.log("postId",postId)
        const data = new FormData(); //contains the entire Post data
        data.append('title',title );
        data.append('date', date);
        data.append('place', place);
        data.append('desc', desc);
        data.append('readMore',readMore );
        data.append('postedId', userId);
        data.append('oldImg', oldImg);
        // data.append('postId', postId)
        // const postedDate = new Date().getDate();
        // const postedMonth = new Date().getMonth();
        // const postedYear = new Date().getFullYear();
        // const postedOn =`${postedDate} ${months[postedMonth + 1]} ${postedYear}`
        // const postedTime = new Date().getTime();
        // data.append('postedOn', postedOn);
        // data.append('postedTime', Date.now());
        
        
       data.append('img',img );
        
        
        console.log("Old Img seted: ",data.get('oldImg'));
        console.log("New Img seted: ",data.get('img'));
        console.log("Sending Data:", {
            title,
            date,
            place,
            desc,
            readMore,
            userId,
            img: img ,
        });
        console.log('Data sent ....')

        axios.defaults.withCredentials=true;
        await axios.put(`http://localhost:8000/api/posts/update-post/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }, withCredentials:true
        })
        .then((res)=>{
            console.log('Form Update Success:', res.data.message);
            navigate('/events')
        })
        .catch((err)=>{
            console.log('Form Update Error: ', err)
        })
    }

   
    useEffect(()=>{
        axios.defaults.withCredentials=true;
        axios.get(`http://localhost:8000/api/posts/single-post/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log('Single Post Response: ', res.data);
            
            let eventdate= String(res.data.singlePost.eventDate);
            let dateArray = eventdate.split("-");
            let splitDate = (dateArray[2]).split("T");
            let alteredDate = `${splitDate[0]}-${dateArray[1]}-${dateArray[0]}}`
            setFormatedDate(alteredDate);

            setTitle(res.data.singlePost.eventTitle);
            setDate(res.data.singlePost.eventDate);
            setPlace(res.data.singlePost.eventPlace);
            setDesc(res.data.singlePost.eventDescription);
            setReadMore(res.data.singlePost.readMore);
            setImg(res.data.singlePost.eventImage);
            setOldImg(res.data.singlePost.eventImage);
        })
        .catch ((err)=>{
            console.log('Single post Error: ', err)
        })
    },[])

    

  return (
    <div className='create-event' encType="multipart/form-data" >
            <form action="" className='event-form flex flex-col gap-4' onSubmit={submitHandler}>
                <h4 className='text-center text-xl mb-2 font-medium tracking-wider mt-2'>Edit EVENT</h4>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="title">Event Title <span className='text-red-500'>*</span> </label>
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} name="title" id="title" className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' placeholder='Event Name' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="date">Event Date <span className='text-red-500'>*</span> [Date: {formatedDate}]</label>
                    <input type="Date" value={date} name="date" onChange={(e)=>{setDate(e.target.value)}} id="" placeholder='Event Date' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="place"> Event Place <span className='text-red-500'>*</span></label>
                    <input type="text" value={place} name="place" id="place" onChange={(e)=>{setPlace(e.target.value)}} placeholder='Event Place' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="desc">Event Description <span className='text-red-500'>*</span></label>
                    <textarea minLength="500" maxlength="700"  name="desc" value={desc} id="desc" onChange={(e)=>{setDesc(e.target.value)}} rows={5} placeholder='About the Event' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required></textarea>
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="readMore">Read More Link <span className='text-red-500'>*</span></label>
                    <input type="text" value={readMore} name="readMore" id="readMore" onChange={(e)=>{setReadMore(e.target.value)}} placeholder='Additional links' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' required/>
                </div>

                <div className="mb-4 flex flex-col gap-1 ">
                    <label htmlFor="img">Event Image <span className='text-red-500'>*</span> <span className='text-xs'>[ jpg, jpeg, png ]</span></label>
                    <input type="file"  name="img" id="img" onChange={(e)=>{setImg(e.target.files[0])}} placeholder='Event-image' className='border-none outline-none rounded-sm px-2 py-1 text-black placeholder:text-sm' accept='image/png, image/jpeg, image/jpg' />
                </div>

                <button className="event-buttons flex w-full gap-2">    
                    <button className='w-1/2 bg-blue-700 py-1 px-2 rounded-sm hover:bg-blue-800 hover:scale-95 transition-all duration-100' onClick={(e)=>{navigate('/events')}}>Cancel</button>
                    <button  type='submit' className='w-1/2  bg-blue-700 py-1 px-2 rounded-sm hover:bg-blue-800 hover:scale-95 transition-all duration-100'>Save</button>
                </button>
            </form>
    </div>
  )
}

export default EditEventForm