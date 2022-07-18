import React, { useEffect } from "react";
import useFrom from "../../custom-hooks/useForm";
import useApis from "../../custom-hooks/useApis";
import { Breadcrumb, Card } from 'react-bootstrap';
import './Style.css';
import Google from "../bags/Google";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const data = useSelector((res) => res.auth.user);
  console.log(data);
  const redirect = useNavigate();

  useEffect(() => {
    if(data.token){
      redirect("/")
    }
  },[data])


  const [values, handleInput] = useFrom();
  const [submit, error] = useApis(values);
  return (
    <div className="container mt-5">
      <h1>Cash app</h1>
      <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active href="/login">
        Login
      </Breadcrumb.Item>
    </Breadcrumb>
      <br />
      <br />
      <Card className="customCard">
      <h3 className="">Login with <img src="GoogleLogo.png" style={{ height: 30, width: 30, marginRight: -4 }} /> oogle </h3>

      <Card.Body>
        <Card.Text>
          Easy login using your google account
        </Card.Text>
        <Google/>
      </Card.Body>
    </Card>

      

 
    </div>
  );
}
