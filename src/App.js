import "./App.css";
import { Routes, Route } from "react-router-dom";
import JobList from "./components/JobList";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import CreateJob from "./components/CreateJob";

const App = () => {


  return (
    <>
        <Header />
      <div className="container">
        
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/active-jobs" element={<JobList />} />
          <Route path="/add" element={<CreateJob />} />
        </Routes>
      </div>
      <div>
        
      </div>
    </>
  );
};

export default App;
