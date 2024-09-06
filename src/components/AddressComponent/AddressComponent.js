import React, { useState, useEffect, useRef } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import {
  addAddress,
  calculateDeliveryCharge,
  getPostalCodes,
} from "../../store/actions/addresses";
import { Modal, Button } from "react-bootstrap";

const ROAD_FIELD_ERROR = "roadFieldError";
const FLAT_FIELD_ERROR = "flatFieldError";
const LANDMARK_ERROR = "landmarkError";
// const DEFAULT_ADDRESS_STATE = {
//   aline1: "",
//   aline2: "",
//   community: "",
//   area: "",
//   landmark: "",
//   city: "",
//   state: "",
//   postalcode: 0,
//   tag: "home",
//   latitude: "",
//   longitude: "",
// };

let autoComplete;
let addressLat = "",
  addressLong = "";
const AddressComponent = ({
  setAddress,
  setDelivery,
  onDeliveryTypeChange,
  setShowAddressForm,
  prevAddress,
  addressBtnClicked,
  setAddressBtnClicked,
}) => {
  const dispatch = useDispatch();
  const deliveryCharge = useSelector((state) => state.Addresses.deliveryCharge);
  const postalCodes = useSelector((state) => state.Addresses.postalCodes);
  const {defaultAddress} = useSelector(state => state.Addresses);
  const {
    aline1,
    aline2,
    community,
    area,
    landmark,
    city,
    state,
    postalcode,
    tag,
    latitude,
    longitude,
  } = defaultAddress;
  // const [newAddress, setNewAddress] = useState(defaultAddress);
  const [deliveryCost, setDeliveryCost] = useState({
    delivery_charge: 0,
    discount: 0,
    distance: 0,
  });
  const [pincode, setPincode] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showPincodeError, setShowPincodeError] = useState(false);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [errors, setErrors] = useState({
    flatFieldError: false,
    roadFieldError: false,
    landmarkError: false,
  });
  const [showCityAndState, setShowCityAndState] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(prevAddress) && prevAddress.postalcode !== "") {
      setPincode(prevAddress.postalcode);
      dispatch(addAddress((prevAddress)));
      setShowAddressInput(true);
    }
  }, []);

  const setErrorsbySpread = (errorType, value) => {
    setErrors((prev) => {
      return { ...prev, [errorType]: value };
    });
  };

  const handleScriptLoad = (autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { componentRestrictions: { country: "in" } }
    );
  };

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
  };

  // console.log("defaultAddress",defaultAddress);

  async function handlePlaceSelect() {
    const addressObject = autoComplete.getPlace();
    console.log("addressObject: " + JSON.stringify(addressObject));
    let matches = addressObject.address_components.filter((address_component) =>
      [
        "plus_code",
        "route",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "locality",
        "administrative_area_level_2",
        "administrative_area_level_1",
        "postal_code",
      ].some((word) => address_component.types.indexOf(word))
    );
    const aline1 = parseGoogleAddress(matches, "plus_code");
    const aline2 = parseGoogleAddress(matches, "route");
    const community = parseGoogleAddress(matches, "sublocality_level_1");
    const area =
      parseGoogleAddress(matches, "sublocality_level_2") +
      ", " +
      parseGoogleAddress(matches, "sublocality_level_3");
    const pinCodeFromGoogle = parseGoogleAddress(matches, "postal_code");
    const query = addressObject.formatted_address;
    const city = parseGoogleAddress(matches, "administrative_area_level_2");
    const state = parseGoogleAddress(matches, "administrative_area_level_1");
    setQuery(query);
    if (pinCodeFromGoogle === "") {
      dispatch(addAddress((defaultAddress)));
      
      setShowCityAndState(true);
    } else if (parseInt(pinCodeFromGoogle) !== parseInt(pincode)) {
      setPincode(pincode);
      setShowPincodeError(true);
      setShowCityAndState(true);
      ValidatePincode(pinCodeFromGoogle);
      dispatch(addAddress({
        ...defaultAddress,
        aline1: aline1,
        aline2: aline2,
        community: community,
        area: area,
        postalcode: pincode,
        city: city,
        state: state,
        latitude: addressLat,
        longitude: addressLong,
      }));
    } else {
      addressLat = addressObject.geometry.location.lat();
      addressLong = addressObject.geometry.location.lng();
      dispatch(addAddress({
        ...defaultAddress,
        aline2: aline2,
        community: community,
        area: area,
        postalcode: pincode,
        latitude: addressLat,
        longitude: addressLong,
      }));
      setShowCityAndState(false);
      const queryParams = {
        is_delivery: true,
        destination: `[${addressLat}, ${addressLong}]`,
      };
      dispatch(calculateDeliveryCharge(queryParams));
    }
  }

  const handleHouseAreaChange = (e) => {
    if (aline1 !== "") {
      setErrorsbySpread(FLAT_FIELD_ERROR, false);
    }
    if (aline2 !== "") {
      setErrorsbySpread(ROAD_FIELD_ERROR, false);
    }
    if (landmark !== "") {
      setErrorsbySpread(LANDMARK_ERROR, false);
    }
    const { name, value } = e.target;
    dispatch(addAddress({ ...defaultAddress, [name]: value }));
  };

  const handlePincodeChange = (e) => {
    // debugger;
    const numberRegex = /^[0-9]{0,6}$/;
    const { value } = e.target;
    if (numberRegex.test(value)) {
      setPincode(value);
      if (value.toString().length === 6) {
        setQuery("");
        ValidatePincode(value);
        setShowPincodeError(false);
      } else {
        setShowPincodeError(true);
        setShowAddressInput(false);
      }
    } else {
      setShowPincodeError(true);
      setShowAddressInput(false);
    }
  };

  // useEffect(() => {
  //   console.log(pincode, showDisclaimer);
  //   debugger;
  // },[showDisclaimer])
  const ValidatePincode = (pinCode) => {
    const filter = postalCodes.listPostalCodes.items.find(
      (code) => parseInt(pinCode) === code.postalcode
    );
    if (filter) {
      setShowPincodeError(false);
      setShowAddressInput(true);
      if (parseInt(prevAddress.postalcode) !== parseInt(pinCode)) {
        dispatch(addAddress({
          aline1: "",
          aline2: "",
          community: "",
          area: "",
          landmark: "",
        }));
        //setQuery("");
      }
      dispatch(addAddress({
        ...defaultAddress,
        postalcode: filter.postalcode,
        city: filter.city,
        state: filter.state,
      }));
    } else {
      setShowDisclaimer(true);
    }
  };

  useEffect(() => {
    dispatch(getPostalCodes());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(deliveryCharge)) {
      setDeliveryCost(deliveryCharge);
    }
  }, [deliveryCharge]);

  useEffect(() => {
    handleScriptLoad(autoCompleteRef);
    autoComplete.addListener("place_changed", () => handlePlaceSelect());
  }, [defaultAddress]);

  const handleGoBack = (e) => {
    e.preventDefault();
    if (
      aline2 === "" ||
      postalcode === "" ||
      city === "" ||
      state === ""
    ) {
      onDeliveryTypeChange("");
    } else if (!addressBtnClicked) {
      onDeliveryTypeChange("");
    }
    setShowAddressForm(false);
  };

  const handleAddAddress = (e) => {
    if (aline1 === "") {
      setErrorsbySpread(FLAT_FIELD_ERROR, true);
    }
    if (aline2 === "") {
      setErrorsbySpread(ROAD_FIELD_ERROR, true);
    }
    if (landmark === "") {
      setErrorsbySpread(LANDMARK_ERROR, true);
    }
    if (
      aline1 !== "" &&
      aline2 !== "" &&
      landmark !== ""
    ) {
      e.preventDefault();
      setAddressBtnClicked(true);
      setAddress(defaultAddress);
      setDelivery(deliveryCost);
      setShowAddressForm(false);
    }
  };

  return (
    <>
      <div className="mt-3 vl-address-form">
        {!showAddressInput && (
          <small>
            Enter your pin code to validate our service availability
          </small>
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
              ["e", "E", "+", "-", "."].includes(evt.key) &&
              evt.preventDefault()
            }
            onChange={handlePincodeChange}
            placeholder="Enter your pincode"
            value={pincode}
            type="number"
          />
        </FloatingLabel>
        {showDisclaimer ? (
          <Modal show={showDisclaimer || showPincodeError}>
            <Modal.Body>
              <p>
                Address found in {pincode}, which is not in our service area
                Enter your address manually
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddressInput(true);
                  setShowPincodeError(false);
                  setShowCityAndState(true);
                  setShowDisclaimer(false);
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <>
            {showAddressInput ? (
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
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Enter your address"
                    value={query}
                    type="text"
                  />
                </FloatingLabel>
                <FloatingLabel label="House No/ Flat No." className="mt-3 mb-2">
                  <Form.Control
                    className="bg-transparent border-dark"
                    value={aline1}
                    type="text"
                    placeholder="House No / Flat No."
                    name="aline1"
                    onChange={handleHouseAreaChange}
                  />
                </FloatingLabel>
                {errors.flatFieldError && (
                  <span>Please Enter valid House Number</span>
                )}
                <FloatingLabel label="Apartment / Road" className="mb-2">
                  <Form.Control
                    className="bg-transparent border-dark"
                    value={aline2}
                    type="text"
                    placeholder="Apartment/ Road"
                    name="aline2"
                    onChange={handleHouseAreaChange}
                  />
                </FloatingLabel>
                {errors.roadFieldError && (
                  <span>Please Enter valid Road number</span>
                )}
                <FloatingLabel label="Landmark" className="mb-2">
                  <Form.Control
                    className="bg-transparent border-dark"
                    value={landmark}
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                    onChange={handleHouseAreaChange}
                  />
                </FloatingLabel>
                {errors.landmarkError && (
                  <span>Please Enter valid Landmark</span>
                )}
                {showCityAndState && (
                  <>
                    <FloatingLabel label="City" className="mb-2">
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={city}
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="State" className="mb-2">
                      <Form.Control
                        className="bg-transparent border-dark"
                        value={state}
                        type="text"
                        placeholder="state"
                        name="state"
                        onChange={handleHouseAreaChange}
                      />
                    </FloatingLabel>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
        <div className="d-flex mx-auto btn-group mt-3 vl-action-btn">
          <button
            type="button"
            className="btn w-50p vl-go-next-btn"
            disabled={!showAddressInput}
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressComponent;
