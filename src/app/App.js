// import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../components/AppBar/app-bar";
import Footer from "../components/footer";
import { createCart, getCart } from "../store/actions/cart";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);

  useEffect(() => {
    dispatch(getCart("1d3a8d5c-ce41-45d1-80bd-6befa6c46f84"));
  }, []);

  useEffect(() => {
    console.log("CART===>", Cart);
  }, [Cart.cartDetails]);

  return (
    <div className="App">
      <AppBar />
      <Routes />
    </div>
  );
}

export default App;
