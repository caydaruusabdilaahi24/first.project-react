import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <div>
        <h2>🎓 Student Management System</h2>
        <p>Manage your students efficiently</p>
      </div>
      <span>Student Dashboard</span>
    </header>
  );
}

function StatCard({ title, number, description }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{number}</h2>
      <small>{description}</small>
    </div>
  );
}

function StudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || course.trim() === "") {
      return;
    }

    addStudent({
      id: Date.now(),
      name: name,
      course: course,
      status: "Active",
    });

    setName("");
    setCourse("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <label>Student Name</label>
      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Course</label>
      <input
        type="text"
        placeholder="Enter course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

function StudentList({ students, deleteStudent }) {
  return (
    <div className="student-list">
      <h2>All Students</h2>

      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        students.map((student) => (
          <div className="student" key={student.id}>
            <div>
              <h3>{student.name}</h3>
              <p>{student.course}</p>
              <small>{student.status}</small>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function Loo() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      course: "React",
      status: "Active",
    },
    {
      id: 2,
      name: "Mohamed Hassan",
      course: "HTML",
      status: "Active",
    },
    {
      id: 3,
      name: "Abdi Yusuf",
      course: "CSS",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Hassan Omar",
      course: "JavaScript",
      status: "Active",
    },
    {
      id: 5,
      name: "Ali Ahmed",
      course: "React",
      status: "Inactive",
    },
  ]);

  const [page, setPage] = useState("Dashboard");

  function addStudent(newStudent) {
    setStudents([...students, newStudent]);
    setPage("Students");
  }

  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  return (
    <div className="app">
      <Header />

      <nav className="navbar">
        <button onClick={() => setPage("Dashboard")}>Dashboard</button>
        <button onClick={() => setPage("Students")}>Students</button>
        <button onClick={() => setPage("Add Student")}>Add Student</button>
      </nav>

      {page === "Dashboard" && (
        <main>
          <section className="welcome">
            <h2>Student Management System</h2>
            <p>Welcome back! Here's your dashboard overview.</p>
          </section>

          <section className="stats">
            <StatCard
              title="Total Students"
              number={students.length}
              description="Registered students"
            />

            <StatCard
              title="Active Students"
              number={activeStudents}
              description="Currently active"
            />

            <StatCard
              title="Inactive Students"
              number={inactiveStudents}
              description="Need attention"
            />

            <StatCard
              title="Total Courses"
              number="5"
              description="Available courses"
            />
          </section>

          <section className="quick-actions">
            <h3>Quick Actions</h3>

            <button onClick={() => setPage("Students")}>
              👥 View All Students
            </button>

            <button onClick={() => setPage("Add Student")}>
              ➕ Add New Student
            </button>

            <button onClick={() => setPage("Students")}>
              📚 Manage Students
            </button>
          </section>
        </main>
      )}

      {page === "Students" && (
        <StudentList
          students={students}
          deleteStudent={deleteStudent}
        />
      )}

      {page === "Add Student" && (
        <StudentForm addStudent={addStudent} />
      )}

      <footer>
        Student Management System | Built with React
      </footer>
    </div>
  );
}

export default Loo;