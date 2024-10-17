import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";
import CartInfoModal from "./CartInfoModal";
import CheckOutModal from "./CheckOutModal";
import SuccessModal from './SuccessModal'

const YourCart = forwardRef(function ResultModal({} ,ref) {
  const dialog = useRef();
  const currentRendering = useSelector((state) => state.ui.renderModal);
  console.log(currentRendering);

  let modalContent;
  if(currentRendering === 'cartInfoModal') {
    modalContent = <CartInfoModal />;
  } else if(currentRendering === 'checkOutModal') {
    modalContent = <CheckOutModal />;
  } else if(currentRendering === 'successModal') {
    modalContent = <SuccessModal />;
  } else {
    modalContent = <p>No modal to display</p>;
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return <dialog ref={dialog} className="modal">
    {modalContent}
  </dialog>;
});

export default YourCart;
