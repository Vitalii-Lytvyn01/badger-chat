import React, { useState } from 'react'
import './Register.scss';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth, storage } from '../../misc/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const Register = () => {

  const [error,setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const userAvatar = e.target[3].files[0];

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      // const user = userCredential.user;

      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (error) => {
        setError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await updateProfile(resp.user, {
            displayName,
            photoURL: downloadURL
          })
        });
      }
    );

    } catch(e) {
      const errorCode = error.code;
      const errorMessage = error.message;

      setError(true);
      console.log(errorCode,errorMessage);
    }
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
          <input style={{display: 'none'}} type="file" id="avatar"/>
          <label
            className='upload-label'
            htmlFor="avatar">
            <div className="upload-label__image">
            </div>
            Add an Avatar
          </label>
          <button>Sign Up</button>
        </form>
        {error ? <span>An error has occured</span> : ''}
        <p>You do have an account? Login</p>
      </div> 
    </div>
  )
}
