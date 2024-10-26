import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFoodData } from "../store/foodItemActions";
import { formatter } from "../utils/Formatter";
import { cartActions } from "../store/foodSlice";
import { Toaster, toast } from "react-hot-toast";

const Meals = () => {
  const foodItems = useSelector((state) => state.meals.items);
  const cartItems = useSelector((state) => state.meals.cartItems);
  const loading = useSelector((state) => state.meals.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemToCart(item));
    const existingId = cartItems.find((cartItem) => cartItem.id === item.id);
    if (!existingId) {
      toast.success(`${item.name} added to cart!`, {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error(`${item.name} already in cart, visit cart!`, {
        duration: 1000,
        position: "top-right",
      });
      return;
    }
  };
  console.log(foodItems);
  return (
    <>
      {loading ? <p className="loading">
        <div className="spinner"></div>
      </p> : <ol id="meals">
        {foodItems.map((item) => (
          <li key={item.id} className="meal-item">
            <article>
              <img
                src={`https://translucent-secret-drink.glitch.me/${item.image}`}
                alt="Error loading image"
              />
              <h3>{item.name}</h3>
              <div>
                <div className="meal-item-price">
                  {formatter.format(item.price)}
                </div>
                <div className="meal-item-description">{item.description}</div>
                <button
                  className="button meal-item-actions"
                  onClick={() => addToCartHandler(item)}
                >
                  Add to cart
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>}
      <Toaster />
    </>
  );
};

export default Meals;
