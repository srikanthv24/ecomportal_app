import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { MealList } from "./meal-list";
import { useDispatch, useSelector } from "react-redux";

import { showLogin } from "../../store/actions";
import { Sessions } from "./sessions";
import { MealDuration } from "./duration";
import { DeliveryDetails } from "./delivery-details";
import { useHistory } from "react-router-dom";
import { createCart } from "../../store/actions/cart";
import { makeStyles } from "@material-ui/core";

export const MealBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [activeStep, setActiveStep] = useState(0);
  const [validStep, setValidStep] = useState(false);

  const handleNext = () => {
    userDetails.sub ? validStep && goNext() : showLoginModal();
  };

  const goNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setValidStep(false);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const showLoginModal = () => {
    dispatch(showLogin());
  };

  const handleNextStep = () => {
    setValidStep(true);
    handleNext();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const methods = useForm({
    defaultValues: {
      item_id: "",
      qty: 1,
      subscription: [
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "",
          notes: "",
          order_dates: [],
        },
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "",
          notes: "",
          order_dates: [],
        },
        {
          address: {},
          addon_items: [],
          isDelivery: false,
          meal_type: "",
          notes: "",
          order_dates: [],
        },
      ],
      variants: [
        {
          display_name: "",
          items: [],
        },
      ],
    },
  });

  const { control, handleSubmit, setValue, watch } = methods;

  const { subscription, variants, item_id } = watch();

  const useStyles = makeStyles({
    stepIcon: {
      // background: "orange",
      color: "#f05922 !important",
    },
    stepLabel: {
      marginTop: 5,
    },
    stepperBg: {
      background: "rgb(249, 243, 223) !important",
      minHeight: "100vh",
      paddingTop: "100px",
      paddingBottom: "100px",
      "& > $div": {
        background: "rgb(249, 243, 223) !important",
      },
    },
  });

  const classes = useStyles();
  const handleCartSubmit = async(data) => {
    console.log("use_form_data", data);
    // let payload = { ...data };
    // let filteredPayload = payload.subscription.filter((item) => {
    // 	if (item.is_included) {
    // 		delete item.is_included;
    // 		return item;
    // 	}
    // });

    // 		dispatch(
    // 			createCart({
    // 				customer_id: userDetails.sub,
    // 				item: { ...data, subscription: filteredPayload },
    // 				accessToken: sessionStorage.getItem("token"),
    // 			})
    // 		);

    let payload = {
      item_id: item_id,
      qty: 1,
      subscription: subscription,
      variants: variants
    };
    let filteredPayload = payload.subscription.filter((item) => {
      if (item.is_included) {
        delete item.is_included;
        delete item.address.label;
        delete item.address.value;
        return item;
      }
    });
    console.log("my_payload", payload);

    dispatch(
      createCart({
        customer_id: userDetails.sub,
        item: { ...payload, subscription: filteredPayload },
        accessToken: sessionStorage.getItem("token"),
      })
    );
    history.push("/cart-summary");
  };

  const handleLastStep = () => {
    handleCartSubmit();
  };

  const checkValidity = useMemo(() => {
    let isMealSessionSelected = subscription.filter(
      (item) => item.meal_type
    ).length;
    let isAddressSelected = subscription.filter(
      (item) => item.address?.id
    ).length;
    let isOrderDatesSelected = subscription.filter(
      (item) => item.order_dates.length
    ).length;

    switch (activeStep) {
      case 0:
        setValidStep(!!isMealSessionSelected);
        break;
      case 1:
        setValidStep(!!isAddressSelected);
        break;
      case 2:
        setValidStep(true);
        break;
      case 3:
        setValidStep(!!isOrderDatesSelected);
        break;

      default:
        setValidStep(false);
        break;
    }
    return [isMealSessionSelected, isAddressSelected, isOrderDatesSelected];
  }, [subscription, subscription[0]?.order_dates.length]);

  console.log("watch() ==> ", watch(), checkValidity, activeStep);
  console.log("subscription", subscription);

  return (
    <section className={classes.stepperBg}>
      <FormProvider {...methods}>
        <Container
          fluid
          style={{
            background: "rgb(249, 243, 223)",
            // marginTop: "80px",
            height: "100%",
          }}
        >
          <Row>
            <Col>
              <p className="fs-4 fw-bold mb-3 text-center page-title">
                Meal Booking
              </p>
            </Col>
          </Row>
          <Form className="m-3">
            <Row>
              <Col>
                {activeStep == 0 ? (
                  <Sessions control={control} />
                ) : activeStep == 1 ? (
                  <DeliveryDetails control={control} />
                ) : activeStep == 2 ? (
                  <MealList handleNextStep={handleNextStep} />
                ) : activeStep == 3 ? (
                  <MealDuration />
                ) : null}
              </Col>
            </Row>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                display: "inline-flex",
                padding: "20px 0px",
                backgroundColor: "rgb(249, 243, 223)",
                // justifyContent: "space-between",
              }}
            >
              <Button
                className="w-50 m-1"
                style={{
                  width: "50%",
                  background: "#F05922",
                  borderColor: "#F05922",
                }}
                onClick={() => handleBack()}
                disabled={activeStep == 0 ? true : false}
              >
                Back
              </Button>
              <Button
                className="w-50 m-1"
                style={{
                  width: "50%",
                  background: "#F05922",
                  borderColor: "#F05922",
                }}
                disabled={!validStep}
                onClick={() => {
                  if (activeStep == 3) {
                    handleLastStep();
                  } else {
                    handleNext();
                  }
                }}
                //onClick={handleSubmit(handleData)}
              >
                {activeStep == 3 ? "Proceed to Cart" : "Next"}
              </Button>
            </div>
          </Form>
        </Container>
      </FormProvider>
    </section>
  );
};
