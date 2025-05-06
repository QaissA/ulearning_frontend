"use client";
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { fetchStudents, fetchClasses, Class } from '@/utils/api';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

const StudentsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [classes, setClasses] = useState<Class[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertDetails, setAlertDetails] = useState({ name: '', className: '' });
    const [selectedClass, setSelectedClass] = useState('');

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

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const classData = await fetchClasses();
                setClasses(classData);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        loadClasses();
    }, []);

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
            console.log('Student added successfully:', response.data);
            setAlertDetails({ name: studentData.name as string, className: selectedClass });
            setShowAlert(true);
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student. Please try again.');
        }
    };

    const data = mutation.data || [];

    if (isLoading) return <div>Loading students...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Student Added Successfully</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`The student ${alertDetails.name} has been successfully added to ${alertDetails.className}.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <section className="py-24">
                <div className="container">
                    <h1 className="mb-6 text-3xl font-bold">Students</h1>
                    <div className="flex justify-end mb-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Student</button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Add Student</SheetTitle>
                                    <SheetDescription>Fill out the form to add a new student.</SheetDescription>
                                </SheetHeader>
                                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter student name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter student email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                                        <Input
                                            type="password"
                                            id="confirm-password"
                                            name="confirm-password"
                                            placeholder="Confirm password"
                                            className="peer block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                                            onChange={(e) => {
                                                const password = document.getElementById('password') as HTMLInputElement;
                                                if (password && e.target.value !== password.value) {
                                                    e.target.setCustomValidity('Passwords do not match');
                                                } else {
                                                    e.target.setCustomValidity('');
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                        <Input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Enter address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="class" className="block text-sm font-medium">Class</label>
                                        <Select onValueChange={(value) => setSelectedClass(value)}>
                                            <SelectTrigger id="class" className="w-full">
                                                <SelectValue placeholder="Select a class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.map((classItem) => (
                                                    <SelectItem key={classItem.id} value={classItem.name}>
                                                        {classItem.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <DataTable columns={columns} data={data} />
                </div>
            </section>
        </>
    );
};

export default StudentsPage;