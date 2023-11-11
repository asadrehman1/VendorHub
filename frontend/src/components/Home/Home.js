import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import { clearError, getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { TypeAnimation } from "react-type-animation";

const testimonial = [
  {
    content:
      "Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.",
    author: "Sarah M., Director of Events",
  },
  {
    content:
      "I cannot tell you how much we loved using this silent auction software. Everything was seamless…from set up, to bidding, to payment. We will absolutely use MyEvent next year.",
    author: "Sarah M., CCHS Foundation",
  },
  {
    content:
      "I tried MyEvent instead of typical paper raffle tickets. The system was easy to set up online and people who couldn't attend the event were still able to enter the raffle, which was HUGE bump in revenue.",
    author: "Alexander B., Pan-Mass Challenge",
  },
  {
    content:
      "MyEvent is a great way to bring in money for your Fund A Need. The 24/7 tech support allows you to feel confident, and the platform makes your Fund a Need so much easier to run. Well definitely be using MyEvent again.",
    author: "Amy C., One Less Orphan Fund",
  },
];
// import cover from "../../images/coverPic.jpg";

const Home = () => {
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner-container">
            <div className="banner">
              <p>Welcome to CheapGrocery</p>
              <div
                style={{
                  fontSize: "2em",
                  display: "block",
                  position: "relative",
                  zIndex: "10000",
                }}
              >
                <TypeAnimation
                  sequence={[
                    "Welcome to our E-commerce Store!",
                    2000, // Wait for 2 seconds before the next message
                    "Explore a wide range of products",
                    2000,
                    "Find the best deals and discounts",
                    2000,
                    "Shop with confidence and convenience",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              <a href="#container">
                <button>Scroll</button>
              </a>
            </div>
            {/* <div>
            <img style={{borderRadius:"20px",width:"30px"}} src={cover} alt="cover-pic" />
          </div> */}
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <h2 className="homeHeading">Top Rated Products</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((product) => product.rating > 3) // Filter products with rating greater than 3
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
