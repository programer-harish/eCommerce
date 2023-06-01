import React, { Component } from 'react'

const host = "http://localhost:5000";
class Categorycreation extends Component {
    constructor() {
        super();
        this.state = {
            success: false,
            res_flag: false,
            response_msg: null
        }
        // this.handleSubmit = this.handleSubmit.bind(this) 
    }
    handleSubmit=async (e)=> {
        e.preventDefault();
        let cat_name = document.getElementsByName("cat_name")[0].value;
        // alert(this.host)
        fetch(`${host}/api/categories/createCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cat_name })
        }).then((response) => response.json()).
            then((json) => {
                this.props.showAlert("Category Created","success");
                document.getElementsByName("cat_name")[0].value="";
            });
    }
    render() {
        return (
            <>
                <div className="col-lg-7 mb-5 mx-5">
                    <div className="contact-form">
                        {this.state.res_flag && <div id="success">{this.state.success==true?"Category Created":"Creation failed due to "+this.state.response_msg}</div>}
                        <form name="sentMessage"  noValidate="noValidate" onSubmit={this.handleSubmit}>
                            <div className="control-group">
                                <label>Category Name</label>
                                <input type="text" className="form-control" id="name" name="cat_name" placeholder="TV,Fridge,Mobile..."
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Categorycreation;