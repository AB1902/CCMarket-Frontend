import React,{useState} from 'react'
import axios from 'axios'
import { TextField,Button } from '@mui/material'
import Cookies from 'universal-cookie' 
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const cookies=new Cookies()
  const navigate=useNavigate()

  const handleSubmit=(e) => {
    e.preventDefault()
    axios.post("https://ccmarketbackend.onrender.com/userLogin",{email,password},{
      "headers":{
        "Content-Type":"application/json"
      }
    })
    
    .then(res => {
      console.log(res)
      cookies.set("loggedInUserEmail",res.data.payload.loggedInUser.email)
      cookies.set("loggedInUsername",res.data.user[0].name)
    
      console.log(res)
      if(res.data.message==='logged in successfully'){
        // window.location.reload()
        navigate("/home")
        cookies.get("loggedInUser")
        window.location.reload()
      }
      
    }).catch(err => {
      console.log(err.message)
    })
  }

 
  return (
    <div>
      <div>
        <form style={{paddingTop:'15%'}} onSubmit={handleSubmit} className='app__form' >
                <h2 className='head-text' style={{margin:'auto',marginBottom:'20px'}} >Please <span>Log In</span> To Continue </h2>
                <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                    label="Email Id" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField style={{marginTop:'20px'}} className='form__text' id="outlined-basic" type='password'
                    label="Password" variant="outlined" onChange={(e) =>setPassword(e.target.value)}  />
                <Button className='btn p-text' variant="outlined" style={{width:'100px',margin:'auto',marginTop:'20px'}} 
                    type='submit'
                >
                    Log In
                </Button>
            </form>
        </div>
        
    </div>
  )
}

export default Login