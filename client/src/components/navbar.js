import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../features/users/userSlice";

const Navbar = () => {
  let history = useHistory();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const handleLogout = () => {

    dispatch(logout());
    // history.push("/");
    // navigate('/' , {replace:true})
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
      <div className="container-fluid ">
        <div className="nav-link">

        <NavLink className="navbar-brand" to="/home">
          Products
        </NavLink>
        </div>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button> */}
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                Home
              </NavLink>
            </li>
            {localStorage.getItem('logged_user') && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/productList">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={handleLogout} to="/home">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!localStorage.getItem('logged_user') && (
              <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign up
                </NavLink>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
