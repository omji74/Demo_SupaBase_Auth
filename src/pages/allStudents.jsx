import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../createClient";
function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    const { data, error } = await supabase.from("students").select("*").order("id");
    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setStudents(data);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setStudents(students.filter((s) => s.id !== id));
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>All Students</h2>
      <Link to="/addstudent">Add Student</Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.std_name}</td>
                  <td>{s.std_email}</td>
                  <td>{s.std_roll_no}</td>
                  <td>{s.std_branch}</td>
                  <td>
                    <Link to={`/editstudent/${s.id}`}>Edit</Link>{" "}
                    <button onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllStudents;
