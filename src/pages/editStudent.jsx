import { useNavigate, useParams } from "react-router-dom";
import  { useState, useEffect } from "react";
import supabase from "../createClient";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ std_name: "", std_email: "", std_roll_no: "", std_branch: "" });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  async function fetchStudent() {
    const { data, error } = await supabase.from("students").select("*").eq("id", id).single();
    if (error) {
      console.error("Fetch single error:", error.message);
    } else {
      setForm(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("students").update(form).eq("id", id);
    if (error) {
      console.error("Update error:", error.message);
    } else {
      navigate("/allstudents");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.std_name} onChange={(e) => setForm({ ...form, std_name: e.target.value })} /><br />
        <input value={form.std_email} onChange={(e) => setForm({ ...form, std_email: e.target.value })} /><br />
        <input value={form.std_roll_no} onChange={(e) => setForm({ ...form, std_roll_no: e.target.value })} /><br />
        <input value={form.std_branch} onChange={(e) => setForm({ ...form, std_branch: e.target.value })} /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
