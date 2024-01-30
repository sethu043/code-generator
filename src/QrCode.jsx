import { useState } from "react"

function Qrcode() {
  const [img, setImg] = useState("")
  const [qrData,setQrData] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrSize, setQrSize] = useState("");

async function generateQR(){
  setLoading(true);
  try{
     const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
    setImg(url);
  }
  catch (error){
 console.error("Error genetating QR code",error)
  }
  finally{
    setLoading(false);
  }
};
function downloadQR(){
  fetch(img)
  .then((respones)=> respones.blob())
  .then((blob)=>{
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error)=>{
    console.error("Error downloding QR code",error)
  });
  setQrData("");
  setQrSize("");
  setImg();
}

  return (
  <div className="app-container">
    <h1>QR CODE GENERATOR</h1>
    {loading && <p>please wait...</p>}
    {img && <img src={img} alt="QR-Code" className="qr-code-image"/>}
  <div>
    <label htmlFor="dataInput" className="input-label">
      Data for QR Code :</label>
    <input type="text" value={qrData} required id="dataInput" placeholder="Enter data for QR code" onChange={(e)=> setQrData(e.target.value)}/>
    <label htmlFor="sizeInput" className="input-label">
      Image size (e.g. 150) :</label>
    <input type="text" value={qrSize} required id="sizeInput" placeholder="Enter image size" onChange={(e)=> setQrSize(e.target.value)}/>
    <button className="generate-button" disabled={loading} onClick={()=> generateQR()}>Generate QR Code</button>
    <button className="download-button" onClick={()=> downloadQR()}>Download QR Code</button>
  </div>
  <p className="footer">Designed By <a href="ww">SETHU</a> </p>
    </div>
  )
}

export default Qrcode