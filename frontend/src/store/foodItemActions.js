import { cartActions } from "./foodSlice";

export const fetchFoodData = () => {
  const mealsUrl = "http://localhost:3000/meals";
  return async (dispatch) => {
    const fetchMeals = async () => {
      const response = await fetch(mealsUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    };
    try {
      const myData = await fetchMeals();
      dispatch(cartActions.setMeal(myData));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      dispatch(cartActions.setLoading(false));
    }
  };
};

export const storeData = (cartItems, customerData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3000/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: {
              items: cartItems,
              customer: customerData,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(cartActions.submitOrder(data));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
};
