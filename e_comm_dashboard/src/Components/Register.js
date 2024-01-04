import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form, Button, Container } from 'react-bootstrap'


const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpass] = useState("")
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add')
        }
    })


    const submithandle = (e) => {
        let item = { name, email, password }
        e.preventDefault();
        fetch('http://localhost:5000/register', {
            method: "Post",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.log("result", resp);
                localStorage.setItem('user-info',JSON.stringify(resp));
                navigate('/add')
                

            })

        })
        navigate('/add')

    }
    

    return (
        <>
        
            <h1 className="heading">Signup Page</h1>
            <Container className='maincont' >
                <Form className='ctrlform'>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => { setname(e.target.value) }} type="text" placeholder="Enter your Name" />
                    </Form.Group>


                    <Form.Group className="mb-3 label" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => { setpass(e.target.value) }} type="text" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={submithandle} type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Register