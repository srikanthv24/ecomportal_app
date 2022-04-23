import React, { useEffect, useState, useMemo } from "react";
import MealDisplay from "./MealDisplay";
import SessionCordinator from "../../components/SessionCordinator";
import CalanderSessionCordinator from "./CalanderSessionCordinator";
import ProductDisplay from "../../components/ProductPlanner/ProductDisplay";
import _ from "underscore";
import moment from "moment";
import DeliverySwitch from "../../components/DeliverySwitch/DeliverySwitch";
import { PICKUP, DELIVERY } from "../../utils/constants";
import { getFirstSubscriptionDate } from "./updateOrder.utils";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SessionCalander from "./SessionCalander";
import { getDatesByStatus } from "./updateOrder.utils";
import SessionCordinatorToggle from "../../components/SessionCordinatorToggle/SessionCordinatorToggle";

const EditSubscription = React.memo(
  ({
    productTitle,
    productCategory,
    imageUrl,
    productDescription,
    mealDisplayName,
    inputs,
    selectedSessions,
    deliveryTypeDetails,
    orderDates,
    duration: planDuration,
    handleCalendarChange,
    planName,
    addressList,
    ...rest
  }) => {
    const [selectedSessionCode, setSelectedSessionCode] = useState(
      selectedSessions && selectedSessions[0]
    );
    const deliveryType =
      deliveryTypeDetails &&
      deliveryTypeDetails[selectedSessions.indexOf(selectedSessionCode)];
    console.log("deliveryTypeDetails: " + JSON.stringify(deliveryType));
    return (
      <div className="product-planner">
        <ProductDisplay
          title={productTitle}
          category={productCategory}
          imageUrl={imageUrl}
          description={productDescription}
          planName={planName}
          duration={planDuration}
          {...rest}
        />
        <div className="vl-prd-planner-design1">
          <SessionCordinatorToggle
            sessionCodes={["B", "L", "D"]}
            enabledSessions={selectedSessions}
            setSelectedSessionCode={setSelectedSessionCode}
            selectedSessionCode={selectedSessionCode}
          />
        </div>
        {selectedSessions?.map((sessionCode, index) => {
          const completedDates = getDatesByStatus(orderDates, index, "F");
          const remainingDates = getDatesByStatus(orderDates, index, "S");
          return (
            <section className="vl-edit-prd-planner-sec">
              <SessionCalander
                {...rest}
                completedDates={completedDates}
                remainingDates={remainingDates}
                sessionCode={sessionCode}
                handleCalendarChange={handleCalendarChange}
                sessionIndex={index}
                address={addressList[index]}
                showCalander={sessionCode === selectedSessionCode}
                duration={planDuration}
              />
            </section>
          );
        })}
        <DeliverySwitch
          deliveryType={
            deliveryTypeDetails &&
            deliveryTypeDetails[selectedSessions.indexOf(selectedSessionCode)]
          }
          disabled={true}
          showDeliverySwitch={true}
        />
      </div>
    );
  }
);

export default EditSubscription;
