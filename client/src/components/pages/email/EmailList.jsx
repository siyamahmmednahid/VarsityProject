import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers } from "../../../api/users";
import useFetch from "../../../hooks/useFetch";
import { formattedDate } from "../../../utils/dateTime";
import placeholder from "../../../assets/images/placeholder.jpg";
import { updateEmailStarred } from "../../../api/email";

const EmailList = ({ data, handleModalOpen, setIsRefetch, setSelectedDraft, emailAreaRef }) => {
    const [search, setSearch] = useState("");

    const { data: userData } = useFetch(fetchUsers, {});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (userData.status) {
            setUsers(
                userData.data.reduce((acc, item) => {
                    return [...acc, { userId: item.id, image: item.personal_info?.ProfilePic }]
                }, [])
            )
        }
    }, [data, userData]);


    const handleSearchFilter = (item) => {
        if (!search) return true;
        return item.Subject.toLowerCase().includes(search.toLowerCase());
    }
    return (
        <>
            <div className="emailList">
                <div className="header">
                    <div className="headerTop">
                        <button className="menuButton" onClick={() => { emailAreaRef.current.classList.toggle("active") }}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="search">
                            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                    <div className="headerBottom">
                        {/* <div className="buttonArea">
                            <input type="checkbox" name="" id="" />
                            <button className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                            <button className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </button>
                        </div> */}
                    </div>
                </div>
                <ul>
                    {
                        data.filter(handleSearchFilter).map(item => (
                            <EmailItem
                                key={item.id}
                                item={item}
                                users={users || []}
                                handleModalOpen={handleModalOpen}
                                setIsRefetch={setIsRefetch}
                                setSelectedDraft={setSelectedDraft}
                            />
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default EmailList;

const EmailItem = ({ item, users, handleModalOpen, setIsRefetch, setSelectedDraft }) => {
    const { 
        Subject, 
        Label="private", 
        Date: date, 
        Sender,
        Receiver, 
        Cc,
        Bcc,
        id, 
        BccImportant, CcImportant, ReceiverImportant, SenderImportant,
        BccLabel, CcLabel, ReceiverLabel, SenderLabel,
        BccRead, CcRead, ReceiverRead,
    } = item;
    
    const navigate = useNavigate()
    const { type } = useParams()
    const user = users.find(user => user.userId === (Sender ? Sender : Receiver[0] ? Receiver[0] : Cc[0] ? Cc[0] : Bcc[0] ? Bcc[0] : ""));
    
    let readType = CcRead !== undefined ? "CcRead" : BccRead !== undefined ? "BccRead" : ReceiverRead !== undefined ? "ReceiverRead" : "";
    
    // company, private, personal, important, none
    let labelType = BccLabel !== undefined ? "BccLabel" : CcLabel !== undefined ? "CcLabel" : ReceiverLabel !== undefined ? "ReceiverLabel" : SenderLabel !== undefined ? "SenderLabel" : "";
    let labelStatus = item[labelType].toLowerCase();


    const handleMailClick = () => {
        if (type === "draft") {
            setSelectedDraft && setSelectedDraft(id)
            handleModalOpen("addForm")
        }
        else {
            if(SenderImportant !== undefined) {
                navigate(`/emails/${type}/${id}?type=sent`)
            }
            else {
                navigate(`/emails/${type}/${id}?type=inbox`)
            }
        }
    }

    const updateStar = async () => {
        let importantType;
        item.CcImportant !== undefined ? (importantType = "CcImportant") : item.BccImportant !== undefined ? (importantType = "BccImportant") : item.SenderImportant !== undefined ? (importantType = "SenderImportant") : importantType = "ReceiverImportant";
        let response = await updateEmailStarred({ emailId: item.id, type: importantType, starred: !item[importantType], state: importantType === "SenderImportant" ? "sent" : "inbox", rest: {...item} });
        if (response.status) {
            setIsRefetch(true);
        }
    }
    return (
        <li>
            <div className="buttonArea">
                {/* <input type="checkbox" name="" id="" /> */}
                {
                    type !== "draft" ? (
                        <button className="button" onClick={updateStar}>
                            <svg className={(BccImportant === true || CcImportant === true || ReceiverImportant === true || SenderImportant === true) ? "active" : ""} xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </button>
                    ) : ""
                }
            </div>
            <div className="emailDetail" onClick={() => handleMailClick()}>
                <img
                    src={
                        user?.image ?
                            `${process.env.REACT_APP_SERVER_BASE_URL}${user.image}` : placeholder
                    }
                    alt="user"
                    className="userThumb"
                />
                <div className="emailInfo">
                    {/* <h4 className="emailSender">{Sender}</h4> */}
                    <p className={`emailSubject ${(type !== "sent" && type !== "draft" && Sender !== undefined && !item[readType]) ? 'isReadActive' : ""}`}>{Subject}</p>
                </div>
            </div>
            <div className="emailDate">
                {
                    labelStatus !== "none" ? (
                        <div className="labels">
                            <span className={labelStatus}></span>
                        </div>
                    ) : ""
                }
                <p className="date">{formattedDate(date)}</p>
            </div>
        </li>
    )
}