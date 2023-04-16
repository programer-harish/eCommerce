import React, { Component } from 'react'
import Banner from '../Banner'
import Carditem from '../Carditem'
import Navbar from '../Navbar';

class Home extends Component{
    constructor(){
        super();
        this.state={
            products:null
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        const host = "http://localhost:5000";
        fetch(`${host}/api/products`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response)=>response.json()).
          then((json)=>{
            this.setState({products:json})
          });
    }
    render(){
        return(
        <>
        {/* <Navbar/> */}
        <Banner/>
        <div className="row">
        {this.state.products!=null?this.state.products.map(product=>{
            return <Carditem key={product._id} prod_id={product.prod_id}  desc={product.desc} pic={product.pic} cat_id={product.cat_id} brand_name={product.brand_name} sal_price={product.sal_price}/>
        }):null}
        </div>
        </>)
    }
}
export default Home;