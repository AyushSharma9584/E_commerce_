import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props){
    const Cmp=props.cmp;
    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navigate('/register')
        }
      
    },[])
   
    return(
        <>
         
        <Cmp/>
        </>
    )
}

export default Protected