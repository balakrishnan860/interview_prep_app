import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import {useContext} from "react"
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import QuestionsPage from "./pages/QuestionsPage"
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
 
  return (
      <BrowserRouter>
      <Navbar />
      <Routes>

  <Route path="/" element={<LoginPage />} />

  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/questions"
    element={
      <ProtectedRoute>
        <QuestionsPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/question/:id"
    element={
      <ProtectedRoute>
        <QuestionDetailsPage />
      </ProtectedRoute>
    }
  />

</Routes>

      </BrowserRouter>
  );
}

export default App;
