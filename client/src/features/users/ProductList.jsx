import { fetchProducts, deleteProduct } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


export function ProductList() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const  {loading}  = useSelector((state) => state.products);
  const  {error} = useSelector((state) => state.products);
  
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete the review?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#f00',
      denyButtonText: `Cancel`,
      denyButtonColor: `#71cd14`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

 

  return (
    <div className="container">
      {error && <div className="alret alert-danger" role="alert">{error}</div>}
      <div className="row">
        <h1>Redux CRUD Products app</h1>
      </div>
      <div className="row">
        {/* <div className="two columns">
          <button
            onClick={() => dispatch(fetchProducts())}
            className="button-primary"
          >
            Load users
          </button>
        </div> */}
        <div className="two columns">
          <Link to="/add-product">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <span>Loading...</span> 
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                  <th>title</th>
                  <th>description</th>
                  <th>image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td><img src={product.image} alt="" srcset="" width={100} /> </td>
                    {(JSON.parse(localStorage.getItem('logged_user')).id) === product.userId &&
                    
                    <td>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                      <Link to={`/edit-product/${product.id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                    }
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
