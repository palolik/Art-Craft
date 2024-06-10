import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../providers/AuthProvider';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', photoURL: '' });

  // Fetch initial user data only once on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const db = getFirestore();
        const colRef = collection(db, 'users');
        const q = query(colRef, where('uid', '==', user.uid));

        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());

        if (fetchedData.length > 0) {
          setFormData(fetchedData[0]);
        }
      }
    };

    fetchData();
  }, [user]); // Dependency on user only to fetch data once

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (!formData.name && !formData.photoURL) {
      toast.warn('No changes detected. Please update at least one field.');
      return;
    }

    try {
      await updateUser(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
      <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
      </div>

      <div className="col-span-2 flex flex-col gap-3 p-3">
        {user ? (
          <div className='flex items-center'>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-3">
              <label className="input input-bordered flex items-center gap-2">
                Name
                <input
                  type="text"
                  name="name"
                  className="grow"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Photo URL
                <input
                  type="text"
                  name="photoURL"
                  className="grow"
                  value={formData.photoURL}
                  onChange={handleChange}
                  required
                />
              </label>
              <input type="submit" className="btn btn-warning w-full" value="Update" />
            </form>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
