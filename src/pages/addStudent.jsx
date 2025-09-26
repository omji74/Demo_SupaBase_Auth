import {useNavigate, useParams } from "react-router-dom";
import  { useState } from "react";
import supabase from "../createClient";

function AddStudent() {
  const [form, setForm] = useState({ std_name: "", std_email: "", std_roll_no: "", std_branch: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("students").insert([form]);
    if (error) {
      console.error("Insert error:", error.message);
    } else {
      navigate("/allstudents");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required onChange={(e) => setForm({ ...form, std_name: e.target.value })} /><br />
        <input placeholder="Email" required onChange={(e) => setForm({ ...form, std_email: e.target.value })} /><br />
        <input placeholder="Roll No" required onChange={(e) => setForm({ ...form, std_roll_no: e.target.value })} /><br />
        <input placeholder="Branch" required onChange={(e) => setForm({ ...form, std_branch: e.target.value })} /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddStudent;
