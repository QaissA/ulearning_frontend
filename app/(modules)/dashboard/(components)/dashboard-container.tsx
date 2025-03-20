import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardContainer = () => {
    // Animation states
    const [animate, setAnimate] = useState(false);
    const [currentMetric, setCurrentMetric] = useState(0);

    // Sample data for the charts
    const attendanceData = [
        { month: 'Jan', attendance: 92, target: 95 },
        { month: 'Feb', attendance: 88, target: 95 },
        { month: 'Mar', attendance: 94, target: 95 },
        { month: 'Apr', attendance: 96, target: 95 },
        { month: 'May', attendance: 91, target: 95 },
        { month: 'Jun', attendance: 89, target: 95 },
        { month: 'Jul', attendance: 96, target: 95 },
    ];

    const performanceData = [
        { subject: 'Math', average: 76, highest: 98 },
        { subject: 'Science', average: 82, highest: 100 },
        { subject: 'English', average: 78, highest: 96 },
        { subject: 'History', average: 84, highest: 97 },
        { subject: 'Art', average: 89, highest: 100 },
        { subject: 'Physical Ed', average: 92, highest: 100 },
    ];

    const enrollmentData = [
        { name: 'Freshmen', value: 420, color: '#8884d8' },
        { name: 'Sophomores', value: 380, color: '#83a6ed' },
        { name: 'Juniors', value: 340, color: '#8dd1e1' },
        { name: 'Seniors', value: 300, color: '#82ca9d' },
    ];

    const metrics = [
        { id: 1, title: 'Total Students', value: 1440, icon: '👨‍🎓', change: '+3.2%', color: 'from-purple-500 to-indigo-600' },
        { id: 2, title: 'Average GPA', value: '3.42', icon: '📊', change: '+0.08', color: 'from-cyan-500 to-blue-600' },
        { id: 3, title: 'Graduation Rate', value: '94.7%', icon: '🎓', change: '+1.3%', color: 'from-green-500 to-emerald-600' },
        { id: 4, title: 'Teacher-Student Ratio', value: '1:16', icon: '👩‍🏫', change: 'Improved', color: 'from-yellow-500 to-orange-600' },
    ];

    // Trigger animations when component mounts
    useEffect(() => {
        setAnimate(true);

        // Cycle through metrics for animation
        const interval = setInterval(() => {
            setCurrentMetric((prev) => (prev + 1) % metrics.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className={`transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">EduManage Dashboard</h1>
                <p className="text-gray-500 mb-8">Welcome back, Administrator</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                    <div
                        key={metric.id}
                        className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${index === currentMetric ? 'ring-4 ring-opacity-50 ring-blue-500 scale-105' : 'scale-100'
                            } ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className={`bg-gradient-to-r ${metric.color} p-4 flex justify-between items-center`}>
                            <div className="flex items-center">
                                <span className="text-3xl">{metric.icon}</span>
                                <h3 className="ml-3 text-lg font-semibold text-white">{metric.title}</h3>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-25 text-white">
                                {metric.change}
                            </span>
                        </div>
                        <div className="p-4 flex justify-center items-center">
                            <span className="text-4xl font-bold text-gray-800 animate-pulse">{metric.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Attendance Trends */}
                <div
                    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '400ms' }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Attendance</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={attendanceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[80, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="attendance"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#82ca9d"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subject Performance */}
                <div
                    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '500ms' }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject Performance</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={performanceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="subject" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="average"
                                    fill="#8884d8"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />
                                <Bar
                                    dataKey="highest"
                                    fill="#82ca9d"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Enrollment by Grade */}
                <div
                    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '600ms' }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Enrollment</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={enrollmentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    innerRadius={40}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {enrollmentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                    formatter={(value: any) => [`${value} students`, 'Enrollment']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Stats */}
                <div
                    className={`bg-white p-6 rounded-2xl shadow-lg col-span-1 lg:col-span-2 transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '700ms' }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Feed</h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500 animate-pulse">
                            <div className="bg-purple-100 rounded-full p-2">
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-800">New grade submissions ready for review</h4>
                                <p className="text-xs text-gray-500">12 minutes ago</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <div className="bg-blue-100 rounded-full p-2">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-800">Parent-Teacher conferences scheduled</h4>
                                <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <div className="bg-green-100 rounded-full p-2">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-800">Student attendance reports generated</h4>
                                <p className="text-xs text-gray-500">Today, 9:41 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className={`bg-white p-4 rounded-2xl shadow-lg text-center text-gray-500 text-sm transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                style={{ transitionDelay: '800ms' }}
            >
                <p>© 2025 EduManage. Last updated: Today at 10:23 AM</p>
            </div>
        </div>
    );
};

export default DashboardContainer;