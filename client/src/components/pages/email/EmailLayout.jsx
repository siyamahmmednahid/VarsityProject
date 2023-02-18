import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchInboxEmails, fetchSentEmails } from "../../../api/email";
import useFetch from "../../../hooks/useFetch";
import usePseudoElementClick from "../../../hooks/usePseudoElementClick";
import EmailFilter from "./EmailFilter";

const EmailLayout = () => {
    const navigate = useNavigate();

    const emailAreaRef = useRef(null);
    usePseudoElementClick(emailAreaRef, () => { emailAreaRef.current.classList.toggle("active") });

    useEffect(() => {
        navigate("inbox")
    }, []);

    // const { data: inboxMails, isFetched: isInboxFetched } = useFetch(fetchInboxEmails, {});
    // const { data: sentMails, isFetched: isSentFetched } = useFetch(fetchSentEmails, {}, {isManual: true});

    // const [allMails, setAllMails] = useState([])
    
    const [labelFilter, setLabelFilter] = useState("");
    const [isModalShow, setIsModalShow] = useState({
        addForm: false
    });

    const handleModalOpen = (type) => {
        setIsModalShow(prev => ({ ...prev, [type]: true }))
    }

    return (
        <>
            <div className="emailArea todoArea contentArea" ref={emailAreaRef}>
                <div className="leftSide">
                    <button className="button primaryButton" onClick={() => handleModalOpen("addForm")}>Compose</button>
                    <EmailFilter
                        labelFilter={labelFilter}
                        setLabelFilter={setLabelFilter}
                    />
                </div>
                <div className="rightSide">
                    <Outlet context={[isModalShow, setIsModalShow, labelFilter, handleModalOpen, emailAreaRef]} />
                </div>
            </div>
        </>
    )
}
export default EmailLayout;