"use client";
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/data-table';
import { columns as columnsFunction, Students } from './columns';
import { fetchStudents } from '@/utils/api';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
// import axios from 'axios'; // Note: axios needs to be available in your project
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { User, GraduationCap, Plus, Search, Filter, Users, BookOpen, Mail, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const StudentsPage = () => {
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertDetails, setAlertDetails] = useState({ name: '', className: '' });
    const [selectedClass, setSelectedClass] = useState('');
    const [studentsData, setStudentsData] = useState<any>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Use useQuery for fetching students
    const { data, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['students', pageIndex + 1, pageSize],
        queryFn: () => fetchStudents({ page: pageIndex + 1, limit: pageSize }),
    });

    // Handle success case
    useEffect(() => {
        if (data) {
            console.log('Fetched students data:', data);
            // Flatten class info for the table
            setStudentsData(
                data.students.map((student: any) => ({
                    ...student,
                    className: student.class?.name || "",
                }))
            );
            setTotalCount(data.totalCount);
        }
    }, [data]);

    // Handle error case
    useEffect(() => {
        if (queryError) {
            console.error('Failed to fetch students:', queryError);
            setError(queryError.message || 'Error fetching students');
        }
    }, [queryError]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const studentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            roleId: 2,
            adress: formData.get('address'),
        };

        try {
            const response = await axios.post('http://localhost:3000/api/login', studentData);
            setAlertDetails({ name: studentData.name as string, className: selectedClass });
            setShowAlert(true);
            refetch();
        } catch (error) {
            alert('Failed to add student. Please try again.');
        }
    };

    // Get unique class names from studentsData
    const classOptions = React.useMemo(() => {
        const names = studentsData.map((student: any) => student.class?.name).filter(Boolean);
        const uniqueNames = Array.from(new Set(names));
        return [
            { label: "Toutes", value: "" },
            ...uniqueNames.map((name) => ({ label: name, value: name }))
        ];
    }, [studentsData]);

    const response = studentsData || [];
    const columns = columnsFunction(studentsData, setStudentsData);
    const pageCount = Math.ceil(totalCount / pageSize);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <div className="text-slate-600 font-medium animate-pulse">Loading students...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-red-200 shadow-xl">
                    <div className="flex items-center space-x-3 text-red-600">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">!</span>
                        </div>
                        <span className="font-medium">Error: {error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Alert Dialog with modern styling */}
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
                    <AlertDialogHeader>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Student Added Successfully
                            </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-slate-600 text-base">
                            {`🎉 The student ${alertDetails.name} has been successfully added to ${alertDetails.className}.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => setShowAlert(false)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Awesome!
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Main Content */}
            <div className="relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/3 -left-8 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <section className="relative py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-lg rounded-full px-6 py-2 mb-6 border border-blue-200/50 shadow-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium text-slate-700">Student Management</span>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
                                Students Dashboard
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Manage and organize your students with style and efficiency
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">Total Students</p>
                                        <p className="text-2xl font-bold text-slate-800">{totalCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-purple-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600">This Page</p>
                                        <p className="text-2xl font-bold text-slate-800">{pageSize}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/50 shadow-xl">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search students..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 w-64"
                                        />
                                    </div>
                                    <button className="flex items-center space-x-2 px-4 py-3 bg-white/80 border border-slate-200 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-md">
                                        <Filter className="w-5 h-5 text-slate-600" />
                                        <span className="text-slate-600">Filter</span>
                                    </button>
                                </div>

                                <Sheet>
                                    <SheetTrigger asChild>
                                        <button className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                            <span className="font-medium">Add Student</span>
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[500px] bg-white/95 backdrop-blur-xl border-l border-white/50">
                                        <SheetHeader className="mb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <SheetTitle className="text-xl font-bold text-slate-800">Add New Student</SheetTitle>
                                                    <SheetDescription className="text-slate-600">Fill out the form to add a new student to your system.</SheetDescription>
                                                </div>
                                            </div>
                                        </SheetHeader>

                                        <form className="space-y-6" onSubmit={handleSubmit}>
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                                    <User className="w-4 h-4" />
                                                    <span>Full Name</span>
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter student's full name"
                                                    className="h-12 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                                    <Mail className="w-4 h-4" />
                                                    <span>Email Address</span>
                                                </label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter email address"
                                                    className="h-12 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                                    <Lock className="w-4 h-4" />
                                                    <span>Password</span>
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        className="h-12 pr-12 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                                                    >
                                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="confirm-password" className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                                    <Lock className="w-4 h-4" />
                                                    <span>Confirm Password</span>
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        id="confirm-password"
                                                        name="confirm-password"
                                                        placeholder="Confirm password"
                                                        className="h-12 pr-12 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                        onChange={(e) => {
                                                            const password = document.getElementById('password') as HTMLInputElement;
                                                            if (password && e.target.value !== password.value) {
                                                                e.target.setCustomValidity('Passwords do not match');
                                                            } else {
                                                                e.target.setCustomValidity('');
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="address" className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>Address</span>
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Enter address"
                                                    className="h-12 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center space-x-2 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium"
                                            >
                                                <Plus className="w-5 h-5" />
                                                <span>Add Student</span>
                                            </button>
                                        </form>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Data Table Container */}
                        <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl overflow-hidden animate-fade-in-up p-3">
                            <DataTable
                                columns={columns}
                                data={response}
                                pageCount={pageCount}
                                pagination={{
                                    pageIndex,
                                    pageSize,
                                    setPageIndex,
                                    setPageSize,
                                }}
                                showStudentFilters={true}
                                classOptions={classOptions}
                            />
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default StudentsPage;