import React from 'react'
import {Card,Button} from 'react-bootstrap'
import './style.css'
import AlmondBannanabar from "../../assets/home/almond-banana-bar.png"
import LandingCarousel from '../carousel'
import { useSelector } from 'react-redux' ;
import OwlCarousel from "react-owl-carousel";
import chocoimg from "../../assets/home/StoreChoc.png"

const StoreContent =()=>{
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  console.log("categories",categories.categories)
return(
    <div>
           <Card style={{ border: "none",maxWidth: "768px",margin: "0 auto", background: "transparent",}}>
           <div className="for-store-content">
            <p className='for-store-txt'>
              <span className="for-s-letter">s</span>
              <span className="">t</span>
              <span className="">o</span>
              <span className="">r</span>
              <span className="">e</span>
            </p>
            
            {/* <img src="/assets/home/almond-banana-bar.png" alt="almond banana bar" className="mx-auto md:mt-[-3.25rem]"> */}
          </div>

          <p className="for-store-des">
              This a physical store currently only located in <span style={{ fontWeight: "bold"}}>Hyderabad</span>. 
          <span >Please enter your pincode to check for delivery.</span>
          </p>

          <span style={{textAlign :"center" ,marginTop: "40px"}}>
           <button className="for-store-btn"> Explore Store</button>
          </span>
          <img className="for-store-img" src={AlmondBannanabar} alt="almond banana bar" />
          </Card>
          {categories.categories.length >1 ?
            <OwlCarousel  dots="false" dotsEach="false" className="owl-theme" loop margin={10} nav>
              {categories.categories.map((item,index) => {     
              return (
              <div className="prd-detail-info-item" key={index}>
                <div className='for-image-hover'>
                     <img className='for-image' src="https://vl.able.do/assets/store-packed-images/1.jpg" alt="img" />
                     <div className="prd-info-block">
                     <p className="for-product-name">{item.display_name}</p>
                     <p className="for-product-price">₹0.00</p>
                     </div>
                </div>           

              </div>
              );
              })}
          </OwlCarousel>  
          : null
          }
             {/* <OwlCarousel  dots="false" dotsEach="false" dotData="false"  className="owl-theme" loop margin={10} nav>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
              <div>
                <img src={chocoimg} alt="img" />               
              </div>
          </OwlCarousel>   */}
    </div>
)

}
export default StoreContent ;