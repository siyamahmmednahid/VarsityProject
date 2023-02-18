import { useEffect, useRef, useState } from "react";
import { addOtherInfo, updateOtherInfo } from "../../../api/user";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";

const form = {
    academic: [
        { name: "Degree", label: "Degree", placeholder: "Degree" },
        { name: "Major", label: "Major", placeholder: "Major" },
        { name: "Institute", label: "Institute", placeholder: "Institute" },
        { name: "PassingYear", label: "Passing Year", placeholder: "Passing Year", type: "number" },
        { name: "CGPA", label: "CGPA", placeholder: "CGPA", type: "number" },
    ],
    training: [
        { name: "Title", label: "Title", placeholder: "Title" },
        { name: "Institute", label: "Institute", placeholder: "Institute" },
        { name: "Duration", label: "Duration", placeholder: "Duration" },
        { name: "Year", label: "Year", placeholder: "Year", type: "number" },
    ],
    teaching: [
        { name: "CourseCode", label: "Course Code", placeholder: "Course Code" },
        { name: "CourseTitle", label: "Course Title", placeholder: "Course Title" },
    ],
    publication: [
        { name: "Title", label: "Title", placeholder: "Title" },
        { name: "Journal", label: "Journal", placeholder: "Journal" },
        { name: "Year", label: "Year", placeholder: "Year", type: "number" },
        { name: "Volume", label: "Volume", placeholder: "Volume" },
        { name: "Page", label: "Page", placeholder: "Page", type: "number" },
    ],
    awardAndScholarship: [
        { name: "Title", label: "Title", placeholder: "Title" },
        { name: "Organization", label: "Organization", placeholder: "Organization" },
        { name: "Year", label: "Year", placeholder: "Year", type: "number" },
    ],
    experience: [
        { name: "Designation", label: "Designation", placeholder: "Designation" },
        { name: "Organization", label: "Organization", placeholder: "Organization" },
        { name: "Duration", label: "Duration", placeholder: "Duration" },
    ]
};

const formType = {
    academic: "academicinfo",
    training: "traininginfo",
    teaching: "teachinginfo",
    publication: "publicationinfo",
    awardAndScholarship: "awardscholarshipinfo",
    experience: "experienceinfo"
}

const OtherInformationForm = ({ data, type, onClose, action, setRefetchData }) => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    usePseudoElementClick(sectionRef, () => closeForm());

    useEffect(() => {
        if (action === "add") {
            formRef.current.reset();
        }
        else if (action === "edit") {
            ;[...formRef.current].forEach((input) => {
                if (input.name !== "submit" && data[input.name]) {
                    input.value = data[input.name];
                }
            });
        }
    }, [data])

    const checkClickEvent = (e) => {
        if (e.target === sectionRef.current) {
            onClose("generalInfo")
        }
    }

    // useEffect(() => {
    //     if (sectionRef.current) {
    //         let element = sectionRef.current
    //         element.addEventListener('click', checkClickEvent);
    //         return () => {
    //             element.removeEventListener('click', checkClickEvent);
    //         };
    //     }
    // }, [sectionRef.current]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let response = {};
        if (action === "add") {
            response = await addOtherInfo(formType[type], formRef);
        }
        else if (action === "edit") {
            response = await updateOtherInfo(formType[type], data.id, formRef);
        }
        else if (action === "delete") {

        }
        if (response.status) {
            if (action === "add") {
                onClose("addOtherInfo")
                setRefetchData(prev => !prev);
            }
            else if (action === "edit") {
                onClose("otherInfo")
                setRefetchData(prev => !prev);
            }
        }
    }

    const closeForm = (e) => {
        // e.preventDefault();
        if (action === "add") {
            onClose("addOtherInfo")
        }
        else if (action === "edit") {
            onClose("otherInfo")
        }
    }

    return (
        <>
            <section className="addFormArea" ref={sectionRef}>
                <div className="popUp contentArea">
                    <h3 className="title">{`${action === "add" ? "Add" : "Update"} ${type === "awardAndScholarship" ? "Award & Scholarship" : type} info`}</h3>
                    <form ref={formRef} onSubmit={handleFormSubmit}>
                        {
                            type && form[type].map((item, index) => (
                                <>
                                    <InputBox
                                        key={index}
                                        data={item}
                                    />
                                </>
                            ))
                        }
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                            {
                                action === "edit" ?
                                    <button className="Button primaryButton" onClick={handleFormSubmit}>Update</button> :
                                    action === "add" ?
                                        <button className="Button primaryButton" onClick={handleFormSubmit}>Add</button> :
                                        ""
                            }
                            {/* <button className="Button primaryButton warning" onClick={closeForm}>Cancel</button> */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default OtherInformationForm;

const InputBox = ({ data }) => {
    return (
        <div className="inputBox">
            <label>{data.label}</label>
            <input type={data.type || "text"} name={data.name} placeholder={data.placeholder} />
        </div>
    )
}