const router = require("express").Router();
const FinishedProtocol = require("../models/protocol_finished");
const jwt = require('jsonwebtoken');

//vorschau///////////////////////////////////////////////////////////////////////////////



router.post('/create', async (req, res) => {
    try {
        // Create a new protocol instance
        console.log(req.body)
        const new_draft_Protocol = new FinishedProtocol(req.body);
        // Save the protocol to the database
        const saved_draft_Protocol = await new_draft_Protocol.save();
        console.log(saved_draft_Protocol);
        res.json(saved_draft_Protocol);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;