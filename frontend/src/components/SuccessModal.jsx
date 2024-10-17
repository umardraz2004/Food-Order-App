import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { cartActions } from "../store/foodSlice";
import { Toaster, toast } from "react-hot-toast";
const SuccessModal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setTimeout(() => {
      toast.success(`Order is placed successfully!`, {
        duration: 3000,
        position: "top-right",
      });
      dispatch(uiActions.changeView("cartInfoModal"));
    }, 500);
    dispatch(cartActions.emptyTheUserCart());
  };
  return (
    <>
      <div className="cart">
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
      </div>
      <form method="dialog" className="modal-actions">
        <button className="button" onClick={handleCloseModal}>
          Okay
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default SuccessModal;
