import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  FloatingLabel,
  InputGroup,
  Image,
} from "react-bootstrap";
import * as yup from "yup";
import VLogo from "../../assets/Vibrant-Living-logo.png";

const registerSchema = yup.object().shape({
  password: yup.string().required("Password is required."),
  name: yup.string().required("Name is required."),
  phone: yup
    .string()
    .required("Phone is required.")
    .max(10, "Phone number shouldn't exceed 10 digits")
    .min(10, "Phone number must be 10 digits"),
});

const Register = () => {
  const [FormData, setFormData] = useState({
    phone: "",
    password: "",
    name: "",
  });

  const [FormErrors, setFormErrors] = useState({});

  const handleChange = (key, value) => {
    if (key == "phone") {
      if (value.length <= 10)
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    } else {
      setFormData((prevState) => ({ ...prevState, [key]: value }));
    }
  };

  const handleSubmit = () => {
    console.log("FormData");
    registerSchema.isValid(FormData).then((res) => {
      if (res) {
        console.log("isValid", res);
        setFormErrors({});
      } else {
        let isVaidated = registerSchema
          .validate(FormData, {
            abortEarly: false,
          })
          .then((res) => {
            console.log("isValid-1", res);
            return res;
          })
          .catch((err) => {
            let temp = {};
            err.inner.map((error) => {
              console.log("isValidError", error.path);
              temp[error.path] = error.message;
            });
            setFormErrors(temp);
            console.log("TEMP_+_+", temp);
            return err;
          });
        console.log("isValid___", isVaidated);
      }
    });
  };

  return (
    <div>
      <div className="text-center mt-4">
        <Image src={VLogo} height="80" />
      </div>
      <p className="fs-5 fw-bold mt-4 mb-3 secondary-color text-center" style={{fontFamily:'Roboto Mono',fontWeight:'500',fontSize:'15px', textTransform:'uppercase'}} >
        Create Account
      </p>

      <Form>
        <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-4 pos-rel">
          <Form.Control
            type="number"
            maxLength="10"
            placeholder="Enter your phone number"
            required
            value={FormData.phone}
            onChange={(ev) => handleChange("phone", ev.target.value)}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingLeft: 5,
              position:'absolute',top:'100%'
            }}
            className="text-danger"
          >
            {FormErrors.phone}
          </span>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Name" className="mb-4 pos-rel">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            required
            value={FormData.name}
            onChange={(ev) => handleChange("name", ev.target.value)}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingLeft: 5,
              position:'absolute',top:'100%'
            }}
            className="text-danger"
          >
            {FormErrors.name}
          </span>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Password" className="mb-4 pos-rel">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={FormData.password}
            onChange={(ev) => handleChange("password", ev.target.value)}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingLeft: 5,
              position:'absolute',top:'100%'
            }}
            className="text-danger"
          >
            {FormErrors.password}
          </span>
        </FloatingLabel>

        <Button
          className="custom-btn w-100" style={{background:'#614731 !important'}}
          variant="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
