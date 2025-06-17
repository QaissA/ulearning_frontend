"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { DataTable } from '@/components/data-table';
import { columns } from '../columns';
import { columnsAdd } from './columns-add';
import { fetchNotes } from '@/utils/api';
import { Button } from '@/components/ui/button';

const NotesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: fetchNotes,
        onSuccess: (data) => {
            setIsLoading(false);
        },  
        onError: (error: any) => {
            console.error('Failed to fetch notes:', error);
            setError(error.message || 'Error fetching notes');
            setIsLoading(false);
        }
    });

    useEffect(() => {
        setIsLoading(true);
        mutation.mutate();
    }, []);

    const data = mutation.data || [];

    const handleBulkAddGrades = () => {
        // Logic for bulk adding grades will be implemented here
    };

    if (isLoading) return <div>Loading notes...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <section className="py-24">
            <div className="container">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Ajouter Les Notes</h1>
                </div>
                <DataTable columns={columnsAdd} data={data} />
                <div className="flex justify-end mt-6">
                    <Button
                        variant="default"
                        size="lg"
                        className="rounded-lg shadow-md px-8 flex items-center gap-2 w-full sm:w-auto"
                        onClick={handleBulkAddGrades}
                        disabled={isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {isLoading ? 'Saving...' : 'Save All Grades'}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default NotesPage;
