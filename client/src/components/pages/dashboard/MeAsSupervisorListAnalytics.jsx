import { fetchMeAsSupervisorList } from "../../../api/home";
import useFetch from "../../../hooks/useFetch";
import DoughnutChart from "../../chart/DoughnutChart";
import LoaderPulse from "../../loader/LoaderPulse";

const MeAsSupervisorListAnalytics = () => {
    const { data, isLoading, error, fetchData } = useFetch(fetchMeAsSupervisorList);

    if(isLoading) {
        return (
            <div className="loader-wrapper">
                <LoaderPulse />
            </div>
        )
    }
    else if (error) {
        return (
            <div>
                <button className="button primaryButton" onClick={fetchData}>Reload</button>
            </div>
        )
    }
    else if(!isLoading && !error && data?.data?.length){
        let incomplete=0, complete=0;
        data.data.forEach(item => {
            if(item.TaskCompleted) complete++;
            else incomplete++;
        })
        return (
            <div>
                <DoughnutChart
                    label={["Completed", "Incomplete"]}
                    data={[complete, incomplete]}
                    colorSet={["#ff5b5b", "#d2dae2"]}
                    title="Task"
                />
            </div>
        )
    }
    else {
        return (<></>)
    }
}
export default MeAsSupervisorListAnalytics;