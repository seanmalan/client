import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import JobList from "./components/JobList";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import CreateJob from "./components/CreateJob";
import Job from "./components/Job";

const App = () => {
  const { isLoading } = useAuth0();

  if(isLoading) {
    return <div>Loading...</div>
  }


  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<ProtectedRoute />}>
            <Route path="/jobs/:id" element={<Job />} />
          </Route>

          <Route path="/add" element={<ProtectedRoute />}>
            <Route path="/add" element={<CreateJob />} />
          </Route>
        </Routes>
      </div>
      <div></div>
    </>
  );
};

export default App;
