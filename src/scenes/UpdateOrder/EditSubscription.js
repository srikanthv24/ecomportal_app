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
import { getDatesByStatus, fullAddress } from "./updateOrder.utils";
import SessionCordinatorToggle from "../../components/SessionCordinatorToggle/SessionCordinatorToggle";
import SelfPickupIocn from "../../assets/home/Pickup.png";
import TruckIocn from "../../assets/home/truck.png";

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
        <div className="vl-edit-prd-planner-sec">
        <div className="d-flex align-items-center vl-edit-time-stamp">
        {
          deliveryTypeDetails && deliveryTypeDetails[selectedSessions.indexOf(selectedSessionCode)] === PICKUP
          ?
          <section>
          <p className="text-start mt-0 mb-1 d-flex align-items-center">
          <img src={SelfPickupIocn} alt="icon" height={36} />
          <span className="px-2 vl-edit-del-type-text">Self Pickup</span></p>
          <p className="mb-0"></p>
          </section>
          :
          <section>
          <p className="text-start mt-0 mb-1 d-flex align-items-center">
            <img src={TruckIocn} alt="icon" height={25} />
          <span className="px-2 vl-edit-del-type-text">Delivery</span></p>
          <p className="mb-0"> {addressList && addressList?.length > 0 && fullAddress(addressList[0])}</p>
          </section>
        }
        </div>
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
        {/* <DeliverySwitch
          deliveryType={
            deliveryTypeDetails &&
            deliveryTypeDetails[selectedSessions.indexOf(selectedSessionCode)]
          }
          disabled={true}
          showDeliverySwitch={true}
        /> */}
      </div>
    );
  }
);

export default EditSubscription;
