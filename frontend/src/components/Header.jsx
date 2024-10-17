import { useSelector } from "react-redux";
import { useRef } from "react";
import logo from "../assets/logo.jpg";
import CartModel from "./YourCart";
const Header = () => {
  const totalQuantity = useSelector((state) => state.meals.totalQuantity)
  const dialog = useRef();
  const handleShowCart = () => {
    dialog.current.open();
  };
  return (
    <>
      <CartModel ref={dialog} />
      <div id="main-header">
        <div id="title">
          <img src={logo} alt="" />
          <h1>REACTFOOD</h1>
        </div>
        <button onClick={handleShowCart}>{`Cart(${totalQuantity})`}</button>
      </div>
    </>
  );
};

export default Header;
