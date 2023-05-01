import React, { useState,useEffect } from 'react'
import Web3 from 'web3'
import {useNavigate} from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import './style.scss'


const Admin = () => {
  const [admin, setAdmin] = useState(false)
  const [tokenTitle, setTokenTitle] = useState('')
  const [tokenDes, setTokenDes] = useState('')
  const [tokenImg, setTokenImg] = useState('')
  const [supply, setSupply] = useState(0)
  const [checkTotalSupply, setCheckTotalSupply] = useState(false)

  const navigate=useNavigate()

  let provider=typeof window !== 'undefined' && window.ethereum
  const web3=new Web3(provider)
  const requiredAdmin='0xBbCA960ec52f315a529B5bc7FEc3C1AFDbe2A89F'
  const contractAddress='0x4470D9a6d53fc6CE5e01717c77cca6d5234Cc7CD'
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

 

  const getContract=() => {
    const web3=new Web3(provider)
    // const contract=new web3.eth.Contract(abi,contractAddress)
    // console.log(contract)
    return new web3.eth.Contract(abi, contractAddress)
    }
	
	useEffect(() => {
		const getSupply=async() => {
			const contract=getContract()
			const newsupply=(await  contract.methods.totalSupply().call())
			setSupply(newsupply)
		}
		getSupply()
	},[])
  
	  console.log(supply)
  const metaMaskAccounts=() => {
    web3.eth.getAccounts((err,accounts) =>{
        if(err!=null)
            console.log(err.message)
        else if(accounts.length==0)
            console.log('no metamask user found')
        else{
            // setLoggedInAccount(accounts[0])
            if(accounts[0]===requiredAdmin){
                console.log('admin logged in to metamask')
                setAdmin(true)
            }
            else{
                console.log('admin not logged in to metamask')
                return
            }
        }
    } )
  }


  const mintHandler = async() => {
    const contract=getContract()
    console.log(await contract.methods.safeMint(requiredAdmin).send({from:requiredAdmin}))
  }

  const supplyHandler=async() => {
    const contract=getContract()
    const newsupply=(await contract.methods.totalSupply().call())
	setSupply(newsupply)
	console.log(newsupply)
  }

  const handleMintSubmit=async(e) =>{
	e.preventDefault()
	const ownerWallet='0xBbCA960ec52f315a529B5bc7FEc3C1AFDbe2A89F'
	const contract=getContract()
	const newsupply=await contract.methods.totalSupply().call()
	setSupply(newsupply)
	const tokenId=parseInt(supply)+1	
	axios.post("http://localhost:5000/mintTokens",{tokenId,ownerWallet,tokenTitle,tokenDescription:tokenDes,img:tokenImg},{
		"headers":{
			"Content-Type":"application/json"
		}
	}).then(res => {
		if(res.data.status==='success'){
			mintHandler()
		}
		console.log(res.data)
		navigate("/")
	}).catch(err=>{
		console.log(err.message)
	})
	console.log(tokenTitle,tokenDes,tokenImg,ownerWallet,tokenId)
	//axios.post()
	//mintHandler()

  }

  useEffect(() => {
    metaMaskAccounts()
  }, [])
  
  
  return (
    <div className='admin_page' >
        {
            !admin? (
                <div className='admin__errmsg' >
                    <h3>Admin Not Logged In To Metamask Account</h3>
                </div>    
            ):(
                <div>
                    <div>
						<h3>Admin Page</h3>
					</div>
					<div style={{marginTop:'80px'}} >
						<form className='app_form' onSubmit={handleMintSubmit} >
							<h3>Enter Details of Token</h3>
							<TextField style={{marginTop:'20px'}} type='text' className='form__text' id="outlined-basic" 
                    		label="title" variant="outlined" onChange={(e) => setTokenTitle(e.target.value)}  />
							<TextField style={{marginTop:'10px'}} type='text' className='form__text' id="outlined-basic" 
                    		label="description" variant="outlined" onChange={(e) => setTokenDes(e.target.value)}  />
							<TextField style={{marginTop:'10px'}} type='text' className='form__text' id="outlined-basic" 
                    		label='img' variant="outlined" onChange={(e) => setTokenImg(e.target.value)}  />

							{/* <input type='text' placeholder='title' onChange={(e) => setTokenTitle(e.target.value)} />
							<input  type='text' placeholder='description' onChange={(e) => setTokenDes(e.target.value)} />
							<input type='text' placeholder='img' onChange={(e) => setTokenImg(e.target.value)}  /> */}
							<Button className='btn' type='submit' style={{border:'1px solid blue'}} >Mint More Tokens</Button>
						</form>
					</div>
					<div className='btn__div' >
						<Button className='btn' style={{width:'180px',justifyContent:'center',margin:'auto',marginLeft:'42.7%',marginTop:'20px',border:'1px solid blue'}} onClick={() => {
							setCheckTotalSupply(!checkTotalSupply)
							supplyHandler()
						}} >
							Check Total Supply
						</Button> <span>
							{
								checkTotalSupply?(
									<h3 style={{marginTop:'20px'}} >Total Supply: {supply} </h3>
								):('')
							}
						</span>
						
					</div>
				</div>
            )
        }
        
    </div>
  )
}

export default Admin