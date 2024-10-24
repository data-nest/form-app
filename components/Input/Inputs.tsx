import { Button, Card, IconButton, TextField, Tooltip } from '@mui/material';
import { Trash } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface InputRow {
    name: string;
    value: string;
}

interface InputsProps {
    inputRows: InputRow[];
    handleInputChange: (index: number, field: 'name' | 'value', value: string) => void;
    addInputRow: () => void;
    removeInputRow: (index: number) => void; // Added prop for removing an input row
    submitData: () => void;
    clearData: () => void; // Added prop for clearing data
}

function Inputs({ inputRows, handleInputChange, addInputRow, removeInputRow, submitData, clearData }: InputsProps) {
    const inputContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputContainerRef.current) {
            inputContainerRef.current.scrollTop = inputContainerRef.current.scrollHeight;
        }
    }, [inputRows]);

    return (
        <Card className="p-3 md:p-10 h-fit md:w-[800px] mt-10 w-full">
            <h1 className="text-2xl font-bold mb-4">Analytics Line Chart</h1>

            {/* Dynamic Form Inputs */}
            <div className="mb-6 gap-4 w-full">
                <div ref={inputContainerRef} className='overflow-auto h-60 gap -4'>
                    {inputRows.map((row, index) => (
                        <div key={index} className="flex p-2 flex-col md:flex-row gap-4 items-center">
                            <TextField
                                type="text"
                                value={row.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                placeholder="Enter Name"
                                variant='outlined'
                                label='name'
                                className='w-full'
                            />
                            <TextField
                                type="number"
                                value={row.value}
                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                placeholder="Enter Value"
                                variant='outlined'
                                label='value'
                                className='w-full'
                            />
                            <IconButton onClick={() => removeInputRow(index)}>
                                <Tooltip title='Remove'>
                                    <Trash className='text-red-500' />
                                </Tooltip>
                            </IconButton>
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-center'>
                    <Button onClick={addInputRow} className='w-fit' variant='outlined'>
                        Add Input Row
                    </Button>
                </div>
            </div>

            {/* Submit Data Button */}
            <Button onClick={submitData} variant='contained'>
                Save Data
            </Button>

            {/* Clear Data Button */}
            <Button onClick={clearData} variant='outlined' color='error' className='mt-4' sx={{
                marginLeft: 2
            }}>
                Clear Chart
            </Button>
        </Card>
    );
}

export default Inputs;