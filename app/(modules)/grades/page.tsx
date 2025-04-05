"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchNotes } from '@/utils/api';

const NotesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: fetchNotes,
        onSuccess: (data) => {
            console.log('Notes fetched successfully:', data);
            toast.success('Notes fetched successfully');
            setIsLoading(false);
        },
        onError: (error: any) => {
            console.error('Failed to fetch notes:', error);
            setError(error.message || 'Error fetching notes');
            toast.error('Failed to fetch notes');
            setIsLoading(false);
        }
    });

    useEffect(() => {
        setIsLoading(true);
        mutation.mutate();
    }, []);

    const data = mutation.data || [];

    if (isLoading) return <div>Loading notes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="py-24">
            <div className="container">
                <h1 className="mb-6 text-3xl font-bold">Notes</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </section>
    );
};

export default NotesPage;
