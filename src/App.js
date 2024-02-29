import React from 'react';
import './App.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const App = () => {
  const createCertificate = async () => {
    const name = document.getElementById('name').value;
    const prn = document.getElementById('prn').value;
    const course = document.getElementById('course').value;
    const completionDate = document.getElementById('completionDate').value;

    const pdfDoc = await PDFDocument.create();
    
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.setFontSize(24);

    page.drawText('Certificate of Completion', {
      x: 50,
      y: 750,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    page.setFontSize(18);

    page.drawText(`This is to certify that ${name}`, {
      x: 50,
      y: 700,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`with PRN ${prn}`, {
      x: 50,
      y: 650,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`has successfully completed the course`, {
      x: 50,
      y: 600,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`${course}`, {
      x: 50,
      y: 550,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`on ${completionDate}`, {
      x: 50,
      y: 500,
      font,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificate.pdf';

    // Dispatch a click event on the link to trigger the download
    link.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <div className='container'>
      <h1>Certificate Generator</h1>

      <div>
        <input type="text" id="name" placeholder="Enter Student Name"/>
      </div>

      <div>
        <input type="text" id="prn" placeholder="Enter PRN"/>
      </div>

      <div>
        <input type="text" id="course" placeholder="Enter Course Name"/>
      </div>

      <div>
        <input type="text" id="completionDate" placeholder="Enter Completion Date (DD-MM-YYYY)"/>
      </div>

      <button onClick={createCertificate}>Create Certificate</button>
    </div>
  );
};

export default App;
