import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { clearError, getProducts } from '../../actions/productActions';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/Header/MetaData';

const categories = [
  'All',
  'Hair Care',
  'Soaps and Necessaries',
  'Breakfast Essentials',
  'Dairy Products',
  'Groceries',
  'Household Supplies',
  'Dressing & Desserts',
  'Munch & Crunch',
  'Baby Care',
  'Freezer Goods',
  'More',
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('All');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();
  const { loading, error, products, productCount, resultsPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts(keyword || "", currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const filteredProducts = products
    ?.filter((product) => {
      const productPrice = product.price;
      return productPrice >= price[0] && productPrice <= price[1];
    })
    ?.filter((product) => {
      return product.rating >= rating;
    })
    ?.filter((product) => {
      return category === 'All' || product.category === category;
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {filteredProducts?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            {price !== null && price !== undefined && (
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
            )}
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings above</Typography>
              {rating !== null && rating !== undefined && (
                <Slider
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              )}
            </fieldset>
          </div>

          {resultsPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
