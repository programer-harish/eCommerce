import React, { Component } from 'react';

class Carditem extends Component {
    constructor(props){
        super();
        this.state ={ 
            ...props
        };

    }
    fetchImage(){
        return require('./images/PROD1/1'+'.jpg');
    }
    render() {
        return (
            // <div className="card col-md-3" >
            // <h1 className="text bg-yellow-50">I am tailwind css</h1>
            //     <img src={require('./images/PROD1/1'+'.jpg')} className="card-img-top" alt="..." style={{height:"200px"}}/>
            //         <div className="card-body">
            //             <h5 className="card-title">{brand_name}|{desc}</h5>
            //             <p className="card-text">{sal_price}</p>
            //             <a href="#" className="btn btn-primary">Go somewhere</a>
            //         </div>
            // </div>
            <div className="max-w-xs rounded overflow-hidden border">
                <img className="w-full h-48" src={this.fetchImage()} alt="Sunset in the mountains"/>
                    <div className="px-6">
                        <div className="font-bold mb-2">{this.state.brand_name}|{this.state.desc}</div>
                        <p className="text-gray-700 text-base">
                        Price Rs. {this.state.sal_price} </p>
                    </div>

            </div>
        );
    }
}

export default Carditem;