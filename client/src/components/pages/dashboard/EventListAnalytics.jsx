import { fetchEventList } from "../../../api/home";
import useFetch from "../../../hooks/useFetch";
import DoughnutChart from "../../chart/DoughnutChart";
import LoaderPulse from "../../loader/LoaderPulse";

const EventListAnalytics = () => {
    const { data, isLoading, error, fetchData } = useFetch(fetchEventList);

    if (isLoading) {
        return (
            <div className="loader-wrapper" >
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
    else if (!isLoading && !error && data?.data?.length) {
        let incomplete = 0, complete = 0;
        data.data.forEach(item => {
            if (new Date(item.EndDateTime).getTime() < new Date().getTime()) {
                complete++;
            }
            else {
                incomplete++
            }
        })
        return (
            <div>
                <DoughnutChart
                    label={["Completed", "Incomplete"]}
                    data={[complete, incomplete]}
                    colorSet={["#ffa21a", "#d2dae2"]}
                    title="Event"
                />
            </div>
        )
    }
    else {
        return (<></>)
    }
}
export default EventListAnalytics;