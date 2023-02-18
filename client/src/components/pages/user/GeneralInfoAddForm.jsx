import { useEffect, useRef, useState } from "react";
import { addGeneralInfo, addPersonalInfo, updateGeneralInfo, updatePersonalInfo } from "../../../api/user";
import useGetContext from "../../../hooks/useGetContext";
import placeholderImage from "../../../assets/images/placeholder.jpg";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";

const GeneralInfoAddForm = ({ data, onClose, setRefetchData }) => {
    const sectionRef = useRef(null);
    const generalInfoForm = useRef(null);
    const personalInfoInfoForm = useRef(null);

    const { userState } = useGetContext()

    const [profilePic, setProfilePic] = useState(placeholderImage);

    usePseudoElementClick(sectionRef, () => onClose("generalInfoAdd"));

    // useEffect(() => {
    //     ;[...generalInfoForm.current].forEach((input) => {
    //         input.value = data.general[input.name];
    //     });
    //     ;[...personalInfoInfoForm.current].forEach((input) => {
    //         if(input.type === "date"){
    //             // console.log(data.personal[input.name]);
    //         }
    //         input.value = data.personal[input.name];
    //     });
    // }, [data])

    // useEffect(() => {
    //     if (sectionRef.current) {
    //         let element = sectionRef.current
    //         element.addEventListener('click', checkClickEvent);
    //         return () => {
    //             element.removeEventListener('click', checkClickEvent);
    //         };
    //     }
    // }, [sectionRef.current]);

    const handleImageChange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setProfilePic(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let generalInfoResponse = await addGeneralInfo(userState.data?.id, generalInfoForm);
        let personalInfoResponse = await addPersonalInfo(personalInfoInfoForm);
        // response.status && onClose("generalInfo");
        if (generalInfoResponse.status && personalInfoResponse.status) {
            setRefetchData(prev => !prev);
            onClose("generalInfoAdd");
        }
    }

    const checkClickEvent = (e) => {
        if (e.target === sectionRef.current) {
            onClose("generalInfoAdd")
        }
    }
    const closeForm = (e) => {
        e.preventDefault();
        onClose("generalInfoAdd")
    }
    return (
        <>
            <section className="addFormArea" ref={sectionRef}>
                <div className="popUp contentArea">
                    <h3 className="title">Add User Info</h3>
                    <form ref={generalInfoForm}>
                        {/* <div className="inputBox">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" />
                        </div> */}
                        {/* <div className="inputBox">
                            <label>First name</label>
                            <input type="text" name="first_name" placeholder="First name" />
                        </div>
                        <div className="inputBox">
                            <label>Last name</label>
                            <input type="text" name="last_name" placeholder="Last name" />
                        </div>
                        <div className="inputBox">
                            <label>Email</label>
                            <input type="text" name="email" placeholder="example@example.com" />
                        </div> */}
                    </form>
                    <form ref={personalInfoInfoForm}>
                        <div className="inputBox">
                            <label>Profile picture</label>
                            <img src={profilePic} alt="user" width="50px" height="50px" />
                            <input type="file" name="ProfilePic" placeholder="Profile picture" onChange={handleImageChange} />
                        </div>
                        <div className="inputBox">
                            <label>EmployeeID</label>
                            <input type="text" name="EmployeeID" placeholder="Employee ID" />
                        </div>
                        <div className="inputBox">
                            <label>Phone</label>
                            <input type="text" name="Phone" placeholder="Phone" />
                        </div>
                        <div className="inputBox">
                            <label>Designation</label>
                            <input type="text" name="Designation" placeholder="Designation" />
                        </div>
                        <div className="inputBox">
                            <label>Department</label>
                            <input type="text" name="Department" placeholder="Department" />
                        </div>
                        <div className="inputBox">
                            <label>Gender</label>
                            <select name="Gender" id="Gender">
                                <option value="0">Select</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Blood Group</label>
                            <select name="BloodGroup" id="BloodGroup">
                                <option value="0">Select</option>
                                <option value="1">A+</option>
                                <option value="2">A-</option>
                                <option value="3">B+</option>
                                <option value="4">B-</option>
                                <option value="5">AB+</option>
                                <option value="6">AB-</option>
                                <option value="7">O+</option>
                                <option value="8">O-</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Date of Birth</label>
                            <input type="date" name="DateOfBirth" placeholder="Date of Birth" />
                        </div>
                        <div className="inputBox">
                            <label>Nationality</label>
                            <input type="text" name="Nationality" placeholder="Nationality" />
                        </div>
                        <div className="inputBox">
                            <label>NID Number</label>
                            <input type="text" name="NIDNumber" placeholder="NID Number" />
                        </div>
                        <div className="inputBox">
                            <label>Religion</label>
                            <select name="Religion" id="Religion">
                                <option value="0">Select</option>
                                <option value="1">Islam</option>
                                <option value="2">Hinduism</option>
                                <option value="3">Buddhism</option>
                                <option value="4">Christianity</option>
                                <option value="5">Others</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Marital Status</label>
                            <select name="MaritalStatus" id="MaritalStatus">
                                <option value="0">Select</option>
                                <option value="1">Single</option>
                                <option value="2">Married</option>
                                <option value="3">Divorced</option>
                                <option value="4">Widowed</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Present Address</label>
                            <textarea name="PresentAddress" placeholder="Present Address" />
                        </div>
                        <div className="inputBox">
                            <label>Permanent Address</label>
                            <textarea name="PermanentAddress" placeholder="Permanent Address" />
                        </div>
                    </form>
                    <form onSubmit={handleFormSubmit}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                            <input type="submit" name="submit" value="Update" />
                            {/* <button className="Button primaryButton warning" onClick={closeForm}>Cancel</button> */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default GeneralInfoAddForm;