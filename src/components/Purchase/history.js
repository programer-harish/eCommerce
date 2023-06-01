import React, { Component } from 'react'

const host = "http://localhost:5000";
class PurchaseHistory extends Component {
    constructor() {
        super();
        this.state = {
            masters: null,
            details: null
        }
    }
    componentDidMount() {
        fetch(`${host}/api/purchases`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((json) => {
                this.setState({ masters: json.purchase_master, details: json.purchase_detail })
            });
    }
    render() {
        return (
            <>
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th>Purchase Id</th>
                                        <th>Category Id</th>
                                        <th>Product Id</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {this.state.masters != null ? this.state.masters.map((master) => {
                                        return ( this.state.details.map((detail) => {
                                                if (detail.pur_id === master.pur_id) {
                                                    return <tr key={detail._id}>
                                                        <td>{master.pur_id}</td>
                                                        <td>{detail.cat_id}</td>
                                                        <td>{detail.prod_id}</td>
                                                        <td>{detail.pur_price}</td>
                                                        <td>{detail.qnty}</td>
                                                    </tr>
                                                }
                                            })
                                        )
                                    }) : <tr><td></td><td></td><td></td><td></td><td></td></tr>}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default PurchaseHistory;