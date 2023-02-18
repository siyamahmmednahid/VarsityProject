import { useEffect, useRef, useState } from "react";
import { updateTodo, updateTodoWithObj } from "../../../api/todo";
import { fetchUsers } from "../../../api/users";
import useFetch from "../../../hooks/useFetch";
import useGetContext from "../../../hooks/useGetContext";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";
import { formattedDate } from "../../../utils/dateTime";

const ActionForm = ({ taskData, onClose, taskSection }) => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    const { userState: { data: { id, is_superuser } = {} } = {} } = useGetContext();

    const [users, setUsers] = useState([])
    const { data } = useFetch(fetchUsers, {});

    const [access, setAccess] = useState(""); // Access: "all" or "limited"
    const [comment, setComment] = useState("");

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
                    if (!item.is_superuser) {
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else if (taskSection === "all") {
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else if (taskSection === "supervisor" && !id) {
                        return [...acc, { value: item.id, label: item.username }]
                    }
                    else {
                        return acc;
                    }
                }, [])
            )
        }
    }, [data]);

    // useEffect(() => {
    //     if (users.length && formRef.current["Assignee"]?.value) {
    //         formRef.current["Assignee"].value = taskData["Assignee"]
    //     }
    // }, [users]);

    usePseudoElementClick(sectionRef, () => onClose("actionForm"));

    // useEffect(() => {
    //     if (taskData && access) {
    //         ;[...formRef.current].forEach((input) => {
    //             if (input.name !== "submit" && taskData[input.name]) {
    //                 if (input.type === "checkbox") {
    //                     input.checked = taskData[input.name];
    //                 }
    //                 else if (input.type === "select-one") {
    //                     input.defaultValue = taskData[input.name];
    //                     input.value = taskData[input.name];
    //                 }
    //                 else {
    //                     input.value = taskData[input.name];
    //                 }
    //             }
    //         });
    //     }
    // }, [taskData, access])

    const closeForm = (e) => {
        e.preventDefault();
        onClose("actionForm", true);
    }

    const handleAccept = async (e) => {
        e.preventDefault();
        let tempData = {...taskData, TaskCompleted: 1, Comment: comment}
        const response = await updateTodoWithObj(tempData, taskData.id);
        response.status && onClose("actionForm", true);
    }
    const handleReturn = async (e) => {
        e.preventDefault();
        let tempData = {...taskData, Completed: 0, Comment: comment}
        const response = await updateTodoWithObj(tempData, taskData.id);
        response.status && onClose("actionForm", true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempData = {...taskData, Completed: 1, Comment: comment}
        const response = await updateTodoWithObj(tempData, taskData.id);
        response.status && onClose("actionForm", true);
    }
    return (
        <>
            <section className="addFormArea" ref={sectionRef}>
                <div className="popUp contentArea">
                    <h3 className="title">{taskData.Title}</h3>
                    <p>{taskData.Completed ? "Submitted" : "Incomplete"}</p>
                    <p>{taskData.Priority}</p>
                    <p>{formattedDate(taskData.DueDate)}</p>
                    <hr />
                    <form>
                        <div className="inputBox">
                            <label>Comment</label>
                            <textarea
                                name="Comment"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                // disabled={(taskData.TaskCompleted) ? "disabled" : ""}
                            />
                        </div>
                        {/* {
                            (taskSection.all || taskData.Assignee === id) ? (
                                <div className="inputBox">
                                    <label>Comment</label>
                                    <textarea
                                        name="Description"
                                        placeholder="Comment"
                                        disabled={(taskData.TaskCompleted) ? "disabled" : ""}
                                    />
                                </div>
                            ) : ""
                        }
                        {
                            (taskSection.supervisor || taskData.user === id) ? (
                                <div className="inputBox">
                                    <label>Comment</label>
                                    <textarea
                                        name="Comment"
                                        placeholder="Comment"
                                        disabled={(taskData.TaskCompleted || taskData.Assignee === id) ? "disabled" : ""}
                                    />
                                </div>
                            ) : ""
                        } */}

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 10px" }}>
                            {
                                (taskSection.all || taskData.Assignee === id) ? (
                                    <button className="Button primaryButton" onClick={handleSubmit}>Submit</button>
                                ) : ""
                            }
                            {
                                (taskSection.supervisor || taskData.user === id) ? (
                                    <>
                                        <button className="Button primaryButton" onClick={handleAccept}>Accept</button>
                                        <button className="Button primaryButton warning" onClick={handleReturn}>Return</button>
                                    </>
                                ) : ""
                            }
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default ActionForm;