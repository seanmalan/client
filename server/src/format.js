const formatJob = (job) => {
  return {
    id: job._id,
    title: job.title,
    clientName: job.clientName,
    location: job.location,
    description: job.description,
    created_at: job.created_at,
    clientNumber: job.clientNumber,
    jobStatus: job.jobStatus,
    
  };
}

module.exports = {formatJob}