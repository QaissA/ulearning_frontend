"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"  
import { DataTablePagination } from "./ui/DataTablePagination"
import { DataTableViewOptions } from "./ui/DataTableViewOptions"
import { ComboboxDemo } from "@/components/ui/combobox-demo"
import { Calendar } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  pagination: {
    pageIndex: number
    pageSize: number
    setPageIndex: (updater: number) => void
    setPageSize: (updater: number) => void
  }
  showStudentFilters?: boolean
  showGradesFilters?: boolean 
  showAttendanceFilters?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  showStudentFilters, // Destructure the new prop
  showGradesFilters,
  showAttendanceFilters = false,
  classOptions = [], // <-- add default empty array
  notesClassOptions = [], // <-- add default empty array
  matiereOptions = [], // <-- add default empty array
  schoolOptions = [], // <-- add default empty array
}: DataTableProps<TData, TValue> & { showAttendanceFilters?: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  // Add date filter state
  const [dateFilter, setDateFilter] = React.useState("")
  
  // State for fetched classes for attendance filter
  const [attendanceClassOptions, setAttendanceClassOptions] = React.useState<{ label: string; value: string }[]>([
    { label: "Toutes", value: "" }
  ])

  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount, // 👈 Correctly passed here
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize })
          : updater;

      console.log("🔁 Pagination changed to:", newState);

      pagination.setPageIndex(newState.pageIndex);
      pagination.setPageSize(newState.pageSize);
    }
  })

  const filterableColumn = table.getAllColumns().find(col => col.getCanFilter());

  // If notesClassOptions is not provided, generate it from data
  const computedNotesClassOptions = React.useMemo(() => {
    if (notesClassOptions && notesClassOptions.length > 0) return notesClassOptions;
    // Try to extract from data
    const classNames = Array.from(
      new Set(
        (data || [])
          .map((row: any) => row.user?.class?.name)
          .filter(Boolean)
      )
    );
    return [
      { label: "Toutes", value: "" },
      ...classNames.map((name) => ({ label: name, value: name }))
    ];
  }, [notesClassOptions, data]);

  // Fetch classes on mount if attendance filters are enabled
  React.useEffect(() => {
    if (showAttendanceFilters) {
      (async () => {
        const { fetchClasses } = await import("@/utils/api");
        try {
          const classes = await fetchClasses();
          setAttendanceClassOptions([
            { label: "Toutes", value: "" },
            ...classes.map((c: any) => ({ label: c.name, value: c.name }))
          ]);
        } catch (e) {
          // Optionally handle error
        }
      })();
    }
  }, [showAttendanceFilters]);

  return (
    <div>
      {/* Filter and View Options */}
      <div className="mb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            {/* Existing column filter input on the left */}
            <div className="flex-1">
              {filterableColumn && (
                <Input
                  placeholder={`Filter by ${filterableColumn.id}...`}
                  value={(filterableColumn.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    filterableColumn.setFilterValue(event.target.value)
                  }
                  className="max-w-sm bg-white"
                />
              )}
            </div>
            {/* DataTableViewOptions on the right */}
            <div className="ml-4 flex-shrink-0">
              <DataTableViewOptions table={table} />
            </div>
          </div>
          {/* Attendance Filters: Date, Status, Classe all in one row */}
          {showAttendanceFilters && (
            <div className="flex flex-row flex-wrap gap-4 items-center mb-4">
              {/* Date Filter */}
              <div className="flex items-center gap-2 w-64 min-w-[200px]">
                <label className="text-sm font-medium whitespace-nowrap">Date</label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={e => {
                    setDateFilter(e.target.value);
                    table.getColumn("date")?.setFilterValue(e.target.value);
                  }}
                  className="pl-10 pr-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                />
              </div>
              {/* Status Filter */}
              <div className="flex items-center gap-2 w-64 min-w-[200px]">
                <label className="text-sm font-medium whitespace-nowrap">Status</label>
                <ComboboxDemo
                  options={[
                    { label: "All", value: "" },
                    { label: "Present", value: "present" },
                    { label: "Absent", value: "absent" }
                  ]}
                  onSelect={(value: string) => table.getColumn("status")?.setFilterValue(value)}
                />
              </div>
              {/* Classe Filter for attendance page only */}
              {showAttendanceFilters && (
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Classe</label>
                  <ComboboxDemo
                    options={attendanceClassOptions}
                    onSelect={(value: string) => table.getColumn("user.class.name")?.setFilterValue(value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* All other filters below */}
          <div className="flex flex-wrap gap-4 items-center">
            {/*Classe Comboboxes only for students page */}
            {showStudentFilters && (
              <>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Classe</label>
                  <ComboboxDemo
                    options={classOptions.length > 0 ? classOptions : [
                      { label: "Toutes", value: "" },
                    ]}
                    onSelect={(value: string) => table.getColumn("className")?.setFilterValue(value)}
                  />
                </div>
              </>
            )}
            
            {/* Ecole, Semestre, Controle, Niveau, Classe filters for grades page */}
            {showGradesFilters && (
              <>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Ecole</label>
                  <ComboboxDemo
                    options={schoolOptions.length > 0 ? schoolOptions : [
                      { label: "Toutes", value: "" },
                    ]}
                    onSelect={(value: string) => table.getColumn("ecole")?.setFilterValue(value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Semestre</label>
                  <ComboboxDemo
                    options={[
                      { label: "Tous", value: "" },
                      { label: "Semestre 1", value: "semestre1" },
                      { label: "Semestre 2", value: "semestre2" },
                      // Ajoutez d'autres semestres si nécessaire
                    ]}
                    onSelect={(value: string) => table.getColumn("semestre")?.setFilterValue(value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Contrôle</label>
                  <ComboboxDemo
                    options={[
                      { label: "Tous", value: "" },
                      { label: "Contrôle 1", value: "controle1" },
                      { label: "Contrôle 2", value: "controle2" },
                      // Ajoutez d'autres contrôles si nécessaire
                    ]}
                    onSelect={(value: string) => table.getColumn("controle")?.setFilterValue(value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Niveau</label>
                  <ComboboxDemo
                    options={[
                      { label: "Tous", value: "" },
                      { label: "Niveau 1", value: "niveau1" },
                      { label: "Niveau 2", value: "niveau2" },
                      // Ajoutez d'autres niveaux si nécessaire
                    ]}
                    onSelect={(value: string) => table.getColumn("niveau")?.setFilterValue(value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Classe</label>
                  <ComboboxDemo
                    options={computedNotesClassOptions}
                    onSelect={(value: string) => table.getColumn("classe")?.setFilterValue(value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-64 min-w-[200px]">
                  <label className="text-sm font-medium whitespace-nowrap">Matiere</label>
                  <ComboboxDemo
                    options={matiereOptions.length > 0 ? matiereOptions : [
                      { label: "All", value: "" },
                    ]}
                    onSelect={(value: string) => table.getColumn("matiere.name")?.setFilterValue(value)}
                  />
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <br />
      <DataTablePagination table={table} />
    </div>
  )
}
