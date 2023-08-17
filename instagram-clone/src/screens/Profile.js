import React,{useEffect,useState}from 'react'
import "../css/Profile.css"
import PostDetails from '../components/PostDetails'
import ProfilePic from '../components/ProfilePic'
export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  const [pic,setPic] = useState([])
  const [show,setShow] = useState(false)
  const [posts,setPosts] = useState([])
  const [changePic,setChangePic] = useState(false)
  const [user,setUser] = useState('')

  const toggleDetails = (posts) =>{
    if(show){
      setShow(false)
      console.log("hide")
    }
    else{
      setShow(true)
      setPosts(posts)
      //console.log(item)
    }
  }

  const changeprofile = ()=>{
    if(changePic){
      setChangePic(false)
    }
    else{
      setChangePic(true)
    }
  }


  useEffect(()=>{
    fetch(`/user/${JSON.parse(localStorage.getItem('user'))._id}`,{
      headers : {
        Authorization : "Bearer " + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then((result)=>{
      setPic(result.post)
      setUser(result.user)

    })
  },[])
  return (
    <div className='profile'>
      {/** Profile frame */}
      <div className='profile-frame'>
        <div className='profile-pic'>
        <img onClick={(changeprofile)}
        src= {user.Photo ? user.Photo : picLink} />
        </div>
        {/**profile-data */}
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>{pic ? pic.length : '0'} posts</p>
            <p>{user.followers ? user.followers.length : '0'} followers</p>
            <p>{user.following ? user.following.length : '0'} following</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",
    margin:"auto",
    opacity:"0.8",margin:"25px auto"}}/>
      {/** Gallery */}
      <div className='gallery'>

        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo}
          onClick={()=> {toggleDetails(pics)}}
          />
        })}
      </div>
      {show && 
      <PostDetails item={posts} toggleDetails={toggleDetails}></PostDetails>  
      }
      {
        changePic && <ProfilePic changeprofile={changeprofile}></ProfilePic>
      }
    </div>
  )
}
