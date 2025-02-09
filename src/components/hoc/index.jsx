import React, { useEffect } from "react";
import "./style.css"


const Dashboard = () => {
        /************************************
 * 1. Simple Login System
 ************************************/

// Pre-registered users (modify or add users as needed)
const users = [
    { username: 'employee1', password: 'emp123', role: 'member' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  const reports = [];
  let currentUserRole = document.getElementById('roleSelector')?.value;

  useEffect(()=> {
    const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
  
    // Validate the credentials against our users array
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);
  
    if (user) {
      // Successful login: hide login page, show main app page
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('appPage').style.display = 'block';
  
      // Set the role selector to match the user's role (e.g., admin sees extra details)
      document.getElementById('roleSelector').value = user.role;
    } else {
      // Invalid credentials: show error message
      const errorMessage = document.getElementById('loginError');
      errorMessage.textContent = 'Invalid username or password. Please try again.';
      errorMessage.style.display = 'block';
    }
  });
    
    
    
    
    // Global variables and data store (in a real app, use a database/backend)
    

    

    // Update the current role when the selector changes
    document.getElementById('roleSelector').addEventListener('change', function() {
      currentUserRole = this.value;
      renderReports();
    });

    // Handle form submission
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const reporterName = document.getElementById('reporterName').value.trim();
      const reportType = document.getElementById('reportType').value;
      const details = document.getElementById('details').value.trim();
      const fileInput = document.getElementById('fileUpload');
      const file = fileInput.files[0];

      if (!reporterName || !reportType || !details || !file) {
        alert('Please fill in all fields and upload a file.');
        return;
      }

      // Use FileReader to convert the file to a base64 string for previewing
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileData = e.target.result;
        const report = {
          reporterName,
          reportType,
          details,
          fileData,
          timestamp: new Date()
        };

        // Add the new report to our array
        reports.push(report);

        // Update the reports display
        renderReports();

        // Reset the form
        document.getElementById('feedbackForm').reset();
      };

      reader.readAsDataURL(file);
    });
  },[])

    // Function to render all reports
    function renderReports() {
      const reportsList = document.getElementById('reportsList');
      reportsList.innerHTML = ''; // Clear previous reports

      // Loop through each report and create HTML elements for it
      reports.forEach(report => {
        const reportDiv = document.createElement('div');
        reportDiv.className = 'report';

        // Title with report type
        const title = document.createElement('h3');
        title.textContent = 'Report Type: ' + report.reportType;
        reportDiv.appendChild(title);

        // Show reporter's name only if the current user is admin
        if (currentUserRole === 'admin') {
          const reporterInfo = document.createElement('p');
          reporterInfo.innerHTML = '<strong>Reported by:</strong> ' + report.reporterName;
          reportDiv.appendChild(reporterInfo);
        }

        // Report details
        const detailsP = document.createElement('p');
        detailsP.innerHTML = '<strong>Details:</strong> ' + report.details;
        reportDiv.appendChild(detailsP);

        // File preview (if the report type is "Poster" and the file is an image, show the image)
        if (report.fileData) {
          if (report.reportType.toLowerCase() === 'poster' && report.fileData.startsWith('data:image')) {
            const img = document.createElement('img');
            img.src = report.fileData;
            img.alt = 'Uploaded Poster';
            reportDiv.appendChild(img);
          } else {
            // For other file types, provide a link to view/download the file
            const fileLink = document.createElement('a');
            fileLink.href = report.fileData;
            fileLink.textContent = 'View attached file';
            fileLink.target = '_blank';
            reportDiv.appendChild(fileLink);
          }
        }

        // Timestamp of the report
        const timeP = document.createElement('p');
        timeP.innerHTML = '<em>Reported on: ' + report.timestamp.toLocaleString() + '</em>';
        reportDiv.appendChild(timeP);

        // Add the report element to the list
        reportsList.appendChild(reportDiv);
      });
    }
    return (<>
    <div id="loginPage">
      <h2>Sign In</h2>
      <form id="loginForm">
        <input type="text" id="username" placeholder="Username" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p id="loginError" className="error-message"></p>
    </div>
  
  
    <div id="appPage" style={{display:"none"}}>
      <header>
        <h1>Team Feedback System</h1>
        <div className="role-container">
          <label htmlFor="roleSelector">View as:</label>
          <select id="roleSelector">
            <option value="member">Team Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </header>
  
      <form id="feedbackForm">
        <input type="text" id="reporterName" placeholder="Your Name" required />
        <select id="reportType" required>
          <option value="">Select Report Type</option>
          <option value="Poster">Poster</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
          <option value="Script">Script</option>
          <option value="Task">Task</option>
        </select>
        <input type="file" id="fileUpload" accept="image/*,video/*" required />
        <textarea id="details" placeholder="Enter details..." required></textarea>
        <button type="submit">Submit Report</button>
      </form>
  
      
      <section id="reportsSection">
        <h2>Reports</h2>
        <div id="reportsList"></div>
      </section>
    </div> </>)
    
}


export default Dashboard

