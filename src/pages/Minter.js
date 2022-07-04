import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintCarbon,
  createProject
} from "../util/interact.js";


const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [projectID, setProjectID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [url, setURL] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Remplissez les informations en haut.");
        } else {
          setWallet("");
          setStatus("🦊 Connectez vous avec Metamask en appuyant sur le boutton en haut.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintCarbon(projectID,quantity);
    setStatus(status);
    if (success) {
      setProjectID("");
      setQuantity("");
      setURL("");
    }
  };


  return (
    <div className="Minter">
      <div className="container text-end outlined">
        <button className="btn btn-outline-primary rounded" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      </div>
      <br></br>
      
      <h1 id="title">🧙‍♂️ Acheter vos crédits ici !</h1>
      <p>
        choisissez l'identifiant du projet et la quantité souhaité. 
      </p>
      <form className="">
        <h2 className="mt-5">🖼 ID du projet: </h2>
        <input className=""
          type="text"
          placeholder="ex : 5"
          onChange={(event) => setProjectID(event.target.value)}
        />
        <h2 className="mt-5"> Quantité: </h2>
        <input className=""
          type="text"
          placeholder="ex : 100 (tonnes CO2)"
          onChange={(event) => setQuantity(event.target.value)}
        />
      </form>
      <div className="conatianer mt-5 mb-3">
        <p id="status" style={{ color: "red" }}>
          {status}
        </p>
      </div>
      <button className="btn-info rounded btn-lg"  onClick={onMintPressed}>
        Envoyer
      </button>
        
      
    </div>
  );
};

export default Minter;
