// All notes related end points will be mentioned here
const express = require("express");
const { getNotes, createNotes, deleteNotes, updateNotes } = require("../controller/noteController");
const authentication = require("../middleware/authentication");
const noteRouter = express.Router();

// But before hitting these end points, we should check that does user have valid token or not and
// For that we will use the authentication function defined in the middleware
// In the authentication function, next() is denoting getNotes, createNotes, deleteNotes or updateNotes

noteRouter.get("/", authentication, getNotes);

noteRouter.post("/", authentication, createNotes);

// Which note to be deleted, we need an extra parameter that will be the id of that note
noteRouter.delete("/:id", authentication, deleteNotes);

// Which note to be updated, we need an extra parameter that will be the id of that note
noteRouter.put("/:id", authentication, updateNotes);

module.exports = noteRouter;