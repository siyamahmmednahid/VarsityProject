import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchTodo, updateTodoWithObj } from "../api/todo";
import { CheckboxIcon, EditIcon, SubmitIcon, ViewIcon } from "../assets/icons/icons";
import ActionForm from "../components/pages/todo/ActionForm";
import TodoAddForm from "../components/pages/todo/TodoAddForm";
import TodoEditForm from "../components/pages/todo/TodoEditForm";
import useFetch from "../hooks/useFetch";
import useGetContext from "../hooks/useGetContext";
import usePseudoElementClick from "../hooks/usePseudoElementClick";
import { formattedDate } from "../utils/dateTime";

const Todo = () => {
    const todoAreaRef = useRef(null);
    usePseudoElementClick(todoAreaRef, () => { todoAreaRef.current.classList.toggle("active") });


    const { data, isFetched, error, fetchData } = useFetch(fetchTodo, {});
    const { userState: { data: { id, is_superuser } = {} } = {} } = useGetContext();
    const [isModalShow, setIsModalShow] = useState({
        addForm: false,
        editForm: false,
        actionForm: false,
    });
    const [selectedTodo, setSelectedTodo] = useState(null);

    const [priorityFilter, setPriorityFilter] = useState('');
    const [search, setSearch] = useState('');
    const [taskSection, setTaskSection] = useState({
        all: is_superuser ? false : true,
        supervisor: is_superuser ? true : false,
        important: false,
        completed: false,
    });


    const updateSection = (type) => {
        if (type === "all") {
            setTaskSection(prev => ({ ...prev, all: true, supervisor: false, important: false, completed: false }))
        }
        else if (type === "supervisor") {
            setTaskSection(prev => ({ ...prev, all: false, supervisor: true, important: false, completed: false }))
        }
        else if (type === "important") {
            setTaskSection(prev => ({ ...prev, all: false, supervisor: false, important: true, completed: false }))
        }
        else if (type === "completed") {
            setTaskSection(prev => ({ ...prev, all: false, supervisor: false, important: false, completed: true }))
        }
    }

    const handleModalOpen = (type) => {
        setIsModalShow(prev => ({ ...prev, [type]: true }))
    }

    const handleModalClose = (type, isRefetch) => {
        if (isRefetch) fetchData();
        setIsModalShow(prev => ({ ...prev, [type]: false }))
    }

    const handlePriorityFilter = (item) => {
        if (!priorityFilter) return true;
        return item.Priority === priorityFilter;
    }

    const handleSearchFilter = (item) => {
        if (!search) return true;
        return item.Title.toLowerCase().includes(search.toLowerCase());
    }

    const handleSectionFilter = (item) => {
        if (taskSection.all) return (item.Assignee === id && !item.TaskCompleted);
        if (taskSection.supervisor) return (item.user === id && !item.TaskCompleted);
        if (taskSection.important) return ((item.Important) && !item.TaskCompleted);
        if (taskSection.completed) return item.TaskCompleted;
    }

    const sortArray = (a, b) => {
        if (a.Priority === "Urgent") return -1;
        if (b.Priority === "Urgent") return 1;
        if (a.Priority === "High") return -1;
        if (b.Priority === "High") return 1;
        if (a.Priority === "Medium") return -1;
        if (b.Priority === "Medium") return 1;
        if (a.Priority === "Low") return -1;
        if (b.Priority === "Low") return 1;
        return 0;
    }

    return (
        <>
            {
                isModalShow.addForm && (
                    <TodoAddForm
                        onClose={handleModalClose}
                    />
                )
            }
            {
                isModalShow.editForm && selectedTodo && (
                    <TodoEditForm
                        taskData={selectedTodo}
                        taskSection={taskSection}
                        onClose={handleModalClose}
                    />
                )
            }
            {
                isModalShow.actionForm && selectedTodo && (
                    <ActionForm
                        taskData={selectedTodo}
                        taskSection={taskSection}
                        onClose={handleModalClose}
                    />
                )
            }
            <div className="todoArea contentArea" ref={todoAreaRef}>
                <div className="leftSide" >
                    <button className="button primaryButton" onClick={() => handleModalOpen("addForm")}>Add Task</button>
                    <ul className="tabs">
                        {
                            !is_superuser ? (
                                <li onClick={() => updateSection("all")} className={taskSection.all && "active"}>
                                    <CheckboxIcon />
                                    My Task
                                </li>
                            ) : ""
                        }
                        <li onClick={() => updateSection("supervisor")} className={taskSection.supervisor && "active"}>
                            <CheckboxIcon />
                            Me as supervisor
                        </li>
                        <li onClick={() => updateSection("important")} className={taskSection.important && "active"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star font-medium-3 me-50"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            Bookmark
                        </li>
                        <li onClick={() => updateSection("completed")} className={taskSection.completed && "active"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check font-medium-3 me-50"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Completed
                        </li>
                        {/* <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash font-medium-3 me-50"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Deleted</li> */}
                    </ul>
                    <div className="tags">
                        <h4 className="tagTitle">Tags</h4>
                        <ul className="tagList">
                            <li className={`all ${priorityFilter === 'All' && 'active'}`} onClick={() => setPriorityFilter("")}>All</li>
                            <li className={`low ${priorityFilter === 'Low' && 'active'}`} onClick={() => setPriorityFilter("Low")}>Low</li>
                            <li className={`medium ${priorityFilter === 'Medium' && 'active'}`} onClick={() => setPriorityFilter("Medium")}>Medium</li>
                            <li className={`high ${priorityFilter === 'High' && 'active'}`} onClick={() => setPriorityFilter("High")}>High</li>
                            <li className={`urgent ${priorityFilter === 'Urgent' && 'active'}`} onClick={() => setPriorityFilter("Urgent")}>Urgent</li>
                        </ul>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="header">
                        <button className="menuButton" onClick={() => { todoAreaRef.current.classList.toggle("active") }}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="search">
                            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                    {/* <ul className="taskList">
                        {
                            (isFetched && data.data?.length) ? data.data.filter(handleSectionFilter).filter(handleSearchFilter).filter(handlePriorityFilter).map((item, index) => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    setSelectedTodo={setSelectedTodo}
                                    handleModalOpen={handleModalOpen}
                                    fetchData={fetchData}
                                />
                            )) : ""
                        }
                    </ul> */}

                    <div className="userListBody">
                        <table className="userListTable">
                            <thead>
                                <tr>
                                    <th className="bookmark">BK</th>
                                    <th className="taskTitle">Title</th>
                                    <th className="status">Status</th>
                                    <th className="date">Date</th>
                                    <th className="priority">Priority</th>
                                    <th className="Actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (isFetched && data.data?.length) ? data.data.sort(sortArray).filter(handleSectionFilter).filter(handleSearchFilter).filter(handlePriorityFilter).map((item, index) => (
                                        <TodoList
                                            key={item.id}
                                            item={item}
                                            setSelectedTodo={setSelectedTodo}
                                            handleModalOpen={handleModalOpen}
                                            fetchData={fetchData}
                                            taskSection={taskSection}
                                        />
                                    )) : ""
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;

// urgent, high, medium, low

const TodoItem = ({ item, setSelectedTodo, handleModalOpen, fetchData }) => {
    let { Title, Priority, DueDate, TaskCompleted, Important, Assignee, id, Completed } = item;

    const taskPriority = {
        Urgent: 'urgent',
        High: 'high',
        Medium: 'medium',
        Low: 'low'
    };

    const clickOnTask = () => {
        setSelectedTodo(item)
        handleModalOpen("editForm")
    }

    const clickOnImportant = async () => {
        if (TaskCompleted) return;
        let req = {
            Important: !Important
        }
        let res = await updateTodoWithObj(req, id)
        if (res.status) {
            fetchData()
        }
    }

    const clickOnCompleted = async () => {
        if (TaskCompleted) return;
        let req = {
            Completed: !Completed
        }
        let res = await updateTodoWithObj(req, id)
        if (res.status) {
            fetchData()
        }
    }
    return (
        <li>
            <div className="titleArea">
                <button className="button" onClick={clickOnCompleted}>
                    {
                        Completed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.416" height="18.002" viewBox="0 0 18.416 18.002">
                                <g id="Checked" transform="translate(-2 -2)">
                                    <path id="check" d="M9,10.223l2.667,2.667L20.557,4" transform="translate(-1.555 -0.111)" fill="none" stroke="#485460" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path id="box" d="M19,11v6.223A1.778,1.778,0,0,1,17.224,19H4.778A1.778,1.778,0,0,1,3,17.224V4.778A1.778,1.778,0,0,1,4.778,3h9.779" fill="none" stroke="#485460" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.003" height="18.003" viewBox="0 0 18.003 18.003">
                                <path id="Uncheck" d="M-805.222-552A1.778,1.778,0,0,1-807-553.775v-12.447A1.778,1.778,0,0,1-805.222-568h12.446A1.778,1.778,0,0,1-791-566.222v12.447A1.778,1.778,0,0,1-792.776-552Z" transform="translate(808 569)" fill="none" stroke="#485460" strokeLinecap="round" strokeWidth="2" />
                            </svg>
                        )
                    }
                </button>
                <button className={`button ${Important ? 'active' : ""}`} onClick={clickOnImportant}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill={"none"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </button>
                <div className="taskTitle" onClick={clickOnTask}>{Title}</div>
            </div>
            <div className="taskDetails">
                <div
                    className={`taskTag ${taskPriority[Priority]}`}
                >
                    {Priority}
                </div>
                <div className="taskDate">{formattedDate(DueDate)}</div>
                {/* <img src="images/user.png" alt="userName" className="userThumb" /> */}
            </div>
        </li>
    )
}

const TodoList = ({ item, setSelectedTodo, handleModalOpen, fetchData, taskSection }) => {
    let { Title, Priority, DueDate, TaskCompleted, Important, Assignee, id, Completed, user } = item;

    const { userState: { data: { id: loggedInId } = {} } = {} } = useGetContext();

    const priorityClass = Priority === "Low" ? "low" : Priority === "Medium" ? "medium" : Priority === "High" ? "high" : "urgent";

    const statusClass = TaskCompleted ? "completed" : Completed ? "submitted" : "incomplete"

    const clickOnTask = () => {
        setSelectedTodo(item)
        handleModalOpen("editForm")
    }

    const clickOnButton = () => {
        setSelectedTodo(item)
        handleModalOpen("actionForm")
    }

    const clickOnImportant = async () => {
        if (TaskCompleted) return;
        let req;
        req = {
            ...item,
            Important: !Important
        }
        let res = await updateTodoWithObj(req, id)
        if (res.status) {
            fetchData()
        }
    }
    return (
        <tr>
            <td className="bookmark">
                <button className={`button ${Important ? 'active' : ""}`} onClick={clickOnImportant}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill={"red"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </button>
            </td>
            <td className="taskTitle" onClick={clickOnTask}>
                {Title}
            </td>
            <td className={`status ${statusClass}`}>
                {
                    TaskCompleted ? "Completed" : Completed ? "Submitted" : "Incomplete"
                }
            </td>
            <td className="date">
                {formattedDate(DueDate)}
            </td>
            <td className={`priority`}>
                <div className={`label ${priorityClass}`}>
                    {Priority}
                </div>
            </td>
            <td className="Actions">
                {
                    <button
                        className="Button secondaryButton"
                        disabled={
                            (Completed && loggedInId == Assignee) ? true : TaskCompleted ? true : false
                        }
                        onClick={clickOnButton}
                    >
                        <SubmitIcon />
                    </button>
                }
            </td>
        </tr >
    )
}