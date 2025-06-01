"use client";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { fetchAttendanceByDate } from "@/utils/api";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  UserCheck,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Search,
  Filter,
  CalendarDays,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Download
} from 'lucide-react';

const AttendancePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2025-05-24");
  const [searchQuery, setSearchQuery] = useState('');

  const mutation = useMutation({
    mutationFn: async ({ date, page, limit }: { date: string; page: number; limit: number }) => {
      const result = await fetchAttendanceByDate({ date, page, limit });
      return result;
    },
    onSuccess: (data: any) => {
      setAttendanceData(data.attendance || []);
      setTotalCount(data.totalCount || 0);
      setIsLoading(false);
    },
    onError: (error: any) => {
      setError(error.message || "Error fetching attendance");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutation.mutate({ date: selectedDate, page: pageIndex + 1, limit: pageSize });
  }, [pageIndex, pageSize, selectedDate]);

  const data = attendanceData || [];
  const pageCount = Math.ceil(totalCount / pageSize);

  // Calculate attendance stats
  const presentCount = data.filter((record: any) => record.status === 'present' || record.status === 'Present').length;
  const absentCount = data.filter((record: any) => record.status === 'absent' || record.status === 'Absent').length;
  const lateCount = data.filter((record: any) => record.status === 'late' || record.status === 'Late').length;
  const attendanceRate = data.length > 0 ? ((presentCount / data.length) * 100).toFixed(1) : '0.0';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin mx-auto animation-delay-150"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading attendance...</p>
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
            <h3 className="text-xl font-semibold text-gray-900">Error Loading Attendance</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => mutation.mutate({ date: selectedDate, page: pageIndex + 1, limit: pageSize })}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Attendance Tracking</h1>
                <p className="text-gray-600 text-lg">Monitor student presence and participation</p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Select Date</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pl-10 pr-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    />
                  </div>
                  <Button
                    onClick={() => mutation.mutate({ date: selectedDate, page: pageIndex + 1, limit: pageSize })}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg transition-all duration-200"
                  >
                    Load Attendance
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Present</p>
                    <p className="text-3xl font-bold text-green-600">{presentCount}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Absent</p>
                    <p className="text-3xl font-bold text-red-600">{absentCount}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-xl">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
                    <p className="text-3xl font-bold text-emerald-600">{attendanceRate}%</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Attendance Summary for {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-700 font-medium">Present Students</p>
                      <p className="text-2xl font-bold text-green-800">{presentCount}</p>
                      <p className="text-sm text-green-600">{data.length > 0 ? ((presentCount / data.length) * 100).toFixed(1) : 0}% of total</p>
                    </div>
                    <div className="text-green-600">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-700 font-medium">Absent Students</p>
                      <p className="text-2xl font-bold text-red-800">{absentCount}</p>
                      <p className="text-sm text-red-600">{data.length > 0 ? ((absentCount / data.length) * 100).toFixed(1) : 0}% of total</p>
                    </div>
                    <div className="text-red-600">
                      <XCircle className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-700 font-medium">Late Arrivals</p>
                      <p className="text-2xl font-bold text-yellow-800">{lateCount}</p>
                      <p className="text-sm text-yellow-600">{data.length > 0 ? ((lateCount / data.length) * 100).toFixed(1) : 0}% of total</p>
                    </div>
                    <div className="text-yellow-600">
                      <Clock className="w-8 h-8" />
                    </div>
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
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-white shadow-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 px-4 py-3 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-white shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 font-medium"
              >
                <Plus className="w-5 h-5" />
                Mark Attendance
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-3">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays className="w-4 h-4" />
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

export default AttendancePage;