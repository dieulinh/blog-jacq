import React, {useEffect, useContext, useState} from 'react';
import history from './history';
import Context from './context';

import axios from 'axios';

const AuthCheck = () => {
  const context = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/login', {email,password})
      .then((response) => {
        console.log(response);
        console.log('resgister successfully')
      })
      .catch((err) => {
        console.log(err)
      })
      .then(setTimeout(() => history.replace('/'), 700) )

  }

  useEffect(() => {
    if(context.authObj.isAuthenticated()) {
      const profile = context.authObj.userProfile
      context.handleUserLogin()
      context.handleUserAddProfile(profile)
       axios.post('/api/posts/userprofiletodb', profile )
        .then(axios.get('/api/get/userprofilefromdb', {params: {email: profile.profile.email}})
          .then(res => context.handleAddDBProfile(res.data)) )
        .then(history.replace('/') )
    }
    else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      context.handleUserRemoveProfile()
      history.replace('/login')
      }
    }, [context.authObj.userProfile, context])

    return(
      <section>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>

          <label>
            Emaiil
            <div>
              <input
                id="email"

                onChange={(e) => handleEmailChange(e)}
              />

            </div>
          </label>
          <label>
            Password
            <input
              id="password" type="password"

              onChange={(e) => handlePasswordChange(e)} />
          </label>
          <button type="submit" className="primary">
            Sign Up
          </button>
        </form>
      </section>
    );
}




export default AuthCheck;
