const express = require("express");
const Student = require("./db/models/students");
const app = express();
require("./db/conn");
const port = process.env.PORT || 8000;

app.use(express.json());

app
  .route("/students")

  .get((req, res) => {
    Student.find((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    console.log(req.body);
    const user = new Student(req.body);
    user
      .save()
      .then(() => {
        res.status(201).send(user);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .delete((req, res) => {
    console.log(req.body);
    Student.deleteOne({ name: req.body.name }, (err) => {
      if (!err) {
        res.send("Deleted!");
      } else {
        res.send(err);
      }
    });
  });

// Request a Specific Student
app.route("/students/:stdId").get((req, res) => {
  Student.findOne({ stdId: req.params.stdId }, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.patch("/students/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
