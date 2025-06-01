"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchNotes } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, FileText, BookOpen, TrendingUp, Search, Filter, BarChart3, Calendar, Star } from 'lucide-react';

const NotesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [notesData, setNotesData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

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
            toast.error('Failed to load notes');
        }
    });

    useEffect(() => {
        setIsLoading(true);
        mutation.mutate({ page: pageIndex + 1, limit: pageSize });
    }, [pageIndex, pageSize]);

    const data = notesData || [];
    const pageCount = Math.ceil(totalCount / pageSize);

    // Calculate some stats for the cards
    const averageGrade = data.length > 0 ?
        (data.reduce((sum: number, note: any) => sum + (parseFloat(note.grade) || 0), 0) / data.length).toFixed(1) :
        '0.0';

    const highGradesCount = data.filter((note: any) => parseFloat(note.grade) >= 15).length;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto animation-delay-150"></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">Loading notes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Error Loading Notes</h3>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={() => mutation.mutate({ page: pageIndex + 1, limit: pageSize })}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
            <section className="py-12">
                <div className="container mx-auto px-6">
                    {/* Header Section */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">Notes & Grades</h1>
                                <p className="text-gray-600 text-lg">Track and manage academic performance</p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Total Notes</p>
                                        <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-xl">
                                        <FileText className="w-6 h-6 text-indigo-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Average Grade</p>
                                        <p className="text-3xl font-bold text-gray-900">{averageGrade}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">High Grades</p>
                                        <p className="text-3xl font-bold text-gray-900">{highGradesCount}</p>
                                    </div>
                                    <div className="p-3 bg-yellow-100 rounded-xl">
                                        <Star className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">This Page</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <BarChart3 className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search notes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-white shadow-sm">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>

                        <a href="/grades/add" className="inline-block">
                            <Button
                                variant="default"
                                size="lg"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 font-medium border-0"
                            >
                                <Plus className="w-5 h-5" />
                                Add Grades
                            </Button>
                        </a>
                    </div>

                    {/* Progress Overview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <BarChart3 className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Grade Distribution</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-700 font-medium">Excellent (15-20)</p>
                                        <p className="text-2xl font-bold text-green-800">{data.filter((note: any) => parseFloat(note.grade) >= 15).length}</p>
                                    </div>
                                    <div className="text-green-600">
                                        <Star className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-yellow-700 font-medium">Good (10-14)</p>
                                        <p className="text-2xl font-bold text-yellow-800">{data.filter((note: any) => parseFloat(note.grade) >= 10 && parseFloat(note.grade) < 15).length}</p>
                                    </div>
                                    <div className="text-yellow-600">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-red-700 font-medium">Below Average</p>
                                        <p className="text-2xl font-bold text-red-800">{data.filter((note: any) => parseFloat(note.grade) < 10).length}</p>
                                    </div>
                                    <div className="text-red-600">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-2xl shadow- p-3">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">All Notes</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Showing {data.length} of {totalCount} records</span>
                                </div>
                            </div>
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
                </div>
            </section>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animation-delay-150 {
                    animation-delay: 150ms;
                }
                
                .hover\\:-translate-y-1:hover {
                    transform: translateY(-4px);
                }
                
                .hover\\:-translate-y-0\\.5:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
};

export default NotesPage;