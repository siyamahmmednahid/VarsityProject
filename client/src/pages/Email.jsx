import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchEmail, fetchSentEmail, updateEmailDelete, updateEmailLabel, updateEmailRead, updateEmailStarred, updateEmailTrash } from "../api/email";
import { fetchUsers } from "../api/users";
import useFetch from "../hooks/useFetch";
import { formattedDate } from "../utils/dateTime";
import placeholder from "../assets/images/placeholder.jpg";
import useGetContext from "../hooks/useGetContext";

const Email = () => {
    const { emailId, type } = useParams();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const { userState } = useGetContext()

    let fetchEmailData;
    fetchEmailData = searchParams.get('type') === 'sent' ? fetchSentEmail : fetchEmail;

    const { data, isFetched, error, fetchData } = useFetch(fetchEmailData, { emailId });
    const { data: userList } = useFetch(fetchUsers);

    const [senderData, setSenderData] = useState(null);
    const [isStarred, setIsStarred] = useState(false);
    const [labelType, setLabelType] = useState(null);
    const [isLabelMenuShow, setIsLabelMenuShow] = useState(false);

    useEffect(() => {
        console.log(data);
    }, []);

    useEffect(() => {
        if (userList.data) {
            const sender = userList.data.find(item => item.id === data.data?.Sender);
            setSenderData(sender);
        }
    }, [userList]);

    useEffect(() => {
        if (data.data) {
            setLabelType(data.data.ReceiverLabel !== undefined ? "ReceiverLabel" : data.data.CcLabel !== undefined ? "CcLabel" : data.data.BccLabel !== undefined ? "BccLabel" : data.data.SenderLabel !== undefined ? "SenderLabel" : "");  //ReceiverLabel, CcLabel, BccLabel

            updateEmailRead({ emailId, readType: getReadType(), readStatus: true, rest: {...data.data} })
        }
    }, [data]);

    useEffect(() => {
        data?.data && setIsStarred(data.data[getImportantType()])
    }, [data]);

    const getEmail = (id) => {
        let user = userList.data.find(user => user.id === id)
        return user?.email || false;
    }


    const generateToCcBccListString = () => {
        return (
            <div>
                {
                    ((data.data.Receiver !== undefined) && (data.data.Receiver.length)) ?
                        <p className="email">To: {data.data.Receiver.map(item => getEmail(item)).filter(item => !!item).join(', ')}</p> : ''
                }
                {
                    ((data.data.Cc !== undefined) && (data.data.Cc.length)) ?
                        <p className="email">Cc: {data.data.Cc.map(item => getEmail(item)).filter(item => !!item).join(', ')}</p> : ''
                }
                {
                    ((data.data.Bcc !== undefined) && (data.data.Bcc.length) && (searchParams.get('type') === 'sent')) ?
                        <p className="email">Bcc: {data.data.Bcc.map(item => getEmail(item)).filter(item => !!item).join(', ')}</p> : ''
                }
            </div>
        )
    }


    const getReadType = () => {
        let { ReceiverRead, CcRead, BccRead } = data.data;

        let tempType;

        (ReceiverRead !== undefined) && (tempType = "ReceiverRead");
        (CcRead !== undefined) && (tempType = "CcRead");
        (BccRead !== undefined) && (tempType = "BccRead");

        return tempType;
    }

    const getImportantType = () => {
        let { ReceiverImportant, CcImportant, BccImportant, SenderImportant } = data.data;

        let tempType;

        (ReceiverImportant !== undefined) && (tempType = "ReceiverImportant");
        (CcImportant !== undefined) && (tempType = "CcImportant");
        (BccImportant !== undefined) && (tempType = "BccImportant");
        (SenderImportant !== undefined) && (tempType = "SenderImportant");

        return tempType;
    }

    const getTrashType = () => {
        let { ReceiverTrash, CcTrash, BccTrash, SenderTrash } = data.data;

        let tempType;

        (ReceiverTrash !== undefined) && (tempType = "ReceiverTrash");
        (CcTrash !== undefined) && (tempType = "CcTrash");
        (BccTrash !== undefined) && (tempType = "BccTrash");
        (SenderTrash !== undefined) && (tempType = "SenderTrash");

        return tempType;
    }

    const getDeleteType = () => {
        let { ReceiverDelete, CcDelete, BccDelete, SenderDelete } = data.data;

        let tempType;

        (ReceiverDelete !== undefined) && (tempType = "ReceiverDelete");
        (CcDelete !== undefined) && (tempType = "CcDelete");
        (BccDelete !== undefined) && (tempType = "BccDelete");
        (SenderDelete !== undefined) && (tempType = "SenderDelete");

        return tempType;
    }

    const handleLabelMenuShow = () => {
        setIsLabelMenuShow(prev => !prev)
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleTrash = async ({ trashUndo }) => {
        let response = await updateEmailTrash({ emailId, type: getTrashType(), isTrash: trashUndo ? false : true, state: searchParams.get('type') })
        if (response.status) {
            handleBack()
        }
    }

    const handleDelete = async () => {
        console.log(1);
        let response = await updateEmailDelete({ emailId, type: getDeleteType(), isDelete: true, state: searchParams.get('type') })
        if (response.status) {
            handleBack()
        }
    }

    const handleReadType = () => {
        updateEmailRead({ emailId, readType: getReadType(), readStatus: false, rest: {...data.data} })
        handleBack()
    }

    const handleLabelUpdate = async (label) => {
        let labelType = data.data.ReceiverLabel !== undefined ? "ReceiverLabel" : data.data.CcLabel !== undefined ? "CcLabel" : data.data.BccLabel !== undefined ? "BccLabel" : "";  //ReceiverLabel, CcLabel, BccLabel
        const response = await updateEmailLabel({ emailId, type: labelType, label, state: type })

        if (response.status) {
            fetchData({ emailId })
        }
    }

    const handleImportant = async () => {
        let tempType = getImportantType();
        const response = await updateEmailStarred({ emailId, type: tempType, starred: !isStarred, state: type, rest: {...data.data} })
        if (response.status) {
            setIsStarred(prev => !prev)
        }
    }

    return (
        <>
            {
                (!data?.status) ? (
                    <div className="emailDetailArea">
                        No Data Found
                    </div>
                ) : (data.status && data.data) ? (
                    <div className="emailDetailArea">
                        <div className="detailHeader">
                            <div className="detailHeaderLeft">
                                <button className="button" onClick={handleBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <h4 className="emailSubject">{data.data.Subject}</h4>
                            </div>
                            <div className="detailHeaderRight">
                                <div className="emailActions">
                                    <button className="button" onClick={handleImportant}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={isStarred ? "active" : ""} id="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </button>
                                    {/* <div className="dropdown">
                                    <button className="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                    </button>
                                    <ul>
                                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Draft</a></li>
                                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Trash</a></li>
                                    </ul>
                                </div> */}
                                    <div className="dropdown">
                                        <button className="button" onClick={handleLabelMenuShow}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                        </button>
                                        {
                                            isLabelMenuShow ? (
                                                <ul className="labelList">
                                                    <li className="all" onClick={() => handleLabelUpdate("None")}>None</li>
                                                    <li className="personal" onClick={() => handleLabelUpdate("Personal")}>Personal</li>
                                                    <li className="important" onClick={() => handleLabelUpdate("Important")}>Important</li>
                                                    <li className="private" onClick={() => handleLabelUpdate("Private")}>Private</li>
                                                    <li className="company" onClick={() => handleLabelUpdate("Company")}>Company</li>
                                                </ul>
                                            ) : ""
                                        }
                                    </div>
                                    {
                                        (data.data.Sender !== undefined) ? (
                                            <button className="button" onClick={handleReadType}>
                                                <svg xmlns="http://www.w3.org/2000/svg" id="readIcon" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            </button>
                                        ) : ""
                                    }
                                    {
                                        type === 'trash' ? (
                                            <button className="button" onClick={() => handleTrash({ trashUndo: true })}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="success" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </button>
                                        ) : ""
                                    }
                                    <button className="button" onClick={() => { (type === 'trash') ? handleDelete() : handleTrash({ trashUndo: false }) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={type === 'trash' ? "delete" : ""} width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                    {/* <div className="controls">
                                        <button className="button"><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                                        <button className="button"><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="labelsArea">
                            {
                                data.data[labelType] === "Personal" ? (
                                    <span className="personal">Personal</span>
                                ) :
                                    data.data[labelType] === "Important" ? (
                                        <span className="important">Important</span>
                                    ) :
                                        data.data[labelType] === "Private" ? (
                                            <span className="private">Private</span>
                                        ) :
                                            data.data[labelType] === "Company" ? (
                                                <span className="company">Company</span>
                                            ) : ""
                            }
                            {/* <span href="#" className="personal">Personal</span>
                            <span href="#" className="important">Important</span>
                            <span href="#" className="private">Private</span>
                            <span href="#" className="company">Company</span> */}
                        </div>
                        <div className="emailDetail">
                            <div className="header">
                                {
                                    searchParams.get('type') === 'sent' ? (
                                        <div className="senderInfo">
                                            <img
                                                src={
                                                    userState?.data?.ProfilePic ?
                                                        `${userState?.data?.ProfilePic}` :
                                                        placeholder
                                                }
                                                alt={userState?.data?.email}
                                                className="thumb"
                                            />
                                            <div className="details">
                                                <h3 className="name">{userState?.data?.first_name}&nbsp;{userState?.data?.last_name}</h3>
                                                <p className="email">{userState?.data?.email}</p>
                                                <p className="email">
                                                    {
                                                        userList?.data?.length ? generateToCcBccListString() : ""
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="senderInfo">
                                            <img
                                                src={
                                                    senderData?.personal_info?.ProfilePic ?
                                                        `${process.env.REACT_APP_SERVER_BASE_URL}${senderData.personal_info.ProfilePic}` :
                                                        placeholder
                                                }
                                                alt={senderData?.email}
                                                className="thumb"
                                            />
                                            <div className="details">
                                                <h3 className="name">{senderData?.first_name}&nbsp;{senderData?.last_name}</h3>
                                                <p className="email">{senderData?.email}</p>
                                                <p className="email">
                                                    {
                                                        userList?.data?.length ? generateToCcBccListString() : ""
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="emailDate">
                                    <p>{formattedDate(data.data.Date)}</p>
                                </div>
                            </div>
                            <div className="emailBody">
                                {
                                    data.data.Body
                                }
                            </div>
                        </div>
                    </div>
                ) : ""
            }
        </>
    )
}
export default Email;