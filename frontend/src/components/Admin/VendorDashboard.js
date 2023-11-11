import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Chart as ChartJS, registerables } from 'chart.js';
import { getAdminProducts } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderActions.js";
import MetaData from "../layout/Header/MetaData.js";

const VendorDashboard = () => {
  const { user } = useSelector((state) => state.user);
  ChartJS.register(...registerables);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    console.log(orders,"orders")
    console.log(user._id,"id")
  }, [dispatch]);

  const filteredOrders = orders?.filter((order) => order?.vendorId
  === user._id);
 
  let totalAmount = 0;
  filteredOrders &&
  filteredOrders?.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#0067a5"],
        hoverBackgroundColor: ["#0067a5"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Vendor Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products?.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{filteredOrders && filteredOrders?.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;