import React, { Component } from 'react'
import { getCategories } from '../../CallApis';

const host = "http://localhost:5000";
class CategoryUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null
        }
        this.handleSave = this.handleSave.bind(this)
    }
    async componentDidMount() {
        let categories = await getCategories();
        this.setState({ categories: categories });
    }
    handleEdit(cat_id, name) {
        document.getElementById("edit_modal").click();
        document.getElementsByName("ecat_id")[0].value = cat_id;
        document.getElementsByName("ecat_name")[0].value = name;
    }
    async handleSave() {
        let cat_id = document.getElementsByName("ecat_id")[0].value;
        let cat_name = document.getElementsByName("ecat_name")[0].value;
        const response = await fetch(`${host}/api/categories/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cat_id: cat_id, name: cat_name })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "success");
            let categories = await getCategories();
            this.setState({ categories: categories });
            //document.getElementById(cat_id).childNodes[1].innerHTML=cat_name;
        }
        else {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "danger");
        }
    }
    async handleDelete(cat_id) {
        const response = await fetch(`${host}/api/categories/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cat_id: cat_id })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById("close_modal").click();
            this.props.showAlert(result.message, "success");
            let categories = await getCategories();
            this.setState({ categories: categories });
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
                                <h5 className="modal-title" id="exampleModalLabel">Edit Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className='container my-3'>
                                    <div className="mb-3">
                                        <label className="form-label">Category ID</label>
                                        <input type="text" className="form-control" name="ecat_id" disabled={true} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="ecat_name" />
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
                                <th>Name</th>
                                <th>Update</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {
                                this.state.categories != null ? this.state.categories.map((category) => {
                                    return <tr key={category._id} id={category.cat_id}>
                                        <td className="align-middle" id="td_cat_id">{category.cat_id}</td>
                                        <td className="align-middle" id="td_name">{category.name}</td>
                                        <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => { this.handleEdit(category.cat_id, category.name) }}><i className="fas fa-edit"></i></button></td>
                                        <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => { this.handleDelete(category.cat_id) }}><i className="fa fa-times"></i></button></td>
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

export default CategoryUpdate;