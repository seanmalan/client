const { formatJob } = require('./format');
 
const job = {
  _id: "123",
  title: "title",
  clientName: "clientName",
  location: "location",
  description: "description",
  created_at: "created_at",
  clientNumber: "clientNumber",
  jobStatus: "jobStatus",
};

describe("formatJob", () => {
  it("should return a formatted job", () => {
    const formattedJob = formatJob(job);
    expect(formattedJob).toEqual({
      id: "123",
      title: "title",
      clientName: "clientName",
      location: "location",
      description: "description",
      created_at: "created_at",
      clientNumber: "clientNumber",
      jobStatus: "jobStatus",
    });
  });
});
