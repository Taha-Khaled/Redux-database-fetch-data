import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-e094e-default-rtdb.firebaseio.com/card.json",
        {
          //PUT request replace existing data
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success UwU",
          message: "Sending cart data Successfully",
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error -_-",
          message: "Sending Cart Data Faild!",
        })
      );
    }
  };
};

export const fetchCardData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-e094e-default-rtdb.firebaseio.com/card.json"
      );
      if (!response.ok) {
        throw new Error("Fetchh Error Bitch");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cardData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cardData.items || [],
          totalQuantity: cardData.totalQuantity,
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error -_-",
          message: "Fetching Cart Data Faild!",
        })
      );
    }
  };
};
