import { useEffect } from "react";
import { fetchSentEmails } from "../../api/email";
import EmailList from "../../components/pages/email/EmailList";
import useFetch from "../../hooks/useFetch";

const Sent = ({ labelFilter, isRefetch, setIsRefetch }) => {
    const { data, isFetched, fetchData } = useFetch(fetchSentEmails, {});

    useEffect(() => {
        if (isRefetch) {
            fetchData();
            setIsRefetch(false)
        }
    }, [isRefetch]);

    const handleLabelFilter = (item) => {
        if (!labelFilter) return true;
        return (item.SenderLabel === labelFilter);
    }

    const handleNotInDraftFilter = (item) => {
        return (item.Draft !== true);
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
                        data={
                            data.data
                                .sort((a, b) => b.id - a.id)
                                .filter(removeTrashMail)
                                .filter(handleNotInDraftFilter)
                                .filter(handleLabelFilter)
                        }
                    />
                )
            }
        </>
    )
}
export default Sent;