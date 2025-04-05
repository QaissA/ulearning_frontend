"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchStudents } from '@/utils/api';

const StudentsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState('');
    
    const mutation = useMutation({
        mutationFn: fetchStudents,
        onSuccess: (data) => {
            console.log('Students fetched successfully:', data);
            toast.success('Students fetched successfully');
            setIsLoading(false);
        },
        onError: (error: any) => {
            console.error('Failed to fetch students:', error);
            setError(error.message || 'Error fetching students');
            toast.error('Failed to fetch students');
            setIsLoading(false);
        }
    });

    useEffect(() => {
        setIsLoading(true);
        mutation.mutate();
    }, []);

    const data = mutation.data || [];

    if (isLoading) return <div>Loading students...</div>;
    if (Error) return <div>Error: {Error}</div>;

    return (
        <section className="py-24">
            <div className="container">
                <h1 className="mb-6 text-3xl font-bold">Students</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </section>
    );
};

export default StudentsPage;
