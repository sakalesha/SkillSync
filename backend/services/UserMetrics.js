// services/userMetrics.js

function calculateEmployabilityScore(user) {
  let score = 0;

  // Skills contribution (max 50%)
  score += Math.min(user.skills.length * 10, 50);

  // Experience contribution: Since your model has no experience field, you could use number of skills or education level as proxy
  if (user.education?.degree) score += 20; // degree adds 20%
  
  // Extra boost if user has >5 skills
  if (user.skills.length >= 5) score += 10;

  return Math.min(score, 100);
}

// Job applications placeholder (if no actual applications stored)
function countJobApplications(user) {
  // Example: 2 applications per skill + base 5
  return Math.min(user.skills.length * 2 + 5, 50);
}

// Courses completed placeholder
function countCoursesCompleted(user) {
  // Example: each skill represents a completed course
  return user.skills.length;
}

module.exports = {
  calculateEmployabilityScore,
  countJobApplications,
  countCoursesCompleted
};
