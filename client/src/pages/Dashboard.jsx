import { useEffect, useRef, useState } from "react";
import StackBarChart from "../components/chart/StackBarChart";
import AllTeacherListAnalytics from "../components/pages/dashboard/AllTeacherListAnalytics";
import EventListAnalytics from "../components/pages/dashboard/EventListAnalytics";
import MeAsSupervisorListAnalytics from "../components/pages/dashboard/MeAsSupervisorListAnalytics";
import MyTaskListAnalytics from "../components/pages/dashboard/MyTaskListAnalytics";
import UserListAnalytics from "../components/pages/dashboard/UserListAnalytics";
import useGetContext from "../hooks/useGetContext";

const Dashboard = () => {
    const containerRef = useRef(null);
    const { userState: { data: { is_superuser } = {} } = {} } = useGetContext();

    const [isDataShow, setIsDataShow] = useState();

    useEffect(() => {
        if (containerRef?.current?.clientWidth) {
            setIsDataShow(containerRef.current.clientWidth)
        }
    }, [containerRef]);
    return (
        <>
            <div className="analyticsArea" ref={containerRef}>
                {
                    isDataShow ? (
                        <div className="analyticsArea-wrapper">
                            <div className={`analyticsArea-group ${is_superuser ? 'super_user' : ""}`}>
                                <div className="contentArea">
                                    <h3 className="title">Teachers</h3>
                                    <div className="chart">
                                        <UserListAnalytics />
                                    </div>
                                </div>
                                {
                                    !is_superuser ? (
                                        <div className="contentArea">
                                            <h3 className="title">My Task</h3>
                                            <div className="chart">
                                                <MyTaskListAnalytics />
                                            </div>
                                        </div>
                                    ) : ""
                                }
                                <div className="contentArea">
                                    <h3 className="title">Me as supervisor</h3>
                                    <div className="chart">
                                        <MeAsSupervisorListAnalytics />
                                    </div>
                                </div>
                                <div className="contentArea">
                                    <h3 className="title">Events</h3>
                                    <div className="chart">
                                        <EventListAnalytics />
                                    </div>
                                </div>
                            </div>
                            <div className="analyticsArea-group">
                                <div className="contentArea large">
                                    <h3 className="title">Teacher's ranking</h3>
                                    <AllTeacherListAnalytics />
                                </div>
                            </div>
                        </div>
                    ) : ""
                }
            </div>
        </>
    );
}

export default Dashboard;