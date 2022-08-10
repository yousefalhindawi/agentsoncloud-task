import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddProduct } from "./features/users/AddProduct";
import { EditProduct } from "./features/users/EditProduct";
import Login from "./components/admin/login";
import Signup from "./components/admin/signup";
import Home from "./components/home";
import NotFound from "./components/NotFound";
import SingleProduct from "./components/SingleProduct";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React from "react";
import { ProductList } from "./features/users/ProductList";
import { useEffect } from "react";
import { fetchProducts } from "./features/users/productsSlice";
import { useDispatch,useSelector } from "react-redux";


export default function App() {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  
  }, [dispatch]);
  return (
    <Router>
      <div>

      <Navbar />
      
        <Switch>
          <Route path="/home">
        <Home />
          </Route>
          <Route path="/product/:title/:id">
        <SingleProduct />
          </Route>
          <Route path="/login">
          {localStorage.getItem('logged_user') ? <Home />: <Login />}
          </Route>
          <Route path="/signup">
          {localStorage.getItem('logged_user') ? <Home />: <Signup />}
          </Route>
          <Route path="/add-product">
            {localStorage.getItem('logged_user') ? <AddProduct />: <Home />}
            
          </Route>
          <Route path="/edit-product/:id">
          {localStorage.getItem('logged_user') ? <EditProduct />: <Home />}
            
          </Route>
          <Route path="/productList">
          {localStorage.getItem('logged_user') ? <ProductList />: <Home />}
            
          </Route>
          <Route path="*">
          <NotFound />
            
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
