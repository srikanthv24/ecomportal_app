import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FloatingLabel
} from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { DISCLAIMER_DATA, PICKUP, WHATSAPP_LINK } from "../../utils/constants";
import { calculateDeliveryCharge, getPostalCodes } from "../../store/actions/addresses";

let autoComplete;
let addressLat = "", addressLong = "";
const AddressComponent = ({ setAddress, setDelivery, onDeliveryTypeChange, setAddressSelected, prevAddress }) => {
  const dispatch = useDispatch();
  const deliveryCharge = useSelector((state) => state.Addresses.deliveryCharge);
  const postalCodes = useSelector((state) => state.Addresses.postalCodes);
  const loading = useSelector((state) => state.Addresses.loading);
  const [newAddress, setNewAddress] = useState({
    aline1: "",
    aline2: "",
    community: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    postalcode: 0,
    tag: "home",
    latitude: "",
    longitude: ""
  });
  const [deliveryCost, setDeliveryCost] = useState({
    delivery_charge: 0,
    discount: 0,
    distance: 0
  });
  const [pincode, setPincode] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPincodeError, setShowPincodeError] = useState(false);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [disableAddressSelect, setDisableAddressSelect] = useState(true);

  useEffect(() => {
    if (!_.isEmpty(prevAddress) && prevAddress.postalcode !== "") {
      setPincode(prevAddress.postalcode);
      setNewAddress(prevAddress);
      setShowAddressInput(true);
    }
  }, []);

  const handleScriptLoad = (autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { componentRestrictions: { country: "in" } }
    );
  }

  const parseGoogleAddress = (address, field) => {
    let result = "";
    address.find((a) => {
      if (a.types[0] === field) {
        result = a.long_name;
        return true; // stop searching
      }
      return false;
    });
    return result;
  }

  async function handlePlaceSelect() {
    const addressObject = autoComplete.getPlace();
    let matches = addressObject.address_components.filter(address_component =>
      ["route",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "locality",
        "administrative_area_level_2",
        "administrative_area_level_1",
        "postal_code"].some(word => ~address_component.types.indexOf(word)));
    const aline2 = parseGoogleAddress(matches, "route");
    const community = parseGoogleAddress(matches, "sublocality_level_1");
    const area = parseGoogleAddress(matches, "sublocality_level_2") + ", " + parseGoogleAddress(matches, "sublocality_level_3");
    const pcode = parseGoogleAddress(matches, "postal_code");
    const query = addressObject.formatted_address;
    if(parseInt(pcode) !== parseInt(pincode)) {
      setPincode("");
      setShowPincodeError(true);
      setDisableAddressSelect(true);
      setNewAddress({
        aline1: "",
        aline2: "",
        community: "",
        area: "",
        landmark: "",
        postalcode: "",
        state: "",
        city: ""
      });
    } else {
      setQuery(query);
      setNewAddress((address) => ({
        ...address,
        "aline2": aline2,
        "community": community,
        "area": area
      }));
      addressLat = addressObject.geometry.location.lat();
      addressLong = addressObject.geometry.location.lng();
      setNewAddress((address) => ({
        ...address,
        "latitude": addressLat,
        "longitude": addressLong
      }));
      const queryParams = {
        is_delivery: true,
        destination: `[${addressLat}, ${addressLong}]`
      }
      dispatch(calculateDeliveryCharge(queryParams));
    }
  }

  const handleHouseAreaChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((address) => ({ ...address, [name]: value }));
  }

  const handlePincodeChange = (e) => {
    const numberRegex = /^[0-9]{0,6}$/;
    const { value } = e.target;
    if(numberRegex.test(value)){
      setPincode(value);
    } 
  }

  useEffect(() => {
    if (pincode.toString().length === 6) {
      const filter = postalCodes.listPostalCodes.items.find(
        (code) => parseInt(pincode) === code.postalcode
      );
      if (filter) {
        setShowPincodeError(false);
        setShowAddressInput(true);
        if(parseInt(prevAddress.postalcode) !== parseInt(pincode)) {
          setNewAddress({
            aline1: "",
            aline2: "",
            community: "",
            area: "",
            landmark: ""
          });
          setQuery("");
        }
        setNewAddress((address) => ({ ...address, postalcode: filter.postalcode, city: filter.city, state: filter.state }));
        
      } else {
        setShowPincodeError(true);
        setDisableAddressSelect(true);
      }
    } else {
      setShowPincodeError(false);
      setDisableAddressSelect(true);
      setShowAddressInput(false);
    }
  }, [pincode])

  useEffect(() => {
    dispatch(getPostalCodes());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(deliveryCharge)) {
      setDeliveryCost(deliveryCharge);
      showPincodeError ? setDisableAddressSelect(true) : setDisableAddressSelect(false);
    }
  }, [deliveryCharge])

  useEffect(() => {
    if (newAddress.aline2 === "" ||
      newAddress.postalcode === "" ||
      newAddress.city === "" ||
      newAddress.state === "") {
      setDisableAddressSelect(true);
    } else {
      setDisableAddressSelect(false);
    }
    handleScriptLoad(autoCompleteRef);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect()
    );
  }, [newAddress])


  const handleGoBack = (e) => {
    e.preventDefault();
    if (newAddress.aline2 === "" ||
      newAddress.postalcode === "" ||
      newAddress.city === "" ||
      newAddress.state === "") {
      onDeliveryTypeChange("");
    } else {
      setAddressSelected(true);
    }
  }

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddress(newAddress);
    setDelivery(deliveryCost);
    setAddressSelected(true);
  }

  return (
    <>
      <div className="mt-3 vl-address-form">
        {
          !showAddressInput && <small>Enter your pin code to validate our service availability</small>
        }
        <FloatingLabel
          style={{ padding: "0" }}
          label="Pin code(6 digit)"
          className="mb-2"
          size="sm"
        >
          <Form.Control
            className="bg-transparent border border-dark"
            onChange={handlePincodeChange}
            placeholder="Enter your pincode"
            value={pincode}
            type="number"
          />
        </FloatingLabel>
        {
          showPincodeError ?
            <>
              <section className="disclaimerWrapper">
                <div className="card text-dark text-center bg-transparent border-0 disclaimer-info">
                  <h3>Unfortunately our services are not available in
                    your area, please give a call to arrange
                    alternate delivery options</h3>
                  <h3>
                    &nbsp;<strong>+91 {DISCLAIMER_DATA.CONTACT_NUMBER}</strong>&nbsp;
                    
                  </h3>

                </div>
                <div className="d-flex align-items-center justify-content-center message-contact-number-info my-3">
                  <a href={WHATSAPP_LINK} className="whatsup-info">
                    <span className="d-flex align-items-center">
                      <FaWhatsapp
                        className=""
                        style={{ width: "35px", height: "auto" }}
                      />
                    </span>
                  </a>
                  <a href={`tel:${DISCLAIMER_DATA.CONTACT_NUMBER}`} className="contact-info">
                    <span>
                      <FaPhoneAlt
                        className=""
                        style={{ width: "30px", height: "auto" }}
                      />
                    </span>
                  </a>
                </div>
              </section>
            </>
            :
            <>
              {
                showAddressInput ?
                  <>
                    <FloatingLabel
                      style={{ padding: "0" }}
                      label="Please enter your address"
                      className="mb-2"
                      size="sm"
                    >
                      <Form.Control
                        className="bg-transparent border border-dark"
                        ref={autoCompleteRef}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Enter your address"
                        value={query}
                        type="text"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="House No./Door No."
                      className="mt-3 mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.aline1}
                        type="text"
                        placeholder="houseNo"
                        name="aline1"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Address"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.aline2}
                        type="text"
                        placeholder="address"
                        name="aline2"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Street Name"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.community}
                        type="text"
                        placeholder="street"
                        name="community"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Area"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.area}
                        type="text"
                        placeholder="area"
                        name="area"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Landmark"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.landmark}
                        type="text"
                        placeholder="landmark"
                        name="landmark"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    {/* <FloatingLabel
                    label="Postal Code"
                    className="mt-3 mb-2"
                  >
                    <Form.Control
                      className="bg-transparent border-dark"
                      value={newAddress.postalcode}
                      type="text"
                      placeholder="Pincode"
                      name="postalcode"
                      disabled
                      
                    />
                  </FloatingLabel> */}
                    <FloatingLabel
                      //controlId="floatingInput"
                      label="City"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.city}
                        type="text"
                        placeholder="city"
                        name="city"
                        readOnly

                      />
                    </FloatingLabel>
                    <FloatingLabel
                      //controlId="floatingInput"
                      label="State"
                      className="mb-2"
                    >
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={newAddress.state}
                        type="text"
                        placeholder="state"
                        name="state"
                        readOnly

                      />
                    </FloatingLabel>

                  </>
                  :
                  <></>
              }
            </>
        }
        <div className="d-flex mx-auto btn-group mt-3 vl-action-btn">
          <button type="button" className="btn w-50p vl-go-back-btn" onClick={handleGoBack}>Go Back</button>
          <button type="button" className="btn w-50p vl-go-next-btn" disabled={disableAddressSelect} onClick={handleAddAddress}>Add Address</button>
        </div>
      </div>

    </>
  )
}

export default AddressComponent;