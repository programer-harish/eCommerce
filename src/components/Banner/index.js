import React, { Component } from 'react'
import img1 from './images/d1.jpg'
import img2 from './images/d2.jfif'
import img3 from './images/d3.jpg'

class Banner extends Component{
    render(){
        return <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={img1} className="d-block w-100" style={{height:"400px"}} alt="..."/>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={img2} className="d-block w-100" style={{height:"400px"}} alt="..."/>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={img3} className="d-block w-100" style={{height:"400px"}} alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    }
}

export default Banner;