import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useDeviceSize from '../../hooks/useDeviceSize';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ label, data, colorSet, title }) => {

	const {width} = useDeviceSize();
	
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
			}
		}
	}
	const dataSet = {
		labels: label,
		datasets: [
			{
				label: title,
				data: data,
				backgroundColor: colorSet,
				borderWidth: 1,
				cutout: width > 1200 ? 60 : 30
			},
		],
	};
	return (
		<>
			<Doughnut options={options} data={dataSet} />
		</>
	)
}
export default DoughnutChart;