import { useContext, useEffect, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {

  const { user, logOut } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {

    AOS.init();

    const unsubscribe = async () => {
      if (user) {
        const db = getFirestore();
        const colRef = collection(db, 'users');
        const q = query(colRef, where('uid', '==', user.uid)); // Filter by logged-in user's uid

        const querySnapshot = await getDocs(q);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      }
    };

    unsubscribe();

    return () => unsubscribe();
  }, [user]);

  return (
    <div className='lg:mb-10'>
      <nav className='flex flex-row items-center justify-between mt-5 lg:mx-10'>
        <div className='animate__animated animate__headShake text-2xl lg:text-[45px] font-bold text-red-500'>Realestate Mania</div>

        <div className='hidden lg:flex flex-row space-x-4 items-center'>
          <NavLink className='btn btn-sm hover:bg-red-600' to="/">Home</NavLink>
          <NavLink className='btn btn-sm hover:bg-red-600' to="/aboutus">About Us</NavLink>
          <NavLink className='btn btn-sm hover:bg-red-600' to="/pagestoroad">lands</NavLink>
          {user ? (
            <div className='flex items-center'>
              <NavLink className='btn btn-sm hover:bg-red-600' to="/updateprofile">update profile</NavLink>

          
              <button onClick={handleLogout} className='btn btn-sm ml-2 hover:bg-red-600'>Logout</button>
           
                {data.length > 0 ? (
             <div className="avatar pl-2">  {data.map((item) => (
                <div key={item.uid} className="w-12 rounded-full">
                  <img src={item.photoURL} alt='User' className='rounded-full mr-2' />
                </div> ))}
              </div>
      ) : (
        <p>Loading..</p>
      )}   
            </div>
          ) : (
            <>
              <NavLink className='btn btn-sm hover:bg-red-600' to="/signup">Sign Up</NavLink>
              <NavLink className='btn btn-sm hover:bg-red-600' to="/login">Sign In</NavLink>
            </>
          )}
        </div>

        <div className="navbar-end drawer drawer-end lg:hidden">
          {/* ... rest of the code for the mobile menu ... */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
