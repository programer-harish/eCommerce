import React, { Component } from 'react'
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Detail from "./components/Detail";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Purchase from "./components/Purchase";
import Productcreation from "./components/Product";
import Categorycreation from "./components/Category";
import Navbar from "./components/Navbar";
import Alert from './Alert';
import Usercreation from './components/Usercreation';
import ProductUpdate from './components/Product/update';
import CategoryUpdate from './components/Category/update';
import PurchaseHistory from './components/Purchase/history';

class App extends Component {

  constructor() {
    super();
    this.state = {
      alert: {
        msg: null,
        type: null
      }
    }
    this.setAlert = this.setAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }
  setAlert(message, type) {
    this.setState({
      alert: {
        msg: message,
        type: type
      }
    })
  }
  showAlert(message, type){
    this.setAlert(message, type)
    setTimeout(()=>{
      this.setAlert(null,null);
    },2500)
  }
  render() {
    return (
      <div>

        <Router>
          <Header />
          <Navbar />
          <Alert alert={this.state.alert}/>
          <Routes>
            <Route path='/' element={<Home showAlert={this.showAlert}/>} />
            <Route path='shop' element={<Shop showAlert={this.showAlert}/>} />
            <Route path='detail' element={<Detail showAlert={this.showAlert}/>} />
            <Route path='contact' element={<Contact showAlert={this.showAlert}/>} />
            <Route path='cart' element={<Cart showAlert={this.showAlert}/>} />
            <Route path='checkout' element={<Checkout showAlert={this.showAlert}/>} />
            <Route path='purchase' element={<Purchase showAlert={this.showAlert}/>} />
            <Route path='productCreation' element={<Productcreation showAlert={this.showAlert}/>} />
            {/* <Route path='productDelete' element={<Productdeletion showAlert={this.showAlert}/>} /> */}
            <Route path='categoryCreation' element={<Categorycreation showAlert={this.showAlert}/>} />
            <Route path='userCreation' element={<Usercreation showAlert={this.showAlert}/>} />
            <Route path='categoryUpdate' element={<CategoryUpdate showAlert={this.showAlert}/>} />
            <Route path='productUpdate' element={<ProductUpdate showAlert={this.showAlert}/>} />
            <Route path='purchaseHistory' element={<PurchaseHistory showAlert={this.showAlert}/>} />
          </Routes>
        </Router>
        <Footer />
        <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
      </div>
    );
  }
}

export default App;
