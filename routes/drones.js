const express = require('express');
const DroneModel = require('../models/Drone.model.js');

// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  DroneModel.find() //the find method
  .then((dronesFromDB) => {
    console.log('dronesFromDb', dronesFromDB)
    res.render('drones/list', {drones: dronesFromDB});
  });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  //console.log(req.body);
  DroneModel.create( { 
    name, 
    propellers, 
    maxSpeed})
    .then(() => {
    res.redirect('/drones');
  });
  //exports.drone = drone;
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const droneId = req.params.droneId;
  DroneModel.findById(droneId)
  .then((theDroneFromDB) => {  //means we found the drone by th Id
     res.render('drones/update-form', { drone: theDroneFromDB});
  }); 
 
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const droneId = req.params.id;
  const { name, propellers, maxSpeed} = req.body;
  DroneModel.findByIdAndUpdate(droneId, {
    name,
    propellers,
    maxSpeed
  }).then(() => {
    res.redirect('/drones');
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const droneId= req.params.id;
  DroneModel.findByIdAndDelete(droneId)
    .then(() => {
      res.redirect('/drones');
    });
  });


module.exports = router;
