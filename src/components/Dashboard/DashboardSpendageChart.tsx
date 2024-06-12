import React, { useState, useEffect } from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import Plot from 'react-plotly.js';

const DashboardSpendageChart: React.FC = () => {
    const [events, setEvents] = useState<{ timestamp: Date; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(2);
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
            const month = `${String(date.getMonth())}/${date.getFullYear()}`;

            if (!aggregated[month]) {
                aggregated[month] = 0;
            }
            aggregated[month] += event.value * 0.00002 * 0.9241;
        });

        return Object.entries(aggregated).map(([month, value]) => {
            const [monthPart, yearPart] = month.split('/');
            const timestamp = new Date(`${yearPart}-${monthPart.padStart(2, '0')}-01`); // Ensure valid Date object
            return {
                timestamp,
                value
            };
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Expenses Chart</h2>
            <Plot
                data={[
                    {
                        x: events.map(event => event.timestamp),
                        y: events.map(event => event.value),
                        type: 'bar',
                        mode: 'bars',
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
                        tickvals: events.map(event => event.timestamp),
                    },
                    yaxis: {
                        title: 'Euro ',
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

export default DashboardSpendageChart;