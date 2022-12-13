import React,{ useState,useEffect } from 'react';
import QRCode from 'qrcode';
import './App.scss';


function App() {
  const [output,setOutput] = useState(false);
  
  const generateQR = () => {
    let text = document.getElementById("text").value;
    if(text === ""){
      alert("Input field is empty");
      return;
    }
    setOutput( output ? false : true);
    if(output){
      document.getElementById("text").value = "";
    }
  }
  
  const DownloadQR = () => {
    let format = document.getElementById("format").value;
    let res = document.getElementById("res").value;
    let text = document.getElementById("text").value;
    let opt = {
      errorCorrectionLevel: 'H',
      type: "image/"+format,
      width: res,
      quality: 1
    }
    QRCode.toDataURL(text,opt).then((url)=>{
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'image_name.'+format;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', url);
      xhr.send();
    })
  }
  
  useEffect(() => {
    if(output){
    let text = document.getElementById("text").value;
    QRCode.toCanvas(document.getElementById("canvas"),text,{ errorCorrectionLevel: 'H',width:200,quality:1 });
    }
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading">QRPet</h1>
      </header>
      <div className="body-container">
        <div className="input-fields">
          <input className="inputs" type="text" id="text" placeholder="Enter text here" required></input>
          <select className="inputs" id="format">
            <option value="png" default>PNG</option>
            <option value="jpeg">JPG</option>
          </select>
          <select className="inputs" id="res">
            <option value="1024" default>1k</option>
            <option value="2048">2k</option>
            <option value="4096">4k</option>
            <option value="8192">8k</option>
          </select>
          <button className="inputs" onClick={generateQR}>{ output ? "Reset" : "Create QR" }</button>
        </div>
        <div className="output-fields">
          { output && (
            <>
            <canvas id="canvas"></canvas>
            <button className="downloadButton" onClick={DownloadQR}>Download QRCode</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

/*
let canvasImage = document.getElementById('canvas').toDataURL('image/png');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'image_name.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', canvasImage);
      xhr.send();
*/