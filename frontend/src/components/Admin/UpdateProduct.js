import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  clearError,
  updateProduct,
  getProductDetails,
} from '../../actions/productActions';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/Header/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import StorageIcon from '@material-ui/icons/Storage';
import { UPDATE_ADMIN_PRODUCTS_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState();
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);

  const productId = id;

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

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);

      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setDiscount(product.discount);
      setCategory(product.category);
      setOldImages(product.images);
      setLocation(product.location);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: UPDATE_ADMIN_PRODUCTS_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    updateError,
    navigate,
  ]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Package" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer" style={{ height: '110vh' }}>
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
            style={{ height: '110vh' }}
          >
            <h1 style={{ width: 'fit-content', whiteSpace: 'nowrap' }}>
              Update Product
            </h1>

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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
