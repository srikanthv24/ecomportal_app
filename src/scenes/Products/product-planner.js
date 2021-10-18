/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Form,
  OverlayTrigger,
  Popover,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
import { getAddresses } from "../../store/actions";
import { AddressModal } from "./address-modal";
import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";

const ProductPlanner = ({ customerId, data, control, variantsSelected }) => {
  const [Variants, setVariants] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const dispatch = useDispatch();
  const Addresses = useSelector((state) => state.Addresses.addressList);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [startDate, setStartDate] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [showModal, setShowModal] = useState(false);
  const { fields } = useFieldArray({
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
          if (varItem.default) {
            setVariantValue({
              ...VariantValue,
              [variant.display_name]: {
                ...varItem,
                display_name: varItem?.display_name,
                label: varItem?.display_name,
                value: varItem?.display_name,
              },
            });

            let temp = [...variants];

            if (variants.length) {
              console.log("Parent- If");
              const i = temp.findIndex(
                (_item) => _item.display_name === varItem.display_name
              );
              if (i > -1)
                temp[i] = {
                  display_name: variant.display_name,
                  items: { display_name: varItem.display_name },
                };
              // (2)
              else
                temp.push({
                  display_name: variant.display_name,
                  items: { display_name: varItem.display_name },
                });
            } else {
              console.log("Parent- Else");
              temp.push({
                display_name: variant.display_name,
                items: { display_name: varItem.display_name },
              });
            }

            setValue("variants", temp);
          }
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

  console.log("VariantValue", VariantValue);

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

  useEffect(() => {
    console.log("VariantValue__1", VariantValue);
    let temp = [...variants];

    for (const variant in VariantValue) {
      let tempObj;
      console.log("VariantValue__11", variant);
      if (Array.isArray(VariantValue[variant])) {
        let tempArr = [];
        VariantValue[variant].map((itm) => {
          tempArr.push({ display_name: itm.display_name });
        });
        tempObj = {
          display_name: variant,
          items: tempArr,
        };
      } else {
        tempObj = {
          display_name: variant,
          items: { display_name: VariantValue[variant].display_name },
        };
      }
      let indx = temp.findIndex((item) => item.display_name == variant);

      if (indx > -1) {
        temp[indx] = tempObj;
      } else {
        temp.push(tempObj);
      }

      console.log("VariantValue__111", tempObj);
    }

    console.log("VariantValue__1111", temp);
    setValue("variants", temp);
    variantsSelected(VariantValue);
  }, [VariantValue]);

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
                <span className="d-flex justify-content-between align-items-center">
                  <span>You will be having a cyclic menu. </span>
                  <OverlayTrigger
                    trigger="hover"
                    key="lunch"
                    placement={"bottom"}
                    overlay={
                      <Popover id="lunch">
                        <Popover.Header as="h3">Menu</Popover.Header>
                        <Popover.Body>No Items in Menu Yet.</Popover.Body>
                      </Popover>
                    }
                  >
                    <Button variant="transparent">
                      <BsInfoCircle />
                    </Button>
                  </OverlayTrigger>
                </span>
                <div className="d-flex justify-content-between align-items-center mt-3 mb-0 m-2">
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

                  <InputGroup className="my-2">
                    <InputGroup.Text>Start Date</InputGroup.Text>
                    <FormControl
                      type="date"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                      // max={moment(new Date()).format("YYYY-MM-DD")}
                      value={startDate[deliver]}
                      onChange={(ev) => {
                        setStartDate({
                          ...startDate,
                          [deliver]: ev.target.value,
                        });
                        let temp = [];
                        for (
                          let i = 0;
                          i < VariantValue?.Duration?.duration;
                          i++
                        ) {
                          temp.push(
                            moment(ev.target.value)
                              .add(i, "days")
                              .format("YYYY/MM/DD")
                          );
                        }
                        setValue(`subscription[${index}].order_dates`, temp);
                      }}
                    />
                  </InputGroup>

                  {startDate[deliver]?.length && (
                    <div style={{ width: "100%" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ fontWeight: 600, fontSize: 12 }}>
                          Choose dates for {deliver.value}
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 12,
                            color: "#f05922",
                          }}
                        >
                          {VariantValue?.Duration?.duration
                            ? `selected ${
                                subscription[index].order_dates.length
                              } /
                       ${" "}${VariantValue?.Duration?.duration || 0} days.`
                            : null}
                        </span>
                      </div>

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

                      {/* <span>
                      Balance days:{" "}
                      {subscription[index].variants?.Duration?.duration ||
                        0 - subscription[index].order_dates.length}
                    </span> */}
                    </div>
                  )}
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
