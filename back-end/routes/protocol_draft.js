const router = require("express").Router();
const DraftProtocol = require("../models/protocol_draft");
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

        if (draft_proto && draft_proto.content) {
            const elementAtIndex = draft_proto.content[req.body.instance_index];
            return res.status(200).json(elementAtIndex);
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


// seite1  ////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/save_datas_einsatzdaten', async (req, res) => {
    try {
        const draft_proto = await DraftProtocol.findById(req.body.id);

        if (draft_proto && draft_proto.content) {
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

        if (draft_proto && draft_proto.content) {
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.privat_pkw = req.body.privat_pkw;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.feuerwehr_mtw = req.body.feuerwehr_mtw;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.z_58_19_2 = req.body.z_58_19_2;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.x = req.body.einsatzkraefte_am_patienten_x;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.y = req.body.einsatzkraefte_am_patienten_y;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.z = req.body.einsatzkraefte_am_patienten_z;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.x = req.body.einsatzkraefte_vor_ort_x;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.y = req.body.einsatzkraefte_vor_ort_y;
            draft_proto.content[req.body.instance_index].beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.z = req.body.einsatzkraefte_vor_ort_z;
            
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

module.exports = router;