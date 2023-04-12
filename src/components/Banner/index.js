import React, { Component } from 'react'
import BannerImage from './images/bannerImage.avif'

class Banner extends Component{
    render(){
        return <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={BannerImage} className="d-block w-100" height="300px" width="300px" alt="..."/>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={BannerImage} className="d-block w-100" height="300px" width="300px" alt="..."/>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={BannerImage} className="d-block w-100" height="300px" width="300px" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    }
}

export default Banner;