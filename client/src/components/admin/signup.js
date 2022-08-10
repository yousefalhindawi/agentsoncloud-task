
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { register } from '../../features/users/userSlice';

const Signup =()=>{
    
    let history = useHistory();
    const token = useSelector((state) => state.users.token);
    // console.log(user);
    const [userData , setUserData] =useState({name:"" , email:"" , password:""}) 
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        e.preventDefault()
        setUserData({
          ...userData,
          [e.target.name]: e.target.value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    //    console.log(userData)
        dispatch(register(userData));
        setUserData({name:"" , email:"" , password:""})
        history.push("/login")
    }
    // useEffect(()=>{
    //     token ? history.push("/login"): history.push("/signup");
    // },[token])
    

    return(
      

<section className="my-5">
    {/* yousef */}
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
              <label className="form-label" for="form3Example1">Full Name</label>
            <input type="text" name="name"  onChange={handleChange} id="form3Example1" className="form-control form-control-lg"
              placeholder="Enter your full name" required/>
          </div>
          <div className="form-outline mb-4">
              <label className="form-label" for="form3Example3">Email Address</label>
            <input type="email" name="email"  onChange={handleChange} id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" required/>
          </div>

         
          <div className="form-outline mb-3">
              <label className="form-label" for="form3Example4">Password</label>
            <input type="password" name="password" 
                onChange={handleChange} id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" required/>
          </div>

       

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={{ paddingLeft: '2.5rem; padding-right: 2.5rem' }}>Register</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="login"
                className="link-danger">Login</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>






    )
}

export default Signup;