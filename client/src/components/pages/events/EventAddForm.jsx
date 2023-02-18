import { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";
import { addEvent } from "../../../api/event";
import useFetch from "../../../hooks/useFetch";
import { fetchUsers } from "../../../api/users";



const EventAddForm = ({ onClose }) => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    const [users, setUsers] = useState([])

    const { data } = useFetch(fetchUsers, {});

    useEffect(() => {
        if(data?.data?.length){
            setUsers(
                data.data.reduce((acc, item) => {
                    return [...acc, { value: item.id, label: item.username }]
                }, [])
            )
        }
    }, [data]);

    usePseudoElementClick(sectionRef, () => onClose("addForm"));

    const closeForm = (e) => {
        e.preventDefault();
        onClose("addForm", true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = {};
        response = await addEvent(formRef);
        response.status && onClose("addForm", true);
    }
    return (
        <>
            <section className="addFormArea" ref={sectionRef}>
                <div className="popUp contentArea">
                    <h3 className="title">Add Event</h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="inputBox">
                            <label>Title</label>
                            <input type="text" name="Title" placeholder="Title" />
                        </div>
                        <div className="inputBox">
                            <label>Guest</label>
                            <Select
                                defaultValue={[users[0]]}
                                isMulti
                                name="Guests"
                                options={users}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="inputBox">
                            <label>Label</label>
                            <select name="Label" id="Label">
                                <option value="None">Select</option>
                                <option value="Personal">Personal</option>
                                <option value="Work">Work</option>
                                <option value="Family">Family</option>
                                <option value="Holiday">Holiday</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Start Date Time</label>
                            <input type="datetime-local" name="StartDateTime" placeholder="Start Date Time" />
                        </div>
                        <div className="inputBox">
                            <label>End Date Time</label>
                            <input type="datetime-local" name="EndDateTime" placeholder="End Date Time" />
                        </div>
                        <div className="inputBox">
                            <label>Whole Day</label>
                            <select name="WholeDay" id="WholeDay">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Event URL</label>
                            <input type="text" name="EventURL" placeholder="Event URL" />
                        </div>
                        <div className="inputBox">
                            <label>Location</label>
                            <input type="text" name="Location" placeholder="Location" />
                        </div>
                        <div className="inputBox">
                            <label>Description</label>
                            <textarea name="Description" placeholder="Description" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                            <input type="submit" name="submit" value="Save" />
                            {/* <button className="Button primaryButton warning" onClick={closeForm}>Cancel</button> */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default EventAddForm;