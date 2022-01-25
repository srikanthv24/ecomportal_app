import moment from "moment";
import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { getProductDetails } from "../../store/actions";
import { useFormContext } from "react-hook-form";

export const MealDuration = () => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.products.productDetails);
    const [Variants, setVariants] = useState([]);
    const [duration, setDuration] = useState(""); 
    const [period, setPeriod] = useState("");

    const methods = useFormContext();
  const {  watch, setValue } = methods;
	const { subscription, variants } = watch();

    useEffect(() => {
        dispatch(getProductDetails("d3554853-6cb0-4af9-bb74-9f8643a55693"));
    }, []);

      
    useEffect(() => {
		let temp = [];
		productDetails &&
			productDetails.variants &&
			productDetails.variants.map((variant) => {
				let temp1 = [];
				variant.items.map((varItem) => {
					temp1.push({
						...varItem,
						label: varItem.display_name,
						value: varItem.display_name,
					});
				});
				temp.push({ ...variant, items: temp1 });
			});
		setVariants(temp);

	}, [productDetails]);

  return (
    <>
      <p className="h6 text-start mb-1 mt-2 text-muted">
        Choose Meal Plan Duration
      </p>
      <Select
        name="mealpaln"
        placeholder="Meal Plans"
        className="mb-3 text-start"
        options={Variants[0]?.items}
        onChange={data => {
          console.log("data", data)
          setDuration(data?.duration);
          setPeriod(data);
          
        }}
      />
      {/* <InputGroup className="my-2">
        <InputGroup.Text>Start Date</InputGroup.Text>
        <FormControl
          type="date"
          min={moment(new Date()).format("YYYY-MM-DD")}
        />
      </InputGroup> */}
      <p>{`selected ${period?.duration == "" ? "0" : period?.duration} days`}</p>
      {/* <div style={{ width: "100%", overflow: "scroll" }}>
          <Calendar
            multiple
            numberOfMonths={2}
            style={{ width: "100%" }}
          />
        </div> */}
        <p className="h6 text-start mb-1 mt-2 text-muted">
        Select start date:
        </p>
        <DatePicker
            value={subscription[0]?.order_dates}
            multiple
            minDate={new Date()}
            maxDate={
              new Date(
                moment(
                  subscription[0]
                    ?.order_dates[0]
                )
                  .add(
                    period?.grace +
                    period?.duration -
                      1 || 0,
                    "days"
                  )
                  .calendar()
              )
            }
            sort
            onChange={(dateObj) => {
              let temp = [...subscription];
              let temp2 = [];
              dateObj.map((date) => {
                temp2.push(date.format("YYYY-MM-DD"));
              });
              let temp3 = temp.map(obj => {
                return {...obj, order_dates: temp2}
              });
              setValue("subscription", temp3);
            }}
            
          />
    </>
  );
};
