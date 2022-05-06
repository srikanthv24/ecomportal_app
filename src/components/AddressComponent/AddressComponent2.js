import React, { useState, useEffect, useRef } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { parseGoogleAddress } from "./AddressComponent.utils";
import AddressErrorPage from "./AddressErrorPage";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateDeliveryCharge,
  getPostalCodes,
} from "../../store/actions/addresses";

/********************************** ************************
Things to know before editing this file.
value stored in aline1 is mapped to House No/Flat No field
value stored in aline2 is mapped to Apartment/ Road field
value stored in landmark is mapped to landmark field

********************************** ************************/

const ROAD_FIELD_ERROR = "roadFieldError";
const FLAT_FIELD_ERROR = "flatFieldError";
const LANDMARK_ERROR = "landmarkError";

const AddressComponent2 = ({
  setAddress,
  setDelivery,
  onDeliveryTypeChange,
  setShowAddressForm,
  prevAddress,
}) => {
  const dispatch = useDispatch();
  const deliveryCharge = useSelector((state) => state.Addresses.deliveryCharge);
  const postalCodes = useSelector((state) => state.Addresses.postalCodes);
  const loading = useSelector((state) => state.Addresses.loading);
  const [pincode, setPincode] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPincodeError, setShowPincodeError] = useState(false);
  const [disableAddressSelect, setDisableAddressSelect] = useState(true);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({
    flatFieldError: false,
    roadFieldError: false,
    landmarkError: false,
  });
  const [showCityAndState, setShowCityAndState] = useState(false);
  const autoCompleteRef = useRef(null);
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
    longitude: "",
  });
  let autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "in" } }
  );
  useEffect(() => {
    dispatch(getPostalCodes());
  }, []);
  useEffect(() => {
    console.log("Calling auto complete ");

    autoComplete.addListener("place_changed", () => handlePlaceSelect());
  }, [autoCompleteRef]);

  const resetState = () => {
    setErrors({
      flatFieldError: false,
      roadFieldError: false,
      landmarkError: false,
    });
  };
  const setErrorsbySpread = (errorType, value) => {
    setErrors((prev) => {
      return { ...prev, [errorType]: value };
    });
  };
  const handlePincodeChange = (e) => {
    const numberRegex = /^[0-9]{0,6}$/;
    const { value } = e.target;
    if (numberRegex.test(value)) {
      setPincode(value);
    } else return;

    if (value.toString().length === 6) {
      const servicablePincodeData = postalCodes?.listPostalCodes?.items?.find(
        (code) => parseInt(value) === code.postalcode
      );
      if (servicablePincodeData) {
        setShowPincodeError(false);
        setShowAddressInput(true);
        if (parseInt(prevAddress.postalcode) !== parseInt(value)) {
          setNewAddress({
            aline1: "",
            aline2: "",
            community: "",
            area: "",
            landmark: "",
            postalcode: "",
            state: "",
            city: "",
          });
          setQuery("");
        }
        setNewAddress((address) => ({
          ...address,
          postalcode: servicablePincodeData.postalcode,
          city: servicablePincodeData.city,
          state: servicablePincodeData.state,
        }));
      } else {
        setShowPincodeError(true);
        setDisableAddressSelect(true);
      }
    } else {
      setDisableAddressSelect(true);
      setShowAddressInput(false);
    }
  };

  const handleAddAddress = (e) => {
    if (newAddress.aline1 === "") {
      setErrorsbySpread(FLAT_FIELD_ERROR, true);
    }
    if (newAddress.aline2 === "") {
      setErrorsbySpread(ROAD_FIELD_ERROR, true);
    }
    if (newAddress.landmark === "") {
      setErrorsbySpread(LANDMARK_ERROR, true);
    }
    e.preventDefault();
    setAddress(newAddress);
    setDelivery(deliveryCharge);
    setShowAddressForm(false);
  };

  const handleHouseAreaChange = () => {
    if (newAddress.aline1 !== "") {
      setErrorsbySpread(FLAT_FIELD_ERROR, false);
    }
    if (newAddress.aline2 !== "") {
      setErrorsbySpread(ROAD_FIELD_ERROR, false);
    }
    if (newAddress.landmark !== "") {
      setErrorsbySpread(LANDMARK_ERROR, false);
    }
  };

  async function handlePlaceSelect() {
    console.log("place select handling");
    const addressObject = autoComplete.getPlace();
    let matches = addressObject.address_components.filter((address_component) =>
      [
        "route",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "locality",
        "administrative_area_level_2",
        "administrative_area_level_1",
        "postal_code",
      ].some((word) => ~address_component.types.indexOf(word))
    );
    const aline2 = parseGoogleAddress(matches, "route");
    const community = parseGoogleAddress(matches, "sublocality_level_1");
    const area =
      parseGoogleAddress(matches, "sublocality_level_2") +
      ", " +
      parseGoogleAddress(matches, "sublocality_level_3");
    const pcode = parseGoogleAddress(matches, "postal_code");
    const query = addressObject.formatted_address;
    if (parseInt(pcode) !== parseInt(pincode)) {
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
        city: "",
      });
    } else {
      setQuery(query);
      setNewAddress((address) => ({
        ...address,
        aline2: aline2,
        community: community,
        area: area,
      }));
      const addressLat = addressObject.geometry.location.lat();
      const addressLong = addressObject.geometry.location.lng();
      setNewAddress((address) => ({
        ...address,
        latitude: addressLat,
        longitude: addressLong,
      }));
      const queryParams = {
        is_delivery: true,
        destination: `[${addressLat}, ${addressLong}]`,
      };
      dispatch(calculateDeliveryCharge(queryParams));
    }
  }

  return (
    <div className="mt-3 vl-address-form">
      {!showAddressInput && (
        <small>Enter your pin code to validate our service availability</small>
      )}
      <FloatingLabel
        style={{ padding: "0" }}
        label="Pin code(6 digit)"
        className="mb-2"
        size="sm"
      >
        <Form.Control
          className="bg-transparent border border-dark"
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
          }
          onChange={handlePincodeChange}
          placeholder="Enter your pincode"
          value={pincode}
          type="number"
        />
      </FloatingLabel>
      {showPincodeError ? (
        <AddressErrorPage />
      ) : (
        showAddressInput && (
          <>
            <FloatingLabel
              style={{ padding: "0" }}
              label="Enter locality, street name"
              className="mb-2"
              size="sm"
            >
              <Form.Control
                className="bg-transparent border border-dark"
                ref={autoCompleteRef}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter locality, street name"
                value={query}
                type="text"
              />
            </FloatingLabel>
            <FloatingLabel label="House No/ Flat No." className="mt-3 mb-2">
              <Form.Control
                className="bg-transparent border-dark"
                value={newAddress.aline1}
                type="text"
                placeholder="House No / Flat No."
                name="flatNo"
                onChange={handleHouseAreaChange}
              />
            </FloatingLabel>
            {errors.flatFieldError && (
              <span>Please Enter valid House Number</span>
            )}
            <FloatingLabel label="Apartment / Road" className="mb-2">
              <Form.Control
                className="bg-transparent border-dark"
                value={newAddress.aline2}
                type="text"
                placeholder="Apartment/ Road"
                name="road"
                onChange={handleHouseAreaChange}
              />
            </FloatingLabel>
            {errors.roadFieldError && (
              <span>Please Enter valid Road number</span>
            )}
            <FloatingLabel label="Landmark" className="mb-2">
              <Form.Control
                className="bg-transparent border-dark"
                value={newAddress.landmark}
                type="text"
                placeholder="Landmark"
                name="aline2"
                onChange={handleHouseAreaChange}
              />
            </FloatingLabel>
            {showCityAndState && (
              <>
                <FloatingLabel label="City" className="mb-2">
                  <Form.Control
                    className="bg-transparent border-dark"
                    value={newAddress.city}
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleHouseAreaChange}
                  />
                </FloatingLabel>
                <FloatingLabel label="State" className="mb-2">
                  <Form.Control
                    className="bg-transparent border-dark"
                    value={newAddress.landmark}
                    type="text"
                    placeholder="state"
                    name="state"
                    onChange={handleHouseAreaChange}
                  />
                </FloatingLabel>
              </>
            )}
            {errors.landmarkError && <span>Please Enter valid Landmark</span>}
            <div className="d-flex mx-auto btn-group mt-3 vl-action-btn">
              <button
                type="button"
                className="btn w-50p vl-go-next-btn"
                disabled={disableAddressSelect}
                onClick={handleAddAddress}
              >
                Add Address
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AddressComponent2;
