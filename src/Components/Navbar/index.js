import React from 'react'
import './style.scss'
//import { images } from '../../constants'
import {HiMenuAlt4,HiX} from 'react-icons/hi'
import {motion} from 'framer-motion'
import { useState,useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const cookies=new Cookies()
    const [user, setUser] = useState(false)
    const navigate=useNavigate()

    useEffect(() => {
        if(cookies.get("loggedInUserEmail")){
            setUser(true)
        }else{
            setUser(false)
        }    
    }, [])
    
    

    const logout=(e) =>{
        e.preventDefault()
        cookies.remove("loggedInUserEmail",{path:"/"})
        cookies.remove("loggedInUserName",{path:"/"})
        window.location.reload()
        navigate("/login")
    }
  return (
    user?(
    <nav className='app__navbar' >
        <div className='app__navbar-logo'>
            {/* <img src={images.logoFiverr2} /> */}
            <h2><a href='#' style={{textDecoration:'none',color:'black'}} >MyToken</a></h2>
        </div>
        <ul className='app__navbar-links'>
            {
                ['home','admin','user','contact','signup','login'].map((item)=> (
                    <li className='app__flex p-text' key={`/${item}`} >
                        <div></div>
                        <a href={`/${item}`}>{item}</a>
                    </li>
                ) )
                
            }
                <li className='app__flex p-text' key='logout' >
                    <div></div>
                    <a href="/#" onClick={logout} >Logout</a>
                </li>
        </ul>
            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={() => setToggle(true)} />
                {
                    toggle && (
                        <motion.div
                            whileInView={{x:[300,0]}}
                            transition={{duration:0.85,ease:'easeOut'}}

                        >
                            <HiX onClick={() => setToggle(false)} />
                            <ul>
                            {
                                ['home','admin','user','signup','contact','login'].map((item)=> (
                                    <li key={item} >
                                        
                                        <a onClick={() => setToggle(false) } href={`/${item}`}>{item}</a>
                                    </li>
                                ) )
                            }
                            <li className='app__flex p-text' key='logout' >
                                <div></div>
                                <a href="" onClick={logout} >Logout</a>
                            </li>
                            </ul>
                        </motion.div>
                    )
                }
            </div>

    </nav>):(<nav className='app__navbar' >
        <div className='app__navbar-logo'>
            {/* <img src={images.logoFiverr2} /> */}
            <h2><a href='#' style={{textDecoration:'none',color:'black'}} >MyToken</a></h2>
        </div>
        <ul className='app__navbar-links'>
            {
                ['home','admin','user','contact','signup','login'].map((item)=> (
                    <li className='app__flex p-text' key={`/${item}`} >
                        <div></div>
                        <a href={`/${item}`}>{item}</a>
                    </li>
                ) )
                
            }
        </ul>
            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={() => setToggle(true)} />
                {
                    toggle && (
                        <motion.div
                            whileInView={{x:[300,0]}}
                            transition={{duration:0.85,ease:'easeOut'}}

                        >
                            <HiX onClick={() => setToggle(false)} />
                            <ul>
                            {
                                ['home','admin','user','contact','signup','login'].map((item)=> (
                                    <li key={item} >
                                        
                                        <a onClick={() => setToggle(false) } href={`/${item}`}>{item}</a>
                                    </li>
                                ) )
                            }
                            </ul>
                        </motion.div>
                    )
                }
            </div>

    </nav>)
  )
}

export default Navbar