import React from 'react'
import './home.css'
import photo1 from '../components/photo1.svg'
import logo from '../components/logoblueleaf.jpeg'

export default function Home() {
  return (
    <div className='row mt-5 pt-5'>
        
        <div className="text-center m-5 justify-content-center col-6">
        <h1 className='mt-5'>Bienvenue à <span className="about__name">Blue Leaf Conservation.</span></h1>
        <h2 className="about__role">Ici crédits certifié <span style={{color : 'gray'}}>une fois</span> = certifié pour <span style={{color : '#0dcaf0'}}>toujours</span>.</h2>
        <h6 className="mx-auto my-5">
        Notre plateforme donne accès une standardisation du processus de suivi des écosystèmes marins et une certification
        basée sur la blockchain grâce à une application simple et intuitive qui permet au porteur de projet d’assurer le
        suivi des actions de protection et de restauration menées sur le terrain.
        </h6>
        </div>
        <div className="col mt-5">
        <img src={logo} alt="" style={{width : "300px"}}/> 
        </div>
    </div>
  )
}
