import React, { useState, useEffect } from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import Plot from 'react-plotly.js';
import { fetchStudentName } from "../../services/studentService";

type Event = {
    date_created: Date;
    value: number;
    label?: string;
};

const DashboardSpendageChart: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [groupingMode, setGroupingMode] = useState<"month" | "user">("month");

    const changeIdToName = async (id: number) => {
        try {
            const data = await fetchStudentName(id);
            return data;
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(2);
                console.log("Data:", data); // Log data
                const aggregatedData = groupingMode === "month" ? aggregateDataByMonth(data) : await aggregateDataByUser(data);
                console.log("Aggregated data:", aggregatedData); // Log aggregated data
                setEvents(aggregatedData);
            } catch (error: any) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [groupingMode]);

    const aggregateDataByMonth = (data: any[]) => {
        const aggregated: { [key: string]: number } = {};

        data.forEach(event => {
            const date = new Date(event.date_created);
            const month = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`; // Ensure month is correctly formatted

            if (!aggregated[month]) {
                aggregated[month] = 0;
            }
            aggregated[month] += event.value * 0.00002 * 0.9241;
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

    const aggregateDataByUser = async (data: any[]) => {
        const aggregated: { [key: string]: { value: number, userId: number } } = {};

        for (const event of data) {
            const user = event.user_id; // Assuming user_id exists in the event data

            if (!aggregated[user]) {
                aggregated[user] = { value: 0, userId: user };
            }
            aggregated[user].value += event.value * 0.00002 * 0.9241;
        }

        const result = [];
        for (const [_user, { value, userId }] of Object.entries(aggregated)) {
            const name = await changeIdToName(userId);
            result.push({
                date_created: new Date(), // Use a placeholder date
                value,
                label: name // Add the fetched name as a label
            });
        }

        return result;
    };

    const getColor = (value: number) => {
        if (value < 0.2) return 'yellowgreen';
        if (value < 0.5) return '#ff7f0e';
        return '#d62728';
    };
    const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Expenses Chart</h2>
            <div className="mb-4">
                <label className="mr-2">Group by:</label>
                <select value={groupingMode} onChange={(e) => setGroupingMode(e.target.value as "month" | "user")}>
                    <option value="month">Month</option>
                    <option value="user">User</option>
                </select>
            </div>
            <Plot
                data={[
                    {
                        x: events.map(event => groupingMode === "month" ? event.date_created : event.label).filter(isDefined),
                        y: events.map(event => event.value),
                        type: 'bar',
                        marker: { color: events.map(event => getColor(event.value)) },
                    },
                ]}
                layout={{
                    autosize: true,
                    xaxis: {
                        title: groupingMode === "month" ? 'Date' : 'User',
                        titlefont: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        },
                        tickformat: groupingMode === "month" ? '%m/%Y' : '', 
                        tickvals: events.map(event => groupingMode === "month" ? event.date_created : event.label),
                    },
                    yaxis: {
                        title: 'Euro',
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
