import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { formatter } from "../utils/Formatter";
import { storeData } from "../store/foodItemActions";

const CheckOut = () => {
  const cartItems = useSelector(state => state.meals.cartItems);
  const totalCartPrice = useSelector(state => state.meals.totalCartPrice);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target) {
      const fd = new FormData(e.target);
      const customerData = Object.fromEntries(fd.entries());
      dispatch(storeData(cartItems , customerData))
      dispatch(uiActions.changeView('successModal'));
    } else {
      console.log('add in form')
    }
  }
  const handleCloseModal = () => {
    setTimeout(() => {
        dispatch(uiActions.changeView('cartInfoModal'));
    }, 10)
};
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="cart">
          <h2>Checkout</h2>
          <p>Total Amount: {formatter.format(totalCartPrice)}</p>
          <div className="control">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="control">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="control">
            <label htmlFor="street">Stree</label>
            <input type="text" id="street" name="street" required />
          </div>
          <div className="control-row">
            <div className="control">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postal-code" name="postal-code" required />
            </div>
            <div className="control">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required />
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button" onClick={handleCloseModal}>Close</button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </>
  );
};

export default CheckOut;
