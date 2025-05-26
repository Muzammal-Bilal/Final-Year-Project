// import React, { useState } from "react";
// import axios from "axios";

// const AI_Doctor = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   const handleChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setResult(null);
//       createPreview(selectedFile);
//     }
//   };

//   const createPreview = (file) => {
//     if (file.type.includes("image")) {
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const droppedFile = e.dataTransfer.files[0];
//       setFile(droppedFile);
//       setResult(null);
//       createPreview(droppedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setResult(response.data);
//     } catch (error) {
//       let errorMessage = "An error occurred during prediction.";
//       if (error.response) {
//         errorMessage = error.response.data.message || JSON.stringify(error.response.data);
//       } else if (error.request) {
//         errorMessage = "No response from server. Please try again later.";
//       } else {
//         errorMessage = error.message;
//       }
//       setResult({ error: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFile(null);
//     setResult(null);
//     setPreview(null);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h1 className="logo">DIAGNOSENSE</h1>
//         <nav className="nav-menu">
//           <div className="nav-item">Dashboard</div>
//           <div className="nav-item">Profile</div>
//           <div className="nav-item active">AI Doctor</div>
//           <div className="nav-item">ChatBot</div>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="upload-container">
//           <h2 className="upload-title">Upload a chest scan for instant analysis</h2>
          
//           <div 
//             className={`upload-area ${dragActive ? "drag-active" : ""}`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             {!file ? (
//               <div className="upload-content">
//                 <p className="upload-text">Drag & drop your file here</p>
//                 <label className="browse-button">
//                   Browse Files
//                   <input 
//                     type="file" 
//                     accept=".jpg,.jpeg,.png,.dcm,.dicom"
//                     onChange={handleChange}
//                     hidden
//                   />
//                 </label>
//                 <p className="file-types">Supported formats: JPG, PNG, DICOM</p>
//               </div>
//             ) : (
//               <div className="file-preview-container">
//                 {preview ? (
//                   <div className="image-preview-wrapper">
//                     <img src={preview} alt="Upload preview" className="image-preview" />
//                   </div>
//                 ) : (
//                   <div className="dicom-preview">
//                     <div className="dicom-icon">
//                       <svg viewBox="0 0 24 24">
//                         <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
//                       </svg>
//                     </div>
//                     <p className="dicom-filename">{file.name}</p>
//                     <p className="dicom-filesize">{(file.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                 )}
//                 <div className="button-group">
//                   <button 
//                     className="analyze-button" 
//                     onClick={handleUpload} 
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner"></span>
//                         Analyzing...
//                       </>
//                     ) : (
//                       "Analyze Scan"
//                     )}
//                   </button>
//                   <button className="clear-button" onClick={resetForm}>
//                     Clear
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {result && (
//             <div className={`result-container ${result.error ? "error" : ""}`}>
//               {result.error ? (
//                 <div className="error-result">
//                   <h3 className="result-title">Error</h3>
//                   <p className="error-message">{result.error}</p>
//                   <button className="try-again-button" onClick={resetForm}>
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <h3 className="result-title">Analysis Results</h3>
//                   <div className="result-details">
//                     <div className="result-item">
//                       <span className="result-label">Prediction:</span>
//                       <span className={`result-value ${result.result?.toLowerCase().replace(/\s+/g, '-')}`}>
//                         {result.result}
//                       </span>
//                     </div>
//                     <div className="result-item">
//                       <span className="result-label">Confidence:</span>
//                       <div className="confidence-meter">
//                         <div 
//                           className="confidence-bar" 
//                           style={{ width: `${result.confidence * 100}%` }}
//                         ></div>
//                         <span className="confidence-value">
//                           {(result.confidence * 100).toFixed(2)}%
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="recommendation">
//                     <h4>Next Steps</h4>
//                     <p>
//                       This analysis is not a definitive diagnosis. Please consult with a medical professional 
//                       for proper evaluation and treatment options.
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           <div className="disclaimer">
//             <p>
//               <strong>Note:</strong> This tool is for informational purposes only and should not replace 
//               professional medical advice.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AI_Doctor;



import { useState } from "react"
import axios from "axios"
import jsPDF from "jspdf"
import { Download, FileImage, Upload, AlertCircle, CheckCircle } from "lucide-react"
import {useSelector} from "react-redux"



const AI_Doctor = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const userData = useSelector((state) => state.auth.user);
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    nic: userData.nic,
    dob: userData.dob,
    gender: userData.gender,
    role: userData.role
    // Username:firstName+" "+lastName
  }
  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      createPreview(selectedFile)
    }
  }

  const createPreview = (file) => {
    if (file.type.includes("image")) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      setResult(null)
      createPreview(droppedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setResult(response.data)
    } catch (error) {
      let errorMessage = "An error occurred during prediction."
      if (error.response) {
        errorMessage = error.response.data.message || JSON.stringify(error.response.data)
      } else if (error.request) {
        errorMessage = "No response from server. Please try again later."
      } else {
        errorMessage = error.message
      }
      setResult({ error: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    setPreview(null)
  }

  const generatePDF = async () => {
    if (!result || result.error) {
      alert("No valid analysis results to generate report.")
      return
    }

    setGeneratingPdf(true)

    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Set document properties
      doc.setProperties({
        title: "Medical Scan Analysis Report",
        subject: "AI-Generated Medical Report",
        author: "DIAGNOSENSE",
        creator: "DIAGNOSENSE AI Doctor",
      })

      // Add logo and header
      doc.setFillColor(41, 128, 185) // Professional blue color
      doc.rect(0, 0, 210, 30, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(22)
      doc.text("DIAGNOSENSE", 15, 15)
      doc.setFontSize(12)
      doc.text("AI-Powered Medical Analysis", 15, 22)

      // Add report title
      doc.setTextColor(41, 128, 185)
      doc.setFontSize(18)
      doc.text("Medical Scan Analysis Report", 105, 45, { align: "center" })

      // Add date and time
      const currentDate = new Date()
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(10)
      doc.text(`Generated on: ${currentDate.toLocaleString()}`, 105, 52, { align: "center" })

      // Add horizontal line
      doc.setDrawColor(220, 220, 220)
      doc.setLineWidth(0.5)
      doc.line(15, 55, 195, 55)

      // Patient information section (placeholder)
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Patient Information", 15, 65)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.text("Patient ID: ", 15, 73)
      doc.text("Name: ", 15, 80)
      doc.text("Date of Birth: ", 15, 87)
      doc.text("Referring Physician: ", 15, 94)

      // Add placeholder values (in practice, these would be filled with actual patient data)
      doc.setTextColor(80, 80, 80)
      doc.text(user.nic, 50, 73)
      doc.text(user.firstName+" "+user.lastName, 50, 80)
      doc.text(user.dob, 50, 87)
      doc.text("AI Doctor", 50, 94)

      // Add horizontal line
      doc.line(15, 100, 195, 100)

      // Analysis Results section
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Analysis Results", 15, 110)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)

      // Add scan information
      doc.text("Scan Type: Chest X-Ray", 15, 118)
      doc.text(`File Name: ${file.name}`, 15, 125)
      doc.text(`File Size: ${(file.size / 1024).toFixed(2)} KB`, 15, 132)

      // Add prediction result
      doc.setFont("helvetica", "bold")
      doc.text("AI Prediction:", 15, 142)

      // Set color based on result (red for negative conditions, green for normal)
      if (result.result.toLowerCase().includes("normal")) {
        doc.setTextColor(46, 204, 113) // Green for normal
      } else {
        doc.setTextColor(231, 76, 60) // Red for abnormal findings
      }
      doc.text(result.result, 60, 142)

      // Add confidence level
      doc.setTextColor(60, 60, 60)
      doc.setFont("helvetica", "bold")
      doc.text("Confidence:", 15, 152)
      doc.setFont("helvetica", "normal")
      doc.text(`${(result.confidence * 100).toFixed(2)}%`, 60, 152)

      // Add confidence bar
      const confidenceWidth = 50
      const barWidth = confidenceWidth * result.confidence
      doc.setFillColor(220, 220, 220)
      doc.rect(60, 155, confidenceWidth, 3, "F")
      doc.setFillColor(41, 128, 185)
      doc.rect(60, 155, barWidth, 3, "F")

      // Add scan image if available
      if (preview) {
        doc.addPage()
        doc.setFillColor(41, 128, 185)
        doc.rect(0, 0, 210, 15, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(12)
        doc.text("DIAGNOSENSE - Scan Image", 15, 10)

        // Add the image
        try {
          doc.addImage(preview, "JPEG", 50, 30, 110, 110)
          doc.setTextColor(80, 80, 80)
          doc.setFontSize(10)
          doc.text("Analyzed Scan Image", 105, 150, { align: "center" })
        } catch (error) {
          console.error("Error adding image to PDF:", error)
          doc.setTextColor(231, 76, 60)
          doc.text("Error displaying scan image", 105, 100, { align: "center" })
        }
      }

      // Add disclaimer and recommendations
      doc.addPage()
      doc.setFillColor(41, 128, 185)
      doc.rect(0, 0, 210, 15, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      doc.text("DIAGNOSENSE - Recommendations", 15, 10)

      // Recommendations section
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Recommendations and Next Steps", 15, 30)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)

      // Add recommendation text based on result
      let recommendationText = ""
      if (result.result.toLowerCase().includes("normal")) {
        recommendationText =
          "Based on the AI analysis, no abnormalities were detected in the scan. " +
          "However, this is not a definitive diagnosis. We recommend:"

        doc.text(recommendationText, 15, 40, { maxWidth: 180 })

        // Bullet points for normal result
        doc.text("• Regular follow-up with your healthcare provider as scheduled", 20, 55)
        doc.text("• Continue with any prescribed preventive care measures", 20, 62)
        doc.text("• Report any new or worsening symptoms to your doctor", 20, 69)
      } else {
        recommendationText =
          "Based on the AI analysis, potential abnormalities were detected. " +
          "This is not a definitive diagnosis. We strongly recommend:"

        doc.text(recommendationText, 15, 40, { maxWidth: 180 })

        // Bullet points for abnormal result
        doc.text("• Consult with a medical specialist as soon as possible", 20, 55)
        doc.text("• Share this report with your healthcare provider", 20, 62)
        doc.text("• Follow up with additional diagnostic tests as recommended by your doctor", 20, 69)
        doc.text("• Do not make medical decisions based solely on this AI analysis", 20, 76)
      }

      // Add disclaimer
      doc.setFillColor(245, 245, 245)
      doc.rect(15, 90, 180, 40, "F")
      doc.setTextColor(231, 76, 60)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("IMPORTANT DISCLAIMER", 105, 100, { align: "center" })
      doc.setTextColor(80, 80, 80)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      const disclaimer =
        "This report was generated by an artificial intelligence system and is intended for informational " +
        "purposes only. It does not constitute a medical diagnosis or replace professional medical advice. " +
        "The analysis provided should be reviewed by a qualified healthcare professional. DIAGNOSENSE " +
        "is not responsible for any decisions made based on this report."
      doc.text(disclaimer, 105, 110, { align: "center", maxWidth: 170 })

      // Add footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`DIAGNOSENSE Medical Report - Page ${i} of ${pageCount}`, 105, 290, { align: "center" })
      }

      // Save the PDF
      doc.save("DIAGNOSENSE-Medical-Report.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF report. Please try again.")
    } finally {
      setGeneratingPdf(false)
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="logo">DIAGNOSENSE</h1>
        <nav className="nav-menu">
          <div className="nav-item">Dashboard</div>
          <div className="nav-item">Profile</div>
          <div className="nav-item active">AI Doctor</div>
          <div className="nav-item">ChatBot</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="upload-container">
          <h2 className="upload-title">Upload a chest scan for instant analysis</h2>

          <div
            className={`upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="upload-content">
                <p className="upload-text">Drag & drop your file here</p>
                <label className="browse-button">
                  Browse Files
                  <input type="file" accept=".jpg,.jpeg,.png,.dcm,.dicom" onChange={handleChange} hidden />
                </label>
                <p className="file-types">Supported formats: JPG, PNG, DICOM</p>
              </div>
            ) : (
              <div className="file-preview-container">
                {preview ? (
                  <div className="image-preview-wrapper">
                    <img src={preview || "/placeholder.svg"} alt="Upload preview" className="image-preview" />
                  </div>
                ) : (
                  <div className="dicom-preview">
                    <div className="dicom-icon">
                      <FileImage size={48} />
                    </div>
                    <p className="dicom-filename">{file.name}</p>
                    <p className="dicom-filesize">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
                <div className="button-group">
                  <button className="analyze-button" onClick={handleUpload} disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Analyze Scan
                      </>
                    )}
                  </button>
                  <button className="clear-button" onClick={resetForm}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className={`result-container ${result.error ? "error" : ""}`}>
              {result.error ? (
                <div className="error-result">
                  <h3 className="result-title">
                    <AlertCircle size={20} className="result-icon error-icon" />
                    Error
                  </h3>
                  <p className="error-message">{result.error}</p>
                  <button className="try-again-button" onClick={resetForm}>
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="result-title">
                    <CheckCircle size={20} className="result-icon success-icon" />
                    Analysis Results
                  </h3>
                  <div className="result-details">
                    <div className="result-item">
                      <span className="result-label">Prediction:</span>
                      <span className={`result-value ${result.result?.toLowerCase().replace(/\s+/g, "-")}`}>
                        {result.result}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Confidence:</span>
                      <div className="confidence-meter">
                        <div className="confidence-bar" style={{ width: `${result.confidence * 100}%` }}></div>
                        <span className="confidence-value">{(result.confidence * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="recommendation">
                    <h4>Next Steps</h4>
                    <p>
                      This analysis is not a definitive diagnosis. Please consult with a medical professional for proper
                      evaluation and treatment options.
                    </p>
                  </div>
                  <button className="download-report-button" onClick={generatePDF} disabled={generatingPdf}>
                    {generatingPdf ? (
                      <>
                        <span className="spinner"></span>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download Medical Report
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          <div className="disclaimer">
            <p>
              <strong>Note:</strong> This tool is for informational purposes only and should not replace professional
              medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AI_Doctor
