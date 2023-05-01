import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import Web3 from 'web3'
import './style.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {MdFilterListAlt,MdSort,MdAdd,MdOutlineAssignmentInd,MdUploadFile,MdClose} from 'react-icons/md'
import PopUp from '../PopUp'

const UserPage = () => {
    const navigate=useNavigate()
    const [adminLength,setAdminLength]=useState(0) 	
    const [currentAccount, setCurrentAccount] = useState('')
    const [loggedInUser, setLoggedInUser] = useState([])
    const [tokenId, setTokenId] = useState(0)
    const [tokens, setTokens] = useState([])
    const [userTokens, setUserTokens] = useState([])
    const contractAddress='0x4470D9a6d53fc6CE5e01717c77cca6d5234Cc7CD'
    const adminAddress='0xBbCA960ec52f315a529B5bc7FEc3C1AFDbe2A89F'
    const [metaMaskModal, setMetaMaskModal] = useState(false)
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
    
    let provider=typeof window !== 'undefined' && window.ethereum
    const getContract=() => {
        const web3=new Web3(provider)
        return new web3.eth.Contract(abi, contractAddress)
    }
    const web3=new Web3(provider)

    const readData= async() => {
        const contract=getContract()
        const supply=await contract.methods
        console.log(supply)
    }

    const checkWalletIsConnected=async () => {
        const {ethereum}=window
       
        if(!ethereum){
            console.log("make sure you have metamask installed")
        }
        try {
            const accounts=await ethereum.request({method:'eth_requestAccounts'})
            const accountOwner= await web3.eth.getAccounts((err,accounts) =>{
                if(err!=null)
                    console.log(err.message)
                else if(accounts.length==0)
                    console.log('no metamask user found')
                else{
                    // setLoggedInAccount(accounts[0])
                    if(accounts[0]===adminAddress){
                        console.log('admin logged in to metamask')
                        return accounts[0]
                    }
                    else{
                        console.log('admin not logged in to metamask')
                        return
                    }
                }
            } )
            setCurrentAccount(accountOwner)
        } catch (error) {
            console.log(error.message)
        }

    }
    console.log(currentAccount)
  
    useEffect(() => {
        checkWalletIsConnected()
        readData()
    }, []) 

    useEffect(() => {
        if(currentAccount){
            axios.get(`https://ccmarketbackend.onrender.com/user/${currentAccount}`).then(res => {
                console.log(res.data)
                setLoggedInUser(res.data.user)
            }).catch(err => {
                console.log(err.message)
            })

        }
        
    },[currentAccount])

    useEffect(() => {
        
        axios.get(`https://ccmarketbackend.onrender.com/userTokens/${currentAccount}`)
        .then(res => {
            console.log(res.data)
            setTokens(res.data.tokens)
        })
        .catch(err => {
            console.log(err.message)
        })
    },[currentAccount])

    const sellToAdmin = (tokenId) => {
        axios.patch(`https://ccmarketbackend.onrender.com/transferToken/${tokenId}`,{to:adminAddress},{
            "headers":{
                "Content-Type":"application/json"
            }
        })
        .then(res => {
            console.log(res.data)
            window.location.reload()
        }).catch(err => {
            console.log(err.message)
        })
    }

    const toggleModal = () => {
        setMetaMaskModal(!metaMaskModal)
        console.log(metaMaskModal)
    }

  return (
    <div>
        <div style={{}} >
            <h2 style={{marginLeft:'45%',paddingTop:'100px'}} >User Page</h2>
            {
                currentAccount===adminAddress.toLowerCase()?(
                    <div className='admin__errmsg' >
                        <h3  >Admin Logged In To Metamask Account, Change Wallet to see User Details</h3>
                    </div>  
                ):(
                    <div style={{marginLeft:'35%',marginTop:'5px'}} >
                        <div style={{display:'flex'}} >  
                            <div  >
                                <b>Name: </b> <p>{loggedInUser[0]?.name}</p>
                            </div>
                            <div style={{marginLeft:'20%'}} >
                                <b>Email: </b> <p>{loggedInUser[0]?.email}</p>
                            </div>
                        </div>
                    <div>
                        <b>MetaMask Wallet Address: </b> <p>{loggedInUser[0]?.metaMaskWalletAddress}</p>
                    </div>
                    <div>
                        <b>Tokens Owned:</b>
                        <div >
                            {
                                tokens.length===0?(
                                    <div >
                                        <p style={{fontSize:'1.5rem'}} >No Tokens Owned Yet</p >
                                    </div>
                                ):(
                                    <div >	
                                        <div style={{paddingTop:'80x'}} >
                                        <div className='grid_row_userpage' style={{display:'flex'}} >
                                        {
                                            tokens?.map((data,i) => (
                                                <div className='data_card grid_col' style={{width:'280px',height:'350',marginBottom:'50px'}} key={i}>
                                                    <img className='data_img' style={{width:'200px',height:'200px',marginTop:'10px'}}  src={data.img} alt={`image/${data.img}`} />
                                                    <div className='card_data' >
                                                        <h3 className='data__card__text' style={{fontSize:'1.5rem'}} >{data.tokenTitle}</h3>
                                                        <div className='data__card__text'>
                                                            <p><b>TokenId:</b> {data.tokenId}</p>
                                                            {data.title}
                                                            <p className='data__card__text'>
                                                                {data.tokenDescription.substring(0,50)+'  . . .'}
                                                            </p>
                                                        </div>
                                                        <div style={{marginLeft:'25%'}} >
                                                            <Button style={{width:'130px',border:'1px solid blue',marginBottom:'15px'}}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setTokenId(data._id)
                                                                    toggleModal()
                                                                }}
                                                            > 
                                                                Sell To Admin 
                                                            </Button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                   
                                                ))
                                            }
                                            
                                            </div>
                                        </div>	 
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    </div>
                )
            }
            
            {
                metaMaskModal && 
                    <div>
                        <PopUp
                            handleClose={toggleModal}
                            tokenId={tokenId}
                            sellToAdmin={sellToAdmin}
                            content={
                                <div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        sellToAdmin(tokenId)
                                        }} >
                                    <h2 style={{marginLeft:'30%'}} > <img src="https://cdn.consensys.net/uploads/metamask-1.svg" alt="metaMaks" style={{height:'50px',marginRight:'10px'}} /> 
                                        MetaMask Confirmation 
                                    </h2>
                                    <h2 style={{marginLeft:'34%'}} >  
                                        Transfer Token To Admin? 
                                    </h2>
                                    <h3 style={{fontSize:'1.3rem',marginLeft:'60px',marginTop:'20px'}} >Gas (estimated):  0.00667158 GoerliETH </h3>
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
        
    </div>
    
  )
}

export default UserPage



                        
                        
                        