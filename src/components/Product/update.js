import React, { Component } from 'react'
import { getProducts } from '../../CallApis';

const host = "http://localhost:5000";
class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
        this.handleSave = this.handleSave.bind(this)
    }
    async componentDidMount() {
        let products = await getProducts();
        this.setState({ products: products });
    }
    handleEdit(prod_id, name, sal_price) {
        document.getElementById("edit_modal").click();
        document.getElementsByName("eprod_id")[0].value = prod_id;
        document.getElementsByName("eprod_name")[0].value = name;
        document.getElementsByName("esal_price")[0].value = sal_price;
    }
    async handleSave() {
        let prod_id = document.getElementsByName("eprod_id")[0].value;
        let prod_name = document.getElementsByName("eprod_name")[0].value;
        let sal_price = document.getElementsByName("esal_price")[0].value;
        const response = await fetch(`${host}/api/products/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prod_id: prod_id, name: prod_name,sal_price:sal_price })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "success");
            let products = await getProducts();
            this.setState({ products: products });

        }
        else {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "danger");
        }
    }
    async handleDelete(prod_id) {
        const response = await fetch(`${host}/api/products/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prod_id: prod_id })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "success");
            let products = await getProducts();
            this.setState({ products: products });
            //document.getElementById(cat_id).childNodes[1].innerHTML=cat_name;
        }
        else {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "danger");
        }
    }
    render() {
        return (
            <>
                <button type="button" id="edit_modal" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className='container my-3'>
                                    <div className="mb-3">
                                        <label className="form-label">Product ID</label>
                                        <input type="text" className="form-control" name="eprod_id" disabled={true} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="eprod_name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Sale Price</label>
                                        <input type="number" className="form-control" name="esal_price" />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="close_modal" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleSave} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-bordered text-center mb-0">
                        <thead className="bg-secondary text-dark">
                            <tr>
                                <th>Category ID</th>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Sale Price</th>
                                <th>Update</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {
                                this.state.products != null ? this.state.products.map((product) => {
                                    return <tr key={product._id} id={product.prod_id}>
                                        <td className="align-middle" id="td_cat_id">{product.cat_id}</td>
                                        <td className="align-middle" id="td_prod_id">{product.prod_id}</td>
                                        <td className="align-middle" id="td_name">{product.name}</td>
                                        <td className="align-middle" id="td_sal_price">{product.sal_price}</td>
                                        <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => { this.handleEdit(product.prod_id, product.name, product.sal_price) }}><i className="fas fa-edit"></i></button></td>
                                        <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => { this.handleDelete(product.prod_id) }}><i className="fa fa-times"></i></button></td>
                                    </tr>
                                }) : <tr><td></td><td></td><td></td><td></td></tr>
                            }


                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default ProductUpdate;