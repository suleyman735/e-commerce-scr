import React,{useState,useEffect} from "react";
import "./../assests/styles/productdetail.css";
import image1 from "./../assests/images/mobile.png";
import StarRating from "../components/StarRating";
import { useParams } from 'react-router-dom';
import { getProducts } from '../constant/api';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
    const { detail} = useParams();
    const [products,setProducts] = useState([])
    const [review, setReview] = useState([]);
    const { isAuthenticated, login } = useAuth();
    const userId = localStorage.getItem("userId");

    const [reviewForm, setReviewForm] = useState({
   
        rating: 0,
        comment: '',
        createdAt: '',
        product: detail,
        user: userId,
        
      });

    const producReview=async()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/review/${detail}/`)
        
            setReview(response.data)
            
        } catch (error) {
            
        }

    }

    const handleInputChange = (e) => {

        // Update the reviewForm state when the user types in the form fields
        setReviewForm({
          ...reviewForm,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access");
          // Make a POST request with the updated reviewForm
          const response = await axios.post(`http://127.0.0.1:8000/api/review/${detail}/`, reviewForm,
   
      
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
    
          // Handle the response as needed
          console.log('Review submitted successfully:', response.data);
          window.location.reload();
        } catch (error) {
          // Handle error
          console.error('Error submitting review:', error.data);
        }
      };

    useEffect(()=>{
        // console.log(review.map((e)=>e.rating.reduce((acc,current)=>acc+current,0)));
        const fetchData = async () => {
            try {
              const data = await getProducts();
              setProducts(data);
            // console.log(data[0]._id);
              producReview()
            } catch (error) {
              // Handle error if needed
            }
          };
      
          fetchData();
    },[])
   
    const productDetail = products.filter(product => product._id  == detail)
    // console.log(productDetail);
  return (
    <div>
      <div className="container">
        {productDetail.map((productdetail)=>(

        
        <div className="details">
          <div className="detail-1">
            <div className="detail-1-image">
              <img src={image1} />
            </div>
            <div className="detail-1-container">
              <div className="title">{productdetail.name}</div>
              <div className="star-review">
                <div className="star"><StarRating rating={productdetail.rating} className="star-1"/></div>
                <div className="review">({review.length}) review)</div>
                <div className="stock">|  in stock</div>
                
              </div>
              <div className="price">${productdetail.price}</div>
              <div className="description">{productdetail.description}</div>
{isAuthenticated && isAuthenticated ?               <form  onSubmit={handleSubmit} class="new-review-form">
                                                    <h3 class="spr-form-title">Write a review</h3>

                                                    <fieldset class="spr-form-review">
                                                      <div class="spr-form-review-rating">
                                                        <label class="spr-form-label">Rating</label>
                                                        <div class="spr-form-input spr-starrating">
                                                          <div class="product-review"><input type="range" min={0} max={5} step={1} name="rating" value={reviewForm.rating}   onChange={handleInputChange}/></div>
                                                        </div>
                                                      </div>
                                                
                                        
                                                
                                                      <div class="spr-form-review-body">
                                                        <label class="spr-form-label" >Body of Review <span class="spr-form-review-body-charactersremaining">(1500)</span></label>
                                                        <div class="spr-form-input">
                                                          <textarea  rows="3" name="comment"
            value={reviewForm.comment}
            onChange={handleInputChange} placeholder="Write your comments here"></textarea>
                                                        </div>
                                                      </div>
                                                    </fieldset>
                                                    <fieldset class="spr-form-actions">
                                                        <button type="submit" class="spr-button spr-button-primary button button-primary btn btn-primary" value="Submit Review">Submit Review</button>
                                                    </fieldset>
                                                </form>:<div> please login to account for writing review </div>}

            </div>
          </div>
          <div className="detail-review">
            <div className="row">
                {review.map((review)=>(
                <div className="col-md-12 mt-5">
                <div><StarRating rating={review.rating}/></div>
                    <div>{}</div>
                    <div>{review.user.map((e)=>e.email)}</div>
                    
                    <div className="time">{review.createdAt}</div>
                    <div>{review.comment}</div>
                </div>
                ))}

   
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
