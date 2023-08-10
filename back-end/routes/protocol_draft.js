const router = require("express").Router();
const DraftProtocol = require("../models/protocol_draft");
const FinishedProtocol = require("../models/protocol_finished");
const User = require("../models/user");
const jwt = require('jsonwebtoken');


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

router.get('/time', (req, res) => {
    const currentTime = Date.now();
    res.json(currentTime);
});

router.post('/decodedObject', authenticateToken, async (req, res) => {
    const decodedObject = req.decodedObject;

    try {
        return res.status(200).json(decodedObject);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/get_datas', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content[req.body.instance_index]) {
            const elementAtIndex = draft_proto.content[req.body.instance_index];
            return res.status(200).json(elementAtIndex);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            if (req.body.instance_index >= 0 && req.body.instance_index < draft_proto.content.length) {
                draft_proto.content.splice(req.body.instance_index, 1);
                await draft_proto.save();
                res.json(draft_proto); // You can return the updated draft_proto if needed
            } else {
                return res.status(400).json("Invalid index provided");
            }
            //DraftProtocol
            await DraftProtocol.deleteOne({ _id: req.body.id, 'content': { $size: 0 } });
        } else {
            return res.status(404).json("Protocol not found");
        }
    } catch (error) {
        res.sendStatus(500);
    }
});
//return res.status(200).json(elementAtIndex);
router.post('/create_instance', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);
        let date_e = new Date(Date.now());
        if (draft_proto && draft_proto.content) {
            const elementAtIndex = draft_proto.content[req.body.instance_index];

            elementAtIndex.creation_date = req.body.creation_dat;
            elementAtIndex.created_by = req.body.user_id;
            elementAtIndex.delete_time = req.body.delete_timee;
            elementAtIndex.finished = "nein";
            draft_proto.content.push(elementAtIndex);
            await draft_proto.save();
            res.json(draft_proto.content.length - 1);

        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.sendStatus(500);
    }
});
//einstellungen///////////////////////////////////////////////////////////////////////////////

router.post('/create', async (req, res) => {
    try {
        // Create a new protocol instance
        const new_draft_Protocol = new DraftProtocol(req.body);

        // Save the protocol to the database
        const saved_draft_Protocol = await new_draft_Protocol.save();
        const protocol_id_token = generateToken(saved_draft_Protocol._id);

        res.json(protocol_id_token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/nicht_fertig_laden', async (req, res) => {

    try {

        const drafts = await DraftProtocol.find({});

        let p_permission = req.body.permission_n;
        let user_idd = req.body.idd;

        let draft_protocols = [];

        outerLoop: // Label the outer loop
        for (let draft of drafts) {

            outerloop2:
            for (let i = 0; i < draft.content.length; i = i + 1) {

                if (draft.content[i].finished === "ja") {
                    continue outerloop2;
                }

                if (!(user_idd === draft.content[i].created_by)) {
                    const creator = await User.findById(draft.content[i].created_by);

                    if (creator) {
                        if (!p_permission.includes(creator.permission[0])) {
                            continue outerloop2;
                        }
                    }
                }


                draft.content[i].instance = i.toString();
                draft.content[i].id_d = draft._id;
                draft.content[i].id_d_decoded = generateToken(draft._id);

                /*console.log(draft.content[i].instance)
                console.log(draft.content[i].id_d)
                console.log(draft.content[i].id_d_decoded)*/
                draft_protocols.push(draft.content[i]);
            }

        }

        if (draft_protocols.length == 0) {
            return res.json("Kein Protokoll wurde gefunden");
        } else {
            return res.status(200).json(draft_protocols);
        }

    } catch (error) {
        return error;
        //return res.json("Kein Protokoll wurde gefunden");
    }
});

router.post('/eigene_laden', async (req, res) => {

    try {
        let drafts;

        if (req.body.process === "Draft_Protocol_laden") {
            drafts = await DraftProtocol.find({});
        } else {
            drafts = await FinishedProtocol.find({});
        }


        let draft_protocols = [];

        outerLoop: // Label the outer loop
        for (let draft of drafts) {

            outerloop2:
            for (let i = 0; i < draft.content.length; i = i + 1) {

                if (draft.content[i].created_by !== req.body.idd) {
                    continue outerloop2;
                }

                draft.content[i].instance = i.toString();
                draft.content[i].id_d = draft._id;
                draft.content[i].id_d_decoded = generateToken(draft._id);

                draft_protocols.push(draft.content[i]);
            }

        }

        if (draft_protocols.length == 0) {
            return res.json("Kein Protokoll wurde gefunden");
        } else {
            return res.status(200).json(draft_protocols);
        }

    } catch (error) {
        return error;
        //return res.json("Kein Protokoll wurde gefunden");
    }
})

router.post('/load', async (req, res) => {

    let p_permission = req.body.permission_n;
    let user_idd = req.body.user_idd

    delete req.body.permission_n;
    delete req.body.user_idd;

    try {

        if (req.body.process === "Draft_Protocol_laden") {

            if (req.body.hasOwnProperty("id") && req.body.hasOwnProperty("instance")) {
                const draft = await DraftProtocol.findById(req.body.id);
                if (!draft) {
                    return res.json("Kein Protokoll wurde gefunden");
                }

                let idd = req.body.id

                if (!req.body.instance.match('^([0-9]+)$')) {
                    return res.json("Instanz muss eine nummer sein!!");
                }

                const instance = parseInt(req.body.instance);

                if (instance > draft.content.length - 1) {

                    return res.json("Kein Protokoll wurde gefunden");
                }

                if ((Object.keys(req.body).length == 6 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 6 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {

                    delete req.body.type;
                    delete req.body.process;
                    delete req.body.id;
                    delete req.body.instance;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }

                    if (!(user_idd === draft.content[instance].created_by)) {
                        const creator = await User.findById(draft.content[instance].created_by);

                        if (creator) {
                            if (!p_permission.includes(creator.permission[0])) {
                                return res.json("Kein Protokoll wurde gefunden");
                            }
                        }
                    }




                    for (const key in req.body) {

                        const itemValue = draft.content[instance][key];
                        const conditionValue = req.body[key];

                        for (const sub_key1 in conditionValue) {
                            if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                return res.json("Kein Protokoll wurde gefunden");
                            }
                        }

                    }
                    draft.content[instance].instance = instance.toString();
                    draft.content[instance].id_d = idd;
                    draft.content[instance].id_d_decoded = generateToken(idd);

                    return res.status(200).json([draft.content[instance]]);

                } else if (Object.keys(req.body).length == 6) {

                    if (!(user_idd === draft.content[instance].created_by)) {
                        const creator = await User.findById(draft.content[instance].created_by);

                        if (creator) {
                            if (!p_permission.includes(creator.permission[0])) {
                                return res.json("Kein Protokoll wurde gefunden");
                            }
                        }
                    }


                    if (draft.content[parseInt(req.body.instance)]) {
                        draft.content[instance].instance = instance.toString();
                        draft.content[instance].id_d = idd;
                        draft.content[instance].id_d_decoded = generateToken(idd);

                        return res.status(200).json([draft.content[instance]]);
                    } else {
                        return res.json("Kein Protokoll wurde gefunden");
                    }
                }

            }

            if (req.body.hasOwnProperty("id") && !req.body.hasOwnProperty("instance")) {
                const draft = await DraftProtocol.findById(req.body.id);
                let idd = req.body.id

                let filteredData = [];

                if (!draft) {
                    return res.json("Kein Protokoll wurde gefunden");
                }


                if ((Object.keys(req.body).length == 5 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 5 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {
                    delete req.body.type;
                    delete req.body.process;
                    delete req.body.id;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }



                    outerloop2:
                    for (let i = 0; i < draft.content.length; i = i + 1) {

                        if (!(user_idd === draft.content[i].created_by)) {
                            const creator = await User.findById(draft.content[i].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue outerloop2;
                                }
                            }
                        }

                        for (const key in req.body) {

                            const itemValue = draft.content[i][key];
                            const conditionValue = req.body[key];

                            for (const sub_key1 in conditionValue) {

                                console.log(sub_key1)
                                console.log(conditionValue[sub_key1])
                                console.log(itemValue[sub_key1])

                                if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                    continue outerloop2;
                                }
                            }

                        }

                        draft.content[i].instance = i.toString();
                        draft.content[i].id_d = idd;
                        draft.content[i].id_d_decoded = generateToken(idd);
                        filteredData.push(draft.content[i]);

                    }

                    if (filteredData.length == 0) {

                        return res.json("Kein Protokoll wurde gefunden");
                    }

                    return res.status(200).json(filteredData);

                } else if (Object.keys(req.body).length == 5) {

                    if (draft.content.length == 0) {

                        return res.json("Kein Protokoll wurde gefunden");
                    }

                    let list = []

                    for (let i = 0; i < draft.content.length; i = i + 1) {
                        if (!(user_idd === draft.content[i].created_by)) {
                            const creator = await User.findById(draft.content[i].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue;
                                }
                            }
                        }

                        draft.content[i].instance = i.toString();
                        draft.content[i].id_d = idd;
                        draft.content[i].id_d_decoded = generateToken(idd);
                        list.push(draft.content[i])
                    }

                    return res.status(200).json(list);
                }
            }

            if (!req.body.hasOwnProperty("id") && req.body.hasOwnProperty("instance")) {
                const drafts = await DraftProtocol.find({});

                if (!req.body.instance.match('^([0-9]+)$')) {
                    return res.json("Instanz muss eine nummer sein!!");
                }

                const instance = parseInt(req.body.instance);
                let draft_protocols = []



                if ((Object.keys(req.body).length == 5 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 5 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {

                    delete req.body.type;
                    delete req.body.process;
                    delete req.body.instance;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }

                    outerLoop: // Label the outer loopf
                    for (let draft of drafts) {

                        if (instance > draft.content.length - 1) {

                            continue outerLoop;
                        }

                        if (!(user_idd === draft.content[instance].created_by)) {
                            const creator = await User.findById(draft.content[instance].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue outerLoop;
                                }
                            }
                        }

                        for (const key in req.body) {



                            const itemValue = draft.content[instance][key];
                            const conditionValue = req.body[key];

                            for (const sub_key1 in conditionValue) {
                                if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                    continue outerLoop;
                                }
                            }

                        }
                        draft.content[instance].instance = instance.toString();
                        draft.content[instance].id_d = draft._id;
                        draft.content[instance].id_d_decoded = generateToken(draft._id);

                        draft_protocols.push(draft.content[instance]);
                    }
                } else if (Object.keys(req.body).length == 5) {

                    outerLoop: // Label the outer loopf
                    for (let draft of drafts) {

                        if (instance > draft.content.length - 1) {

                            continue outerLoop;
                        }

                        if (!(user_idd === draft.content[instance].created_by)) {
                            const creator = await User.findById(draft.content[instance].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue outerLoop;
                                }
                            }
                        }

                        draft.content[instance].instance = instance.toString();
                        draft.content[instance].id_d = draft._id;
                        draft.content[instance].id_d_decoded = generateToken(draft._id);
                        draft_protocols.push(draft.content[instance]);
                    }

                }



                if (draft_protocols.length == 0) {
                    return res.json("Kein Protokoll wurde gefunden");
                } else {
                    return res.status(200).json(draft_protocols);
                }
            }

            if (!req.body.hasOwnProperty("id") && !req.body.hasOwnProperty("instance")) {
                const drafts = await DraftProtocol.find({});

                let draft_protocols = []

                if ((Object.keys(req.body).length == 4 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 4 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {

                    delete req.body.type;
                    delete req.body.process;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }



                    outerLoop: // Label the outer loop
                    for (let draft of drafts) {

                        outerloop2:
                        for (let i = 0; i < draft.content.length; i = i + 1) {

                            if (!(user_idd === draft.content[i].created_by)) {
                                const creator = await User.findById(draft.content[i].created_by);

                                if (creator) {
                                    if (!p_permission.includes(creator.permission[0])) {
                                        continue outerloop2;
                                    }
                                }
                            }

                            for (const key in req.body) {

                                const itemValue = draft.content[i][key];
                                const conditionValue = req.body[key];

                                for (const sub_key1 in conditionValue) {

                                    console.log(sub_key1)
                                    console.log(conditionValue[sub_key1])
                                    console.log(itemValue[sub_key1])

                                    if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                        continue outerloop2;
                                    }
                                }

                            }
                            draft.content[i].instance = i.toString();
                            draft.content[i].id_d = draft._id;
                            draft.content[i].id_d_decoded = generateToken(draft._id);

                            draft_protocols.push(draft.content[i]);

                        }
                    }
                } else if (Object.keys(req.body).length == 4) {
                    outerLoop: // Label the outer loop
                    for (let draft of drafts) {

                        outerloop2:
                        for (let i = 0; i < draft.content.length; i = i + 1) {

                            if (!(user_idd === draft.content[i].created_by)) {
                                const creator = await User.findById(draft.content[i].created_by);

                                if (creator) {
                                    if (!p_permission.includes(creator.permission[0])) {
                                        continue outerloop2;
                                    }
                                }
                            }

                            draft.content[i].instance = i.toString();
                            draft.content[i].id_d = draft._id;
                            draft.content[i].id_d_decoded = generateToken(draft._id);

                            console.log(draft.content[i].instance)
                            console.log(draft.content[i].id_d)
                            console.log(draft.content[i].id_d_decoded)
                            draft_protocols.push(draft.content[i]);
                        }

                    }

                }


                if (draft_protocols.length == 0) {
                    return res.json("Kein Protokoll wurde gefunden");
                } else {
                    return res.status(200).json(draft_protocols);
                }
            }

        } else if (req.body.process === "Fertiges_Protocol_laden") {



            if (req.body.hasOwnProperty("id")) {
                const draft = await FinishedProtocol.findById(req.body.id);
                let idd = req.body.id

                let filteredData = [];

                if (!draft) {
                    return res.json("Kein Protokoll wurde gefunden");
                }

                if ((Object.keys(req.body).length == 5 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 5 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {
                    delete req.body.type;
                    delete req.body.process;
                    delete req.body.id;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }

                    outerloop2:
                    for (let i = 0; i < draft.content.length; i = i + 1) {

                        if (!(user_idd === draft.content[i].created_by)) {
                            const creator = await User.findById(draft.content[i].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue outerloop2;
                                }
                            }
                        }

                        for (const key in req.body) {

                            const itemValue = draft.content[i][key];
                            const conditionValue = req.body[key];

                            for (const sub_key1 in conditionValue) {

                                console.log(sub_key1)
                                console.log(conditionValue[sub_key1])
                                console.log(itemValue[sub_key1])

                                if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                    continue outerloop2;
                                }
                            }

                        }

                        draft.content[i].instance = i.toString();
                        draft.content[i].id_d = idd;
                        draft.content[i].id_d_decoded = generateToken(idd);

                        filteredData.push(draft.content[i]);

                    }

                    if (filteredData.length == 0) {
                        return res.json("Kein Protokoll wurde gefunden");
                    }

                    return res.status(200).json(filteredData);

                } else if (Object.keys(req.body).length == 5) {
                    if (draft.content.length == 0) {
                        return res.json("Kein Protokoll wurde gefunden");
                    }

                    let list = []

                    for (let i = 0; i < draft.content.length; i = i + 1) {

                        if (!(user_idd === draft.content[i].created_by)) {
                            const creator = await User.findById(draft.content[i].created_by);

                            if (creator) {
                                if (!p_permission.includes(creator.permission[0])) {
                                    continue;
                                }
                            }
                        }

                        draft.content[i].instance = i.toString();
                        draft.content[i].id_d = idd;
                        draft.content[i].id_d_decoded = generateToken(idd);

                        list.push(draft.content[i])
                    }

                    return res.status(200).json(list);
                }
            }

            if (!req.body.hasOwnProperty("id")) {
                const drafts = await FinishedProtocol.find({});

                let draft_protocols = []


                if ((Object.keys(req.body).length == 4 && Object.keys(req.body.einsatzdaten).length > 0) ||
                    (Object.keys(req.body).length == 4 && Object.keys(req.body.massnahmen_einsatzart).length > 0)) {

                    delete req.body.type;
                    delete req.body.process;

                    if (Object.keys(req.body.einsatzdaten).length == 0) {
                        delete req.body.einsatzdaten;
                    }

                    if (Object.keys(req.body.massnahmen_einsatzart).length == 0) {
                        delete req.body.massnahmen_einsatzart;
                    }



                    outerLoop: // Label the outer loop
                    for (let draft of drafts) {

                        outerloop2:
                        for (let i = 0; i < draft.content.length; i = i + 1) {

                            if (!(user_idd === draft.content[i].created_by)) {
                                const creator = await User.findById(draft.content[i].created_by);

                                if (creator) {
                                    if (!p_permission.includes(creator.permission[0])) {
                                        continue outerloop2;
                                    }
                                }
                            }

                            for (const key in req.body) {

                                const itemValue = draft.content[i][key];
                                const conditionValue = req.body[key];

                                for (const sub_key1 in conditionValue) {

                                    console.log(sub_key1)
                                    console.log(conditionValue[sub_key1])
                                    console.log(itemValue[sub_key1])

                                    if (conditionValue[sub_key1] !== itemValue[sub_key1]) {
                                        continue outerloop2;
                                    }
                                }

                            }

                            draft.content[i].instance = i.toString();
                            draft.content[i].id_d = draft._id;
                            draft.content[i].id_d_decoded = generateToken(draft._id);

                            draft_protocols.push(draft.content[i]);

                        }
                    }
                } else if (Object.keys(req.body).length == 4) {
                    outerLoop: // Label the outer loop
                    for (let draft of drafts) {

                        outerloop2:
                        for (let i = 0; i < draft.content.length; i = i + 1) {

                            if (!(user_idd === draft.content[i].created_by)) {
                                const creator = await User.findById(draft.content[i].created_by);

                                if (creator) {
                                    if (!p_permission.includes(creator.permission[0])) {
                                        continue outerloop2;
                                    }
                                }
                            }

                            draft.content[i].instance = i.toString();
                            draft.content[i].id_d = draft._id;
                            draft.content[i].id_d_decoded = generateToken(draft._id);

                            draft_protocols.push(draft.content[i]);
                        }

                    }

                }


                if (draft_protocols.length == 0) {
                    return res.json("Kein Protokoll wurde gefunden");
                } else {
                    return res.status(200).json(draft_protocols);
                }
            }

        }



    } catch (error) {
        //return error;
        return res.json("Kein Protokoll wurde gefunden");
    }
});


// seite1  ////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_einsatzdaten', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].finished = req.body.finished;
            draft_proto.content[req.body.instance_index].einsatzdaten.special_marking_name = req.body.special_marking_name_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.special_marking_color = req.body.special_marking_color_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.alarmschluessel = req.body.alarmkey_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.keine_auftragnummer = req.body.keine_auftragnummer_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.auftragsnummer = req.body.auftragsnummer_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.einsatzort = req.body.einsatzort_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.alarmzeit = req.body.alarmzeit_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.ankunft_hvo = req.body.ankunfthvo_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.ankunft_rtw_nef = req.body.ankunft_rtw_nef_a;
            draft_proto.content[req.body.instance_index].einsatzdaten.einsatzende = req.body.einsatzende_a;
            draft_proto.markModified(`content.${req.body.instance_index}`);
            draft_proto.markModified(`content.${req.body.instance_index}.einsatzdaten`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].einsatzdaten);
            return res.status(200).json(draft_proto.content[req.body.instance_index].einsatzdaten);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});
//seite_2 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_beteiligte_einsatzkraefte', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);
        console.log(req.body)
        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.privat_pkw = req.body.privat_pkw;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.feuerwehr_mtw = req.body.feuerwehr_mtw;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.z_58_19_2 = req.body.z_58_19_2;
            // Loop through the keys and values of the patienten object in the request body
            for (const [key, value] of Object.entries(req.body.patienten)) {
                draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_am_patienten[key] = value;
            }

            // Loop through the keys and values of the ort object in the request body
            for (const [key, value] of Object.entries(req.body.ort)) {
                draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_vor_ort[key] = value;
            }
            
            draft_proto.markModified(`content.${req.body.instance_index}.beteiligte_einsatzkraefte`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte);
            return res.status(200).json(draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//patienten ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_patient', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].patient.geschlecht = req.body.geschlecht_a;
            draft_proto.content[req.body.instance_index].patient.alter = req.body.alter_a;

            draft_proto.markModified(`content.${req.body.instance_index}.patient`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].patient);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//anamnese ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/save_datas_anamnese', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);
        console.log(req.body)
        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].anamnese.atemwege = req.body.atemwege_a;

            draft_proto.content[req.body.instance_index].anamnese.belueftung.unauffaellig = req.body.belueftung_unauffaellig_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.zyanose = req.body.belueftung_zyanose_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.rasseln = req.body.belueftung_rasseln_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.schnappatmung = req.body.belueftung_schnappatmung_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.atemnot = req.body.belueftung_atemnot_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.hyperventillation = req.body.belueftung_hyperventillation_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.atemstillstand = req.body.belueftung_atemstillstand_a;
            draft_proto.content[req.body.instance_index].anamnese.belueftung.sonstiges = req.body.belueftung_sonstiges_a;

            draft_proto.content[req.body.instance_index].anamnese.puls.regelmaessig = req.body.puls_regelmaessig_a;
            draft_proto.content[req.body.instance_index].anamnese.puls.unregelmaessig = req.body.puls_unregelmaessig_a;
            draft_proto.content[req.body.instance_index].anamnese.puls.gut_tastbar = req.body.puls_gut_tastbar_a;
            draft_proto.content[req.body.instance_index].anamnese.puls.schlecht_tastbar = req.body.puls_schlecht_tastbar_a;
            draft_proto.content[req.body.instance_index].anamnese.puls.nicht_tastbar = req.body.puls_nicht_tastbar_a;

            draft_proto.content[req.body.instance_index].anamnese.haut.rosig = req.body.haut_rosig_a;
            draft_proto.content[req.body.instance_index].anamnese.haut.blass = req.body.haut_blass_a;
            draft_proto.content[req.body.instance_index].anamnese.haut.blau = req.body.haut_blau_a;
            draft_proto.content[req.body.instance_index].anamnese.haut.rot = req.body.haut_rot_a;
            draft_proto.content[req.body.instance_index].anamnese.haut.warm = req.body.haut_warm_a;
            draft_proto.content[req.body.instance_index].anamnese.haut.kalt = req.body.haut_kalt_a;

            draft_proto.markModified(`content.${req.body.instance_index}.anamnese`);
            await draft_proto.save();

            console.log(draft_proto.content[req.body.instance_index].anamnese);
            return res.status(200).json(draft_proto.content[req.body.instance_index].anamnese);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.status(404).json("as");
    }
});

//messwerte ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_messwerte', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].messwerte.puls = req.body.PulsValue_a;
            draft_proto.content[req.body.instance_index].messwerte.blutdruck = req.body.BlutdruckValue_a;
            draft_proto.content[req.body.instance_index].messwerte.spo2 = req.body.SPo2Value_a;
            draft_proto.content[req.body.instance_index].messwerte.keine_messwerte = req.body.KeineMesswerteValue_a;

            draft_proto.markModified(`content.${req.body.instance_index}.messwerte`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].messwerte);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//neurologie ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_neurologie', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].neurologie.bewusstsein = req.body.Bewusstsein_a;
            draft_proto.content[req.body.instance_index].neurologie.blutzucker = req.body.Blutzucker_a;
            //////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].neurologie.pupille_links.eng = req.body.isChecked_PupilleLinks_eng_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_links.mitte = req.body.isChecked_PupilleLinks_mittel_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_links.weit = req.body.isChecked_PupilleLinks_weit_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_links.keine_lichtreflexe = req.body.isChecked_PupilleLinks_keine_licht_reflexe_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_links.entrundet = req.body.isChecked_PupilleLinks_entrundet_a;
            //////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].neurologie.pupille_rechts.eng = req.body.isChecked_PupilleRechts_eng_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_rechts.mitte = req.body.isChecked_PupilleRechts_mittel_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_rechts.weit = req.body.isChecked_PupilleRechts_weit_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_rechts.keine_lichtreflexe = req.body.isChecked_PupilleRechts_keine_licht_reflexe_a;
            draft_proto.content[req.body.instance_index].neurologie.pupille_rechts.entrundet = req.body.isChecked_PupilleRechts_entrundet_a;
            ///////////////////////////////////////////
            draft_proto.content[req.body.instance_index].neurologie.schmerzen = req.body.Schmerzen_a;
            draft_proto.content[req.body.instance_index].neurologie.schmerzskala_0_10 = req.body.Schmerzskala_a;

            draft_proto.markModified(`content.${req.body.instance_index}.neurologie`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].neurologie);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//verletzungen ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_verletzungen', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].verletzungen.Schaedel_Hirn.offen = req.body.offen_a;
            draft_proto.content[req.body.instance_index].verletzungen.Schaedel_Hirn.geschlossen = req.body.geschlossen_a;
            draft_proto.content[req.body.instance_index].verletzungen.Schaedel_Hirn.leicht = req.body.leicht_a;
            draft_proto.content[req.body.instance_index].verletzungen.Schaedel_Hirn.mittel = req.body.mittel_a;
            draft_proto.content[req.body.instance_index].verletzungen.Schaedel_Hirn.schwer = req.body.schwer_a;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.gesicht.offen = req.body.offen_b;
            draft_proto.content[req.body.instance_index].verletzungen.gesicht.geschlossen = req.body.geschlossen_b;
            draft_proto.content[req.body.instance_index].verletzungen.gesicht.leicht = req.body.leicht_b;
            draft_proto.content[req.body.instance_index].verletzungen.gesicht.mittel = req.body.mittel_b;
            draft_proto.content[req.body.instance_index].verletzungen.gesicht.schwer = req.body.schwer_b;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.hws.offen = req.body.offen_c;
            draft_proto.content[req.body.instance_index].verletzungen.hws.geschlossen = req.body.geschlossen_c;
            draft_proto.content[req.body.instance_index].verletzungen.hws.leicht = req.body.leicht_c;
            draft_proto.content[req.body.instance_index].verletzungen.hws.mittel = req.body.mittel_c;
            draft_proto.content[req.body.instance_index].verletzungen.hws.schwer = req.body.schwer_c;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.thorax.offen = req.body.offen_d;
            draft_proto.content[req.body.instance_index].verletzungen.thorax.geschlossen = req.body.geschlossen_d;
            draft_proto.content[req.body.instance_index].verletzungen.thorax.leicht = req.body.leicht_d;
            draft_proto.content[req.body.instance_index].verletzungen.thorax.mittel = req.body.mittel_d;
            draft_proto.content[req.body.instance_index].verletzungen.thorax.schwer = req.body.schwer_d;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.abdomen.offen = req.body.offen_e;
            draft_proto.content[req.body.instance_index].verletzungen.abdomen.geschlossen = req.body.geschlossen_e;
            draft_proto.content[req.body.instance_index].verletzungen.abdomen.leicht = req.body.leicht_e;
            draft_proto.content[req.body.instance_index].verletzungen.abdomen.mittel = req.body.mittel_e;
            draft_proto.content[req.body.instance_index].verletzungen.abdomen.schwer = req.body.schwer_e;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.bws_lws.offen = req.body.offen_f;
            draft_proto.content[req.body.instance_index].verletzungen.bws_lws.geschlossen = req.body.geschlossen_f;
            draft_proto.content[req.body.instance_index].verletzungen.bws_lws.leicht = req.body.leicht_f;
            draft_proto.content[req.body.instance_index].verletzungen.bws_lws.mittel = req.body.mittel_f;
            draft_proto.content[req.body.instance_index].verletzungen.bws_lws.schwer = req.body.schwer_f;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.becken.offen = req.body.offen_g;
            draft_proto.content[req.body.instance_index].verletzungen.becken.geschlossen = req.body.geschlossen_g;
            draft_proto.content[req.body.instance_index].verletzungen.becken.leicht = req.body.leicht_g;
            draft_proto.content[req.body.instance_index].verletzungen.becken.mittel = req.body.mittel_g;
            draft_proto.content[req.body.instance_index].verletzungen.becken.schwer = req.body.schwer_g;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.obere_extremitaeten.offen = req.body.offen_h;
            draft_proto.content[req.body.instance_index].verletzungen.obere_extremitaeten.geschlossen = req.body.geschlossen_h;
            draft_proto.content[req.body.instance_index].verletzungen.obere_extremitaeten.leicht = req.body.leicht_h;
            draft_proto.content[req.body.instance_index].verletzungen.obere_extremitaeten.mittel = req.body.mittel_h;
            draft_proto.content[req.body.instance_index].verletzungen.obere_extremitaeten.schwer = req.body.schwer_h;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.untere_extremitaeten.offen = req.body.offen_i;
            draft_proto.content[req.body.instance_index].verletzungen.untere_extremitaeten.geschlossen = req.body.geschlossen_i;
            draft_proto.content[req.body.instance_index].verletzungen.untere_extremitaeten.leicht = req.body.leicht_i;
            draft_proto.content[req.body.instance_index].verletzungen.untere_extremitaeten.mittel = req.body.mittel_i;
            draft_proto.content[req.body.instance_index].verletzungen.untere_extremitaeten.schwer = req.body.schwer_i;
            ///////////////////////////////////////////////////////////////////////////
            draft_proto.content[req.body.instance_index].verletzungen.weichteile.offen = req.body.offen_j;
            draft_proto.content[req.body.instance_index].verletzungen.weichteile.geschlossen = req.body.geschlossen_j;
            draft_proto.content[req.body.instance_index].verletzungen.weichteile.leicht = req.body.leicht_j;
            draft_proto.content[req.body.instance_index].verletzungen.weichteile.mittel = req.body.mittel_j;
            draft_proto.content[req.body.instance_index].verletzungen.weichteile.schwer = req.body.schwer_j;
            ///////////////////////////////////////////////////////////////////////////


            draft_proto.markModified(`content.${req.body.instance_index}.verletzungen`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].verletzungen);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//monitoring ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_monitoring', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].monitoring.zeit_1 = req.body.zeit_1_a;
            draft_proto.content[req.body.instance_index].monitoring.puls_1 = req.body.puls_1_a;
            draft_proto.content[req.body.instance_index].monitoring.blutdruck_1 = req.body.blutdruck_1_a;
            draft_proto.content[req.body.instance_index].monitoring.spo2_1 = req.body.SpO2_1_a;

            draft_proto.content[req.body.instance_index].monitoring.zeit_2 = req.body.zeit_2_a;
            draft_proto.content[req.body.instance_index].monitoring.puls_2 = req.body.puls_2_a;
            draft_proto.content[req.body.instance_index].monitoring.blutdruck_2 = req.body.blutdruck_2_a;
            draft_proto.content[req.body.instance_index].monitoring.spo2_2 = req.body.SpO2_2_a;

            draft_proto.markModified(`content.${req.body.instance_index}.monitoring`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].monitoring);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

//massnahmen_einsatzart ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_massnahmen_einsatzart', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.atemwege_freimachen = req.body.ischeckedMassnahmen_atemwege_freimachen;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.larynxtubus = req.body.ischeckedMassnahmen_larynxtubus;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.o2_gabe = req.body.ischeckedMassnahmen_o2_gabe;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.brille_maske_beutel = req.body.ischeckedMassnahmen_brille_maske_beutel;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.sonstiges_siehe_text = req.body.ischeckedMassnahmen_sonstiges_siehe_text;

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.herzdruckmassage = req.body.ischeckedMassnahmen_herzdruckmassage;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.aed = req.body.ischeckedMassnahmen_aed;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.wundversorgung = req.body.ischeckedMassnahmen_wundversorgung;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.hws_fixierung = req.body.ischeckedMassnahmen_hws_fixierung;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.na_nachforderung = req.body.ischeckedMassnahmen_na_nachforderung;

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.seitenlage = req.body.ischeckedMassnahmen_seitenlage;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.oberkoerper_hoch_sitzend = req.body.ischeckedMassnahmen_oberkoerper_hoch_sitzend;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.flachlagerung = req.body.ischeckedMassnahmen_flachlagerung;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.schocklage = req.body.ischeckedMassnahmen_schocklage;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.ruhigstellung = req.body.ischeckedMassnahmen_ruhigstellung;

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.absicherung = req.body.ischeckedMassnahmen_absicherung;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.einweisung_rd = req.body.ischeckedMassnahmen_einweisung_rd;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.unterstuetzung_rd = req.body.ischeckedMassnahmen_unterstuetzung_rd;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.nnd_abwartend = req.body.ischeckedMassnahmen_nnd_abwartend;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.massnahmen.sonstiges = req.body.ischeckedMassnahmen_sonstiges;
            ///////////////////////////////////////////////////////////////////////////

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.bei_aed_anzahl_schocks = req.body.bei_aed_anzahl_schocks_a;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.bei_o2_gegebene_liter_min = req.body.bei_o2_gegebene_liter_min_a;
            ///////////////////////////////////////////////////////////

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.verkehrsunfall = req.body.ischeckedEinsatzart_verkehrsunfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.chirurgischer_notfall = req.body.ischeckedEinsatzart_chirurgischer_notfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.internistischer_notfall = req.body.ischeckedEinsatzart_internistischer_notfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.reanimation = req.body.ischeckedEinsatzart_reanimation;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.infektionseinsatz = req.body.ischeckedEinsatzart_infektionseinsatz;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.paediatrischer_notfall = req.body.ischeckedEinsatzart_paediatrischer_notfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.arbeitsunfall = req.body.ischeckedEinsatzart_arbeitsunfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.gynaekologischer_notfall = req.body.ischeckedEinsatzart_gynaekologischer_notfall;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.fehleinsatz_siehe_protokoll_fehleinsatz = req.body.ischeckedEinsatzart_fehleinsatz_siehe_protokoll_fehleinsatz;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.einsatzart.sonstiges = req.body.ischeckedEinsatzart_sonstiges;
            ////////////////////////////////////////////////////

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.feuerwehr = req.body.Weitere_beteiligte_Einsatzkraefte_feuerwehr;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.polizei = req.body.Weitere_beteiligte_Einsatzkraefte_polizei;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.sonstiges = req.body.Weitere_beteiligte_Einsatzkraefte_sonstiges;
            ////////////////////////////////////////////////////

            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.uebergabe_an = req.body.Uebergabe_an_a;
            draft_proto.content[req.body.instance_index].massnahmen_einsatzart.freitext = req.body.Freitext_a;



            draft_proto.markModified(`content.${req.body.instance_index}.massnahmen_einsatzart`);
            await draft_proto.save();
            //console.log(draft_proto.content[req.body.instance_index].patient);
            return res.status(200).json(draft_proto.content[req.body.instance_index].massnahmen_einsatzart);
        } else {
            return res.status(404).json("Protocol nicht gefunden");
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;