import protocol from "./ProtocolDefinition";
import React, { Fragment } from "react";
import { useRef } from "react";

function Dynamic_generator({ page_name }) {


    function dynamic_generate() {

        return (<>
            {protocol.Schema[page_name].Elements.map((item, index) => (
                <Fragment key={index}>
                    {item.Type === "Multiselect-no" ? (
                        <>
                            <div className="page_body_components_line2">
                                <input type="checkbox" id={item.ID} />
                                <label id={item.ID + "_label"} htmlFor={item.ID}>{item.Name}</label>
                            </div>
                        </>
                    ) : (

                        <>
                            <div className="page_body_components_line">
                                <span id={item.ID + "_label"} className="page_body_components_line_label">
                                    {item.Name} : {item.hasOwnProperty("Mandatory") ? (item.Mandatory ? "*" : "") : ""}
                                </span>

                                {(item.Type === "Multiselect" || item.Type === "Multiselect-dynamic" || item.Type === "Singleselect") ? (
                                    <>
                                        <div className="page_body_components_line_right2">
                                            {item.Type === "Multiselect" && (
                                                <>
                                                    {
                                                        item.Options.map((opt, index_opt) => (
                                                            <div key={index_opt} className="page_body_components_line_right2_dropdown">
                                                                <input
                                                                    type="checkbox" className="page_body_components_line_right2_dropdown_checkbox"
                                                                    id={item.ID + "_" + index_opt}
                                                                />
                                                                <label htmlFor={item.ID + "_" + index_opt} id={item.ID + "_label_" + index_opt.toString()}>{opt}</label>
                                                            </div>
                                                        ))
                                                    }

                                                    {item.hasOwnProperty("OwnText") == true && (
                                                        <input id={item.ID + "_sonstiges"} placeholder="Sonstiges" className="page_body_components_line_right_sontiges" />
                                                    )}


                                                </>
                                            )}

                                            {item.Type === "Singleselect" && (
                                                <>
                                                    {
                                                        item.Options.map((opt, index_opt) => (
                                                            <div key={index_opt} className="page_body_components_line_right2_dropdown">
                                                                <input
                                                                    className="page_body_components_line_right2_dropdown_checkbox"
                                                                    id={item.ID + "_" + index_opt}
                                                                    type="radio"
                                                                    name={item.Name}
                                                                    value={opt}
                                                                />
                                                                <label htmlFor={item.ID + "_" + index_opt}>{opt}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )}
                                        </div>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <div className="page_body_components_line_right">

                                                {item.Type === "Text" && (
                                                    <>
                                                        <input
                                                            id={item.ID}
                                                            type="text"
                                                            className="page_body_components_line_right_container"
                                                            placeholder={item.hasOwnProperty("placeholder") ? item.placeholder : ""}
                                                        />

                                                        {item.hasOwnProperty("checkbox") == true && (
                                                            <>
                                                                <input id={item.ID + "_checkbox"} type="checkbox" className="page_body_components_line_right_nonr" />
                                                                <label htmlFor={item.ID + "_checkbox"} id={item.ID + "_checkbox_label"} className="page_body_components_line_right_nonrtxt">
                                                                    {item.checkbox}
                                                                </label>
                                                            </>
                                                        )}

                                                    </>
                                                )}

                                                {item.Type === "Text-Multiline" && (
                                                    <>
                                                        <textarea
                                                            id={item.ID}
                                                            type="text"
                                                            className="page_body_components_line_right_container"
                                                            placeholder={item.hasOwnProperty("placeholder") ? item.placeholder : ""}
                                                        />

                                                        {item.hasOwnProperty("checkbox") == true && (
                                                            <>
                                                                <input id={item.ID + "_checkbox"} type="checkbox" className="page_body_components_line_right_nonr" />
                                                                <label htmlFor={item.ID + "_checkbox"} id={item.ID + "_checkbox_label"} className="page_body_components_line_right_nonrtxt">
                                                                    {item.checkbox}
                                                                </label>
                                                            </>
                                                        )}

                                                    </>
                                                )}

                                                {item.Type === "Time" && (
                                                    <>
                                                        <input
                                                            id={item.ID}
                                                            type="time"
                                                            className="page_body_components_line_right_container"
                                                        />

                                                        {item.hasOwnProperty("checkbox") == true && (
                                                            <>
                                                                <input id={item.ID + "_checkbox"} type="checkbox" className="page_body_components_line_right_nonr" />
                                                                <label htmlFor={item.ID + "_checkbox"} id={item.ID + "_checkbox_label"} className="page_body_components_line_right_nonrtxt">
                                                                    {item.checkbox}
                                                                </label>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                                {item.Type === "Date" && (
                                                    <>
                                                        <input
                                                            id={item.ID}
                                                            type="date"
                                                            className="page_body_components_line_right_container"
                                                        />

                                                        {item.hasOwnProperty("checkbox") == true && (
                                                            <>
                                                                <input id={item.ID + "_checkbox"} type="checkbox" className="page_body_components_line_right_nonr" />
                                                                <label htmlFor={item.ID + "_checkbox"} id={item.ID + "_checkbox_label"} className="page_body_components_line_right_nonrtxt">
                                                                    {item.checkbox}
                                                                </label>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                                {item.Type === "Dropdown" && (
                                                    <>
                                                        <select id={item.ID} className="page_body_components_line_right_dropdown">
                                                            {
                                                                item.Options.map((opt, index_opt) => (
                                                                    <option key={index_opt} className="page_body_components_line_right_choice" value={opt}>{opt}</option>
                                                                ))
                                                            }
                                                        </select>

                                                        {item.hasOwnProperty("checkbox") == true && (
                                                            <>
                                                                <input id={item.ID + "_checkbox"} type="checkbox" className="page_body_components_line_right_nonr" />
                                                                <label htmlFor={item.ID + "_checkbox"} id={item.ID + "_checkbox_label"} className="page_body_components_line_right_nonrtxt">
                                                                    {item.checkbox}
                                                                </label>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                            </div>
                                        </>
                                    )
                                }


                            </div>
                            <div className="horizontal-line"></div>
                        </>
                    )}
                </Fragment>

            ))}
        </>)
    }

    return (<>
        {dynamic_generate()}
    </>)
}

export default Dynamic_generator;