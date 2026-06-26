import "./App.css";
import Registration from "./components/Registration";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddTest from "./pages/admin/AddTest";
import UpdateTest from "./pages/admin/UpdateTest";
import DeleteTest from "./pages/admin/DeleteTest";
import ManageQuestionBank from "./pages/admin/ManageQuestionBank";
import AssignQuestions from "./pages/admin/AssignQuestions";
import ManageTestRequest from "./pages/admin/ManageTestRequest";
import ViewRanking from "./pages/admin/ViewRanking";

import StudentDashboard from "./pages/student/StudentDashboard";
import StartTest from "./pages/student/StartTest";
import TestHistory from "./pages/student/TestHistory";
import RequestTest from "./pages/student/RequestTest";
import StudentRequests from "./pages/student/StudentRequests";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Dashboard */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/add-test"
        element={
          <ProtectedRoute>
            <AddTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/update-test/:id"
        element={
          <ProtectedRoute>
            <UpdateTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delete-test/:id"
        element={
          <ProtectedRoute>
            <DeleteTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/question-bank"
        element={
          <ProtectedRoute>
            <ManageQuestionBank />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assign-questions"
        element={
          <ProtectedRoute>
            <AssignQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/test_requests"
        element={
          <ProtectedRoute>
            <ManageTestRequest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rankings"
        element={
          <ProtectedRoute>
            <ViewRanking />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/start-test/:id"
        element={
          <ProtectedRoute>
            <StartTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/test-history"
        element={
          <ProtectedRoute>
            <TestHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/request-test"
        element={
          <ProtectedRoute>
            <RequestTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <StudentRequests />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;