import React from 'react'
import { useState } from 'react';
import { createProject,getID } from '../util/interact';


export default function PorjectCreate() {

    const [status,setStatus]=useState("");
    const [result,setResult]=useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [pricePerTon, setPricePerTon] = useState("");
    

    const onCreateProjectPressed = async () => {
        const { success, status } = await createProject(name,description,quantity,pricePerTon);
        setStatus(status);
        if (success) {
          console.log("PROJECT CREATED !!");
        }
        onGetID()
    };

    const onGetID = async ()=>{
      const { success, result } = await getID();
        setResult(result);
        if (success) {
          console.log("Got IDs !!");
          console.log(result)
        }
    };

  return (
    <div>
        
        <p className='mt-5' id="status" style={{ color: "blue" }}>
            {status}
        </p>
        <p className='mt-4' id="status" style={{ color: "green" }}>
            Votre Identifiant est :{result[0]} 
        </p>
        <div className="container mx-auto  text-start" >
        <br></br>
          <h1 id="title">🧙‍♂️ BlueLeaf création de projet</h1>
          <p>
            Ajouter un nouveau élement projet avec une nouvelle quantité de crédits carbonne
          </p>
        <form>
          <h2>🖼 Nom du projet: </h2>
          <input
            type="text"
            placeholder="Plantation d'arbres"
            onChange={(event) => setName(event.target.value)}
          />
          <h2 className='mt-3'>🤔 Description: </h2>
          <input
            type="text"
            placeholder="Description de votre projet"
            onChange={(event) => setDescription(event.target.value)}
          />
          <h2 className='mt-3'>✍️ Quantité de crédits disponible: </h2>
          <input
            type="text"
            placeholder="ex: 100 tonnes CO2"
            onChange={(event) => setQuantity(event.target.value)}
          />
          <h2 className='mt-3'>✍️ Prix unitaire des crédits: </h2>
          <input
            type="text"
            placeholder="ex: 10 Wei par tonne"
            onChange={(event) => setPricePerTon(event.target.value)}
          />
        </form>

        <button className="btn-info rounded btn-lg my-3" onClick={onCreateProjectPressed}>
          Créer mon projet
        </button>

        <button className="btn-info rounded btn-lg mx-3 my-3" onClick={onGetID}>
          Prochain ID
        </button>
      </div>

    </div>
  )
}
