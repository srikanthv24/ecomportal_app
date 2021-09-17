import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
import { getAddresses } from "../../store/actions";
import { AddressModal } from "./address-modal";

const ProductPlanner = ({
  customerId,
  productId,
  data,
  FormData,
  handleChange,
}) => {
  const [Variants, setVariants] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const dispatch = useDispatch();
  const Addresses = useSelector((state) => state.Addresses.addressList);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    let temp = [];

    data &&
      data.variants &&
      data.variants.map((variant) => {
        let temp1 = [];
        variant.variant_items.map((varItem) => {
          temp1.push({
            label: varItem.display_name,
            value: varItem.display_name,
          });
        });
        temp.push({ ...variant, variant_items: temp1 });
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
        temp.push({ label: label, value: address.id });
      });
      setAddressList(temp);
    }

    console.log("Addresses-->2", temp);
  }, [Addresses]);

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <button
          className="bg-light w-100 border-0 text-start"
          onClick={handleShow}
        >
          Add new address
        </button>
      </components.MenuList>
    );
  };

  let deliverables = [
    { name: "Breakfast", value: "breakfast" },
    { name: "Lunch", value: "lunch" },
    { name: "Dinner", value: "dinner" },
  ];

  console.log("Variant==>", FormData);

  return (
    <div>
      <AddressModal
        customerId={customerId}
        handleClose={handleClose}
        handleShow={handleShow}
        showModal={showModal}
      />
      {Variants &&
        Variants.map((variant) => {
          return (
            <>
              <p className="h6 text-muted mt-3 mb-0 m-2">
                {variant.display_name} *
              </p>
              <Select
                name={variant.display_name}
                placeholder={variant.display_name}
                isMulti={variant.is_multiselect}
                options={variant.variant_items}
                value={FormData.variant[variant.display_name]}
                onChange={(value) => {
                  let temp = {};

                  temp[variant.display_name] = value;

                  handleChange("variant", temp);
                }}
              />
            </>
          );
        })}

      <Accordion defaultActiveKey="0" className="mt-4">
        {/* BreakFast */}
        {deliverables.map((deliver) => {
          return (
            <Accordion.Item eventKey={deliver.name}>
              <Accordion.Header>{deliver.name}</Accordion.Header>
              <Accordion.Body>
                <div>
                  <p className="h6 text-muted mt-3 mb-0 m-2">{deliver.name}</p>
                  <div style={{ margin: 3 }}>
                    <input
                      type="radio"
                      name={deliver.value}
                      onChange={(ev) =>
                        handleChange("mealplan_type", {
                          ...FormData.mealplan_type,
                          [ev.target.name]: {
                            ...FormData.mealplan_type[deliver.value],
                            pickupORdelivery: "Pickup",
                          },
                        })
                      }
                      style={{ marginRight: 3 }}
                    />
                    Pickup
                  </div>
                  <div style={{ margin: 3 }}>
                    <input
                      type="radio"
                      name={deliver.value}
                      onChange={(ev) =>
                        handleChange("mealplan_type", {
                          ...FormData.mealplan_type,
                          [ev.target.name]: {
                            ...FormData.mealplan_type[deliver.value],
                            pickupORdelivery: "delivery",
                          },
                        })
                      }
                    />{" "}
                    Delivery
                  </div>
                  <p className="h6 text-muted mt-3 mb-0 m-2">
                    {deliver.name} Address *
                  </p>
                  {FormData.mealplan_type[deliver.value].pickupORdelivery ==
                    "delivery" && (
                    <Select
                      placeholder={"Address..."}
                      options={AddressList}
                      components={{ MenuList: SelectMenuButton }}
                      // onChange={}
                      value={FormData}
                    />
                  )}
                  <div style={{ width: "100%" }}>
                    <p className="h6 text-muted mt-3 mb-0 m-2">Date *</p>
                    <Calendar
                      multiple
                      range
                      // numberOfMonths={2}
                      minDate={new Date()}
                      style={{ width: "100%" }}
                      onChange={(dateObj) => {
                        let temp = [];
                        dateObj.map((date) => {
                          temp.push(date.format());
                        });
                        handleChange("mealplan_type", {
                          ...FormData.mealplan_type,
                          [deliver.value]: {
                            ...FormData.mealplan_type[deliver.value],
                            order_dates: temp,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <p className="h6 text-muted mt-3 mb-0 m-2">Note: </p>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="note while delivery..."
          value={FormData.notes}
          onChange={(ev) => handleChange("notes", ev.target.value)}
        />
      </Form.Group>
      {/* Meals */}
    </div>
  );
};

export default ProductPlanner;
