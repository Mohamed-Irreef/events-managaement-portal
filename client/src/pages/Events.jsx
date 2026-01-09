import React, { useEffect, useState } from "react";
import new_img from '../assets/new3.webp'
import event_img from '../assets/event-img.jpg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = ({roleAuthorized}) => {

  const [allPostData, setAllPostData] = useState([]);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [like,setLike] = useState(false);

  useEffect(()=>{
    axios.defaults.withCredentials=true;
    axios.get('http://localhost:8000/api/posts/all-post', {withCredentials:true})
    .then((res)=>{
      // console.log('All Posts: ', res.data.message);
      console.log('All Posts: ', res.data.allPosts);
      let postsFromServer = res.data.allPosts;
      let newPostData = [];
      
      // Loop to reverse the array
      for (let i = postsFromServer.length - 1; i >= 0; i--) {
        newPostData.push(postsFromServer[i]);
      }
      
      setAllPostData(newPostData);
    })
    .catch((err)=>{
      console.log("Get All Post Error: ", err.message)
    })
  },[deleted])

  function editHandler(e){
    e.preventDefault();
    const id= e.target.value;
    console.log('Edit Id: ', id)
    navigate(`/edit-event/${id}`);
  }

  function deleteHandler(e){
    e.preventDefault();
    setDeleted(false);
    const id= e.target.value;
    console.log("Delete Id: ",id);
    axios.defaults.withCredentials=true;
    axios.delete(`http://localhost:8000/api/posts/delete-post/${id}`,{withCredentials:true})
      .then((res)=>{
        console.log('Single Post Deleted: ', res.data.message);
        setDeleted(true);
      })
      .catch((err)=>{
        console.log('Single Post Delete Error: ', err);
      })
   
  }
  function likeIncHandler(e){
    setLike((prev)=>!prev);
    let id = e.target.value;
    console.log("Clicked: ", id);
    
  }
  
  function likeDecHandler(e){
    setLike((prev)=>!prev);
    let id = e.target.value;
    console.log("Clicked: ", id);
  }

  return (
    <>
      <div className="event-page"> {/* Event Page */}
        
        <div className="card-section">

           {

            allPostData.map((post)=>{
              return(
                <>
                    <div className="event-card "> {/* Event Card Start */}

                      <div className="event-card-header"> {/* Event Card Header*/}
                          <div className="new-img">
                            {
                              (new Date(post.postedTime).getTime() > Date.now() - (2 * 60 * 60 * 1000))?
                              (<img src={new_img} alt="" />):
                                (<div className="mb-20"></div>) 
                              
                            }
                            
                          </div>
                          <div className="event-title">{post.eventTitle}</div>
                          <div className="edited text-green-600">
                            {post.isEdited && (<p>Edited</p>)}
                          </div>
                        </div>

                      <div className="event-main-section "> {/* Event Main Section */}

                          <div className="event-image-section"> {/* EventImage Section */}
                            <img src={`http://localhost:8000/${post.eventImage}`} alt="" />
                          </div>

                          <div className="event-details-section mb-10 pt-1"> {/* Event Card Details Section */}

                            <div className="event-date-time flex  gap-20"><div className="date"> <p><b className="text-blue-700">Event Date:</b> {post.eventDate}</p></div> 
                            <div className="place mb-2"><p><b className="text-blue-700">Event Place:</b> {post.eventPlace} <i class="ri-map-pin-line"></i></p> </div> 

                          </div>

                            <div className="description pr-2">
                              <p>{post.eventDescription}<a href={post.readMore} className='text-blue-300'> read more</a></p>
                            </div>
                              
                            <div className="poster-details flex flex-col gap-2 mt-1">
                              <div className="">
                              <p><b className="text-red-600">Posted By: </b><span>{`${post.postedBy} (${post.postedRole})`} </span></p>
                              <p><b className="text-red-600">Posted On: </b><span>{post.postedDate}</span></p>
                            </div>

                              <div className="post-actions flex justify-between items-center">
                                  <div className="button-container flex gap-12 items-center">
                                    {
                                      (roleAuthorized === 'admin' || roleAuthorized === 'superadmin')&& <>
                                          <button value={post._id} className="edit cursor-pointer" onClick={(e)=>{editHandler(e)}}><i class="ri-edit-2-fill"></i> Edit</button>
                                          <button value={post._id} className="delete cursor-pointer" onClick={(e)=>{deleteHandler(e)}}><i class="ri-delete-bin-6-fill"> </i>Delete</button>
                                      </>
                                    }
                                  </div>

                                  <div className="like mr-4 flex items-center w-full justify-between pr-8">
                              <div></div>

                              { 
                                like?  <i value={post._id} className="ri-heart-fill text-red-600 text-2xl cursor-pointer" onClick={(e)=>{likeIncHandler(e)}}></i> :<i value={post._id} className="ri-heart-line text-2xl cursor-pointer" onClick={(e)=>{likeDecHandler(e)}}></i>
                              }
                      </div>  

                                  
                              </div>
                              
                            </div>

      
                          </div>


                      </div>

      

                    </div>
                </>
              )
            })
           }

        </div>
        
        
       
      </div>
    </>
  );
};

export default Events;


//<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore corrupti ea, eaque enim totam architecto alias earum numquam adipisci minima quo aut cumque tenetur commodi. Ab nisi ipsam amet harum id dolore quia, iusto asperiores est, atque cum, distinctio soluta et laudantium! Officiis blanditiis, laborum architecto ipsum in molestias sed quae accusantium magni mollitia atque nesciunt necessitatibus, dignissimos inventore voluptas, est facilis adipisci reiciendis pariatur consectetur possimus fuga molestiae quos. Odio quam minus iste ut eos facere eveniet dolorem ullam, perspiciatis id cumque voluptates dicta rem libero mollitia corporis impedit beatae adipisci explicabo nam numquam animi? Expedita, est quod quisquam doloribus quos aliquid eligendi quis beatae quo minima dolorem officiis, cumque earum impedit obcaecati consequatur facilis, eos cupiditate! Eum, iusto?<a href="/">read more</a></p>


// eventTitle: title,
// eventDate: date, 
// eventPlace:place,
// eventDescription:desc, 
// readMore:readMore, 
// postedBy:postedUserName ,
// adminId:postedId,
// postedDate:postedOn,
// postedTime:postedTime,
// postLike:0,
// eventImage:image,
// isEdited:false,
// postedRole: postedRole