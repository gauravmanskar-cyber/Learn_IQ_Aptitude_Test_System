import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Registration from "./components/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AddTest from "./pages/admin/AddTest";
import UpdateTest from "./pages/admin/UpdateTest";
import DeleteTest from "./pages/admin/DeleteTest";
import ManageQuestionBank from "./pages/admin/ManageQuestionBank";
import AssignQuestions from "./pages/admin/AssignQuestions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Admin Routes */}
        <Route path="/add-test" element={<AddTest />} />
        <Route path="/update-test/:id" element={<UpdateTest />} />
        <Route path="/delete-test/:id" element={<DeleteTest />} />
        <Route path="/question-bank" element={<ManageQuestionBank />} />
        <Route path="/assign-questions" element={<AssignQuestions />} />
        {/* <Route path="/schedule-test" element={<ScheduleTest />} />
        <Route path="/results" element={<Results />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/student-requests" element={<StudentRequests />} /> */}
      </Routes>
    </>
  );
}

export default App;
