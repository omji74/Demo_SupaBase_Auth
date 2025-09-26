import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllStudents from "./pages/allStudents";
import AddStudent from "./pages/addStudent";
import EditStudent from "./pages/editStudent";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, background: "#eee" }}>
        <Link to="/allstudents" style={{ marginRight: 10 }}>All Students</Link>
        <Link to="/addstudent">Add Student</Link>
      </nav>

      <Routes>
      {/*  // ---------- All Students Page ----------//*/}
        <Route path="/allstudents" element={<AllStudents />} />
         {/*  // ---------- Add Students Page ----------//*/}
        <Route path="/addstudent" element={<AddStudent />} />
         {/*  // ---------- Edit Students Page ----------//*/}
        <Route path="/editstudent/:id" element={<EditStudent />} />
        <Route path="*" element={<AllStudents />} /> {/* default route */}
      </Routes>
    </BrowserRouter>
  );
}


