// import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../components/AppBar/app-bar";
import Footer from "../components/footer";
import { getCart } from "../store/actions/cart";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);

  useEffect(() => {
    dispatch(getCart({ customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16" }));
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
