import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import './Dropzone.css';

// #########################################################

const Dropzone = () => {
  const fileInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFileMsg, setInvalidFileMsg] = useState('');
  const [highlighted, setHighlighted] = useState(false);
  const [inserted, setInserted] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [success, setSuccess] = useState(false);

  // ::::::::::HANDLE DRAG & DROP:::::::::::::

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  }

  const dragOver = (e) => {
    preventDefault(e);
  }

  const dragEnter = (e) => {
    preventDefault(e);
    setHighlighted(true);
  }

  const dragLeave = (e) => {
    preventDefault(e);
    setHighlighted(false);
  }

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }

  //::::::::::::HANDLE FILE SELECT::::::::::::::

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  }

  const fileInputClicked = () => {
    fileInputRef.current.click();
  }

  //::::::::::::HANDLE FILE UPLOAD::::::::::::::: 

  const handleFiles = (files) => {
    let fileInput = files[0];
    const fileName = fileInput.name;
    const patternFileExtension = /.*\.(xlsx|xls|csv)/i;
    if (((fileName).match(patternFileExtension))) {
      // setSelectedFiles(files);
      handleFileUpload(files)
      return true
    }
    else {
      setInvalidFileMsg('Please select valid file');
      return false
    }
  }

  const handleFileUpload = (files) => {
    if (files.length) {
      var file = files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (event) {
        var csvData = event.target.result;
        var data = Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
        });
        let rows = data.data;
        // console.log("data:", rows);
        let employes = [];
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        employes = rows.filter((row) => row.first_name != null && (pattern.test(row.email.toLowerCase())));
        // console.log(employes);
        let insertedRecord = employes.length;
        let skipeedRecord = rows.length - employes.length;
        setInserted(insertedRecord)
        setSkipped(skipeedRecord);
        handleInsertToDatabase(employes);
      };
      reader.onerror = function () {
        alert('Unable to read ' + file.fileName);
      };
    }
  }

  const handleInsertToDatabase = (data) => {
    let insertData = JSON.stringify(data);
    fetch("https://immense-sea-72965.herokuapp.com/bulkcreate", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: insertData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess(true);
        // console.log(data)
      });
  };


  return (
    <>
      <div className="container">
        <div className={`${highlighted ? "border-green-600 bg-green-100" : "drop-container"}`}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={dragOver}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon"></div>
            Drag & Drop files here or click to select file(s)
          </div>
          <form>
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple
              onChange={filesSelected}
            />
          </form>
        </div>
        <div className="">
          {
            success &&
            <>
              <div className="col-md-8 alert alert-success" role="alert">
                <span><i class="fas fa-check-circle"></i> {inserted} Employee successfully added!</span><br/>
                <span><i class="fas fa-exclamation-triangle"></i> {skipped} Employee successfully added!</span>
              </div>
            </>
          }
        </div>

      </div>
    </>
  );
}

export default Dropzone;
