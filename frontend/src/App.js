import {BrowserRouter,Route,Routes} from "react-router-dom"
import {useContext} from "react"
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import QuestionsPage from "./pages/QuestionsPage"
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import UpdateQuestion from "./pages/UpdateQuestion";
import AddQuestion from "./pages/AddQuestion";
import MockInterview from "./pages/MockInterview";
import MockInterviewSetup from "./pages/MockInterviewSetup";

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
  <Route path="/mock-setup" element={<MockInterviewSetup />} />
  <Route path="/mock-interview" element={<MockInterview />} />
 <Route path="/add-question" element={<AddQuestion/>}/>

  <Route
    path="/questions"
    element={
      <ProtectedRoute>
        <QuestionsPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/questions/:id"
    element={
      <ProtectedRoute>
        <QuestionDetailsPage />
      </ProtectedRoute>
    }
  />
<Route path="/update-question/:id" element={<UpdateQuestion />} />

</Routes>

      </BrowserRouter>
  );
}

export default App;
