import React, { Component } from 'react'
import {getCategories} from './../../CallApis'
import Tablerow from '../Tablerow';

const host = "http://localhost:5000";
class Purchase extends Component {

    constructor(){
        super();
        this.state={
            rows:[0]//giving one element as 0 at index 0
        }
        this.addRow = this.addRow.bind(this)
        this.remRow = this.remRow.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidMount(){
    }
    // categories=getCategories();
    addRow(){
        let newrows;
        newrows=this.state.rows;
        newrows[newrows.length]=newrows.length;
        this.setState({rows:newrows})
    }
    remRow(){
        if (this.state.rows.length>1) {
            let newrows=Array(this.state.rows.length-1);
        for (let index = 0; index < this.state.rows.length-1; index++) {
            newrows[index] = this.state.rows[index];
        }
        this.setState({rows:newrows})
        } else {
            this.props.showAlert("Last row cannot be removed", "danger");
        }
    }
    async handleSave(){
        let trs=document.getElementsByTagName('tr');
        let cat_ids=[],prod_ids=[],pur_prices=[],qntys=[],userid="USER";
        for (let i = 1; i < trs.length-1; i++) {
            cat_ids[i-1]=  trs[i].childNodes[0].childNodes[1].value;
            prod_ids[i-1]=  trs[i].childNodes[1].childNodes[0].value;
            pur_prices[i-1]=  trs[i].childNodes[2].childNodes[0].value;
            qntys[i-1]=  trs[i].childNodes[3].childNodes[0].value;
        }
        const response= await fetch(`${host}/api/purchases/stockPurchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cat_ids:cat_ids, prod_ids:prod_ids,pur_prices:pur_prices,qntys:qntys,user_id:userid})
        });
        const result= await response.json();
        if(result.success){
            this.props.showAlert("Stock saved", "success");
            document.getElementById("pur_id").innerHTML=result.pur_id
            document.getElementById("purHead").style.display='block'
        }
        else{
            this.props.showAlert("Failed to save", "error");
        }
    }
    render() {
        return (
            <>
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <h6 style={{display:'none'}} id="purHead">Stock Purchase ID: <span id="pur_id"></span></h6>
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th>Category</th>
                                        <th>Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle" id='purchaseTable'>
                                    {this.state.rows.map((row)=>{
                                        return <Tablerow key={row} row={row} selectedCategories={this.selectedCategories}/>
                                    })}
                                    <tr><td></td>
                                    <td></td><td><button onClick={this.addRow}>+ row</button></td>
                                    <td><button onClick={this.remRow}>- row</button></td></tr>
                                    
                                </tbody>
                            </table>
                            <center><button className="btn btn-primary" onClick={this.handleSave}>Save stock</button></center>
                            
                        </div>
                        {/* <div className="col-lg-4">
                            <form className="mb-5" action="#">
                                <div className="input-group">
                                    <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Apply Coupon</button>
                                    </div>
                                </div>
                            </form>
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="font-weight-medium">Subtotal</h6>
                                        <h6 className="font-weight-medium" id="subtotal">$0</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Shipping</h6>
                                        <h6 className="font-weight-medium" id="shipping">$0</h6>
                                    </div>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="font-weight-bold">Total</h5>
                                        <h5 className="font-weight-bold" id="total">$0</h5>
                                    </div>
                                    <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }
}
export default Purchase;