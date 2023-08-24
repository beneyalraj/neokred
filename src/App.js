import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Profile } from "./core/Profile";
import LoginForm from "./core/LoginForm";
import SignupForm from "./core/SignupForm";
import PageNotFound from "./core/PageNotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
