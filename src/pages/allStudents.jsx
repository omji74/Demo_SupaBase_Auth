import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../createClient";
function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

    // pagination state
    const [pageSize, setPageSize] = useState(10); // 10, 20, 30, 40, 50
    const [page, setPage] = useState(1); // 1-based
    const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);
 useEffect(() => {
    fetchStudents();
  }, [page, pageSize]);


  async function fetchStudents() {
    setLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

 const { data, error, count } = await supabase
      .from("students")
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(start, end);

    if (error) {
      console.error("Fetch error:", error.message);
      setStudents([]);
      setTotal(0);
    } else {
      setStudents(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function handlePageSizeChange(e) {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPage(1); // reset to first page on size change
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

    async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      // Optimistic update
      setStudents((prev) => prev.filter((s) => s.id !== id));
      // Optionally refetch to keep total accurate
      const newTotal = total - 1;
      setTotal(newTotal);
      if ((page - 1) * pageSize >= newTotal && page > 1) {
        setPage(page - 1);
      } else {
        fetchStudents();
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>All Students</h2>
      <Link to="/addstudent">Add Student</Link>
              <label>
                Page size:{" "}
                <select value={pageSize} onChange={handlePageSizeChange}>
                  {[10, 20, 30, 40, 50].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
      
              <span>Page {page} of {totalPages}</span>
              <button onClick={prevPage} disabled={page <= 1}>Prev</button>
              <button onClick={nextPage} disabled={page >= totalPages}>Next</button>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table border="1" cellPadding="8" style={{ marginTop: 10, width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>ID</th>
                    <th style={{ textAlign: "left" }}>Name</th>
                    <th style={{ textAlign: "left" }}>Email</th>
                    <th style={{ textAlign: "left" }}>Roll No</th>
                    <th style={{ textAlign: "left" }}>Branch</th>
                    <th style={{ textAlign: "left" }}>Action</th>
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
