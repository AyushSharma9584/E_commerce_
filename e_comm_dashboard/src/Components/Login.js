import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form, Button, Container } from 'react-bootstrap'

const Login = () => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
    const data={email,password};
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add')
        }
    },[])
    function  loginhandle(){
         fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            
           result.json().then((res)=>{
            alert("Login Successful");
            localStorage.setItem("user-info",JSON.stringify(res));
            navigate('/add');
           })
        })
        
        
    }
    return (
        <>
        
            <h1 className="heading">Login Page</h1>
            <Container className='maincont' >
                <Form className='ctrlform'>
                    <Form.Group className="mb-3 label" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter email" />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder="Password" />
                    </Form.Group>
                   
                    <Button variant="primary" type="submit" onClick={loginhandle}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Login