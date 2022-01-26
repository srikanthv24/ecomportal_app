import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export const Sessions = ({control}) => {

const methods = useFormContext();
	const {  watch, setValue } = methods;
	const { subscription, variants } = watch();

  const { fields } = useFieldArray({
    control: control,
    name: "subscription",
  });


    return (
        <>
        <p className="h6 text-start mb-1 text-muted">
          Choose Meal Sessions
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={subscription[0].is_included}
            onChange={(ev) => {
              let temp = [...subscription];
              if(ev.target.checked) {
                temp[0] = {
                  ...temp[0],
                  meal_type:"B",
                  is_included: ev.target.checked
                };
              } else {
                temp[0] = {
                  ...temp[0],
                  meal_type:"",
                  is_included: ev.target.checked
                };
              }
              setValue("subscription", temp);
            }}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            Breakfast
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={subscription[1].is_included}
            onChange={(ev) => {
              let temp = [...subscription];
              if(ev.target.checked) {
                temp[1] = {
                  ...temp[1],
                  meal_type:"L",
                  is_included: ev.target.checked
                };
              } else {
                temp[1] = {
                  ...temp[1],
                  meal_type:"",
                  is_included: ev.target.checked
                };
              }
              
              setValue("subscription", temp);
            }}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            Lunch
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={subscription[2].is_included}
            onChange={(ev) => {
              let temp = [...subscription];
              if(ev.target.checked) {
                temp[2] = {
                  ...temp[2],
                  meal_type:"D",
                  is_included: ev.target.checked
                };
              } else {
                temp[2] = {
                  ...temp[2],
                  meal_type:"",
                  is_included: ev.target.checked
                };
              }
              setValue("subscription", temp);
            }}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            Dinner
          </label>
        </div>
      </>
    );
}