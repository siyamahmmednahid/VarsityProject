import { useEffect, useRef, useState } from "react";
import { updateTodo } from "../../../api/todo";
import { fetchUsers } from "../../../api/users";
import useFetch from "../../../hooks/useFetch";
import useGetContext from "../../../hooks/useGetContext";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";

const TodoEditForm = ({ taskData, onClose, taskSection }) => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    const { userState: { data: { id, is_superuser } = {} } = {} } = useGetContext();

    const [users, setUsers] = useState([])
    const { data } = useFetch(fetchUsers, {});

    const [access, setAccess] = useState(""); // Access: "all" or "limited"

    useEffect(() => {
        if (is_superuser || id === taskData.user) {
            setAccess("all");
        }
        else if (taskData.Assignee === id) {
            setAccess("limited");
        }
        else {
            setAccess("limited");
        }
    }, []);

    useEffect(() => {
        if (data?.data?.length) {
            setUsers(
                data.data.reduce((acc, item) => {
                    if(!item.is_superuser){
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else if(taskSection === "all"){
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else if(taskSection === "supervisor" && !id){
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else {
                        return acc;
                    }
                }, [])
            )
        }
    }, [data]);

    useEffect(() => {
        if (users.length && formRef.current["Assignee"]?.value) {
            formRef.current["Assignee"].value = taskData["Assignee"]
        }
    }, [users]);

    usePseudoElementClick(sectionRef, () => onClose("editForm"));

    useEffect(() => {
        if (taskData && access) {
            ;[...formRef.current].forEach((input) => {
                if (input.name !== "submit" && taskData[input.name]) {
                    if (input.type === "checkbox") {
                        input.checked = taskData[input.name];
                    }
                    else if(input.type === "select-one") {
                        input.defaultValue = taskData[input.name];
                        input.value = taskData[input.name];
                    }
                    else {
                        input.value = taskData[input.name];
                    }
                }
            });
        }
    }, [taskData, access])

    const closeForm = (e) => {
        e.preventDefault();
        onClose("editForm", true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = {};
        response = await updateTodo(formRef, taskData.id);
        response.status && onClose("editForm", true);
    }
    return (
        <>
            <section className="addFormArea" ref={sectionRef}>
                <div className="popUp contentArea">
                    <h3 className="title">
                        {
                            taskSection.supervisor ? "Edit task" : "Task Detail"
                        }
                    </h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="inputBox">
                            <label>Title</label>
                            <input
                                type="text"
                                name="Title"
                                placeholder="Title"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                        </div>
                        <div className="inputBox">
                            <label>Assignee</label>
                            <select
                                name="Assignee"
                                id="Assignee"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            >
                                <option value="">Select User</option>
                                {
                                    users.map(item => (
                                        <option key={item.value} value={item.value} selected={!!(taskData["Assignee"] === item.value)}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputBox">
                            <label>Due Date</label>
                            <input
                                type="date"
                                name="DueDate"
                                placeholder="Due Date"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                        </div>
                        <div className="inputBox">
                            <label>Priority</label>
                            <select
                                name="Priority"
                                id="Priority"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            >
                                <option value="Low" selected={!!(taskData["Priority"] === "Low")}>Low</option>
                                <option value="Medium" selected={!!(taskData["Priority"] === "Medium")}>Medium</option>
                                <option value="High" selected={!!(taskData["Priority"] === "High")}>High</option>
                                <option value="Urgent" selected={!!(taskData["Priority"] === "Urgent")}>Urgent</option>
                            </select>
                        </div>
                        <div className="inputBox" style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                name="Important"
                                id="Important"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                            <label htmlFor="Important">Bookmark</label>
                        </div>
                        <div className="inputBox" style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                name="Completed"
                                id="Completed"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                            <label htmlFor="Completed">Submitted</label>
                        </div>
                        <div className="inputBox">
                            <label>Description</label>
                            <textarea
                                name="Description"
                                placeholder="Description"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                        </div>
                        <div className="inputBox">
                            <label>Comment</label>
                            <textarea
                                name="Comment"
                                placeholder="Comment"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                        </div>
                        <div className="inputBox" style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                name="TaskCompleted"
                                id="TaskCompleted"
                                disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                            />
                            <label htmlFor="TaskCompleted">Task Completed</label>
                        </div>
                        {
                            (!taskData.TaskCompleted || taskData.Assignee != id) ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                                    <input type="submit" name="submit" value="Update" />
                                    {/* <button className="Button primaryButton warning" onClick={closeForm}>Cancel</button> */}
                                </div>
                            ) : ""
                        }
                    </form>
                </div>
            </section>
        </>
    )
}
export default TodoEditForm;