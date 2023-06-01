import React, { Component } from 'react'


class Alert extends Component{
    capitalize(word){
        if(word==="danger")
        word="Error";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    render(){
        return (
            <div style={{height: '50px',textAlign:'center'}}>
            {this.props.alert.msg && <div className={`alert alert-${this.props.alert.type} alert-dismissible fade show`} role="alert">
               <strong>{this.capitalize(this.props.alert.type)}</strong>: {this.props.alert.msg} 
            </div>}
            </div>
        )
    }
}

export default Alert;