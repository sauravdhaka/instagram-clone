import React, { useState,useEffect } from "react";
import "../css/Createpost.css";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("");
  const navigate = useNavigate();
   // Toast function
   const notifyA = (msg) =>{
    toast.error(msg)
  }
  const notifyB = (msg) =>{
    toast.success(msg)
  }

useEffect(()=>{
  //saving post to  mongodb
  if(url){
    fetch("/createPost",{
      method: 'post',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
      },
      body : JSON.stringify({
        body,
        pic : url
      })
    }).then(res=>res.json())
    .then(data => {
      if(data.error){
        notifyA(data.error)
      }
    else{
      notifyB("Successfully Posted")
      navigate("/")
    }})
    .catch(err => console.log(err))
  }
},[url])

// posting data to cloudanry
  const postDetails = ()=>{

    console.log(body,image)
    const data = new FormData()
    data.append('file',image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","minacloud")
    fetch("https://api.cloudinary.com/v1_1/minacloud/image/upload",{
      method: 'post',
      body : data
    }).then(res=>res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))

    
    
  }

  const loadfile = (event) => {
    let output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/** header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/** image - perview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
      </div>
      {/** details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src="https://plus.unsplash.com/premium_photo-1677087121676-2acaaae5b3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
          </div>
          <h5>Rahul</h5>
        </div>
        {/**  */}
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption"
        ></textarea>
      </div>
    </div>
  );
}