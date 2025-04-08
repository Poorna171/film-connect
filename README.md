# Film Connect

Film Connect is a modern web application that connects actors and directors in the film industry. It provides a platform for actors to showcase their talent and for directors to find the perfect cast for their projects.

## Features

### For Actors
- Create and manage a professional digital portfolio
- Browse and apply for casting calls
- Receive notifications for relevant opportunities
- Direct messaging with directors
- Track audition progress
- Analytics dashboard

### For Directors
- Post and manage casting calls
- Advanced actor search with filters
- Organize audition schedules
- Direct messaging with actors
- Script management
- Analytics dashboard

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Animations**: Framer Motion
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/film-connect.git
   cd film-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
film-connect/
├── public/
│   ├── index.html
│   ├── grid.svg
│   └── ...
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Roleselector.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── ActorDashboard.jsx
│   │   ├── DirectorDashboard.jsx
│   │   ├── PostRole.jsx
│   │   ├── PostedRoles.jsx
│   │   └── ...
│   ├── firebase.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
