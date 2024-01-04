import React, { useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Updateproduct from './Updateproduct';


const Productlist = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState([])
    const [product, setproduct] = useState('');
    const [file, setfile] = useState("");
    const [company, setcompany] = useState('');
    const [desc, setdesc] = useState('');
    const [price, setprice] = useState('');
    useEffect(() => {
        listallitem();

    }, [])

    function listallitem() {
        fetch('http://localhost:5000/listprod').then((result) => {
            result.json().then((res) => {

                setdata(res);

            })
        })

    }

    function updatehandle(id) {
        // console.log(data[id])
        // setproduct(data[id].product)
        // setfile(data[id].file)
        // setcompany(data[id].company)
        // setprice(data[id].price)



        navigate("/update/" + (id))
    }

    function deletehandle(id) {
        console.log(id)
        fetch(`http://localhost:5000/deleteitem/${id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((result) => {
            alert("Delete Successfully")
            listallitem();
        })


    }

    return (
        <>
           
            <h1 className='heading'>Product List</h1>
            {
               data.length>0? <div className='col-sm-8 offset-sm-2'>


                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>Sr. no.</th>
                                <th>Product Name</th>
                                <th>Image of product</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Productdesc</th>
                                <th>Operations</th> 

                            </tr>
                        </thead>

                        <tbody>

                            {
                                data.map((item, index) => {
                                    return (


                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.product}</td>
                                            <td><img style={{ width: 100 }} src={'http://localhost:5000/uploads/' + item.file} /></td>
                                            <td>{item.company}</td>
                                            <td>{item.price}</td>
                                            <th>{item.desc}</th>
                                            <td><Button onClick={() => updatehandle(item._id)}>Update</Button> <Button onClick={() => deletehandle(item._id)}>Delete</Button></td>
                                        </tr>




                                    )

                                })




                            }
                        </tbody>
                    </Table>


                </div >: <h1 className='heading' style={{margin:50, color:"red"}}>NO Result Found!!!! Add items</h1>
            }


        </>
    )
}

export default Productlist




