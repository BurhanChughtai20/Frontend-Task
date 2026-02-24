import type { ColumnDef } from "@tanstack/react-table"
import type { Users } from "../../../types/dashboard.types"

const getColumns: ColumnDef<Users>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
]

export default getColumns