import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProductDetails } from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview } from "../../actions/productActions";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    localStorage.setItem("vendorId",product.user)
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product?.name} -- CheapGrocery`} />
          <div className="ProductDetails">
            <div style={{ maxWidth: "800px" }}>
              <Carousel
                activeIndicatorIconButtonProps={{
                  style: {
                    display: "none", // 2
                  },
                }}
              >
                {product?.images &&
                  product?.images?.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      style={{ height: "300px", width: "auto" }}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <br />
                <p>Product # {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>
              <br />
              <div className="grids">
                <div className="row first-row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Price:</b>
                    </h4>
                    <p>
                      <span
                        style={{
                          textDecoration:
                            product?.discount > 0 ? "line-through" : "none",
                          color: product?.discount > 0 ? "red" : "inherit",
                        }}
                      >
                        RS: {product?.price}
                      </span>{" "}
                      {product?.discount > 0 && (
                        <span>{product?.discount}</span>
                      )}
                    </p>

                    <p>
                      Status:
                      <b
                        className={
                          product?.stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product?.stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      {quantity > 0 ? quantity : 0}
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                  </div>
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Description:</b>
                    </h4>
                    <p>{product?.description}</p>
                    <h4 >Location:</h4>
                    <p>{product?.location}</p>
                  </div>
                 
                </div>
                <div className="row 4throw" style={{ marginTop: "100px" }}>
                  <div className="col">
                    <button
                      disabled={product?.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                      className="submitReview"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="col">
                    <button
                      onClick={submitReviewToggle}
                      className="submitReview"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="">
            <div className="p-2">
              <h3 className="reviews-heading">
                <b>REVIEWS</b>
              </h3>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews?.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
