import React, { useEffect, useState } from "react";
import { Card, Button, Modal, ProgressBar } from "react-bootstrap";
import Axios from "axios";
import { baseUrl } from "../../common/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Vote() {
  const notify = (msg) => toast(msg);
  const pdm =
    "https://www.arabnews.pk/sites/default/files/styles/n_670_395/public/2022/03/08/3109816-2126534919.jpg?itok=4_zp7alY";
  const Ik =
    "https://en.dailypakistan.com.pk/digital_images/large/2021-10-05/happybirthday-imrankhan-pakistan-s-pm-turns-69-today-1633416651-7976.jpg";
  const [openModal, setOpenModal] = useState(false);

  const submit = () => {};

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [theVote, setTheVote] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("voteCasted")){
      getAllVotes();
    }
  }, []);

  const getAllVotes = async () => {
    await axios.get(`${baseUrl}getVotes`).then((res) => {
      calculatePercentage(res);
    });
  };

  function calculatePercentage(res){
    const totalVoters = res.data.length;
      const data = res.data;
      var pdm = [];
      var pti = [];
      for (let i = 0; i < totalVoters; i++) {
        if (data[i]?.voteFor === "hero") {
          pti.push(data[i]);
        } else {
          pdm.push(data[i]);
        }
      }
      const percentagePti = (pti.length / totalVoters) * 100;
      const percentagePDM = (pdm.length / totalVoters) * 100;

      const results = [Math.trunc(percentagePti), Math.trunc(percentagePDM)];
      setResult(results);
  }

  const voteNow = async () => {
    if (userName === "") {
      setError("Enter name to cast the vote please.");
    } else {
      await Axios.post(`${baseUrl}vote`, { theVote, userName }).then((res) => {
        calculatePercentage(res);
        setOpenModal(false);
        notify("Vote Casted !");
        setUserName("");
        localStorage.setItem("voteCasted", userName);
      });
    }
  };

  const canidate = (e) => {
    setTheVote(e);
    setOpenModal((prev) => !prev);
  };

  const parties = ["PTI", "PDM"];

  return (
    <>
  <center>
    <h2 style={{ marginTop: 50 }}>Public voting</h2>
    </center>

      <div className="container" style={{ marginTop: 50 }}>
        {result.length ? (
          result?.map((res, index) => (
            <ProgressBar
              now={res}
              label={`${parties[index]} = ${res}%`}
              animated
              className="mt-3"
            />
          ))
        ) : (
          <h3 className="d-flex flex-row justify-content-center">
            <i
              class="fa fa-exclamation-triangle"
              aria-hidden="true"
              style={{ marginTop: 3, marginRight: 10 }}
            />{" "}
            Cast vote to see live results
          </h3>
        )}
      </div>

      <div
        className="d-flex flex-lg-row flex-column justify-content-around mt-5"
        style={{ marginTop: 100 }}
      >
        <Card className="col-lg-3 col-12">
          <Card.Img variant="top" src={pdm} style={{ height: 200 }} />
          <Card.Body>
            <center>
              <Card.Title>
                {" "}
                <h3 className="mt-3"> PDM</h3>
              </Card.Title>
            </center>
            <Card.Text>
              <br />
            </Card.Text>
            <Button variant="danger w-100" onClick={() => canidate("theives")}>
              Vote
            </Button>
          </Card.Body>
        </Card>
        <h1 className="d-flex flex-row justify-content-center mt-4 mb-4">VS</h1>

        <Card className="col-lg-3 col-12">
          <Card.Img variant="top" src={Ik} style={{ height: 200 }} />
          <Card.Body>
            <center>
              <Card.Title>
                {" "}
                <h3 className="mt-3">PTI</h3>
              </Card.Title>
            </center>
            <Card.Text>
              <br />
            </Card.Text>

            <Button variant="danger w-100" onClick={() => canidate("hero")}>
              Vote
            </Button>
          </Card.Body>
        </Card>
      </div>

      <Modal show={openModal} onHide={openModal}>
        <Modal.Header>
          <Modal.Title>Public Votes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => submit({ route: "login" }, e)}>
            <div className="form-group">
              <label htmlFor="inputEmail4">Your Name</label>
              <input
                type="text"
                name="user"
                className="form-control mt-2"
                placeholder="Your name"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setError("");
                }}
                value={userName}
              />
            </div>
            <p className="text-danger">{error && "Form cannot be empty"}</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={voteNow}>
            Cast Vote
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
