import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const Payment = ({ showModal, closeModal }) => {
  const [trxId, setTrxId] = useState("");
  const [step, setStep] = useState(1);

  const handleClose = () => {
    closeModal();
  };

  const StepOne = () => (
    <div className="d-flex flex-column">
      <img
        src="https://seeklogo.com/images/E/easypaisa-logo-477156A1F0-seeklogo.com.png"
        style={{ height: 50, width: 50 }}
      />
      <br />
      <p>Please pay 10 rupees in below account using your easypaisa app</p>
      <h5>Account details</h5>
      {/* <hr /> */}
      <ul>
        <li>Account Number: 03034555959</li>
        <li>Account Title: Hassan Ellahi Butt Wain</li>
      </ul>
      <br />
      <p>
        <b>Note:</b>{" "}
        <span style={{ color: "green" }}>
          Please press continue once amount is transferred
        </span>
      </p>
    </div>
  );

  const StepTwo = () => (
    <div className="d-flex flex-column">
      <h5>Enter Trx Id</h5>
      <br/>
      <ol>
        <li>
          Easypaisa has sent you a{" "}
          <q>
            <b>
              <i>Trx Id</i>
            </b>
          </q>{" "}
          through sms on your phone number
        </li>
        <li>
          Enter that{" "}
          <q>
            <b>
              <i>Trx Id</i>
            </b>
          </q>{" "}
          in below Input field{" "}
        </li>
      </ol>

      <br />
      <p>Enter Trx Id</p>
      <Form.Control
        placeholder="e.g 43881220"
        aria-label="Trx Id"
        aria-describedby="basic-addon1"
        onChange={(e) => setTrxId(e.target.value)}
        value={trxId}
      />
    </div>
  );

  const handleContinue = () => {
    if(step === 1) {
      setStep(2);
    }else{
      // TODO HIT API & Check if amount TRX ID is there
      setStep(3);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>{step === 1 ? <StepOne /> : <StepTwo />}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Payment;
