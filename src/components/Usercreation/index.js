import React, { Component } from 'react'

const host = "http://localhost:5000";
class Usercreation extends Component {

    handleSubmit=async (e)=> {
        e.preventDefault();
        let role = document.getElementsByName("role")[0].value;
        let name = document.getElementsByName("name")[0].value;
        let phone = document.getElementsByName("phone")[0].value;
        let address = document.getElementsByName("address")[0].value;
        let password = document.getElementsByName("password")[0].value;
        let email = document.getElementsByName("email")[0].value;
        // console.log(role,name,phone,address,password,email)
        fetch(`${host}/api/users/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, role: role, phone: phone, address: address, password: password, email:email })
        }).then((response) => response.json()).
            then((json) => {
                this.props.showAlert("User Created", "success");
                document.getElementsByName("userid")[0].value=json.user_id;
                console.log(json.user_id)
                document.getElementsByName("role")[0].value="";
                document.getElementsByName("name")[0].value="";
                document.getElementsByName("phone")[0].value="";
                document.getElementsByName("address")[0].value="";
                document.getElementsByName("password")[0].value="";
                document.getElementsByName("email")[0].value="";
            });
    }
    render() {
        return <>
            <div className="col-lg-7 mb-5 mx-5">
                <div className="contact-form">
                    <div id="success" className='container' style={{ backgroundColor: 'rgb(23 147 23)', color: "white" }}></div>
                    <form name="sentMessage" id="contactForm" noValidate="noValidate" onSubmit={this.handleSubmit}>
                        <div className="control-group">
                            <label>User Id</label>
                            <input type="text" className="form-control" id="name" name='userid'
                                required="required" data-validation-required-message="Please enter your name" readOnly />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <div className="form-group">
                                <label>Role</label>
                                <select className="custom-select" name='role'>
                                    <option value='admin' defaultValue>Admin</option>
                                    <option value='purchase'>Purchase</option>
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
                            <label>Phone</label>
                            <input type="number" className="form-control" id="name" name='phone'
                                required="required" data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <label>Email</label>
                            <input type="email" className="form-control" id="name" name='email'
                                required="required" data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <label>Address</label>
                            <input type="text" className="form-control" id="name" name='address'
                                required="required" data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <label>Password</label>
                            <input type="text" className="form-control" id="name" name='password'
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

    }
}

export default Usercreation;