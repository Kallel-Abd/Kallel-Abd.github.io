import React from 'react';
import Card from '../components/Card';
import { useState,useEffect } from 'react';
import { getID,getProjectDetails } from '../util/interact';

export default function Projects() {

    const [projectList,setProjectList]=useState([]);
    const [number,setNumber]=useState(0);
    
    
    
    const onRefresh= async ()=>{
        const { success, result } = await getID();
        if (success) {
            console.log("number of projects");
            console.log(result[0]-1);
            setNumber(result[0]-1);
            setProjectList([]);
            let newtab =[];
            for (let index = 1; index <= number; index++) {
                const { success, result } =await getProjectDetails(index);
                if (success){
                    newtab.push(result);
                }
            }
            setProjectList(newtab);
          }
        //console.log(projectList);
    }

    

  return (
    <div>
    <div className='container text-end  p-5'>
    <button className="btn-info rounded btn-lg" onClick={onRefresh}>
          Refresh
        </button>
    </div>
    <div className='container '>
        <div className="text-center  mb-5">
          <h1>Projets </h1>
        </div>
        <div className="container text-center justify-content-center">
          <div className="row text-center">
              {projectList.map(
                (item) =>
                <div className="col col-4 mx-auto my-3" key={item[0]}>
                  <Card tab={item} />
                </div>
              )}
          </div>
        </div>
        
        
    </div>
    </div>
  )
}
