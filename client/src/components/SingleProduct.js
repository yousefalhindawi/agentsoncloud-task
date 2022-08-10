// import '*.jpg'
import "./SingleProduct.css";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addReviews } from "../features/users/ReviewsSlice";
import Swal from 'sweetalert2';
import axios from 'axios';

const SingleProduct = () => {
  const dispatch = useDispatch();
  // const [bodyReview,setBodyReview] = useState('');

  let { title, id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState();
  const [addReview, setAddReview] = useState();

  const [reviewBody, setReviewBody] = useState();


  const fetchProduct = async () => {
    const response = await fetch(`http://127.0.0.1:30155/api/items/${id}`);
    const product = await response.json();
    setProduct(product);
  };
  const fetchreviews = async () => {
    const response = await fetch(`http://127.0.0.1:30155/api/reviews/${id}`);
    const reviews = await response.json();
    // console.log('response',reviews)
    setReviews(reviews);
  };

  useEffect(() => {
    fetchProduct();
    fetchreviews();
  }, [addReview]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewData = {
      review_body: reviewBody,
      itemId: +id,
      userId:(JSON.parse(localStorage.getItem('logged_user')).id),
    }
    try {
      // console.log(reviewData)
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:30155/api/reviews",
        headers: { Accept: "application/json" },
        data: reviewData,
      });
      // console.log(response)
      if (response.data.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Review added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        const addreview = await response.data.review;
        // console.log('addreview',addreview)
        setReviews([
          ...reviews,
          addreview
        ]
        )
        setAddReview(addreview)
        setReviewBody('')
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log('reviews',reviews)

  // console.log(id)

  //   useEffect(() => {
  //     dispatch(fetchReviews(+id))
  //   }
  //   ,[dispatch])

  //   const addReviewHandler = (e) => {
  //     e.preventDefault();
  //     // console.log(rate)
  //     const reviewData = {
  //       review_body: bodyReview,
  //       user_id : (JSON.parse(localStorage.getItem('logged_user')).id),
  //       product_id: +id,
  //       // product_id: product_id,

  //     }

  //     dispatch(addReviews(reviewData));
  //     setBodyReview('');

  //   }

  return (
    <>
      {" "}
      {product ? (
        <>
          <div className="container">
            <div className="col-lg-12 mt-3">
              <div className="latest_product_inner">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-12 col-md-12  mb-3" key={product.id}>
                    <div className="card">
                      <img
                        src={product.image}
                        className="card-img-top "
                        width="400"
                        height="250"
                        alt=""
                      />

                      <div className="card-body bg-light text-center">
                        <div className="mb-2">
                          <h6
                            className="font-weight-semibold mb-2"
                            // className="text-default mb-2"
                            data-abc="true"
                            style={{ fontSize: "20px" }}
                          >
                            {product.title}
                          </h6>
                          <p className="text-muted" data-abc="true">
                            {product.release_date}
                          </p>
                          <p className="text-muted" data-abc="true">
                            {product.description}
                          </p>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* review section */}
          <div className="container my-5">
            <div className="d-flex justify-content-center row">
              <div className="col-md-12">
                <div className="d-flex flex-column comment-section">
                  {reviews && reviews.map((review) =>
                  
                  <div className="bg-white p-2">
                    <div className="d-flex flex-row user-info">
                      <img
                        className="rounded-circle"
                        src="https://i.pravatar.cc"
                        width="40"
                        alt=""
                      />
                      <div className="d-flex flex-column justify-content-start ml-2">
                        <span className="d-block font-weight-bold name">
                          {review.User.name}
                        </span>
                        <span className="date text-black-50">
                          {(new Date(review.updatedAt)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="comment-text">
                       {review.review_body}
                      </p>
                    </div>
                  </div>
                  )}
                  {/* <div className="bg-white">
                    <div className="d-flex flex-row fs-12">
                        <div className="like p-2 cursor"><i className="fa fa-thumbs-o-up"></i><span className="ml-1">Like</span></div>
                        <div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1">Comment</span></div>
                        <div className="like p-2 cursor"><i className="fa fa-share"></i><span className="ml-1">Share</span></div>
                    </div>
                </div> */}
                {(JSON.parse(localStorage.getItem('logged_user'))) && 
                
                <form onSubmit={submitHandler}>
                  <div className="bg-light p-2">
                    <div className="d-flex flex-row align-items-start">
                      <img
                        className="rounded-circle"
                        // src="https://i.imgur.com/RpzrMR2.jpg"
                        src="https://i.pravatar.cc"
                        width="40"
                        alt=""
                      />
                      
                      <textarea className="form-control ml-1 shadow-none textarea"
                       onChange={(e)=>setReviewBody(e.target.value)}
                       value={reviewBody}
                      ></textarea>
                    </div>
                    <div className="mt-2 text-right">
                      <button
                        className="btn btn-primary btn-sm shadow-none"
                      >
                        Post comment
                      </button>
                      {/* <button
                        className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                        type="button"
                      >
                        Cancel
                      </button> */}
                    </div>
                  </div>
                  </form>}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p
            className="alret alert-danger text-center text-dark p-2 my-2"
            role="alert"
          >
            There is no product with that name
          </p>
        </>
      )}
    </>
  );
};

export default SingleProduct;
