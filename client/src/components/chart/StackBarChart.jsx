import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDeviceSize from '../../hooks/useDeviceSize';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StackBarChart = ({ label, datasets }) => {

    const {width} = useDeviceSize()
    
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    useBorderRadius: true,
                    borderRadius: 5,
                    font: {
                        size: 12,
                        family: 'Ubuntu',
                    }
                }
            },
            title: {
                display: false,
            },
        },
        responsive: width < 768 ? false : true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        // maintainAspectRatio: width < 768 ? false : true,
        // aspectRatio: width > 768 && 4,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    display: false,
                },
                grid: {
                    color: 'transparent',
                }
            },
            y: {
                stacked: true,
                grid: {
                    color: '#f5f5f5',
                },
            },
        },
    };

    const labels = label;

    const data = {
        labels,
        datasets: datasets,
    };
    return (
        <>
            <Bar options={options} data={data} />
        </>
    )
}
export default StackBarChart;