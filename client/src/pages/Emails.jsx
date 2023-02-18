import { useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import EmailForm from "../components/pages/email/EmailForm";
import usePseudoElementClick from "../hooks/usePseudoElementClick";
import Draft from "./emails/Draft";
import Important from "./emails/Important";
import Inbox from "./emails/Inbox";
import Sent from "./emails/Sent";
import Trash from "./emails/Trash";

const Emails = () => {
    const { type } = useParams();
    const [isModalShow, setIsModalShow, labelFilter, handleModalOpen, emailAreaRef] = useOutletContext();

    const todoAreaRef = useRef(null);
    usePseudoElementClick(todoAreaRef, () => { todoAreaRef.current.classList.toggle("active") });

    const [selectedDraft, setSelectedDraft] = useState(null);
    const [isRefetch, setIsRefetch] = useState()

    const handleModalClose = (type, refetch) => {
        setSelectedDraft(null)
        setIsRefetch(refetch)
        setIsModalShow(prev => ({ ...prev, [type]: false }))
    }

    return (
        <>
            {
                type === "inbox" ? (
                    <Inbox
                        labelFilter={labelFilter}
                        isRefetch={isRefetch}
                        setIsRefetch={setIsRefetch}
                        emailAreaRef={emailAreaRef}
                    />
                ) :
                    type === "sent" ? (
                        <Sent
                            labelFilter={labelFilter}
                            isRefetch={isRefetch}
                            setIsRefetch={setIsRefetch}
                            emailAreaRef={emailAreaRef}
                        />
                    ) :
                        type === "draft" ? (
                            <Draft
                                labelFilter={labelFilter}
                                isRefetch={isRefetch}
                                setIsRefetch={setIsRefetch}
                                handleModalOpen={handleModalOpen}
                                setSelectedDraft={setSelectedDraft}
                                emailAreaRef={emailAreaRef}
                            />
                        ) :
                            type === "starred" ? (
                                <Important
                                    labelFilter={labelFilter}
                                    isRefetch={isRefetch}
                                    setIsRefetch={setIsRefetch}
                                    emailAreaRef={emailAreaRef}
                                />
                            ) :
                                type === "trash" ? (
                                    <Trash
                                        labelFilter={labelFilter}
                                        isRefetch={isRefetch}
                                        setIsRefetch={setIsRefetch}
                                        emailAreaRef={emailAreaRef}
                                    />
                                ) : ""
            }
            {
                isModalShow.addForm && (
                    <EmailForm
                        onClose={handleModalClose}
                        type={type}
                        draftMailId={selectedDraft}
                    />
                )
            }
        </>
    );
}

export default Emails;