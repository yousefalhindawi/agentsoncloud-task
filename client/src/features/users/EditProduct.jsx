import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

import { useState } from "react";
import { updateProduct } from "./productsSlice";
import { useParams } from "react-router-dom";

export function EditProduct() {
  // const { pathname } = useLocation();
  const {id} = useParams();
  // console.log(id)
  // const userId = parseInt(pathname.replace("/edit-user/", ""));

  const product = useSelector((state) =>
  // console.log(state.products.products)
    state.products.products.find((product) => product.id === +id)
  );
  // console.log(product)

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);

//   const handleName = (e) => setName(e.target.value);
//   const handleEmail = (e) => setEmail(e.target.value);

  // const usersAmount = useSelector((state) => state.users.products.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData =  {
      id: +id,
      title: title,
      description: description,
      image: 'https://i.pravatar.cc',
      }

      Swal.fire({
        title: 'Do you want to update the review?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Update',
        confirmButtonColor: '#71cd14',
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(
        updateProduct(productData)
      );
      history.push("/productList");
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
      

    //   setError(null);
   
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
          {/* {error && error} */}
          <button className="button-primary">
            update product
          </button>
        </form>
      </div>
    </div>
  );
}
