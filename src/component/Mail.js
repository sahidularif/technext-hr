import axios from "axios"
import React, { useEffect, useState } from "react";
import "../styles.css";
import Modal from "./modal/Modal";

function Mail(props) {
  const [success, setSuccess] = useState(false)
  const [notSent, setNotSent] = useState(false)
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState([])
  const [sub, setSub] = useState([])
  const [text, setText] = useState([]);
  // console.log(text)
  // console.log(receipient[0]?.original.email)
  // console.log(receipient[1]?.original.email)

  const handleClick = async (e) => {
    setText(prevItems => [...prevItems, {
      subject: sub,
      message: msg,
      mailList: props.selectedFlatRows
    }]);

    setSent(true)
    try {
      await axios.post("https://immense-sea-72965.herokuapp.com/send_mail", {
        text
      })
        .then(response => {
          // console.log('sended');
          setSuccess(true)
        })
    }
    catch (error) {
      // console.error(error)
      setNotSent(true)
    }
  }
  const handleChange = (e) => {
    setMsg(e.target.value);
  }
  const handleSubject = (e) => {
    setSub(e.target.value);
  }
  // console.log((props.selectedFlatRows));
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>Compose Mail <i class="fas fa-paper-plane"></i></button>
      </div>

      <Modal show={show} onClose={() => setShow(false)}>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Compose Email</h5>
          <button type="button" onClick={() => setShow(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 text-start">
              <label for="recipient-name" class="col-form-label">Subject:</label>
              <input type="text" name="subject"
                class="form-control" id="recipient-name"
                onChange={handleSubject}
              />
            </div>
            <div class="mb-3 text-start">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea name="message" class="form-control"
                id="message-text"
                onChange={handleChange}
              >

              </textarea>
            </div>
            <button type="button" onClick={handleClick} class="btn btn-primary">Send message</button>
          </form>
          <div className="col-md-12">
            {
              success?<h5 style={{color:'green'}}> <i class="fas fa-check-circle"></i> Email successfully send!</h5>: ''
            }
          </div>
        </div>
        {/* {
          props.selectedFlatRows.map(
            d => d.original.email
          )
        } */}
        <div class="modal-footer">

        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Mail;
