"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Attendance = {
  id: number;
  userId: number;
  date: string;
  status: string;
  user: {
    id: number;
    name: string;
  };
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.name",
    header: "Student Name",
    cell: ({ row }) => row.original.user?.name || "-",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status.toLowerCase() === "present"
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
      >
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1).toLowerCase()}
      </span>
    ),
  },
];
