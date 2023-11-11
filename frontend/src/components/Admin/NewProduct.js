import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, newProduct } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/Header/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';
import SideBar from './Sidebar';
import { CREATE_ADMIN_PRODUCTS_RESET } from '../../constants/productConstants';

const categories = [
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

const NewProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState();
  const [location, setLocation] = useState("");
  const [discount, setDiscount] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success('Product Created Successfully');
      navigate('/travelagency/dashboard');
      dispatch({ type: CREATE_ADMIN_PRODUCTS_RESET });
    }
  }, [dispatch, error, alert, success, navigate]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setImagesPreview((old) => [...old, fileReader.result]);
          setImages((old) => [...old, fileReader.result]);
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);
    myForm.set('discount', discount);
    myForm.set('location', location);

    images.forEach((image) => {
      myForm.append('images', image);
    });

    dispatch(newProduct(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
            style={{ height: '117vh' }}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Shop Location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Discount"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="category"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
