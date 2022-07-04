import { pinJSONToIPFS } from "./pinata.js";
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract-abi.json");
const contractAddress = "0xd425400F090178476Ef3f034C361CEcB83b9d2F3";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

const getPrice =async (projectID,amount) =>{
  console.log(projectID);
  const { success, result } = await getProjectDetails(projectID);
  console.log(result);
  if (success){
    const totalCredits=parseInt(result[3]);
    const pricePerTon=parseInt(result[4]);
    if(parseInt(amount)<=totalCredits){
      return (parseInt(amount)*pricePerTon);
    }else{
      console.log("success ==False");
      return 0;
     
    }
  }

}

export const mintCarbon = async ( projectId, amount) => {
  if ( projectId.trim() == "" || amount.trim() == "") {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant de envoyer.",
    };
  }

  //make metadata
  const url="https://gateway.pinata.cloud/ipfs/QmW8tFvLCTTqCs7rGfyU2Jh1vLnBkbJVsmu6UHHXgzkwsb";
  const metadata = new Object();
  metadata.projectId = projectId;
  metadata.image = url;
  metadata.amount = amount;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  let price= await getPrice(projectId,amount);
  console.log(price);
  

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value : price.toString(),
    data: window.contract.methods
      .mintCarbon(window.ethereum.selectedAddress,projectId, tokenURI,amount)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Voir votre transaction sur Etherscan: https://rinkeby.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const createProject = async (name, description, totalCredits, PricePerTon) => {
  //verification non vide
  if (name.trim() == "" || description.trim() == ""|| totalCredits.trim() == ""|| PricePerTon.trim() == "") {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant de créer le projet.",
    };
  }

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);  

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .addProject(name, description, totalCredits, PricePerTon)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        `✅ Voir votre transaction sur Etherscan: https://rinkeby.etherscan.io/tx/${txHash}`,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
}
export const getID= async()=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .getID()
      .encodeABI(),
  };

  try {
    const result = await window.ethereum.request({
      method: "eth_call",
      params: [transactionParameters,"latest"],
    });
    return {
      success: true,
      result:
        [parseInt(result.slice(2,66)),parseInt(result.slice(67,132))],
    };
  } catch (error) {
    return {
      success: false,
      result: "😥 Something went wrong: " + error.message,
    };
  }
}

export const getProjectDetails= async(projectId)=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .getProjectDetails(projectId)
      .encodeABI(),
  };

  try {
    const data = await window.ethereum.request({
      method: "eth_call",
      params: [transactionParameters,"latest"],
    });
    console.log(web3.eth.abi.decodeParameters(['tuple(uint256,string,string,uint256,uint256)'],data)[0]);
    return {
      success: true,
      result:web3.eth.abi.decodeParameters(['tuple(uint256,string,string,uint256,uint256)'],data)[0],
    };
  } catch (error) {
    return {
      success: false,
      result: "😥 Something went wrong: " + error.message,
    };
  }
}

export const Burn = async (tokenID) =>{
  if (tokenID.trim() == "" ) {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant de créer le projet.",
    };
  }

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .useToken(tokenID)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        `✅ Voir votre transaction sur Etherscan: https://rinkeby.etherscan.io/tx/${txHash}`,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
} 
