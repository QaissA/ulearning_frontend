"use client";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { fetchAttendanceByDate } from "@/utils/api";

const AttendancePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({ date, page, limit }: { date: string; page: number; limit: number }) => {
      console.log("Fetching attendance with:", { date, page, limit }); // 👈 log params
      const result = await fetchAttendanceByDate({ date, page, limit });
      console.log("Received from fetchAttendanceByDate:", result); // 👈 log result
      return result;
    },
    onSuccess: (data: any) => {
      setAttendanceData(data.attendance || []);
      setTotalCount(data.totalCount || 0);
      setIsLoading(false);
      console.log("✅ Attendance data:", data.attendances);
      console.log("✅ Total count:", data.totalCount);
    },
    onError: (error: any) => {
      setError(error.message || "Error fetching attendance");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutation.mutate({ date: "2025-05-24", page: pageIndex + 1, limit: pageSize });
  }, [pageIndex, pageSize]);  

  const data = attendanceData || [];
  const pageCount = Math.ceil(totalCount / pageSize);

  if (isLoading) return <div>Loading attendance...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  console.log("📦 Final data going to table:", data);
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Attendance</h1>
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

export default AttendancePage;
