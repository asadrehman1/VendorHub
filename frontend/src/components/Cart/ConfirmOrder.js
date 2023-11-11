import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MetaData from "../layout/Header/MetaData";
import { Link , useNavigate} from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ConfirmOrder.css";
import axios from "axios";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.18;
  const totalPrice = tax + subtotal;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      tax,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
    try {
      for (const item of cartItems) {
        // Make an API call to update the stock for each item
        const response = await axios.put(`/api/v1/updateStock/stock/${item.product}`, {
          stock: item.stock - item.quantity,
        });

        if (response.status === 200) {
          // Stock updated successfully
        } else {
          // Handle errors if the update was not successful
        }
      }
    } catch (error) {
      // Handle API call errors
      console.error(error);
    }
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Booking Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>RS:{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Booking Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
