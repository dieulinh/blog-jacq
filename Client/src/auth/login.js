import React, {useContext, useState} from "react";
import history from '../utils/history';

import axios from 'axios';
import Context from "../utils/context";
import * as ACTIONS from "../store/actions/actions";

export default function SignUp () {
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
    axios.post('http://localhost:5000/api/login', {email,password})
      .then((response) => {
        console.log(response)
        if(response.data.user&&response.status==201)
          {
            console.log("Success ")
            context.handleUserLogin(response.data.user)
            setTimeout(() => history.replace('/'), 700)
          } else {
          context.handleUserLogout()
          setTimeout(() => history.replace('/login'), 700)
        }


      })
      .catch((err) => {
        context.handleUserLogout()
        console.log(err)
      })


  }

  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>

        <label>
          Email
          <div>
            <input
              id="email"

              onChange={(e) => handleEmailChange(e)}
            />

          </div>
        </label>
        <label>
          Password
          <div>
          <input
            id="password" type="password"

            onChange={(e) => handlePasswordChange(e)} />
          </div>
        </label>
        <button type="submit" className="primary">
          Login
        </button>
      </form>
    </section>
  );
}
