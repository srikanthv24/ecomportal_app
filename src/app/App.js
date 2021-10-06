// import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../components/AppBar/app-bar";
import Footer from "../components/footer";
import UserPool from "../scenes/Login/UserPool";
import { getCognitoUser } from "../services/getCognitoUser";
import { updateUserDetails } from "../store/actions/auth";
import { getCart } from "../store/actions/cart";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);




  useEffect(() => {
    const userpool = UserPool.getCurrentUser();
    console.log("USERPOOL-GETCURRENTUSER", userpool);
    if (userpool != null) {
    let cognitoUser = getCognitoUser({
    Pool: UserPool,
    Username: userpool.username,
    });
    cognitoUser.getSession((err, res) => {
    console.log("ERR-RESS", err, res);
    });
    cognitoUser.getUserAttributes((err, result) => {
    let temp = {};
    if (result) {
    result.map((item) => {
    console.log("MyData", item);
    switch (item.Name) {
    case "name":
    temp.name = item.Value;
    break;
    case "phone_number":
    temp.phone_number = item.Value;
    break;
    case "sub":
    temp.sub = item.Value;
    break;
    default:
    return temp;
    }
    });
    dispatch(updateUserDetails(temp));
    dispatch(getCart({ customer_id: temp.sub }));
    }
    console.log("SUCCESSSSSS", result);
    console.log("FAILEEEDDDD", err);
    });
    }
    }, []);
    

  useEffect(() => {
    console.log("CART===>", Cart);
  }, [Cart.cartDetails]);

  return (
    <div className="App">
      {/* <AppBar /> */}
      <Routes />
    </div>
  );
}

export default App;
