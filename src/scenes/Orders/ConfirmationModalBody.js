import { isPauseSubscription } from "./utils";

const ConfirmationModalBody = (servicedData, serviceType) => {
    console.log("serviceType: "+ JSON.stringify(serviceType));
    console.log("servicedData: "+ JSON.stringify(servicedData));

  return (
    <div className="d-flex custom-info-block">
      <span className="desp-info pt-3 pb-1">
        {`Do you want to ${
          isPauseSubscription(serviceType) ? "pause" : "resume"
        } the subscription?`}
      </span>
      <div className="d-flex justify-content-start">
        <span className="desp-info">Meal Type:</span>
        <span className="px-4">
          <b>{servicedData.mealType}</b>
        </span>
      </div>
      <div className="d-flex justify-content-start my-2">
        <span className="d-inline-block pr-4">
          {isPauseSubscription(serviceType) ? "Pause Dates:" : "Resume Dates:"}
        </span>
        <span className="d-inline-block px-4">
          <b>{`${servicedData.fromDate} to ${servicedData.toDate}`}</b>
        </span>
      </div>
    </div>
  );
};

export default ConfirmationModalBody;
