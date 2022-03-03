import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { deleteAddress, getAddresses } from "../../store/actions";
import { AddressModal } from "../Products/address-modal";


export const DeliveryDetails = ({ control }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const [AddressList, setAddressList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const methods = useFormContext();
  const {  watch, setValue } = methods;
	const { subscription, variants } = watch();

  const { fields } = useFieldArray({
    control: control,
    name: "subscription",
  });

  useEffect(() => {
    if (userDetails.sub) {
      dispatch(getAddresses({ customerId: userDetails.sub }));
    }
  }, [userDetails.sub]);

  useEffect(() => {
    let temp = [];

    if (Addresses.listAddresses) {
      const items = Addresses.listAddresses.items;
      items.map((address) => {
        let label =
          address.aline1 +
          ", " +
          address.aline2 +
          ", " +
          address.city +
          ", " +
          address.state +
          ", " +
          address.postalcode;
        temp.push({ ...address, label: label, value: address.id });
      });
      setAddressList(temp);
    }
  }, [Addresses?.listAddresses?.items]);

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <Button variant="outline-dark" className="w-100" onClick={handleShow}>
          <GrAdd /> New address
        </Button>
      </components.MenuList>
    );
  };

  const CustomOption = ({ innerRef, innerProps, data, children }) => {
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span style={{ cursor: "pointer" }}>{children}</span>
        <span style={{ cursor: "pointer" }}>
          <AiFillDelete 
              onClick={(event) => {
                console.log("deleted...!!!!", data);
                dispatch(
                deleteAddress({
                  addressId: data.id,
                  customerName: data.customer_name,
                  customerId: data.customer_id,
                })
                );
                event.stopPropagation();
              }}
          />
        </span>
      </div>
    );
  };

  return (
    <>
      <AddressModal
        customerId={userDetails.sub}
        handleClose={handleClose}
        handleShow={handleShow}
        showModal={showModal}
      />
      <p className="h6 text-muted mt-3 mb-0 m-2">Delivery Address*</p>
      <p className="h6 mt-3 mb-3 m-2">{subscription[0]?.address?.label}</p>
          <Select
            placeholder={"Address..."}
            options={AddressList} className="vl-form-element"
            components={{
              MenuList: SelectMenuButton,
              Option: CustomOption,
            }}
            onChange={(address) => {
              let temp = [...subscription];
              console.log("address, temp",address ,temp);
              let addrss = { ...address };
              // delete addrss.label;
              // delete addrss.value;
              let temp2 = temp.map(obj => {
                return {...obj, address: addrss}
              });
              setValue("subscription", temp2);
            }}
          />
    </>
  );
};
