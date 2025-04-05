"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchStudents } from '@/utils/api';

const StudentsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: fetchStudents,
        onSuccess: () => {
            setIsLoading(false);
        },
        onError: (error: any) => {
            console.error('Failed to fetch students:', error);
            setError(error.message || 'Error fetching students');
            setIsLoading(false);
        }
    });

    useEffect(() => {
        setIsLoading(true);
        mutation.mutate();
    }, []);

    const data = mutation.data || [];

    if (isLoading) return <div>Loading students...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

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