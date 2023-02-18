import { useEffect } from "react";
import { fetchSentEmails } from "../../api/email";
import EmailList from "../../components/pages/email/EmailList";
import useFetch from "../../hooks/useFetch";

const Draft = ({ labelFilter, isRefetch, setIsRefetch, handleModalOpen, setSelectedDraft }) => {
    const { data, isFetched, fetchData } = useFetch(fetchSentEmails, {});

    useEffect(() => {
        if (isRefetch) {
            fetchData();
            setIsRefetch(false)
        }
    }, [isRefetch]);

    const handleLabelFilter = (item) => {
        if (!labelFilter) return true;
        return (item.SenderLabel === labelFilter || item.CcLabel === labelFilter || item.BccLabel === labelFilter);
    }
    const handleDraftFilter = (item) => {
        return (item.Draft === true);
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
                                .filter(handleDraftFilter)
                                .filter(handleLabelFilter)
                        }
                        type="draft"
                        handleModalOpen={handleModalOpen}
                        setSelectedDraft={setSelectedDraft}
                    />
                )
            }
        </>
    )
}
export default Draft;