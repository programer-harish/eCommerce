import React, { Component } from 'react'

const host = "http://localhost:5000";
class Productcreation extends Component {

    constructor() {
        super();
        this.state = {
            categories: null
        }
    }
    componentDidMount() {
        fetch(`${host}/api/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).
            then((json) => {
                this.setState({ categories: json })
            });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let category = document.getElementsByName("category")[0].value;
        let name = document.getElementsByName("name")[0].value;
        let desc = document.getElementsByName("desc")[0].value;
        let brand = document.getElementsByName("brand")[0].value;
        let prodImg = document.getElementsByName("prodImg")[0].files[0];
        let sal_price = document.getElementsByName("sal_price")[0].value;
        var formData = new FormData();
        formData.append('prodImg',prodImg)
        formData.append('cat_id',category)
        formData.append('name',name)
        formData.append('desc',desc)
        formData.append('brand_name',brand)
        formData.append('sal_price',sal_price)

        fetch(`${host}/api/products/createProduct`, {
            method: 'POST',
            body: formData
        }).then((response) => response.json()).
            then((json) => {
                console.log(json.message)
                if(json.success){
                    this.props.showAlert(json.message, "success");                    
                }
                else{
                    this.props.showAlert(json.message, "error");
                } 
                document.getElementsByName("category")[0].value="";
                document.getElementsByName("name")[0].value = "";
                document.getElementsByName("desc")[0].value = "";
                document.getElementsByName("brand")[0].value = "";
                document.getElementsByName("sal_price")[0].value = "";
            });
    }
    render() {
        return (
            <>
                <div className="col-lg-7 mb-5 mx-5">
                    <div className="contact-form">
                        <div id="success" className='container' style={{ backgroundColor: 'rgb(23 147 23)', color: "white" }}></div>
                        <form name="sentMessage" id="contactForm" noValidate="noValidate" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <div className="control-group">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select className="custom-select" name='category'>

                                        {this.state.categories != null ? this.state.categories.map(category => {
                                            return <option key={category._id} defaultValue={category.cat_id}>{category.name}</option>
                                        }) : <option defaultValue>No Category Available</option>}

                                        {/* <option defaultValue>United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option> */}
                                    </select>
                                </div>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" name='name'
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <label>Brand Name</label>
                                <input type="text" className="form-control" id="name" name='brand'
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <label>Description</label>
                                <input type="text" className="form-control" id="name" name='desc'
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <label>Picture</label>
                                <input type="file" className="form-control" id="name" name='prodImg'
                                    required="required" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <label>Sale Price</label>
                                <input type="number" className="form-control" id="name" name='sal_price'
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Send
                                    Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
export default Productcreation;