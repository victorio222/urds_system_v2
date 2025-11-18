'use client';

import Chart from "@/component/ui/Chart";

const phData = [
    { time: '10:00', value: 6.3 },
    { time: '10:05', value: 6.5 },
    { time: '10:10', value: 6.4 },
];

const sensorData = [
    { time: '10:00', temperature: 23, humidity: 60, ph: 6.3 },
    { time: '10:05', temperature: 25, humidity: 58, ph: 6.4 },
    { time: '10:10', temperature: 22, humidity: 62, ph: 6.2 },
    { time: '10:20', temperature: 23, humidity: 60, ph: 6.3 },
    { time: '10:25', temperature: 25, humidity: 58, ph: 6.4 },
    { time: '10:30', temperature: 22, humidity: 62, ph: 6.2 },
];

const SensorChart = () => (
    <div className="my-4 grid grid-cols-1 lg:grid-cols-[41rem_1fr] gap-3">
        <Chart
            data={sensorData}
            xKey="time"
            dataKeys={[
                { key: 'temperature', color: '#f97316', name: 'Temperature (°C)' },
                { key: 'humidity', color: '#60a5fa', name: 'Humidity (%)' },
                { key: 'ph', color: '#34d399', name: 'pH Level' },
            ]}
            title="Real-Time Sensor Readings"
            chartType="line"
        />

        <Chart
            data={phData}
            xKey="time"
            dataKeys={[{ key: 'value', color: '#f59e0b', name: 'pH Level' }]}
            title="General Average"
            chartType="bar"
        />
    </div>
);

export default SensorChart;