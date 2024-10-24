"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart'; // Import PieChart
import { Card, Select, MenuItem, FormControl } from '@mui/material';
import Inputs from '../Input/Inputs';
import toast from 'react-hot-toast';

export default function LineChartPage() {
    const [inputRows, setInputRows] = React.useState<{ name: string; value: string }[]>([{ name: '', value: '' }]);
    const [data, setData] = React.useState<{ id: number; value: number; label: string }[]>([]);
    const [chartType, setChartType] = React.useState<'line' | 'pie'>('line'); // State for chart type

    React.useEffect(() => {
        // Load data from localStorage only on the client side
        const savedRows = localStorage.getItem('inputRows');
        if (savedRows) {
            setInputRows(JSON.parse(savedRows));
        }

        const savedData = localStorage.getItem('chartData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    // Handler to add a new input row
    const addInputRow = () => {
        setInputRows(prevRows => [...prevRows, { name: '', value: '' }]);
    };

    // Handler to update an input row's value
    const handleInputChange = (index: number, field: 'name' | 'value', value: string) => {
        setInputRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index][field] = value;
            const newData = updatedRows
                .map((row, idx) => ({
                    id: idx,
                    value: parseFloat(row.value),
                    label: row.name,
                }))
                .filter(row => row.label && !isNaN(row.value)); // Filter out invalid rows
            setData(newData); // Update to setData with newData instead of updatedRows
            return updatedRows;
        });
    };

    // Handler to remove an input row
    const removeInputRow = (index: number) => {
        setInputRows(prevRows => {
            const updatedRows = prevRows.filter((_, i) => i !== index);
            const newData = updatedRows
                .map((row, idx) => ({
                    id: idx,
                    value: parseFloat(row.value),
                    label: row.name,
                }))
                .filter(row => row.label && !isNaN(row.value));
            setData(newData); // Update data state
            localStorage.setItem('chartData', JSON.stringify(newData)); // Update local storage
            localStorage.setItem('inputRows', JSON.stringify(updatedRows)); // Update local storage
            return updatedRows;
        });
    };

    const submitData = () => {
        const newData = inputRows
            .map((row, idx) => ({
                id: idx,
                value: parseFloat(row.value),
                label: row.name,
            }))
            .filter(row => row.label && !isNaN(row.value));
        setData(newData);
        localStorage.setItem('chartData', JSON.stringify(newData)); // Save chart data to local storage
        localStorage.setItem('inputRows', JSON.stringify(inputRows));
        return toast.success('Data saved succesfully')
    };

    const clearData = () => {
        setInputRows([{ name: '', value: '' }]); // Reset input rows
        setData([]); // Clear chart data
        localStorage.removeItem('chartData'); // Clear local storage
        localStorage.removeItem('inputRows'); // Clear local storage
    };

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 640; // Handle window width safely

    return (
        <div className='p-5 md:p-9 flex flex-col justify-center items-center'>
            <Card className='p-3 md:p-10 w-full max-w-[800px]'>
                <h1 className='text-2xl font-bold text-black'>Analytics Chart</h1>
                <FormControl fullWidth>
                    <Select
                        labelId="chart-type-label"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as 'line' | 'pie')}
                    >
                        <MenuItem value="line">Line Chart</MenuItem>
                        <MenuItem value="pie">Pie Chart</MenuItem>
                    </Select>
                </FormControl>
                {chartType === 'line' ? (
                    <LineChart
                        colors={['#1976D2']} // Primary color for chart line
                        width={windowWidth > 640 ? 750 : windowWidth - 40} // Responsive width
                        height={250}
                        series={[{ data: data.map(d => d.value), label: 'User Input Data' }]} // Corrected series format
                        xAxis={[{ scaleType: 'point', data: data.map(d => d.label) }]} // Use user input names for x-axis
                    />
                ) : (
                    <PieChart
                        series={[{ data: data }]} // Send data in the required format for PieChart
                        width={windowWidth > 640 ? 750 : windowWidth - 40} // Responsive width
                        height={250}
                    />
                )}
            </Card>
            <Inputs 
                inputRows={inputRows} 
                handleInputChange={handleInputChange} 
                addInputRow={addInputRow} 
                submitData={submitData} 
                clearData={clearData} 
                removeInputRow={removeInputRow} // Pass the remove function to Inputs
            />
        </div>
    );
}
