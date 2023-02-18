import { useEffect } from "react";
import { fetchInboxEmails } from "../../api/email";
import EmailList from "../../components/pages/email/EmailList";
import useFetch from "../../hooks/useFetch";

const Inbox = ({ labelFilter, isRefetch, setIsRefetch, emailAreaRef }) => {
    const { data, isFetched, fetchData } = useFetch(fetchInboxEmails, {});

    useEffect(() => {
        if (isRefetch) {
            fetchData();
            setIsRefetch(false)
        }
    }, [isRefetch]);

    const handleLabelFilter = (item) => {
        if (!labelFilter) return true;
        return (item.ReceiverLabel === labelFilter || item.CcLabel === labelFilter || item.BccLabel === labelFilter);
    }

    const removeDraft = (item) => {
        if (!item.Draft) return true;
    }

    const removeTrashMail = (item) => {
        if(item.CcTrash === true || item.ReceiverTrash === true || item.BccTrash === true || item.SenderTrash === true) return false;
        else return true;
    }

    return (
        <>
            {
                isFetched && data.status && (
                    <EmailList
                        setIsRefetch={setIsRefetch}
                        emailAreaRef={emailAreaRef}
                        data={
                            data.Receiver.concat(data.Cc, data.Bcc)
                                .filter(removeTrashMail)
                                .filter(removeDraft)
                                .sort((a, b) => b.id - a.id)
                                .filter(handleLabelFilter)
                        }
                    />
                )
            }
        </>
    )
}
export default Inbox;