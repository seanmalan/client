import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Job = () => {
  const id = useParams()
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchJob = async () => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${job.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }

      const data = await response.json();
      
      setJob(data);
      setLoading(false);
    };
    fetchJob();
  }, [id, getAccessTokenSilently]);
  
  if(job === null) {
    setIsNotFound(true)
  }

  if(isNotFound) {
    return (
      <div>
        <h1>Sorry, Job not found</h1>
        <Link to="/jobs">Back to jobs</Link>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
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
      <p>Job Date: <span>{(job.jobDate)}</span></p>
      <p>Created By: <span>{job.createdBy}</span></p>
      <p>Created At: <span>{(job.created_at)}</span></p>
    </div>
  )


}

export default Job;