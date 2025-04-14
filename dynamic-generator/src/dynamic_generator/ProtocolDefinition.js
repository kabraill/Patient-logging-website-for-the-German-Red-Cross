var protocol = {
    "Name": "Einsatzprotokoll %Organization%",
    "Description": "Lorem ipsum....",
    "Schema": {
        "Seite_1": {
            
            "Elements": [
                {
                    "Name": "Alarmschlüssel",
                    "ID": "ALARMKEY",
                    "Type": "Text",
                    "Regex": "^[123][0-9]{3}[NBnb]?$",
                    "Mandatory": true,
                    "placeholder" : "Z.B 1234N"
                },
                 {
                    "Name": "Auftragsnummer",
                    "ID": "AUFTRAGSNUMMER",
                    "UNIQUEID": true,
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "Mandatory": true,
                    "placeholder" : "Z.B 23",
                    "checkbox": "Keine Auftragsnummer"
                },{
                    "Name": "Einsatzort (Straße)",
                    "ID": "EMSTREET",
                    "Mandatory": true,
                    "Type": "Text",
                    "placeholder" : "Z.B Ulrich Straße 40",
                },
                {
                    "Name": "Alarmzeit",
                    "ID": "ALARMTIME",
                    "Type": "Time",
                    "Mandatory": true
                },
                {
                    "Name": "Alarmdatum",
                    "ID": "ALARMDATE",
                    "Type": "Date",
                    "Mandatory": true
                }, 
                {
                    "Name": "Ankunft HvO",
                    "ID": "ARRIVALFR",
                    "Type": "Time",
                    "Mandatory": true
                }, {
                    "Name": "Ankunft RTW / NEF",
                    "ID": "ARRIVALAMBULANCE",
                    "Type": "Time",
                    "Mandatory": false
                }, {
                    "Name": "Einsatzende",
                    "ID": "ENDTIME",
                    "Type": "Time",
                    "Mandatory": true
                },
                {
                    "Name": "Maßnahmen",
                    "ID": "ACTIONS",
                    "Type": "Multiselect",
                    "Options": [
                        "Atemwege freimachen",
                        "Larynxtubus",
                        "O2 Gabe",
                        "Brille/Maske/Beutel",
                        "sonstiges (siehe Text)",
                        "Herzdruckmassage",
                        "AED",
                        "Wundversorgung",
                        "HWS Fixierung",
                        "NA Nachforderung",
                        "Seitenlage",
                        "Oberkörper hoch/sitzend",
                        "Flachlagerung",
                        "Schocklage",
                        "Ruhigstellung",
                        "Absicherung",
                        "Einweisung RD",
                        "Unterstützung RD",
                        "NND abwartend"
                    ]
                }
            ]
        },
        "Seite_2": {
            "Elements": [
                {
                    "Name": "Eingesetzte Fahrzeuge",
                    "ID": "USEDVEHICLES",
                    "Type": "Multiselect",
                    "Mandatory": true,
                    "Options": [
                        "Privat PKW",
                        "Feuerwehr MTW",
                        "58/19-2"
                    ]
                },
                {
                    "Name": "Einsatzkräfte am Patienten",
                    "ID": "UNITSATPATIENT",
                    "Type": "Multiselect-dynamic",
                    "Mandatory": true,
                    "FillInCharacter": "P"
                },
                {
                    "Name": "Einsatzkräfte vor Ort",
                    "ID": "UNITSATLOCATION",
                    "Type": "Multiselect-dynamic",
                    "Mandatory": false,
                    "FillInCharacter": "O"
                }
            ]
        },
        "Patient": {
            "Elements": [
                {
                    "Name": "Geschlecht",
                    "ID": "SEX",
                    "Type": "Dropdown",
                    "Options": [
                        "unbekannt",
                        "männlich",
                        "weiblich",
                        "sonstiges"
                    ]
                }, {
                    "Name": "Alter (ca.)",
                    "ID": "AGE",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "placeholder": "Z.B 60"
                }
            ]
        }, 
        "Anamnese": {
            "Elements": [
                {
                    "Name": "Atemwege",
                    "ID": "AIRWAYS",
                    "Type": "Singleselect",
                    "Mandatory": true,
                    "Options": [
                        "frei",
                        "verlegt"
                    ]
                },
                {
                    "Name": "Belüftung",
                    "ID": "BREATHING",
                    "Type": "Multiselect",
                    "Mandatory": true,
                    "Options": [
                        "unauffällig",
                        "Zyanose",
                        "Rasseln",
                        "Schnappatmung",
                        "Atemnot",
                        "Hyperventillation",
                        "Atemstillstand"
                    ],
                    "OwnText": true
                },
                {
                    "Name": "Puls",
                    "ID": "HEARTBEAT",
                    "Type": "Multiselect",
                    "Mandatory": true,
                    "Options": [
                        "regelmäßig",
                        "unregelmäßig",
                        "gut tastbar",
                        "schlecht tastbar",
                        "nicht tastbar"
                    ]
                },
                {
                    "Name": "Haut",
                    "ID": "SKIN",
                    "Type": "Multiselect",
                    "Mandatory": true,
                    "Options": [
                        "rosig",
                        "blass",
                        "blau",
                        "rot",
                        "warm",
                        "kalt"
                    ]
                }
            ]
        },
        "Messwerte":{
            "Elements": [
                {
                    "Name": "Puls",
                    "Type": "Text",
                    "ID": "PULS",
                    "placeholder": "Z.B 72"
                }, {
                    "Name": "Blutdruck",
                    "Type": "Text",
                    "Regex": "^[0-9]{2,3}\\/[0-9]{2,3}$",
                    "ID": "RR",
                    "placeholder": "Z.B 120/80"
                }, {
                    "Name": "SpO2",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "ID": "SPO2",
                    "placeholder": "Z.B 98"
                }, {
                    "Name": "Keine Messwerte",
                    "Type": "Multiselect-no",
                    "ID": "NOVALUES",
                    "Options": [
                        "keine Messwerte"
                    ]
                }
            ]
        }, 
        "Neurologie": {
            "Elements": [
                {
                    "Name": "Bewusstsein",
                    "ID": "BEWUSSTSEIN",
                    "Type": "Dropdown",
                    "Mandatory": true,
                    "Options": [
                        "orientiert",
                        "desorientiert",
                        "getrübt",
                        "bewusstlos"
                    ]
                }, {
                    "Name": "Blutzucker",
                    "ID": "SUGAR",
                    "Type": "Text",
                    "Mandatory": false,
                    "Regex": "^([0-9]+|low|high)$",
                    "placeholder": "Z.B 80"
                }, {
                    "Name": "Pupille links",
                    "ID": "EYE_LEFT",
                    "Type": "Multiselect",
                    "Options": [
                        "eng",
                        "mittel",
                        "weit",
                        "keine Lichtreflexe",
                        "entrundet"
                    ]
                }, {
                    "Name": "Pupille rechts",
                    "ID": "EYE_RIGHT",
                    "Type": "Multiselect",
                    "Options": [
                        "eng",
                        "mittel",
                        "weit",
                        "keine Lichtreflexe",
                        "entrundet"
                    ]
                },
                {
                    "Name": "Schmerzen",
                    "ID": "PAIN",
                    "Type": "Dropdown",
                    "Options": [
                        "keine",
                        "leicht",
                        "mittel",
                        "stark",
                        "kolikartig"
                    ]
                }, {
                    "Name": "Schmerzskala (0-10)",
                    "ID": "PAINSCALE",
                    "Regex": "^([0-9]|10)$",
                    "Mandatory": false,
                    "Type": "Text",
                    "placeholder": "0 - 10"
                }
            ]
        }, 
        "Verletzungen": {
            "Elements": [
                {
                    "Name": "Schädel-Hirn",
                    "ID": "HEAD-BRAIN",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Gesicht",
                    "ID": "FACE",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "HWS",
                    "ID": "HWS",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Thorax",
                    "ID": "THORAX",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Abdomen",
                    "ID": "STOMACH",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "BWS/LWS",
                    "ID": "BWSLWS",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Becken",
                    "ID": "BASIN",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Obere Extremitäten",
                    "ID": "OEXTR",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Untere Extremitäten",
                    "ID": "UEXTR",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }, {
                    "Name": "Weichteile",
                    "ID": "SOFTPARTS",
                    "Type": "Multiselect",
                    "Options": [
                        "offen",
                        "geschlossen",
                        "leicht",
                        "mittel",
                        "schwer"
                    ]
                }
            ]
        }, 
        "Monitoring": {
            "Elements": [
                {
                    "Name": "1. Zeit",
                    "Type": "Time",
                    "ID": "MONITORINGTIME1"
                }, {
                    "Name": "1. Puls",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "ID": "MONITORINGPULS1",
                    "placeholder": "Z.B 72"
                }, {
                    "Name": "1. Blutdruck",
                    "Type": "Text",
                    "Regex": "^[0-9]{1,3}\\/[0-9]{1,3}$",
                    "ID": "MONITORINGRR1",
                    "placeholder": "Z.B 120/80"
                }, {
                    "Name": "1. SpO2",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "ID": "MONITORINGSPO21",
                    "placeholder": "Z.B 98"
                }, {
                    "Name": "2. Zeit",
                    "Type": "Time",
                    "ID": "MONITORINGTIME2"
                }, {
                    "Name": "2. Puls",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "ID": "MONITORINGPULS2",
                    "placeholder": "Z.B 72"
                }, {
                    "Name": "2. Blutdruck",
                    "Type": "Text",
                    "Regex": "^[0-9]{1,3}\\/[0-9]{1,3}$",
                    "ID": "MONITORINGRR2",
                    "placeholder": "Z.B 120/80"
                }, {
                    "Name": "2. SpO2",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "ID": "MONITORINGSPO22",
                    "placeholder": "Z.B 98"
                }
            ]
        }, 
        "Massnahmen_Einsatzart": {
            "Elements": [
                {
                    "Name": "Maßnahmen",
                    "ID": "ACTIONS",
                    "Type": "Multiselect",
                    "Options": [
                        "Atemwege freimachen",
                        "Larynxtubus",
                        "O2 Gabe",
                        "Brille/Maske/Beutel",
                        "sonstiges (siehe Text)",
                        "Herzdruckmassage",
                        "AED",
                        "Wundversorgung",
                        "HWS Fixierung",
                        "NA Nachforderung",
                        "Seitenlage",
                        "Oberkörper hoch/sitzend",
                        "Flachlagerung",
                        "Schocklage",
                        "Ruhigstellung",
                        "Absicherung",
                        "Einweisung RD",
                        "Unterstützung RD",
                        "NND abwartend"
                    ]
                }, {
                    "Name": "Bei AED: Anzahl Schocks",
                    "ID": "AED_SHOCKS",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "placeholder": "Z.B 2"
                }, {
                    "Name": "Bei O2: Gegebene Liter/min",
                    "ID": "O2FLOW",
                    "Type": "Text",
                    "Regex": "^([0-9]+)$",
                    "placeholder": "Z.B 4"
                }, {
                    "Name": "Einsatzart",
                    "ID": "EMSTYPE",
                    "Type": "Multiselect",
                    "OwnText": true,
                    "Options": [
                        "Verkehrsunfall",
                        "Chirurgischer Notfall",
                        "Internistischer Notfall",
                        "Reanimation",
                        "Infektionseinsatz",
                        "Pädiatrischer Notfall",
                        "Arbeitsunfall",
                        "Gynäkologischer Notfall",
                        "Fehleinsatz (siehe Protokoll \"Fehleinsatz\")"
                    ],
                    "Marking": [
                        {
                            "Option": "Reanimation",
                            "Name": "REANIMATION",
                            "Color": "#FF0000"
                        }, {
                            "Option": "Infektionseinsatz",
                            "Name": "Infekt-Einsatz",
                            "Color": "#FFFF00"
                        }
                    ],
                    "Action": [
                        {
                            "Option": "Infektionseinsatz",
                            "Subject": "Infektionseinsatz",
                            "Body": "Lorem ipsum ....."
                        }
                    ]
                }, {
                    "Name": "Weitere beteiligte Einsatzkräfte",
                    "ID": "POLFW",
                    "Type": "Multiselect",
                    "OwnText": true,
                    "Options": [
                        "Feuerwehr",
                        "Polizei"
                    ]
                }, {
                    "Name": "Übergabe an",
                    "Type": "Text",
                    "Mandatory": true,
                    "ID": "RTWKV"
                }, {
                    "Name": "Freitext",
                    "Type": "Text-Multiline",
                    "Mandatory": true,
                    "ID": "FREETEXT"
                }
            ]
        }
}
    
}


export default protocol;