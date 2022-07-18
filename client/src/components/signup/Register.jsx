import React from "react";
import useFrom from "../../custom-hooks/useForm";
import useApis from "../../custom-hooks/useApis";
import {Link} from 'react-router-dom';

export default function Register() {
  const [values, handleInput] = useFrom();
  const [submit, error] = useApis(values);

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={(e) => submit({ route: "register" }, e)}>
        <div className="form-group col-md-4">
          <label htmlFor="inputEmail4">Name</label>
          <input
            type={"text"}
            placeholder="User name"
            name="name"
            className="form-control"
            onChange={handleInput}
            value={values.name}
          />
        </div>

        <div className="form-group col-md-4 mt-4">
          <label htmlFor="inputEmail4">Email</label>

          <input
            type={"text"}
            placeholder="Email"
            name="email"
            className="form-control"
            onChange={handleInput}
            value={values.email}
          />
        </div>

        <div className="form-group col-md-4 mt-4">
          <label htmlFor="inputPassword4">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleInput}
            value={values.password}
          />
        </div>
        <p className="text-danger">{error && "Form cannot be empty"}</p>

        <button
          onClick={(e) => submit({ route: "register" }, e)}
          className="btn btn-primary btn-small"
        >
          Register
        </button>
      </form>

      <div className="mt-4">
        <Link to='/'>Already have a account ?</Link>
      </div>

    </div>
  );
}
