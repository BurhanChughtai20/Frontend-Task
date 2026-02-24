import { motion, AnimatePresence } from "framer-motion"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"

import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
} from "../../ui/pagination"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

const PAGE_SIZE = 5

const DataTable = <TData,>({ columns, data }: DataTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
        pageIndex: 0,
      },
    },
  })

  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-r border-gray-200 px-3 py-2 text-left"
                >
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

        <motion.tbody>
          <AnimatePresence initial={false}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r border-gray-200 px-3 py-2"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </motion.tbody>
      </Table>

      <div className="flex items-center justify-between p-4">
        <Pagination>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
          </PaginationPrevious>

          <PaginationNext
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </PaginationNext>
        </Pagination>

        <div className="text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of {data.length} rows
        </div>
      </div>
    </div>
  )
}

export default DataTable