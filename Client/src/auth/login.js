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
    axios.post('/api/login', {email,password})
      .then((response) => {
        console.log(response);
        console.log('resgister successfully')
        context.handleUserLogin(response.data.user)
      })
      .catch((err) => {
          console.log(err)
      })
      .then(setTimeout(() => history.replace('/'), 700) )

  }

  return (
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
