import React, { useState } from 'react'
import './Register.scss';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth, storage, db } from '../../misc/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const [error,setError] = useState(false);
  const [fileName, setFileName] = useState(undefined);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const userAvatar = e.target[3].files[0];

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      console.log(resp);

      // const user = userCredential.user;

      const uploadTask = uploadBytesResumable(storageRef, userAvatar);

    uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error);
        setError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

          await updateProfile(resp.user, {
            displayName,
            photoURL: downloadURL
          })
         
          await setDoc(doc(db, "users", resp.user.uid), {
            uid: resp.user.uid,
            email,
            displayName,
            photoURL: downloadURL
          });

          navigate("/")
        });
      }
    );
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      setError(true);
      console.log(errorCode,errorMessage);
    }
  }

  function handleFileUpload(e) {
    setFileName(e.target.files[0].name);
  }


  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Badger Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text"  placeholder='Display Name' required/>
          <input type="email" placeholder='Email' required/>
          <input type="password"  placeholder='Password' required/>
          <input
            style={{display: 'none'}}
            type="file"
            id="avatar"
            onChange={handleFileUpload}
          />
          <label
            className='upload-label'
            htmlFor="avatar">
            <div className="upload-label__image">
            </div>
            {fileName ? fileName : "Add an Avatar"}
          </label>
          <button>Sign Up</button>
        </form>
        {error ? <span>An error has occured</span> : ''}
        <p>You do have an account?
          <span
            className='link'
            onClick={() => navigate('/login')}
          >Login</span>
        </p>
      </div> 
    </div>
  )
}
