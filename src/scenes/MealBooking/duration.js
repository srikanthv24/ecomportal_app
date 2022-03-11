import React, { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import moment from "moment";
import { getProductDetails } from "../../store/actions";
import { useFormContext } from "react-hook-form";

export const MealDuration = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products.productDetails);
  const [Variants, setVariants] = useState([]);
  const [duration, setDuration] = useState("");
  const [period, setPeriod] = useState("");
  const [startDate, setStartDate] = useState(null);

  const methods = useFormContext();
  const { watch, setValue } = methods;
  const { subscription, variants } = watch();

  useEffect(() => {
    dispatch(getProductDetails("d3554853-6cb0-4af9-bb74-9f8643a55693"));
  }, []);

  const handleDateChange = (date, index) => {
    console.log("handleDateChange_called==>", date);
    let temp = [...subscription];
    const dateTemp = [];
    console.log("temp==>", temp);
    for (let i = 0; i < period?.duration; i++) {
      dateTemp.push(moment(date).add(i, "days").format("YYYY-MM-DD"));
    }
    console.log("dateTemp==>", dateTemp);
    let temp2 = temp.map((obj) => {
      return { ...obj, order_dates: dateTemp };
    });
    setValue("subscription", temp2);
    console.log("temp2==>", temp2);
    
  };
  const colourStyles = {
		menuList: styles => ({
			...styles,
			background: 'rgba(209,235,232,1)',
      padding:'15px'
		}),
		option: (styles, {isFocused, isSelected}) => ({
			...styles,
			background: isFocused
				? '#F2CBBD'
				: isSelected
					? 'rgba(54,41,24,1)'
					: undefined,
			zIndex: 1,
      padding:'5px 0px'
		}),
		menu: base => ({
			...base,
			zIndex: 100
		})
		}
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

  useMemo(() => {
    let temp = [];
    for (let i = 0; i < duration; i++) {
      temp.push(moment(startDate).add(i, "days").format("YYYY/MM/DD"));
    }
    setValue(`subscription[${0}].order_dates`, temp);
    setValue(`subscription[${1}].order_dates`, temp);
    setValue(`subscription[${2}].order_dates`, temp);
  }, [period]);

  return (
    <>
      <p className="h6 text-start mb-1 mt-2 text-muted">
        Choose Meal Plan Duration
      </p>
      <Select
        name="mealpaln"
        placeholder="Meal Plans"
        className="mb-3 text-start vl-form-element"
        options={Variants[0]?.items}
        styles={colourStyles}	
        onChange={(data) => {
          console.log("data", data);
          setDuration(data?.duration);
          setPeriod(data);
          handleDateChange(new Date(), 0);
          let temp = [];
          temp.push({
            display_name: "Duration",
            items: { display_name: data.display_name },
          });
          setValue("variants", temp);
        }}
      />

      {period && (
        <div class="mb-3 vl-form-element dp-date">
          <label class="form-label h6 text-start mb-1 mt-2 text-muted">
            Start Date
          </label>
          <input
            type="date"
            class="form-control"
            min={moment(new Date()).format("YYYY-MM-DD")}
            // max={moment(new Date()).format("YYYY-MM-DD")}
            value={startDate}
            onChange={(ev) => {
              setStartDate(ev.target.value);
              let temp = [];
              for (let i = 0; i < duration; i++) {
                temp.push(
                  moment(ev.target.value).add(i, "days").format("YYYY/MM/DD")
                );
              }
              setValue(`subscription[${0}].order_dates`, temp);
              setValue(`subscription[${1}].order_dates`, temp);
              setValue(`subscription[${2}].order_dates`, temp);
            }}
          />
        </div>
      )}

      {startDate && (
        <div style={{ width: "100%", overflow: "scroll" }}>
          <p className="h6 text-start mb-1 mt-2 text-muted">Select dates:</p>
          <Calendar
            multiple
            numberOfMonths={2}
            value={subscription[0]?.order_dates}
            minDate={new Date()}
            maxDate={
              new Date(
                moment(subscription[0]?.order_dates[0])
                  .add(period?.grace + period?.duration - 1 || 0, "days")
                  .calendar()
              )
            }
            sort
            onChange={(dateObj) => {
              let temp = [...subscription];
              let temp2 = [];
              dateObj.map((date) => {
                if (temp2?.length === period?.duration) {
                  return null;
                }
                temp2.push(date.format("YYYY-MM-DD"));
              });
              let temp3 = temp.map((obj) => {
                return { ...obj, order_dates: temp2 };
              });
              setValue("subscription", temp3);
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </>
  );
};
