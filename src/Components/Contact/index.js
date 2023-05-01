import React,{useState} from 'react'
import emailIcon from '../../Images/email.png'
import mobile from '../../Images/mobile.png'
import './style.scss'

const ContactPage = () => {
    const [formData, setFormData] = useState({name:'',email:'',message:''})
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const {name,email,message}= formData
   
    const handleChangeInput=(e) => {
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
     }

     const handleSubmit=() => {
        setLoading(true)
        const  contact={
          _type:'contact',
          name:name,
          email:email,
          message:message
        }
        
        console.log(contact)
        setIsFormSubmitted(true)
        setLoading(false)
      
    }

    
  return (
    <div>
        <div style={{paddingTop:'7%'}} >

        
        <h2 className='head-text' >Take a coffee and chat with us</h2>
            <div  style={{marginLeft:'20%'}} className='app__footer-cards' >
                <div className='app__footer-card'>
                    <img src={emailIcon} alt="email" />
                    <a href="mailto:adityabajpai21901@gmail.com" className='p-text' >hello@carbonCreditsMarket@gmail</a>
                </div>
                <div className='app__footer-card'>
                    <img src={mobile} alt="mobile" />
                    <a href="tel: +91 9560993028" className='p-text' >+0120 4776646</a>
                </div>
            </div>
        {
                !isFormSubmitted ? 
                    <div style={{marginLeft:'20%',border:'1px solid black'}} className='app__footer-form app__flex' >
                    <div className='app__flex'>
                        <input className='p-text' type="text" placeholder='Your Name' value={name} 
                        onChange={handleChangeInput} name='name' />
                    </div>
                    <div className='app__flex'>
                        <input className='p-text' type="email" placeholder='Your Email' value={email} 
                        onChange={handleChangeInput} name='email' />
                    </div>  
                    <div>
                    <textarea  className='p-text' name="message" placeholder='Your Message' id="" 
                        cols="30" value={message} onChange={handleChangeInput} rows="10"></textarea>
                    </div>
                    <button type='button' style={{marginBottom:'20px'}} className='p-text' onClick={handleSubmit} >{loading?'Sending Message' :'Send Message'}</button>
                </div> :
            <div>
                <h3 className='head-text' >Thank You for Getting In Touch</h3>
            </div>
            }
            </div>
    </div>
  )
}

export default ContactPage