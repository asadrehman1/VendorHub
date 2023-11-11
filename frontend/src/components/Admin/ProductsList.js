import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_ADMIN_PRODUCTS_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_ADMIN_PRODUCTS_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError,isDeleted ,navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 130, flex: 0.5,disableColumnMenu: true, },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 100,
      flex: 0.4, // Adjust flex value
      disableColumnMenu: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      disableColumnMenu: true,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 130,
      disableColumnMenu: true,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        description: item.description,
        rating:item.rating,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;