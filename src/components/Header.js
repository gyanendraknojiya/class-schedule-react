import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ClassIcon from "@material-ui/icons/Class";

import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../Redux/Action";

const Header = () => {
  const dispatch = useDispatch();

  const { cartItems, showCart } = useSelector((state) => state);

  return (
    <div>
      <AppBar position="static" className="bg-dark text-white">
        <Toolbar>
          <h5>
            <ClassIcon className="mr-1" />
            Class Scheduler
          </h5>
          <Button
            variant="contained"
            className="ml-auto"
            size="large"
            onClick={() => dispatch(toggleCart(!showCart))}
          >
            <ShoppingCartIcon />
            <span>{cartItems.length ? cartItems.length : ""}</span>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
