import React, { useEffect, useState } from 'react';
import { Col, Form, Row, FloatingLabel, Button, Modal } from 'react-bootstrap';
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';
import { getPostalCodes } from '../../store/actions/addresses';
import { postAddress } from '../../store/actions/addresses';

export const AddressModal = ({customerId, showModal, handleClose, handleShow}) => {

   const dispatch = useDispatch();
   const postalCodes = useSelector(state => state.Addresses.postalCodes);
   const [ pinCodes, setPinCodes ] = useState([]);

   //pincode filter
   const [filteredPinCode, setFilteredPinCode] = useState([]);


    useEffect(() => {
        dispatch(getPostalCodes());
    }, [dispatch]);

    useEffect(() => {
        if(postalCodes && postalCodes.listPostalCodes){
            setPinCodes(postalCodes.listPostalCodes.items);   
        }
    }, [postalCodes.listPostalCodes]);

    console.log("postal codes:::::", postalCodes);
    console.log("pinnnnnnnn codeeeeee codes:::::", pinCodes);

    const [newAddress, setNewAddress ] = useState({
        aline1: "", 
        aline2: "", 
        community: "",
        area: "", 
        landmark: "", 
        city: "", 
        state: "", 
        postalcode: 500001,
        customer_id: customerId, 
        tag: "", 
        customer_name: "test"
    });

   
    function handlePostalCodes(e)  {
                console.log("entered code:::::", (e.target.value).length);
                if((e.target.value)) {
                    const filter = pinCodes.filter(obj => obj.postalcode == e.target.value);
                    setFilteredPinCode(filter);
                }
        }

    console.log("filtered pincodes:::::", filteredPinCode);

    const handleAddress = (key, value ) => {
        setNewAddress({
            ...newAddress,
            [key] : value
        })
    }

    console.log("new address state::::", newAddress);

    const handleSubmit = () => {
        dispatch(postAddress(newAddress));
        handleClose();

        console.log("dispatch will be called here...");
    }    

    return (
        <>
            {/* <Row className="w-100">
                <Col xs={12} sm={12} md={6} lg={6} className="m-3" > */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h1 className="fs-3 text-start mt-3">Add a new address</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel
                            //controlId="floatingInput"
                            style={{padding:'0'}}
                            label="Pin Code (6 digits)"
                            className="mb-2"
                            size="sm"
                        >
                            {/* <Form.Control type="number" placeholder="pinCode" name="postalcode" onChange={(e) => handleAddress(e.target.name, e.target.value)} /> */}
                            <Form.Control 
                                type="tel" 
                                placeholder="pinCode" 
                                name="postalcode" 
                                // onChange={e => setValue(e.target.value)} 
                                onChange={e => handlePostalCodes(e)}
                                maxLength="6"
                                />
                        </FloatingLabel>
                        
                        {filteredPinCode.length && filteredPinCode[0].postalcode ? (
                            <div>
                            <FloatingLabel
                            //controlId="floatingInput"
                            label="Tag"
                            className="mb-2"
                            size="sm"
                        >
                            <Form.Control type="text" placeholder="tag" name="tag" onChange={(e) => handleAddress(e.target.name, e.target.value)}/>
                        </FloatingLabel>

                            <FloatingLabel
                            //controlId="floatingInput"
                            label="House No./Door No."
                            className="mb-2"
                            >
                            <Form.Control type="text" placeholder="houseNo" name="aline1" onChange={(e) => handleAddress(e.target.name, e.target.value)}/>
                            </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="Apartment Name"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="apartmentNo" name="aline2" onChange={(e) => handleAddress(e.target.name, e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="Street Name"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="street" name="community" onChange={(e) => handleAddress(e.target.name, e.target.value) }/>
                        </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="Area"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="area" name="area" onChange={(e) => handleAddress(e.target.name, e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="Landmark"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="landmark" name="landmark" onChange={(e) => handleAddress(e.target.name, e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="City"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="city" name="city" onChange={(e) => handleAddress(e.target.name, e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel
                            //controlId="floatingInput"
                            label="State"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="state" name="state" onChange={(e) => handleAddress(e.target.name, e.target.value)} />
                        </FloatingLabel>
                    </div>
                    
                    ) : <div className="p-3 mb-2 bg-info text-dark">Sorry, we are not serving in your area</div>
                    }
                    </Form>
                    </Modal.Body>
                    {filteredPinCode.length && filteredPinCode[0].postalcode ? (
                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={handleSubmit}>
                            Save Address
                        </Button>
                    </Modal.Footer>
                     ) : ''
                    }
                </Modal>
                {/* </Col>
            </Row> */}
        </>
    );
}