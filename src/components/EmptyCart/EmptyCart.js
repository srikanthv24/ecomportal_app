import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CART } from "../../utils/constants";

const EmptyCart = () => {
    const history = useHistory();
    return (
        <div className="flex-column text-center">
        <div className="h5 d-flex justify-content-center align-items-center py-5">
            {CART.NO_ITEMS_IN_CART}
        </div>
        <Button className="vl-custom-btn"
          onClick={() => history.push("/start")}
         
        >
          {CART.EXPLORE_PRODUCTS}
        </Button>
      </div>
    );
}

export default EmptyCart;