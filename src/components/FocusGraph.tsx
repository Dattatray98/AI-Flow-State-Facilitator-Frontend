import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const FocusGraph = () => {
    const labels = ["","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Focus time in hours",
                data: [0,2, 3, 5, 2, 5, 6, 3],
                borderColor: "rgba(106, 3, 175, 1)",
                backgroundColor: "rgba(106, 3, 175, 0.5)",
                tension: 0.3,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Weekly Focus Hours",
            },
        },
    };


    return (
        <div className='border border-gray-200 shadow-sm rounded-xl p-3'>
            <Line data={data} options={options} />
        </div>
    )
}

export default FocusGraph
