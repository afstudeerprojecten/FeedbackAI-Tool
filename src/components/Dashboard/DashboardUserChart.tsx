import React, { useState, useEffect } from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import Plot from 'react-plotly.js';

const DashboardUserChart: React.FC = () => {
    const [events, setEvents] = useState<{ date_created: Date; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(1);
                console.log("Data:", data); // Log data
                const aggregatedData = aggregateDataByMonth(data);
                console.log("Aggregated data:", aggregatedData); // Log aggregated data
                setEvents(aggregatedData);
            } catch (error: any) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    const aggregateDataByMonth = (data: any[]) => {
        const aggregated: { [key: string]: number } = {};

        data.forEach(event => {
            const date = new Date(event.date_created);
            console.log("Date:", date); // Log date
            const month = `${String(date.getMonth())}/${date.getFullYear()}`;
            console.log("Month:", month); // Log month

            if (!aggregated[month]) {
                aggregated[month] = 0;
            }
            aggregated[month] += event.value;
        });

        return Object.entries(aggregated).map(([month, value]) => {
            const [monthPart, yearPart] = month.split('/');
            const date_created = new Date(`${yearPart}-${monthPart.padStart(2, '0')}-01`); // Ensure valid Date object
            return {
                date_created,
                value
            };
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text" >Login Chart</h2>
            <Plot
                data={[
                    {
                        x: events.map(event => event.date_created),
                        y: events.map(event => event.value),
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{
                    autosize: true,
                    xaxis: {
                        title: 'Date',
                        titlefont: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        },
                        tickformat: '%m/%Y', // Correct tick format for months and years
                        tickvals: events.map(event => event.date_created),
                    },
                    yaxis: {
                        title: 'Logins',
                        titlefont: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        },
                    }
                }}
                useResizeHandler
                className="w-full h-full"
            />
        </div>
    );
};

export default DashboardUserChart;