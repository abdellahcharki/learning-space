

const router = require("express").Router()
const { Note } = require("../models")

router.get("/",(req,res)=>{
    res.render("notes/notes",{mail: req.session.mail})
})
 

// Einzelne Notiz abrufen
router.get("/api/notes/:id", async (req, res) => {
    try {
        const note = await Notes.findByPk(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Notiz nicht gefunden" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Serverfehler", error });
    }
});

// Alle Notizen abrufen
router.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.findAll({ order: [['updatedAt', 'DESC']]});
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Serverfehler", error });
    }
});


router.post("/api/notes", async (req, res) => {
    const { id, title, body } = req.body;
    console.log(id,title);

    try {
        if (id) {
            // Update existing note
            const note = await Note.findByPk(id); // Find by primary key (ID)
            if (note) {
                note.title = title;
                note.body = body;
                await note.save(); // Save updated note to DB
                return res.json(note); // Send updated note as response
            } else {
                return res.status(404).json({ message: "Note not found" });
            }
        } else {
            // Create new note
            const newNote = await Note.create({
                title,
                body,
            });
            return res.json(newNote); // Send created note as response
        }
    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }

    
});




module.exports = router;