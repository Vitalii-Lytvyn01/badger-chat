import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import './Search.scss'
import { db } from '../../misc/firebase';
import { AuthContext } from '../../context/AuthContext';

export function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [users,setUsers] = useState([]);
  const [error, setError] = useState(false);

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(searchTerm == "") {
        setUsers([]);
      } else {
        handleSearch();
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn);
  },[searchTerm])

  async function handleSearch() {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", ">=", searchTerm), where("displayName", "<=", searchTerm+ `\uf8ff`));
      const querySnapshot = await getDocs(q);
      let usersTemp = [];
      querySnapshot.forEach((doc) => {
        usersTemp.push(doc.data())
      });
      setUsers(usersTemp);
    }
    catch(e) {
      console.log(e);
      setError(true);
    }
  }

  async function handleSelect(selectedUser) {
    const combinedUid = currentUser.uid > selectedUser.uid 
    ? currentUser.uid + selectedUser.uid 
    : selectedUser.uid + currentUser.uid;
    try {
      const resp = await getDoc(doc(db, "chats", combinedUid));

      if(!resp.exists()) {
        await setDoc(doc(db, "chats", combinedUid), {messages: []});

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUid+'.userInfo']: {
            'uid': selectedUser.uid,
            'displayName': selectedUser.displayName,
            'photoURL': selectedUser.photoURL
          },
          [combinedUid+'.date']: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedUid+'.userInfo']: {
            'uid': currentUser.uid,
            'displayName': currentUser.displayName,
            'photoURL': currentUser.photoURL
          },
          [combinedUid+'.date']: serverTimestamp()
        })

      }
    } catch (e) {
      console.log(e);
      setError(true);
    }

    setUsers([]);
  }
 
  const usersFound = users.map(user =>
  <div
    key={user.uid}
    className="user-chat"
    onClick={() => handleSelect(user)}
  >
    <img
      src={user.photoURL}
      alt=""
      className="user-chat__image"
    />
    <div className="user-chat__info">
      <div className="display-name">{user.displayName}</div>
    </div>
  </div>
  )

  return (
    <div className='search'>
      <div className="search-form">
        <input
          placeholder='Find a user'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {usersFound}
    </div>
  )
}