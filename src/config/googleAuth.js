// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual Google Client ID

// Scopes for Google OAuth
export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// Redirect URI after Google authentication
export const GOOGLE_REDIRECT_URI = window.location.origin + "/auth/google/callback"; 