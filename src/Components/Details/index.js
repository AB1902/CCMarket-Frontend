import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import bio from '../../Images/biogas.png'
import './style.scss'
import datas from '../../Misc/data'
import Web3 from 'web3'
import axios from 'axios'
import { Button } from '@mui/material'
import Cookies from 'universal-cookie'
import PopUp from '../PopUp'
import {MdFilterListAlt,MdSort,MdAdd,MdOutlineAssignmentInd,MdUploadFile,MdClose} from 'react-icons/md'

const Details = () => {
  const {id}=useParams()
  const [modal, setModal] = useState(false)
  const navigate=useNavigate()
  const [tokenOwner, setTokenOwner] = useState('')
  const [loggedInUser, setLoggedInUser] = useState('')
  const [tokenDetails,setTokenDatails]=useState({})
  const [user,setUser]=useState({})
  const [approvalAddress, setapprovalAddress] = useState('')
  const [approveName, setApproveName] = useState('')
  const [approvalId, setApprovalId] = useState('')
  const adminAddress='0xBbCA960ec52f315a529B5bc7FEc3C1AFDbe2A89F'
  const data=datas[id]  
  const contractAddress='0x4470D9a6d53fc6CE5e01717c77cca6d5234Cc7CD'
  let provider=typeof window !== 'undefined' && window.ethereum

  const abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
	const cookies=new Cookies()
useEffect(() => {
	axios.get(`https://ccmarketbackend.onrender.com/tokens/${id}`)
	.then(res => {
		setTokenDatails(res.data.token[0])
		
	})
	.catch(err => console.log(err.message))

},[])
console.log(tokenDetails)
  const getContract=() => {
    const web3=new Web3(provider)
    return new web3.eth.Contract(abi, contractAddress)
  }  

  const getTokenDetails=async() =>{
    const contract=getContract()
    const owner=await contract.methods.ownerOf(id).call()
    setTokenOwner(owner)
  }

  const getLoggedInUser=() => {
    const web3=new Web3(provider)
    web3.eth.getAccounts((err,accounts) => {
        if(err!=null)
            console.log(err.message)
        else if(accounts.length==0){
            console.log('user not logged into metamask')
        }
        else{
            setLoggedInUser(accounts[0])
        }
    })

  }

  const toggleModal=() => {
	setModal(!modal)
  }

  const approveCaller=async() => {
    const contract=getContract()
    const response=await contract.methods.approve(loggedInUser,Number(id)).call()
    console.log(response)
  }

  const transferFunction=async() => {
    const contract=getContract()
    approveCaller()
    const res=await contract.methods.transferFrom(tokenOwner,loggedInUser,Number(id)).call()
    console.log(res)
  }

  const handleClick=() =>{
	
		axios.patch(`https://ccmarketbackend.onrender.com/transferToken/${tokenDetails._id}`,{to:loggedInUser},{
            "headers":{
                "Content-Type":"application/json"
            }
        })
        .then(res => {
            console.log(res.data)
            navigate("/home")
            window.location.reload()
        }).catch(err => {
            console.log(err.message)
        })
	
  }

  useEffect(() => {
   getTokenDetails()
   getLoggedInUser()
  }, [])

  useEffect(() => {
	axios.get(`https://ccmarketbackend.onrender.com/userStatus/${id}`,{to:loggedInUser},{
		"headers":{
			"Content-Type":"appliction/json"
		}
	}).then(res => {
		setUser(res.data.request?res.data.request:{isApproved:false})
	}).catch(err => {
		console.log(err.message)
	})
  },[])

  const handleApproval=async() => {
	axios.post("https://ccmarketbackend.onrender.com/requests",{from:adminAddress,to:loggedInUser,tokenId:tokenDetails.tokenId,userName:cookies.get("loggedInUsername")},{
		"headers":{
			"Content-Type":"application/json"
		}
	})
	.then(res => {
		console.log(res.data)
	})
	.catch(err=> {
		console.log(err.message)
	})
  }
  console.log(tokenOwner)
  console.log(loggedInUser)
  console.log(cookies.get("loggedInUsername"))
  return (
	<div>
		
    <div className='detail__page' >
        <div className='detail__container' >
            <h3>Carbon Credit Details</h3>
            <div>
                <img src={tokenDetails.img} alt='cc_img' />
            </div>
            <div className='detail__text' >
                <div>
                    <h3>{tokenDetails.tokenTitle}</h3>
                    <div>
                        <h4><b>Token ID: </b>{tokenDetails.tokenId}</h4>
                        <h4><b>Token Owner: </b>{tokenDetails.ownerWallet}</h4>

                    </div>
                </div>
                <div>
                    <p>
                        {
                            tokenDetails.tokenDescription
                        }
                    </p>
                </div>
            </div>
           
            <div className='detail__btn' >
                <Button className='btn' onClick={e => {
					e.preventDefault()
					toggleModal()
					}
				} 
				style={{width:'200px',marginLeft:'42%',marginTop:'20px',border:'1px solid blue'}} >Buy From Admin</Button>
            </div>
			{/* <div className='detail__btn' >
                <Button className='btn' onClick={e=>{
					e.preventDefault()
					handleApproval()
					}} 
					style={{width:'200px',marginLeft:'42%',marginTop:'20px',border:'1px solid blue'}} >Get Approved
				</Button>
            </div> */}

        </div>
		
    </div>
			{
                modal && 
                    <div>
                        <PopUp
                            handleClose={toggleModal}
							handleClick={handleClick}
                           	content={
                                <div>
                                    <form onSubmit={(e) => {
										e.preventDefault()
                                        handleClick()
                                    }} >
                                    <h2 style={{marginLeft:'30%'}} > <img src="https://cdn.consensys.net/uploads/metamask-1.svg" alt="metaMaks" style={{height:'50px',marginRight:'10px'}} /> 
                                        MetaMask Confirmation 
                                    </h2>
									<h3 style={{marginLeft:'5%',marginTop:'20px'}} > 
                                        Token Name: {tokenDetails.tokenTitle} 
                                    </h3>
									<h3 style={{marginLeft:'5%',marginTop:'20px'}} > 
                                        Token ID: {tokenDetails.tokenId} 
                                    </h3>
                                    <h3 style={{fontSize:'1.3rem',marginLeft:'60px'}} >Gas (estimated):  0.00667158 GoerliETH </h3>
                                    <div style={{display:'flex',marginTop:'30px',marginLeft:'35%'}} >
                                        <h4 >Max Fee: 0.1276358 GoerliETH </h4>
                                    </div>
									<div>
									<Button className='btn' onClick={e => {
										toggleModal()
									}
									} 
									style={{width:'150px',margin:'auto',marginTop:'30px',border:'1px solid blue',color:'blue',marginLeft:'45%',borderRadius:'10px'}} >
									Reject
									</Button>
									<Button className='btn p-text close-modal' variant="outlined" 
                                    style={{width:'150px',margin:'auto',backgroundColor:'blue',color:'white',marginBottom:'20px',marginLeft:'46.2%',borderRadius:'10px'}}  type='submit'>
                                        Confirm   
                                    </Button>
									</div>
                                    
                                    </form>
                                </div>
                            }
                        />
                    </div>
                
            }
	</div>
  )
}

export default Details