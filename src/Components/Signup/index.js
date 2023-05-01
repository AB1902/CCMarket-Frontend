import React, { useState } from 'react'
import Navbar from '../Navbar'
import { TextField,Button } from '@mui/material'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [metaMaskWalletAddress, setmetaMaskWalletAddress] = useState('')
  const navigate=useNavigate()

  const handleSubmit=(e) => {
    e.preventDefault()
    axios.post("https://ccmarketbackend.onrender.com/userSignup",{name,email,password,metaMaskWalletAddress},{
        "headers":{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.data.message==="user successfully registered"){
            navigate("/")
        }
    }).catch(err => {
        console.log(err.message)
    })
  }
  return (
    <div>
        
        <div>
        <form className='app__form' >
        <h2 className='head-text' style={{margin:'auto',marginBottom:'20px'}} >Sign<span> Up</span></h2>
                <TextField  className='form__text' id="outlined-basic" 
                    label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                    label="Email Id" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField style={{marginTop:'20px'}} className='form__text' id="outlined-basic" type='password'
                    label="Password" variant="outlined" onChange={(e) =>setPassword(e.target.value)}  />
                <TextField  style={{marginTop:'20px'}} className='form__text' id="outlined-basic" 
                    label="Metamask Wallet Address" variant="outlined" onChange={(e) => setmetaMaskWalletAddress(e.target.value)} />
                <Button variant="outlined" style={{width:'100px',margin:'auto',marginTop:'20px'}} 
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    </div>
  )
}

export default SignUp