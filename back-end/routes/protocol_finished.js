const router = require("express").Router();
const FinishedProtocol = require("../models/protocol_finished");
const DraftProtocol = require("../models/protocol_draft");
const jwt = require('jsonwebtoken');

//vorschau///////////////////////////////////////////////////////////////////////////////
// Generate JWT token
function generateToken(obj) {
    return jwt.sign({ obj }, 'blue-eyes', { expiresIn: '100d' });
}

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, 'blue-eyes', (err, decodedObject) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.decodedObject = decodedObject;
        next();
    });
}


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

router.post('/fertig_neu_erstellen', authenticateToken, async (req, res) => {
    const decodedObject = req.decodedObject;

    
    try {
        
        const finished_protocol = await FinishedProtocol.findById(decodedObject.obj)
        
        if (!finished_protocol) {
            res.json("Protokoll wurde nicht gefunden!")
        }

        const new_draft_Protocol = new DraftProtocol({content: [finished_protocol.content[0]]});

        
        new_draft_Protocol.content[0].creation_date = req.body.creation_date;
        new_draft_Protocol.content[0].created_by = req.body.created_by;
        new_draft_Protocol.content[0].delete_time = req.body.delete_time;
        new_draft_Protocol.content[0].finished = "nein";

        new_draft_Protocol.markModified(`content.${0}`);
        await new_draft_Protocol.save();

        const protocol_id_token = generateToken(new_draft_Protocol._id);

        return res.status(200).json(protocol_id_token);
        
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;