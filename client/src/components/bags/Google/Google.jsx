import React, {useEffect} from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../common/constants";

export default function Google() {

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const successHandler = async (response) => {
    const res = await axios.post(`${baseUrl}register`, response.profileObj);
    console.log(res.data);
    if(res.data?.status === "ok"){
      dispatch({ type: "USER_OBJ", payload: res.data.newUser });
      redirect("/");
    }
  };

  const failHandler = () => {
    console.log("erorororor");
  }

  return (
    <div>
      <GoogleLogin
        className="mt-3 p-1"
        clientId="125390506364-593akvskil0cmo625m1v16kll7avbgdv.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={successHandler}
        onFailure={failHandler}
        cookiePolicy={"single_host_origin"}
        theme="dark"
      />
    </div>
  );
}
