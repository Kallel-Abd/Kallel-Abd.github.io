import React from 'react'
import { useState } from 'react'
import { Burn } from '../util/interact';

export default function Usetoken() {

    const [tokenID,setTokenID]=useState("");
    const [status,setStatus]=useState("");

    const onBurnPressed= async ()=>{
        const { success, status } = await Burn(tokenID);
        setStatus(status);
        if (success) {
            setTokenID("");
        }
    }
    return (
    <div className="Minter">
        <h1 id="title">Utiliser vos Tokens pour compenser vos émissions</h1>
        <p>
            choisissez l'identifiant de votre Token. 
        </p>
        <form className="">
            <h2 className="mt-5"> ID du Token: </h2>
            <input className=""
            type="text"
            placeholder="ex : 3"
            onChange={(event) => setTokenID(event.target.value)}
            />
        </form>

        <div className="conatianer mt-5 mb-3">
            <p id="status" style={{ color: "red" }}>
                {status}
            </p>
        </div>

        <button className="btn-info rounded btn-lg"  onClick={onBurnPressed}>
            Envoyer
        </button>
    </div>
  )
}
