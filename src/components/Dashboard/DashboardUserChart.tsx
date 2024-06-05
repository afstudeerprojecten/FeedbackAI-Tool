import React, {useState, useEffect} from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import Plot from 'react-plotly.js';

const DashboardUserChart: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(1);
                setEvents(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="p-6">
            <Plot
                data={[
                    {
                        x: events.map((event) => event.timestamp),
                        y: events.map((event) => event.value),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout={{
                    width: 800,
                    height: 400,
                    title: 'User Chart',
                    xaxis: {
                        title: 'Time',
                        titlefont: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    },
                    yaxis: {
                        title: 'Value',
                        titlefont: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    }
                }}
            /> 
        </div>
    );
}

export default DashboardUserChart;