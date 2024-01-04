import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Params, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';



const Updateproduct = () => {
    const navigate = useNavigate();
    const param = useParams();

    const [product, setproduct] = useState('');
    const [file, setfile] = useState("");
    const [company, setcompany] = useState('');
    const [price, setprice] = useState('');
    useEffect(() => {
        getdata();

    }, [])
    function getdata() {
        fetch(`http://localhost:5000/product/${param.id}`).then((result) => {
            result.json().then((res) => {

                setproduct(res.product);
                setfile(res.file)
                setcompany(res.company)
                setprice(res.price)


            })
        })
    }

    async function submithandle(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("product", product)
        formdata.append("file", file)
        formdata.append("company", company)
        formdata.append("price", price)
        // fetch(`http://localhost:5000/update/${param.id}`,{
        //     method:'put',
        //     headers:{

        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: formdata
        // }).then((res)=>{
        //     console.log("all good")
        // })

        await axios.put(`http://localhost:5000/update/${param.id}`,
            formdata, {
            headers: { 'Content-Type': 'multipart/form-data' }

        }
        )
        navigate('/productlist')

    }
    return (
        <>
           
            <h1 className='heading'> Update Product</h1>
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


export default Updateproduct