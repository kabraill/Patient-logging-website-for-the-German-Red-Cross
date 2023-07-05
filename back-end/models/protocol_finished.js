const mongoose = require("mongoose");

const FinishedProtocolSchema = new mongoose.Schema({

    content: [Object]
});
module.exports = mongoose.model("FinishedProtocol", FinishedProtocolSchema, "finished_protocol");

/*
{
    creation_date: Date,
    created_by: String,
    present_users_emergency: [String],
    delete_time: Date,
    einsatzdaten: {
        special_marking_name: String,
        special_marking_color: String,
        alarmschluessel: String,
        keine_auftragnummer: Boolean,
        auftragsnummer: Number,
        einsatzort: String,
        alarmzeit: Date,
        ankunft_hvo: Date,
        ankunft_rtw_nef: Date,
        einsatzende: Date
    },
    beteiligte_einsatzkraefte: {
        eingesetzte_fahrzeuge: {
            privat_pkw: Boolean,
            feuerwehr_mtw: Boolean,
            z_58_19_2: Boolean
        },
        einsatzkraefte_am_patienten: {
            x: Boolean,
            y: Boolean,
            z: Boolean
        },
        einsatzkraefte_vor_ort: {
            x: Boolean,
            y: Boolean,
            z: Boolean
        }
    },
    patient: {
        geschlecht: String,
        alter: Number
    },
    anamnese: {
        atemwege: String,
        belueftung: {
            unauffaellig: Boolean,
            zyanose: Boolean,
            rasseln: Boolean,
            schnappatmung: Boolean,
            atemnot: Boolean,
            hyperventillation: Boolean,
            atemstillstand: Boolean,
            sonstiges: String
        },
        puls: {
            regelmaessig: Boolean,
            unregelmaessig: Boolean,
            gut_tastbar: Boolean,
            schlecht_tastbar: Boolean,
            nicht_tastbar: Boolean
        },
        haut: {
            rosig: Boolean,
            blass: Boolean,
            blau: Boolean,
            rot: Boolean,
            warm: Boolean,
            kalt: Boolean
        }
    },
    messwerte: {
        puls: Number,
        blutdruck: String,
        spo2: Number,
        keine_messwerte: Boolean
    },
    neurologie: {
        bewusstsein: String,
        blutzucker: Number,
        pupille_links: {
            eng: Boolean,
            mitte: Boolean,
            weit: Boolean,
            keine_lichtreflexe: Boolean,
            entrundet: Boolean
        },
        pupille_rechts: {
            eng: Boolean,
            mitte: Boolean,
            weit: Boolean,
            keine_lichtreflexe: Boolean,
            entrundet: Boolean
        },
        schmerzen: String,
        schmerzskala_0_10: Number
    },
    verletzungen: {
        Schaedel_Hirn: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        gesicht: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        hws: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        thorax: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        abdomen: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        bws_lws: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        becken: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        obere_extremitaeten: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        untere_extremitaeten: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        },
        weichteile: {
            offen: Boolean,
            geschlossen: Boolean,
            leicht: Boolean,
            mittel: Boolean,
            schwer: Boolean
        }
    },
    monitoring: {
        zeit_1: Date,
        puls_1: Number,
        blutdruck_1: String,
        spo2_1: Number,
        zeit_2: Date,
        puls_2: Number,
        blutdruck_2: String,
        spo2_2: Number
    },
    massnahmen_einsatzart: {
        massnahmen: {
            atemwege_freimachen: Boolean,
            larynxtubus: Boolean,
            o2_gabe: Boolean,
            brille_maske_beutel: Boolean,
            sonstiges_siehe_text: Boolean,
            herzdruckmassage: Boolean,
            aed: Boolean,
            wundversorgung: Boolean,
            hws_fixierung: Boolean,
            na_nachforderung: Boolean,
            seitenlage: Boolean,
            oberkoerper_hoch_sitzend: Boolean,
            flachlagerung: Boolean,
            schocklage: Boolean,
            ruhigstellung: Boolean,
            absicherung: Boolean,
            einweisung_rd: Boolean,
            unterstuetzung_rd: Boolean,
            nnd_abwartend: Boolean,
            sonstiges: String
        },
        bei_aed_anzahl_schocks: Number,
        bei_o2_gegebene_liter_min: Number,
        einsatzart: {
            verkehrsunfall: Boolean,
            chirurgischer_notfall: Boolean,
            internistischer_notfall: Boolean,
            reanimation: Boolean,
            infektionseinsatz: Boolean,
            paediatrischer_notfall: Boolean,
            arbeitsunfall: Boolean,
            gynaekologischer_notfall: Boolean,
            fehleinsatz_siehe_protokoll_fehleinsatz: Boolean,
            sonstiges: String
        },
        weitere_beteiligte_einsatzkraefte: {
            feuerwehr: Boolean,
            polizei: Boolean,
            sonstiges: String
        },
        uebergabe_an: String,
        freitext: String
    }
}
*/