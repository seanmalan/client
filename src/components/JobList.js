import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`http://localhost:5001/jobs`);

      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }

      const data = await response.json();
      console.log(data)
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (jobs.length < 1) {
    setIsNotFound(true);
  }

  if (isNotFound) {
    return <div>Not found</div>;
  }

  return (
    <>
    <div>
      <h1 className="container-title">Job List</h1>
      <ul className="JobList">
        {jobs.map((job) => {
          return (
            <div key={job.id} className="job">
            <li>
              <h2>{job.title}</h2>
              <p>Customer Name: <span>{job.clientName}</span></p>
              <p>Site Address: <span>{job.location}</span></p>
              <div className="job-description">
                <p>Job Description:</p>
              <p>{job.description}</p>
              </div>
              <div>
                <p>Client Phone Number:</p>
              <p>{job.clientPhoneNumber}</p>
              </div>
              <p>Job Status: <span>{job.jobStatus}</span></p>
              <div><p>Job Notes:</p>
              <p>{job.jobNotes}</p>
              </div>

            <Link to={`${job._id}`}>{" "}
            Check out Job &rarr;
            </Link>
          </li>
            </div>
          )}
          )}
      </ul>
    </div>
          </>
  );
};

export default JobList;
