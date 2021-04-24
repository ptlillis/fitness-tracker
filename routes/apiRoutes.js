var db = require("../models");

module.exports = (app) =>{
  app.get("/api/workouts", (req, res)=> {
    db.Workout.find({}).sort({_id: -1})
      // .populate("exercises")
      .then(dbWorkout => {
        
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  


  app.put("/api/workouts/:id", (req, res) => {
      
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

  });

  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) =>{
    db.Workout.find({}).limit(5)
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
