const express = require('express');
const router = express.Router();
const teamController = require('../app/controllers/teamController');

// Route to create a new team
router.post('/team', teamController.createTeam);

// Route to get all teams
router.get('/teams', teamController.getAllTeams);

// Route to get a single team by ID
router.get('/team/:id', teamController.getTeamById);

// Route to update a team by ID
router.patch('/team/:id', teamController.updateTeam);

// Route to delete a team by ID
router.delete('/team/:id', teamController.deleteTeam);

module.exports = router;
