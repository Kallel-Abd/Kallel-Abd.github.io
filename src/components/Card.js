import React from 'react'

export default function Card(props) {
  
  return (
    <div>
        <div className="card m-3" style={{width: 300}}>
        <div className="card-header">
            Projet  #{props.tab[0]}
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Nom : {props.tab[1]}</li>
            <li className="list-group-item">Description : {props.tab[2]}</li>
            <li className="list-group-item">Quantité réstante : {props.tab[3]}</li>
            <li className="list-group-item">Prix unitaire : {props.tab[4]}</li>
        </ul>
        </div>
    </div>
  )
}
