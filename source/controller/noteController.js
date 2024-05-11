// Importing noteModels from models/note.js
const noteModel = require("../models/note");

// This should be async because it will interact with our database
const createNotes = async (requestFromUserOrClient, responseFromServer) =>{

    // Accessing the title and description from the requestFromUserOrClient
    const {title, description} = requestFromUserOrClient.body;

    // Creating newNote model
    const newNote = new noteModel({
        title: title,
        description: description,
        userID: requestFromUserOrClient.userId
    });

    try {
        // await is put because it will take some time to save the new note to the database
        await newNote.save();
        return responseFromServer.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        return responseFromServer.status(401).json({message: "Something went wrong"});
    }
}

// Here also async is necessary because database will be used
const updateNotes = async (requestFromUserOrClient, responseFromServer) =>{

    // First of all get the id of the note which need to be updated
    const id = requestFromUserOrClient.params.id; // param.id because we had used /:id in the endpoint see notesRouter.js

    // Get the title and description from the requestFromUserOrClient
    const {title, description} = requestFromUserOrClient.body;

    // Update the note without creating new one
    const newNote = {
        title : title,
        description : description,
        userID : requestFromUserOrClient.userId
    };

    try {
        // await is necessary because it will first find from database and then it will update
        // {new : true} will first update the note in database and then it will return the updated note
        await noteModel.findByIdAndUpdate(id, newNote, {new : true});
        return responseFromServer.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        return responseFromServer.status(401).json({message: "Something went wrong"});
    }
}

const deleteNotes = async (requestFromUserOrClient, responseFromServer) =>{
    // First of all get the id of the note which need to be deleted
    const id = requestFromUserOrClient.params.id; // param.id because we had used /:id in the endpoint see notesRouter.js

    try {
        // findByIdAndRemove will first remove from database and it will return the removed object
        const note = await noteModel.findByIdAndDelete(id);
        return responseFromServer.status(202).json(note);
    } catch (error) {
        console.log(error);
        return responseFromServer.status(401).json({message: "Something went wrong"});
    }
}

// async is necessary because it will read all the notes of user filter by userId from the database
const getNotes = async (requestFromUserOrClient, responseFromServer) =>{
    try {
        // Get all the notes from the database based on the userId and store it to the notes
        const notes = await noteModel.find({userID : requestFromUserOrClient.userId});

        // return that notes to the response
        return responseFromServer.status(200).json(notes);

    } catch (error) {
        console.log(error);
        return responseFromServer.status(401).json({message: "Something went wrong"});
    }
}

module.exports = {createNotes, updateNotes, deleteNotes, getNotes};