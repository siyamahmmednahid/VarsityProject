import { fetchAllTeacherList, fetchUserList } from "../../../api/home";
import useDeviceSize from "../../../hooks/useDeviceSize";
import useFetch from "../../../hooks/useFetch";
import StackBarChart from "../../chart/StackBarChart";
import LoaderPulse from "../../loader/LoaderPulse";

const AllTeacherListAnalytics = () => {
    const { data, isLoading, error, fetchData } = useFetch(fetchAllTeacherList);
    const { data: teachers } = useFetch(fetchUserList);

    const {width} = useDeviceSize()

    if (isLoading) {
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
    else if (!isLoading && !error && data?.data?.length) {

        return (
            <div style={{height: width < 768 ? "100%" : "300px"}}>
                <StackBarChart
                    label={
                        data.data.map(item => {
                            return item.Name;
                        })
                    }
                    datasets={[
                        {
                            label: 'Completed',
                            data: data.data.map(item => item.complete_task),
                            backgroundColor: '#54A0FF',
                            // barThickness: 15,
                            borderRadius: 8,
                            barPercentage: width < 768 ? 0.5 : 0.3,

                        },
                        {
                            label: 'Incomplete',
                            data: data.data.map(item => item.incomplete_task),
                            backgroundColor: '#d2dae2',
                            // barThickness: 15, 
                            borderRadius: 8,
                            barPercentage: width < 768 ? 0.5 : 0.3,
                        },
                    ]}
                />
            </div>
        )
    }
    else {
        return (<></>)
    }
}
export default AllTeacherListAnalytics;