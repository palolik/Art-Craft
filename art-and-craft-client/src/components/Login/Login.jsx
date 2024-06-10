import React, { useContext, useState,useEffect } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { BsFillEyeFill } from "react-icons/bs";
import { IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  useEffect(() => {
    document.title = 'Login page';
  }, []);
  const [show, setShow] = useState(false);

  const { signIn, signInWithGoogle,signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      console.log(result.user);
      form.reset();
      navigate(from, { replace: true });
    } catch (error) {
      toast("wrong email or password!");

    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle().then(result => {
        console.log(result.user);
        toast("Success", "Login successful", "success");
        navigate(location?.state ? location.state : '/');
    })
        .catch(error => toast(error.code, error.message, "error"));

};
const handlegithubLogin = () => {
  signInWithGithub().then(result => {
      console.log(result.user);
      toast("Success", "Login successful", "success");
      navigate(location?.state ? location.state : '/');
  })
      .catch(error =>  toast(error.code, error.message, "error"));
};
  return (
    <div className='m-10 h-[600px]'>
      <h2 className='text-4xl font-bold mb-4'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          
        <label  htmlFor="password">Password</label>
         <div className='flex flex-row items-center'> <input type={show ? "text" : "password"} name="password" id="" required />
          <span className='-ml-10 ' onClick={() => setShow(!show)}>
            {
              show ? <IoMdEyeOff className='w-7'/>
              : <BsFillEyeFill className='w-7' />
            }
         </span> </div>
         </div>
        <input className='btn-submit' type="submit" value="Login" />
      </form>

     <div className='flex w-[400px] flex-row justify-evenly my-5'>
      <button className="rounded-full p-2 hover:bg-slate-200" onClick={handleGoogleLogin}><img className="h-10" src="google.png" alt="" /></button>
      <button className="rounded-full p-2 hover:bg-slate-200" onClick={handlegithubLogin}><img className="h-10" src="github.png" alt="" /></button>
      </div>       
      <p><small>New to the website <Link to="/signup">Create New Account</Link></small></p>
      <ToastContainer />
    </div>
  );
};

export default Login;
