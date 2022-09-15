import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateJob.css";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [jobNotes, setJobNotes] = useState("");
  const [jobDate, setJobDate] = useState(new Date());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const reservation = {
    title: title,
    clientName: clientName,
    location: location,
    description: description,
    clientPhoneNumber: clientPhoneNumber,
    jobStatus: jobStatus,
    jobNotes: jobNotes,
    jobDate: jobDate,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/jobs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservation),
      },
      []
    );

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/jobs");
    }
  };

  if (isLoading) {
    <h2> Loading.....</h2>;
  }

  if (isError) {
    return (
      <>
        <p className="no-reservation">
          Error creating a job reservation (error status {errorStatus})
        </p>
        <button className="button" onClick={() => window.location.reload(false)}>
          Click to reload!
        </button>
      </>
    );
  }

  return (
    <>
      <form onSubmit={(args) => handleSubmit(args)} className="form">
        {/* Job Titile */}
        <div className="form-group">
          <label htmlFor="title" className="form-name">Job Title: </label>
          <input type="text" className="form-input" name="title" required 
          onChange={(event) => {
            setTitle(event.target.value);
          }}/>
        </div>
        {/* Client Name */}
        <div className="form-group">
          <label htmlFor="clientName" className="form-name">Client Name: </label>
          <input type="text" className="form-input" name="clientName" required
          onChange={(event) => {
            setClientName(event.target.value);
          }}/>
        </div>
        {/* Location */}
        <div className="form-group">
          <label htmlFor="location" className="form-name">Location: </label>
          <input type="text" className="form-input" name="location" required
          onChange={(event) => {
            setLocation(event.target.value);
          }}/>
        </div>
        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-name">Description: </label>
          <textarea rows="4" cols="50" className="form-input" name="description" required
          onChange={(event) => {
            setDescription(event.target.value);
          }}/>
        </div>
        {/* client phone number */}
        <div>
          <label htmlFor="clientPhoneNumber" className="form-name">Clients Phone Number:</label>
          <input
            type="number"
            className="form-input"
            minLength="10"
            value={clientPhoneNumber}
            onChange={(event) => {
              setClientPhoneNumber(event.target.value);
            }}
            required
            onWheel={() => document.activeElement.blur()}
          />
        </div>
        {/* job Status */}
        <div className="form-group">
          <label htmlFor="jobStatus" className="form-name">Job Status: </label>
          <select className="form-input" name="jobStatus" required
          onChange={(event) => {
            setJobStatus(event.target.value);
          }}>
            <option value="To Price ">To Price</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Invoiced">Invoiced</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* job Notes */}
        <div className="form-group">
          <label htmlFor="jobNotes" className="form-name">Job Notes: </label>
          <textarea rows="4" cols="50" className="form-input" name="jobNotes" required
          onChange={(event) => {
            setJobNotes(event.target.value);
          }}/>
        </div>

        {/* Job Date */}
        <div>
          <label htmlFor="description" className="form-name">Date:</label>
          <DatePicker
          className="form-input"
            showTimeSelect
            minDate={new Date()}
            selected={jobDate}
            dateFormat="dd/MM/yyyy hh:mm aa"
            onChange={(date) => setJobDate(date)} 
          />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateJob;