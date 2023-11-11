import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <h3 style={{ margin: "10% 12%",textAlign:"center" ,color:"#0067a5"}}>CheapGrocery</h3>
        </Link>
        <Link
          to={
            user?.role === "admin"
              ? "/admin/dashboard"
              : "/travelagency/dashboard"
          }
        >
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
        {user?.role === "admin" && (
            <Link to="/admin/users">
              <p>
                <PeopleIcon /> Users
              </p>
            </Link>
          )}
         <Link to="/account">
            <p>
              <EditIcon /> Profile
            </p>
          </Link>
        {user?.role === "travelAgency" && (
          <Link>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ImportExportIcon />}
            >
              <TreeItem nodeId="1" label="Products">
                <Link to="/admin/products">
                  <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                </Link>

                <Link to="/admin/product/new">
                  <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                </Link>
              </TreeItem>
            </TreeView>
          </Link>
        )}
        {user?.role === "travelAgency" && (
          <>
            <Link to="/admin/orders">
              <p>
                <ListAltIcon />
                Orders
              </p>
            </Link>
          </>
        )}

        {user?.role === "travelAgency" && (
          <Link to="/admin/reviews">
            <p>
              <RateReviewIcon />
              Reviews
            </p>
          </Link>
        )}
      </div>
    </>
  );
};

export default Sidebar;
