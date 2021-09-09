import React, { useEffect, useState } from "react";
import { ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import DatePicker, { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAddresses } from "../../store/actions";

const ProductPlanner = ({ customerId, productId, data }) => {
  const [Variants, setVariants] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const dispatch = useDispatch();
  const Addresses = useSelector((state) => state.Addresses.addressList);

  useEffect(() => {
    let temp = [];

    data &&
      data.variant &&
      data.variant.map((variant) => {
        let temp1 = [];
        variant.variant_item.map((varItem) => {
          temp1.push({
            label: varItem.display_name,
            value: varItem.display_name,
          });
        });
        temp.push({ ...variant, variant_item: temp1 });
      });
    setVariants(temp);
  }, [data]);

  useEffect(() => {
    dispatch(getAddresses({ customerId }));
  }, [customerId]);

  useEffect(() => {
    console.log("Addresses-->", Addresses);
    let temp = [];

    if (Addresses.listAddresses) {
      console.log("Im Print", Addresses.listAddresses.items);
      const items = Addresses.listAddresses.items
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
        temp.push({ label: label, value: address.id });
      });
      setAddressList(temp);
    }

    console.log("Addresses-->2", temp);
  }, [Addresses]);

  let deliverables = [
    { name: "Breakfast", value: "breakfast" },
    { name: "Lunch & Dinner", value: "LunchDinner" },
  ];

  console.log("Variant==>", Variants);
  return (
    <div>
      {Variants &&
        Variants.map((variant) => {
          return (
            <>
              <p className="h6 text-muted mt-3 mb-0 m-2">
                {variant.display_name} *
              </p>
              <Select
                placeholder={variant.display_name}
                isMulti={variant.is_multiselect}
                options={variant.variant_item}
              />
            </>
          );
        })}
      {/* <DatePicker multiple plugins={[<DatePanel />]} /> */}
      <div style={{ width: "100%" }}>
        <p className="h6 text-muted mt-3 mb-0 m-2">Date *</p>
        <Calendar multiple style={{ width: "100%" }} />
      </div>

      {/* BreakFast */}
      {deliverables.map((deliver) => {
        return (
          <div>
            <p className="h6 text-muted mt-3 mb-0 m-2">{deliver.name}</p>
            <Form.Group
              className="mb-3"
              controlId={deliver.value}
              style={{ padding: "0 10px" }}
            >
              <Form.Check
                inline
                name={deliver.value}
                type="radio"
                label="Pickup"
                checked
              />
              <Form.Check
                inline
                name={deliver.value}
                type="radio"
                label="Delivery"
              />
            </Form.Group>

            <p className="h6 text-muted mt-3 mb-0 m-2">
              {deliver.name} Address *
            </p>
            <Select
              placeholder={"Address..."}
              // isMulti={variant.is_multiselect}
              options={AddressList}
            />
          </div>
        );
      })}

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <p className="h6 text-muted mt-3 mb-0 m-2">Note: </p>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="note while delivery..."
        />
      </Form.Group>
      {/* Meals */}
    </div>
  );
};

export default ProductPlanner;
