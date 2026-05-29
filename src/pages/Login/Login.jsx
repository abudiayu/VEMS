import React from 'react';
import "./Login.css"

function Login() {

  return (
    <div className='form_container'>
      <h1>Login</h1>
      <div className="form_wrapper">
        <form action="action">
          <label htmlFor="action">Frist Name
            <input type="email" />
          </label><br /><br />
          <label htmlFor="action">Father Name
            <input type="email" />
          </label><br /><br />
          <label htmlFor="action">Email
            <input type="email" />
          </label><br /> <br />
          <label htmlFor="action">Password
            <input type="Password" />
          </label><br /> <br />
            <input type="Submit"  className='' />
          <div className="Login">
              <a href="" className=''>Login ?</a>
          </div>   
        </form>
        <div className="login_form">
          <form action="submit">
            <label htmlFor="">User Name
              <input type="text" placeholder='Username'/>
            </label><br /><br />
            <label htmlFor="">Password
              <input type="Password" placeholder='Password'/>
            </label>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;