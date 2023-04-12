import React, { Component } from 'react';

class Carditem extends Component {
    render(props) {
        const {prod_id,desc,pic,cat_id,brand_name,sal_price} = this.props;
        return (
            <div className="card col-md-3" >
            <h1 className="text bg-yellow-50">I am tailwind css</h1>
                <img src={require('./images/PROD1/1'+'.jpg')} className="card-img-top" alt="..." style={{height:"200px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{brand_name}|{desc}</h5>
                        <p className="card-text">{sal_price}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        );
    }
}

export default Carditem;