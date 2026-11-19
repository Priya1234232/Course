
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import CourseForm from "../components/CourseForm.jsx";

export default function AddCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Load course for editing
  useEffect(() => {
    if (!id) return;

    api.get("/courses/" + id)
      .then((response) => {
        setValues(response.data);
      })
      .catch((e) => {
        console.error("COURSE LOAD ERROR:", e);
        setError(
          e.response?.data?.message ||
          e.message ||
          "Could not load course."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Add or update course
  async function save(form) {
    try {
      setBusy(true);
      setError("");

      console.log("Sending course data:", form);

      let response;

      if (id) {
        response = await api.put("/courses/" + id, form);
      } else {
        response = await api.post("/courses", form);
      }

      console.log("Course saved successfully:", response.data);

      alert("Course saved successfully!");
      navigate("/courses");

    } catch (e) {
      console.error("COURSE SAVE ERROR:", e);
      console.log("Error message:", e.message);
      console.log("Status:", e.response?.status);
      console.log("Response:", e.response?.data);
      console.log("API URL:", e.config?.baseURL);
      console.log("Request URL:", e.config?.url);

      setError(
        e.response?.data?.message ||
        e.message ||
        "Could not save course."
      );

    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="panel">Loading course...</div>;
  }

  return (
    <section className="form-wrap">
      <div className="heading">
        <div>
          <small>COURSE CATALOGUE</small>
          <h1>{id ? "Edit Course" : "Add a Course"}</h1>
          <p>
            {id
              ? "Update course information."
              : "Fill in the details to add a new course."}
          </p>
        </div>

        <Link className="button" to="/courses">
          ← Back
        </Link>
      </div>

      <div className="panel">
        {error && <p className="error">{error}</p>}

        <CourseForm
          initialValues={values}
          onSubmit={save}
          buttonText={id ? "Save Changes" : "Create Course"}
          busy={busy}
        />
      </div>
    </section>
  );
}
