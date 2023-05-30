import "./vorschau.css"

import React, { useState } from 'react';
import {
    PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet,
    Image
} from '@react-pdf/renderer';
import Topbar from '../topbar/topbar';
import Sidebar from '../sidebar/sidebar';

export default function Vorschau() {


    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10
        },
        image: {
            maxHeight: 30,
            width: 100,
            objectFit: "contain",
            marginTop: 10
        },
        pdf_head: {
            fontSize: 20,
            marginTop: 10,
            fontFamily: 'Helvetica-Bold',
        },
        label_text_container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap"
        },
        label_name: {
            fontSize: 14,
            fontFamily: 'Helvetica-Bold',
        },
        text_element: {
            fontSize: 13,
            fontFamily: "Helvetica"
        },
        page_name: {
            fontSize: 16,
            fontFamily: 'Helvetica-Bold',
            color: "red",
            marginTop: 10
        },
        horizontal_line: {
            width: "100%",
            borderTop: "1px solid gray"

        },
        check_box: {
            backgroundColor: "rgb(200,200,200)",
            fontSize: 13,
            fontFamily: 'Helvetica-Bold',
        },
        /********************************************/
        container1: {
            display: 'flex',
            alignItems: "center",
            justifyContent: 'space-around',
            flexDirection: 'row',
            border: "1px solid gray",
            width: "95%",
            flexWrap: "wrap",
            gap: 10,
            padding: 2
        },
        /********************************************/
        container2: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            border: "1px solid gray",
            width: "95%",
            gap: 5
        },
        under_container2: {
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: "100%",
            flexWrap: "wrap",
            gap: 10,
            padding: 2
        }


    });

    return (
        <div className="vorschau">
            <Sidebar currentPage="vorschau" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="vorschau_body">
                <span className="vorschau_body_title">
                    Vorschau
                </span>

                <PDFViewer className="vorschau_pdf_viewer" width="826" height="600" >
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <Image
                                style={styles.image}
                                src="assets/red_cross.png"
                            />
                            <Text style={styles.pdf_head}>DRK HvO Protokollierer</Text>

                            <Text style={styles.page_name}>Einsatzdaten</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alarmschlüssel:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Auftragsnummer:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Einsatzort:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alarmzeit:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Ankunft HvO:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Ankunft RTW / NEF:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Einsatzende:
                                        <Text style={styles.text_element}> Alarms</Text>
                                    </Text>

                                </View>

                            </View>

                            <Text style={styles.page_name}>Beteiligte Einsatzkräfte</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Eingesetzte Fahrzeuge:</Text>
                                    <Text style={styles.text_element}>Privat PKW:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Feuerwehr MTW:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>58/19-2:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzkräfte am Patienten:</Text>
                                    <Text style={styles.text_element}>Nils Rubehn:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gabriel Schneider:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arnold Schwarzenegger:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzkräfte vor Ort:</Text>
                                    <Text style={styles.text_element}>Nils Rubehn:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gabriel Schneider:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arnold Schwarzenegger:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.page_name}>Patient</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Geschlecht:
                                        <Text style={styles.text_element}> männlich</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alter:
                                        <Text style={styles.text_element}> 24</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Anamnese</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Atemwege:
                                            <Text style={styles.text_element}> Frei</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Belüftung:</Text>
                                    <Text style={styles.text_element}>Unauffällig:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Zyanose:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Rasseln:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schnappatmung:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Atemnot:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Hyperventillation:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Atemstillstand:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> 24</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Puls:</Text>
                                    <Text style={styles.text_element}>Regelmäßig:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Unregelmäßig:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gut tastbar:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schlecht tastbar:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Nicht tastbar:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Haut:</Text>
                                    <Text style={styles.text_element}>Rosig:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Blass:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Blau:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Rot:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Warm:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Kalt:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.page_name}>Messwerte</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Puls:
                                        <Text style={styles.text_element}> 72</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Blutdruck:
                                        <Text style={styles.text_element}> 120/80</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>SpO2:
                                        <Text style={styles.text_element}> 98</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Neurologie</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bewusstsein:
                                            <Text style={styles.text_element}> Orientiert</Text>
                                        </Text>

                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Blutzucker:
                                            <Text style={styles.text_element}> 80</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Pupille Links:</Text>
                                    <Text style={styles.text_element}>Eng:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Weit:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>keine Lichtreflexe:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Entrundet:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Pupille Rechts:</Text>
                                    <Text style={styles.text_element}>Eng:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Weit:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>keine Lichtreflexe:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Entrundet:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Schmerzen:
                                            <Text style={styles.text_element}> Leicht</Text>
                                        </Text>

                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Schmerzskala 0-10:
                                            <Text style={styles.text_element}> 7</Text>
                                        </Text>

                                    </View>
                                </View>
                            </View>

                        </Page>

                        <Page size="A4" style={styles.page}>
                            <Text style={styles.page_name}>Verletzungen</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Schädel-Hirn:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Gesicht:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>HWS:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Thorax:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Abdomen:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>BWS/LWS:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Becken:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Obere-Extremitäten:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Untere-Extremitäten:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Weichteile:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                </View>

                            </View>

                            <Text style={styles.page_name}>Monitoring</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Zeit:
                                        <Text style={styles.text_element}> 12:30</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Puls:
                                        <Text style={styles.text_element}> 72</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Blutdruck:
                                        <Text style={styles.text_element}> 120/80</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.SpO2:
                                        <Text style={styles.text_element}> 98</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Zeit:
                                        <Text style={styles.text_element}> 12:30</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Puls:
                                        <Text style={styles.text_element}> 72</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Blutdruck:
                                        <Text style={styles.text_element}> 120/80</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.SpO2:
                                        <Text style={styles.text_element}> 98</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Maßnahmen & Einsatzart</Text>

                            <View style={styles.container2}>

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Maßnahmen:</Text>
                                    <Text style={styles.text_element}>Atemwege freimachen:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Larynxtubus:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>O2 Gabe:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Brille/Maske/Beutel:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>sonstiges ...siehe Text:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Herzdruckmassage:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>AED:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Wundversorgung:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>HWS Fixierung:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>NA Nachforderung:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Seitenlage:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Oberkörper hoch/sitzend:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Flachlagerung:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schocklage:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Ruhigstellung:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Absicherung:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Einweisung RD:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Unterstützung RD:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>NND abwartend:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>

                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> 24</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bei AED: Anzahl Schocks:
                                            <Text style={styles.text_element}> 3</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bei O2: Gegebene Liter/min:
                                            <Text style={styles.text_element}> 3</Text>
                                        </Text>
                                    </View>

                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzart:</Text>
                                    <Text style={styles.text_element}>Verkehrsunfall:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Chirurgischer Notfall:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Internistischer Notfall:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Reanimation:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Infektionseinsatz:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Paediatrischer Notfall:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arbeitsunfall:
                                        <Text style={styles.check_box}>X</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gynäkologischer Notfall:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Fehleinsatz ..siehe Protokoll Fehleinsatz..:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>


                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> 24</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Weitere beteiligte Einsatzkräfte:</Text>
                                    <Text style={styles.text_element}>Feuerwehr:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>
                                    <Text style={styles.text_element}>Polizei:
                                        <Text style={styles.check_box}> </Text>
                                    </Text>

                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> 24</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Übergabe an:
                                            <Text style={styles.text_element}> lblblb</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Freitext:
                                            <Text style={styles.text_element}> asdsaf</Text>
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </div>
    );
}
