import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "./productsSlice";

export function AddProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const state = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    // const productData = new FormData();
    // productData.append('title', title)
    // productData.append('description', description)
    // productData.append('image', image)
    const productData =  {
      title: title,
      description: description,
      image: 'https://via.placeholder.com/640x480.png/00ffee?text=nihil',
      userId: (JSON.parse(localStorage.getItem('logged_user')).id)
      }
      dispatch(
        addProduct(productData)
      );

    //   setError(null);

    history.push("/productList");
      
   

      setTitle("");
      setDescription('');
      // setImage();
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add product</h1>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit} className="three columns">
          <label htmlFor="title">Title</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="title"
            id="title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="description">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder=""
            id="description"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
          />
           {/* <label className="form-label" >Image</label>
                <input 
                    type="file" 
                    className="form-control" 
                    name="image" 
                    onChange={(e)=>setImage( e.target.files[0])}
                    multiple
                /> */}
          {/* {error && error} */}
          <button className="button-primary">
            Add product
          </button>
        </form>
      </div>
    </div>
  );
}
