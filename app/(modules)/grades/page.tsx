"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchNotes } from '@/utils/api';
import { Button } from '@/components/ui/button';

const NotesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [notesData, setNotesData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const mutation = useMutation({
        mutationFn: ({ page, limit }: { page: number; limit: number }) => fetchNotes({ page, limit }),
        onSuccess: (data) => {
            setNotesData(data.notes || []);
            setTotalCount(data.totalCount || 0);
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
        mutation.mutate({ page: pageIndex + 1, limit: pageSize });
    }, [pageIndex, pageSize]);

    const data = notesData || [];
    const pageCount = Math.ceil(totalCount / pageSize);

    if (isLoading) return <div>Loading notes...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <section className="py-24">
            <div className="container">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Notes</h1>
                    <a href="/grades/add">
                        <Button
                            variant="default"
                            size="lg"
                            className="rounded-lg shadow-md px-6 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Grades
                        </Button>
                    </a>
                </div>
                <DataTable 
                    columns={columns} 
                    data={data} 
                    pageCount={pageCount}
                    pagination={{
                        pageIndex,
                        pageSize,
                        setPageIndex,
                        setPageSize,
                    }}
                />
            </div>
        </section>
    );
};

export default NotesPage;
