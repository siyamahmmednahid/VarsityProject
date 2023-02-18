
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import useFetch from '../hooks/useFetch'
import { fetchEvents } from '../api/event'
import { useCallback, useEffect, useState } from 'react'
import EventAddForm from '../components/pages/events/EventAddForm'
import EventEditForm from '../components/pages/events/EventEditForm'

const localizer = momentLocalizer(moment)

const Event = () => {
    const { data, isFetched, error, fetchData } = useFetch(fetchEvents, {});

    const [eventData, setEventData] = useState([])

    const [isModalShow, setIsModalShow] = useState({
        addForm: false,
        editForm: false,
    });

    const [priorityFilter, setPriorityFilter] = useState('');

    const handleModalOpen = (type, value) => {
        setIsModalShow(prev => ({ ...prev, [type]: value ? value : true }))
    }

    const handleModalClose = (type, isRefetch) => {
        if (isRefetch) fetchData();
        setIsModalShow(prev => ({ ...prev, [type]: false }))
    }

    const handleSelectEvent = useCallback(
        (event) => handleModalOpen("editForm", event),
        []
    )

    const handlePriorityFilter = (item) => {
        if (!priorityFilter) return true;
        return item.Label === priorityFilter;
    }

    useEffect(() => {
        if (data?.data?.length) {
            const events = data.data.map(item => {
                return {
                    ...item,
                    id: item.id,
                    title: item.Title,
                    start: new Date(item.StartDateTime),
                    end: new Date(item.EndDateTime),
                    desc: item.Description,
                }
            })
            setEventData(events)
        }
    }, [data]);
    return (
        <>
            {
                isModalShow.addForm && (
                    <EventAddForm
                        onClose={handleModalClose}
                    />
                )
            }
            {
                isModalShow.editForm && (
                    <EventEditForm
                        data={isModalShow.editForm}
                        onClose={handleModalClose}
                    />
                )
            }
            <div className="contentArea todoArea eventArea">
                <div className="leftSide">
                    <button className="Button primaryButton" onClick={() => handleModalOpen("addForm")}>Add Event</button>
                    <div className="tags">
                        <h4 className="tagTitle">Label</h4>
                        <ul className="tagList">
                            <li className={`all ${priorityFilter === '' && 'active'}`} onClick={() => setPriorityFilter("")}>All</li>
                            <li className={`low ${priorityFilter === 'Personal' && 'active'}`} onClick={() => setPriorityFilter("Personal")}>Personal</li>
                            <li className={`medium ${priorityFilter === 'Work' && 'active'}`} onClick={() => setPriorityFilter("Work")}>Work</li>
                            <li className={`high ${priorityFilter === 'Family' && 'active'}`} onClick={() => setPriorityFilter("Family")}>Family</li>
                            <li className={`urgent ${priorityFilter === 'Holiday' && 'active'}`} onClick={() => setPriorityFilter("Holiday")}>Holiday</li>
                            <li className={`other ${priorityFilter === 'Other' && 'active'}`} onClick={() => setPriorityFilter("Other")}>Other</li>
                        </ul>
                    </div>
                </div>
                {/* <div className="userListHeader">
                    <div className="userListActions">
                        <button className="Button primaryButton" onClick={() => handleModalOpen("addForm")}>Add Event</button>
                    </div>
                </div> */}
                <div className="rightSide">
                    <div className='height600'>
                        <Calendar
                            localizer={localizer}
                            events={eventData.filter(handlePriorityFilter)}
                            startAccessor="start"
                            endAccessor="end"
                            popup
                            onSelectEvent={handleSelectEvent}
                            eventPropGetter={
                                (event, start, end, isSelected) => {
                                    let { Label } = event;
                                    let textColor = Label === "Personal" ? "var(--successColor)" :
                                        Label === "Work" ? "var(--warningColor)" :
                                            Label === "Family" ? "var(--dangerColor)" :
                                                Label === "Holiday" ? "var(--primaryColor)" :
                                                    Label === "Other" ? "var(--blueColor)" : "var(--textColor)";

                                    let backgroundColor = Label === "Personal" ? "var(--personalEventBg)" :
                                        Label === "Work" ? "var(--workEventBg)" :
                                            Label === "Family" ? "var(--familyEventBg)" :
                                                Label === "Holiday" ? "var(--holidayEventBg)" :
                                                    Label === "Other" ? "var(--otherEventBg)" : "var(--noneEventBg)";
                                    return {
                                        style: {
                                            backgroundColor,
                                            color: textColor,
                                            fontSize: "var(--textFont)",
                                            fontWeight: "var(--fontRegular)",
                                            lineHeight: "var(--lineHeight)",
                                            padding: "3px 10px",
                                        }
                                    }
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;