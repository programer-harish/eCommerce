import React, { Component } from 'react'
import logo from './images/logo.jpg'
import Navbar from '../Navbar';

class Header extends Component {

    render() {
        return <nav className="bg-purple-800 text-white flex justify-between" >
            <div className="flex">
            <img src={logo} className="h-12 pt-2 px-3 rounded-3xl"/>
            <h1 className="pt-3">ShopNow</h1>
            <ul className="px-28 pt-3 flex space-x-11 ">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Contact Us</li>
            </ul>
            </div>
            
            <form className="pt-3 justify-end space-x-2 px-5">
            <input className="rounded-md border-2 border-blue-200 text-black font-semibold" />
            <button className="bg-pink-400 rounded-full px-2 border-2 border-blue-200">Search</button>    
            </form>            
        </nav>
    }
}

export default Header;