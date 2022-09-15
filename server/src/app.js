const mongoose = require("mongoose");
const express = require("express");
const JobModel = require("./models/JobModel");
const { formatJob } = require("./format");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const acceptedJobStatuses = [
  "Pending",
  "Active",
  "Completed",
  "Invoiced",
  "Cancelled",
  "To Price",
];

const checkJwt = auth({
  audience: "https://strongfencing.com",
  issuerBaseURL: `https://dev-qqar3eez.us.auth0.com/`,
});

app.post(
  "/jobs",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      clientName: Joi.string().required(),
      location: Joi.string().required(),
      description: Joi.string().required(),
      created_at: Joi.date(),
      clientPhoneNumber: Joi.number().required(),
      jobStatus: Joi.string().required(),
      jobNotes: Joi.array().items(Joi.string()),
      jobDate: Joi.date().required(),
    }),
  }),
  async (req, res, next) => {
    const { body } = req;
    const jobBody = {
      userId: req.auth.payload.sub,
      ...body,
    };
    try {
      const job = await JobModel(jobBody);
      await job.save();
      res.status(201).send(job);
    } catch (error) {
      next(error);
    }
  }
);

//
//
app.patch("/jobs/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const updates = request.body;
    const options = { new: true };

    const job = await JobModel.findByIdAndUpdate(id, updates, options);
    response.send(formatJob(job)).status(200);
  } catch (error) {
    next(error);
  }
});
//
//

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await JobModel.find({});
    res.send(formatJob(jobs)).status(200);
  } catch (error) {
    next(error);
  }
});

app.get("/jobs/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id) === true) {
      const job = await JobModel.findById(id);
      if (job !== null) {
        res.send(formatJob(job)).status(200);
      } else {
        res.send("Job not found").status(404);
      }
    } else {
      res.send("Invalid ID").status(400);
    }
  } catch (error) {
    next(error);
  }
});

app.use(errors());
module.exports = app;
