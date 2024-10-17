import { formatter } from "../utils/Formatter";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { cartActions } from "../store/foodSlice";

const CartInfo = () => {
  const cartItems = useSelector((state) => state.meals.cartItems);
  const totalCartPrice = useSelector((state) => state.meals.totalCartPrice);
  const isCartEmpty = useSelector((state) => state.meals.isCartEmpty);
  console.log(cartItems.length);

  const dispatch = useDispatch();
  const changeCurrentRendering = () => {
    dispatch(uiActions.changeView("checkOutModal"));
  };
  const increaseItemHandler = (item) => {
    dispatch(cartActions.increaseItemInCart(item));
  };
  const decreaseItemHandler = (item) => {
    dispatch(cartActions.decreaseItemInCart(item));
  };
  return (
    <>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {isCartEmpty ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map((item) => {
              return (
                <li className="cart-item" key={item.id}>
                  <p>{`${item.name} - ${item.quantity} x ${formatter.format(item.price)}`}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => decreaseItemHandler(item)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseItemHandler(item)}>+</button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="cart-total">{formatter.format(totalCartPrice)}</div>
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button" onClick={changeCurrentRendering}>
          Go to Checkout
        </button>
      </form>
    </>
  );
};

export default CartInfo;
