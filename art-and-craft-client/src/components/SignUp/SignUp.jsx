import React, { useContext, useState,useEffect } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { BsFillEyeFill } from "react-icons/bs";
import { IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  useEffect(() => {
    document.title = 'Sign up';
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const { createUser } = useContext(AuthContext);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleSignUp = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
   

    setError('');
    if (password !== confirm) {
      toast("Passwords didn't match!");
      return;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/.test(password)) {
      toast("Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one digit.");
      return;
    }
    

    try {
      await createUser(name, email, password, photoURL);
      toast("Registration Successfull!");
      setName('');
      setEmail('');
      setPhotoURL('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className='m-10 '>
      <h2 className='text-4xl font-bold mb-4'>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="photoURL">Profile Picture URL</label>
          <input type="url" name="photoURL" id="photoURL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
        <label  htmlFor="password">Password</label>
         <div className='flex flex-row items-center'> <input type={show1 ? "text" : "password"} name="password" id="" required />
          <span className='-ml-10 ' onClick={() => setShow1(!show1)}>
            {
              show1 ? <IoMdEyeOff className='w-7'/>
              : <BsFillEyeFill className='w-7' />
            }
         </span> </div>
        </div>
        <div className="form-control">
        <label  htmlFor="confirm">Confirm Password</label>
         <div className='flex flex-row items-center'> <input type={show2 ? "text" : "password"} name="confirm" id="" required />
          <span className='-ml-10 ' onClick={() => setShow2(!show2)}>
            {show2 ? <IoMdEyeOff className='w-7'/> : <BsFillEyeFill className='w-7' /> }
         </span> </div>
        </div>
        <input className='btn-submit' type="submit" value="Sign Up" />
      </form>
      <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
      <p className='text-error'>{error}</p>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
