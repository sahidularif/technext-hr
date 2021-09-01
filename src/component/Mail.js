import React, { useState } from "react";
import "../styles.css";
import Modal from "./modal/Modal";

function Mail() {
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
              <label for="recipient-name" class="col-form-label">Recipient:</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="mb-3 text-start">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onClick={() => setShow(false)} data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Mail;
