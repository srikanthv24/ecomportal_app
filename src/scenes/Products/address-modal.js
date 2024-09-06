import React, { useEffect, useState } from "react";
import { Col, Form, Row, FloatingLabel, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAddresses, getPostalCodes } from "../../store/actions/addresses";
import { postAddress } from "../../store/actions/addresses";

export const AddressModal = ({
  customerId,
  showModal,
  handleClose,
  updateAddress,
  handleSubmit
}) => {
  const dispatch = useDispatch();
  const postalCodes = useSelector((state) => state.Addresses.postalCodes);
  const [pinCodes, setPinCodes] = useState([]);
  const userDetails = useSelector((state) => state.auth.userDetails);

  //pincode filter
  const [filteredPinCode, setFilteredPinCode] = useState(0);

  useEffect(() => {
    if(userDetails.sub) {
      dispatch(getPostalCodes());
    }
  }, [userDetails]);

  useEffect(() => {
    if (postalCodes?.listPostalCodes && postalCodes?.listPostalCodes?.items?.length) {
      setPinCodes(postalCodes?.listPostalCodes.items);
    }
  }, [postalCodes?.listPostalCodes]);

  const [newAddress, setNewAddress] = useState({
    aline1: "",
    aline2: "",
    community: "",
    // area: "",
    landmark: "",
    city: "",
    state: "",
    postalcode: 0,
    customer_id: customerId,
    tag: "",
    customer_name: userDetails.name,
  });

  function handlePostalCodes(e) {
    if (e.target.value) {
      const filter = pinCodes.filter((obj) => obj.postalcode == e.target.value);
      filter.length && handleAddress("postalcode", filter[0].postalcode);
      setFilteredPinCode(filter);
    }
  }

  const handleAddress = (key, value) => {
    setNewAddress({
      ...newAddress,
      [key]: value,
    });
  };

  const handleAddressSubmit = () => {
    // dispatch(postAddress(newAddress));
    // dispatch(getAddresses({ customerId }));
    // handleClose();
    handleSubmit(newAddress);
  };

  return (
    <>
      {/* <Row className="w-100">
                <Col xs={12} sm={12} md={6} lg={6} className="m-3" > */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1 className="fs-3 text-start mt-3">Add a new address</h1>
        </Modal.Header>
        <Modal.Body>
          <>
            <FloatingLabel
              //controlId="floatingInput"
              style={{ padding: "0" }}
              label="Pin Code (6 digits)"
              className="mb-2"
              size="sm"
            >
              {/* <Form.Control type="number" placeholder="pinCode" name="postalcode" onChange={(e) => handleAddress(e.target.name, e.target.value)} /> */}
              <Form.Control
                type="tel"
                placeholder="pinCode"
                name="postalcode"
                onBlur={updateAddress}
                // onChange={e => setValue(e.target.value)}
                onChange={(e) => handlePostalCodes(e)}
                maxLength="6"
              />
            </FloatingLabel>

            {filteredPinCode === 0 && (
              <div className="p-3 mt-4 mb-2 custom-btn text-dark text-center">
                Validate Pincode for Delivery
              </div>
            )}
            {filteredPinCode &&
            filteredPinCode?.length &&
            filteredPinCode[0]?.postalcode ? (
              <div>
                <FloatingLabel
                  //controlId="floatingInput"
                  label="Tag"
                  className="mb-2"
                  size="sm"
                >
                  <Form.Control
                    type="text"
                    placeholder="tag"
                    name="tag"
                    onBlur={updateAddress}
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>

                <FloatingLabel
                  //controlId="floatingInput"
                  label="House No./Door No."
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="houseNo"
                    onBlur={updateAddress}
                    name="aline1"
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  //controlId="floatingInput"
                  label="Apartment Name"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="apartmentNo"
                    onBlur={updateAddress}
                    name="aline2"
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  //controlId="floatingInput"
                  label="Street Name"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="street"
                    onBlur={updateAddress}
                    name="community"
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
                {/* <FloatingLabel
                  //controlId="floatingInput"
                  label="Area"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="area"
                    name="area"
                    onBlur={updateAddress}
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel> */}
                <FloatingLabel
                  //controlId="floatingInput"
                  label="Landmark"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="landmark"
                    name="landmark"
                    onBlur={updateAddress}
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  //controlId="floatingInput"
                  label="City"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="city"
                    onBlur={updateAddress}
                    name="city"
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  //controlId="floatingInput"
                  label="State"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    onBlur={updateAddress}
                    placeholder="state"
                    name="state"
                    onChange={(e) =>
                      handleAddress(e.target.name, e.target.value)
                    }
                  />
                </FloatingLabel>
              </div>
            ) : null}

            {filteredPinCode.length === 0 && (
              <div className="p-3 mt-4 mb-2 custom-btn text-dark">
                Sorry currently our services are not available in your location.
              </div>
            )}
          </>
        </Modal.Body>
        {filteredPinCode.length && filteredPinCode[0].postalcode ? (
          <Modal.Footer>
            <Button className="vl-close-btn" onClick={handleClose}>
              Close
            </Button>
            <Button className="vl-save-btn" onClick={handleAddressSubmit}>
              Save Address
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
      {/* </Col>
            </Row> */}
    </>
  );
};
