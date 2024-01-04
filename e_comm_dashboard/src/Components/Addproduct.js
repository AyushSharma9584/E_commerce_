import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap'



const Addproduct = () => {
    const navigate = useNavigate();
    const [product, setproduct] = useState('');
    const [file, setfile] = useState("");
    const [company, setcompany] = useState('');
    const [price, setprice] = useState('');
    const [desc, setDesc] = useState('');
    async function submithandle(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("product", product)
        formdata.append("file", file)
        formdata.append("company", company)
        formdata.append("desc", desc)
        formdata.append("price", price)
        

        // fetch('http://localhost:5000/uploadfile', {
        //     method: "Post",
        //     headers: {
        //         'Accept': "application/json",
        //         'Content-Type': 'application/json'
        //     },
        //     body: formdata,
        // }).then((result)=>{
        //     console.log("data send")
        // })
        await axios.post('http://localhost:5000/uploadfile',
            formdata, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        )
        navigate('/productlist')

    }
    return (
        <>
           
            <h1 className='heading'> Addproduct</h1>
            <Container className='maincont' >
                <Form className='addctrlform'>
                    <Form.Group className="mb-3" >
                        <Form.Label>Product name</Form.Label>
                        <Form.Control value={product} type="text" onChange={(e) => { setproduct(e.target.value) }} placeholder="Enter Product name" />
                    </Form.Group>


                    <Form.Group className="mb-3 label" >
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => { setfile(e.target.files[0]) }} />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Company name</Form.Label>
                        <Form.Control value={company} type="text" placeholder="Enter Company name" onChange={(e) => { setcompany(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Product Desc</Form.Label>
                        <Form.Control value={desc} type="text" placeholder="Enter description " onChange={(e) => { setDesc(e.target.value) }} />
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={price} type="number" placeholder="Enter Price" onChange={(e) => { setprice(e.target.value) }} />
                    </Form.Group>

                    <Button onClick={submithandle} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Addproduct