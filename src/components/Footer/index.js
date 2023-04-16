import React, { Component } from 'react'

class Footer extends Component{
    render(){
        return <div className="bg-purple-800 text-white">
            <ul className="flex space-x-2">
                <li>Support</li>
                <li>Mail us @</li>
                <li>Facebook</li>
            </ul>
        </div>
    }
}

export default Footer;