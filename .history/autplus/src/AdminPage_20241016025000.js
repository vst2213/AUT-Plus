// Select DOM elements
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const logoutBtn = document.querySelector('.logout-btn');
const adminContainer = document.querySelector('.admin-container');

// Initialize sidebar state
let isSidebarOpen = true;

// Toggle sidebar function
toggleBtn.addEventListener('click', () => {
  isSidebarOpen = !isSidebarOpen;
  sidebar.classList.toggle('open', isSidebarOpen);
  sidebar.classList.toggle('closed', !isSidebarOpen);
});

// Logout function
logoutBtn.addEventListener('click', () => {
  // You can replace this with your actual logout logic
  alert('You have logged out successfully!');
  // Redirect to login page or perform logout operation
  // window.location.href = 'login.html'; // Uncomment and set the correct path
});

// Function to load reports (example data)
function loadReports() {
  const reports = [
    {
      header: "Inappropriate Content",
      comment: "This post contains inappropriate language."
    },
    {
      header: "Spam",
      comment: "This user is spamming the community."
    }
  ];

  const reportsList = document.querySelector('.reports-list');
  reportsList.innerHTML = ''; // Clear previous reports

  reports.forEach(report => {
    const reportItem = document.createElement('li');
    reportItem.classList.add('report-item');
    reportItem.innerHTML = `
      <div class="report-header">${report.header}</div>
      <div class="report-comment">${report.comment}</div>
    `;
    reportsList.appendChild(reportItem);
  });
}

// Function to load feedback (example data)
function loadFeedback() {
  const feedbacks = [
    {
      comment: "Great platform! Really helpful.",
    },
    {
      comment: "I found a bug in the reporting system.",
    }
  ];

  const feedbackList = document.querySelector('.feedback-list');
  feedbackList.innerHTML = ''; // Clear previous feedback

  feedbacks.forEach(feedback => {
    const feedbackItem = document.createElement('li');
    feedbackItem.classList.add('feedback-item');
    feedbackItem.innerHTML = `
      <div>${feedback.comment}</div>
    `;
    feedbackList.appendChild(feedbackItem);
  });
}

// Initial load of reports and feedback
loadReports();
loadFeedback();
