import React from 'react'
import './CardComponent.css'
import mobileHeader from '../assets/image-header-mobile.jpg'

export default function CardComponent() {
    return (
        <div className='card-container'>
           
            <div className='header-container'>
                <div>

                <img className='image-style' src={mobileHeader} alt="Mobile Header" />
                </div>
                <div className='super-position'></div>
            </div>
            
            <div></div>
            <div className='main-container'>
                <h1>Get <span className='highlight'>insights</span> that help your business grow.</h1>
                <p>Discover the benefits of data analitycs and make better decisions reganding revenue, customer experience, and overall efficency.
                </p>
            </div>
            <div className='footer-container'>
                <div>
                    <h2>10K+</h2>
                    <span>COMPANIES</span>
                </div>
                <div>
                    <h2>314</h2>
                    <span>TEMPLATES</span>
                </div>
                <div>
                    <h2>12M+</h2>
                    <span>QUERIES</span>
                </div>
            </div>
        </div>
    )
}
