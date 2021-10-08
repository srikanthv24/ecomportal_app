/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
import { getAddresses } from "../../store/actions";
import { AddressModal } from "./address-modal";
import moment from "moment";

const ProductPlanner = ({ customerId, data, control }) => {
  const [Variants, setVariants] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const dispatch = useDispatch();
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const [showModal, setShowModal] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "subscription",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const { subscription, variants } = watch();
  const [VariantValue, setVariantValue] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    console.log("VariantValue", VariantValue);
  }, [VariantValue]);

  useEffect(() => {
    let temp = [];

    console.log("DATAAA", data);
    data &&
      data?.variants &&
      data?.variants?.map((variant) => {
        let temp1 = [];
        variant?.items.map((varItem) => {
          temp1.push({
            ...varItem,
            display_name: varItem?.display_name,
            label: varItem?.display_name,
            value: varItem?.display_name,
          });
        });
        temp.push({ ...variant, items: temp1 });
      });
    console.log("setVariants", temp);
    setVariants(temp);
  }, [data]);

  useEffect(() => {
    if (userDetails.sub) {
      dispatch(getAddresses({ customerId: userDetails.sub }));
    }
  }, [userDetails.sub]);

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
        temp.push({ ...address, label: label, value: address.id });
      });
      setAddressList(temp);
      console.log("Addresses-->2", temp);
    }
  }, [Addresses.listAddresses]);

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

  console.log("FIELDS==>", fields);
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
                {variant.display_name}
              </p>
              <Controller
                control={control}
                // name={`variants.${variant.display_name}`}
                render={({ field: { onChange, name, value, ref } }) => (
                  <Select
                    name={name}
                    placeholder={variant.display_name}
                    isMulti={variant.is_multiselect}
                    options={variant.items}
                    value={VariantValue[variant.display_name]}
                    onChange={(value) => {
                      setVariantValue({
                        ...VariantValue,
                        [variant.display_name]: value,
                      });
                      let temp = [...variants];

                      if (variants.length) {
                        console.log("Parent- If");
                        const i = temp.findIndex(
                          (_item) => _item.display_name === value.display_name
                        );
                        if (i > -1)
                          temp[i] = {
                            display_name: variant.display_name,
                            items: { display_name: value.display_name },
                          };
                        // (2)
                        else
                          temp.push({
                            display_name: variant.display_name,
                            items: { display_name: value.display_name },
                          });
                      } else {
                        console.log("Parent- Else");
                        temp.push({
                          display_name: variant.display_name,
                          items: { display_name: value.display_name },
                        });
                      }

                      setValue("variants", temp);
                    }}
                  />
                )}
              />
            </>
          );
        })}

      <Accordion defaultActiveKey="0" className="mt-4">
        {/* BreakFast */}
        {deliverables.map((deliver, index) => {
          return (
            <Accordion.Item eventKey={deliver.value} key={index}>
              <Accordion.Header>
                <input
                  type="checkbox"
                  style={{ marginRight: 5 }}
                  checked={subscription[index].is_included}
                  onChange={(ev) => {
                    let temp = [...subscription];
                    temp[index] = {
                      ...temp[index],
                      is_included: ev.target.checked,
                    };
                    setValue("subscription", temp);
                  }}
                />
                {String(deliver.value).toUpperCase()}
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between align-items-center mt-3 mb-0 m-2">
                  <p className="h6 text-muted">{deliver.name}</p>
                  <Controller
                    control={control}
                    name={`subscription[${index}].isDelivery`}
                    render={({ field: { onChange, ...rest } }) => (
                      <div class="form-check form-switch">
                        <input
                          {...rest}
                          class="form-check-input"
                          type="checkbox"
                          id={deliver.value}
                          onChange={(ev) => onChange(ev.target.checked)}
                        />
                        <label class="form-check-label" for={deliver.value}>
                          {!subscription[index].isDelivery
                            ? "Pick Up"
                            : "Deliver"}
                        </label>
                      </div>
                    )}
                  />
                </div>
                <div>
                  {subscription[index].isDelivery && (
                    <>
                      <p className="h6 text-muted mt-3 mb-0 m-2">
                        Delivery Address *
                      </p>
                      <Controller
                        control={control}
                        name={`subscription[${index}].address`}
                        render={({ field: { onChange, ...rest } }) => (
                          <Select
                            placeholder={"Address..."}
                            options={AddressList}
                            components={{ MenuList: SelectMenuButton }}
                            {...rest}
                            value={selectedAddress[deliver.value]}
                            onChange={(address) => {
                              let addrss = { ...address };
                              delete addrss.label;
                              delete addrss.value;
                              onChange(addrss);
                              setSelectedAddress({
                                ...selectedAddress,
                                [deliver.value]: address,
                              });
                            }}
                          />
                        )}
                      />
                    </>
                  )}
                  <div style={{ width: "100%" }}>
                    <p className="h6 text-muted mt-3 mb-0 m-2">Date *</p>
                    <div style={{ width: "100%", overflow: "scroll" }}>
                      <Controller
                        control={control}
                        name={`subscription[${index}].order_dates`}
                        render={({ field: { onChange, ...rest } }) => (
                          <Calendar
                            key={deliver.value}
                            multiple
                            numberOfMonths={2}
                            minDate={
                              subscription[index].order_dates[0] || new Date()
                            }
                            style={{ width: "100%" }}
                            maxDate={
                              new Date(
                                moment(subscription[index].order_dates[0])
                                  .add(
                                    VariantValue?.Duration?.grace +
                                      VariantValue?.Duration?.duration -
                                      1 || 0,
                                    "days"
                                  )
                                  .calendar()
                              )
                            }
                            onChange={(dateObj) => {
                              let temp = [];
                              dateObj.map((date) => {
                                temp.push(date.format());
                              });
                              // handleChange("mealplan_type", {
                              //   ...FormData.mealplan_type,
                              //   [deliver.value]: {
                              //     ...FormData.mealplan_type[deliver.value],
                              //     order_dates: temp,
                              //   },
                              // });
                              onChange(temp);
                            }}
                            {...rest}
                          />
                        )}
                      />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 12 }}>
                      {VariantValue?.Duration?.duration
                        ? `Selected ${
                            subscription[index].order_dates.length
                          } dates from
                       ${" "}${VariantValue?.Duration?.duration || 0} days.`
                        : "Please select duration for subscription"}
                    </span>
                    {/* <span>
                      Balance days:{" "}
                      {subscription[index].variants?.Duration?.duration ||
                        0 - subscription[index].order_dates.length}
                    </span> */}
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <p className="h6 text-muted mt-3 mb-0 m-2">Note: </p>
                    </Form.Label>
                    <Controller
                      control={control}
                      name={`subscription[${index}].notes`}
                      render={({ field: { ...rest } }) => (
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="note while delivery..."
                          {...rest}
                        />
                      )}
                    />
                  </Form.Group>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      {/* Meals */}
    </div>
  );
};

export default ProductPlanner;
