"use client";

import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyScoreChart ({dailyScore}) {
    
    const [data, setData] = React.useState([])
    console.log(dailyScore);

    React.useEffect(() => {
        const dates = getDatesForWeek();
        const labels = dates.map(date => date.toLocaleDateString('en-US', { weekday: 'short' }));
        const d = dates.map(date => {
                    const scoreEntry = dailyScore.find(
                        score => new Date(score.date).toDateString() === date.toDateString()
                    );
                    return scoreEntry ? scoreEntry.score : 0;
                })
        setData(
            d.map((s, index) => ({date: labels[index], score: s}))
        )
    }, [dailyScore])

    return (
        <div style={{ padding: '10px', paddingTop: 0, backgroundColor: 'white', borderRadius: '8px', minHeight: '200px', }}>
            
            <h2 style={{ textAlign: 'center' }}>
                Daily Score
            </h2>

            <ResponsiveContainer minWidth="300px" maxHeight={'200px'}>
                <BarChart data={data}>
                <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="score" fill="#FF7F3E" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

const getDatesForWeek = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const dates = [];

    // Calculate the previous Saturday
    const saturday = new Date(today);
    saturday.setDate(today.getDate() - currentDay - 1);

    // Get dates from Saturday to Friday
    for (let i = 0; i < 7; i++) {
      const date = new Date(saturday);
      date.setDate(saturday.getDate() + i);
      dates.push(date);
    }

    return dates;
};