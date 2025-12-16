// // 'use client';
// // import React, { ReactNode, useState } from 'react';
// // import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';

// // interface TableColumn<T> {
// //   key: keyof T;
// //   header: string;
// //   render?: (value: T[keyof T], row: T) => ReactNode;
// //   width?: string; // optional width for column
// //   align?: 'left' | 'center' | 'right'; // optional alignment
// // }

// // interface TableProps<T> {
// //   columns: TableColumn<T>[];
// //   data: T[];
// //   rowsPerPageOptions?: number[];
// //   defaultRowsPerPage?: number;
// // }

// // const Table = <T extends { id: number | string }>({
// //   columns,
// //   data,
// //   rowsPerPageOptions = [5, 10, 20],
// //   defaultRowsPerPage = 5,
// // }: TableProps<T>) => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

// //   const totalPages = Math.ceil(data.length / rowsPerPage);
// //   const startIdx = (currentPage - 1) * rowsPerPage;
// //   const endIdx = startIdx + rowsPerPage;
// //   const currentData = data.slice(startIdx, endIdx);

// //   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
// //   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
// //   const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setRowsPerPage(Number(e.target.value));
// //     setCurrentPage(1);
// //   };

// //   return (
// //     <div className="overflow-x-auto bg-white shadow-md rounded-sm mt-2">
// //       <table className="min-w-full text-sm text-gray-500">
// //         <thead className="text-sm text-gray-700 uppercase bg-white border-b border-gray-300">
// //           <tr>
// //             {columns.map((col, idx) => (
// //               <th
// //                 key={col.key as string}
// //                 className={`px-6 py-2.5 ${
// //                   idx < 3 ? 'text-left' : 'text-center'
// //                 }`}
// //                 style={{ width: col.width }}
// //               >
// //                 {col.header}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody className="text-sm text-gray-600 font-medium">
// //           {currentData.map((row) => (
// //             <tr key={row.id} className="bg-white border-b border-gray-300 hover:bg-blue-50">
// //               {columns.map((col, idx) => (
// //                 <td
// //                   key={col.key as string}
// //                   className={`px-6 py-1.5 ${
// //                     idx < 3 ? 'text-left' : 'text-center'
// //                   }`}
// //                   style={{ width: col.width }}
// //                 >
// //                   {col.render ? col.render(row[col.key], row) : (row[col.key] as ReactNode)}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Pagination Controls */}
// //       <div className="flex justify-between items-center mt-2 px-4 py-2 bg-gray-50 rounded-b font-medium">
// //         <div className="flex items-center gap-2 text-xs">
// //           <span className=' text-slate-400'>Rows per page:</span>
// //           <select
// //             value={rowsPerPage}
// //             onChange={handleRowsPerPageChange}
// //             className="border rounded px-2 py-1 text-xs border-none"
// //           >
// //             {rowsPerPageOptions.map((opt) => (
// //               <option key={opt} value={opt}>
// //                 {opt}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="flex items-center gap-2 text-sm">
// //           <button
// //             onClick={handlePrev}
// //             disabled={currentPage === 1}
// //             className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 flex items-center"
// //           >
// //             <span className='text-lg pr-1'>
// //               <BiSkipPrevious />
// //             </span>
// //             Previous
// //           </button>
// //           <span>
// //             Page {currentPage} of {totalPages}
// //           </span>
// //           <button
// //             onClick={handleNext}
// //             disabled={currentPage === totalPages}
// //             className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50 flex items-center"
// //           >
// //             Next
// //             <span className='text-lg pl-1'>
// //               <BiSkipNext />
// //             </span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Table;

// 'use client';
// import React, { ReactNode, useState, useMemo } from 'react';
// import {
//   Box,
//   Table as MuiTable,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Checkbox,
//   Paper,
//   Typography,
//   Toolbar,
// } from '@mui/material';

// interface TableColumn<T> {
//   key: keyof T;
//   header: string;
//   render?: (value: T[keyof T], row: T) => ReactNode;
//   width?: string;
//   align?: 'left' | 'center' | 'right';
// }

// interface TableProps<T> {
//   columns: TableColumn<T>[];
//   data: T[];
//   selectable?: boolean; // dynamic checkbox feature
//   rowsPerPageOptions?: number[];
//   defaultRowsPerPage?: number;
// }

// const Table = <T extends { id: number | string }>({
//   columns,
//   data,
//   selectable = false,
//   rowsPerPageOptions = [5, 10, 20],
//   defaultRowsPerPage = 5,
// }: TableProps<T>) => {
//   const [selected, setSelected] = useState<readonly (number | string)[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       setSelected(data.map((row) => row.id));
//     } else {
//       setSelected([]);
//     }
//   };

//   const handleClick = (id: number | string) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected: readonly (number | string)[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const currentData = useMemo(() => {
//     const startIdx = page * rowsPerPage;
//     return data.slice(startIdx, startIdx + rowsPerPage);
//   }, [data, page, rowsPerPage]);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%' }}>
//         {selectable && (
//           <Toolbar
//             sx={{
//               pl: { sm: 2 },
//               pr: { xs: 1, sm: 1 },
//               ...(selected.length > 0 && {
//                 bgcolor: (theme) =>
//                   theme.palette.primary.main + theme.palette.action.activatedOpacity,
//               }),
//             }}
//           >
//             {selected.length > 0 ? (
//               <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
//                 {selected.length} selected
//               </Typography>
//             ) : (
//               <Typography sx={{ flex: '1 1 100%' }} variant="h6">
//                 Table
//               </Typography>
//             )}
//           </Toolbar>
//         )}
//         <TableContainer>
//           <MuiTable sx={{ minWidth: 750 }} size="medium">
//             <TableHead>
//               <TableRow>
//                 {selectable && (
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       color="primary"
//                       indeterminate={selected.length > 0 && selected.length < data.length}
//                       checked={data.length > 0 && selected.length === data.length}
//                       onChange={handleSelectAllClick}
//                       inputProps={{ 'aria-label': 'select all rows' }}
//                     />
//                   </TableCell>
//                 )}
//                 {columns.map((col) => (
//                   <TableCell key={col.key as string} align={col.align || 'left'} style={{ width: col.width }}>
//                     {col.header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentData.map((row) => {
//                 const isItemSelected = selected.includes(row.id);
//                 return (
//                   <TableRow
//                     hover
//                     role={selectable ? 'checkbox' : undefined}
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     onClick={() => selectable && handleClick(row.id)}
//                     sx={{ cursor: selectable ? 'pointer' : 'default' }}
//                   >
//                     {selectable && (
//                       <TableCell padding="checkbox">
//                         <Checkbox checked={isItemSelected} />
//                       </TableCell>
//                     )}
//                     {columns.map((col) => (
//                       <TableCell key={col.key as string} align={col.align || 'left'}>
//                         {col.render ? col.render(row[col.key], row) : String(row[col.key])}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </MuiTable>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={rowsPerPageOptions}
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default Table;

"use client";
import React, { ReactNode, useState, useMemo } from "react";
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Toolbar,
} from "@mui/material";

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  width?: string; // supports fixed width like "200px" or "20%"
  align?: "left" | "center" | "right";
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  selectable?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

const Table = <T extends { id: number | string }>({
  columns,
  data,
  selectable = false,
  rowsPerPageOptions = [5, 10, 20],
  defaultRowsPerPage = 5,
}: TableProps<T>) => {
  const [selected, setSelected] = useState<readonly (number | string)[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id: number | string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly (number | string)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = useMemo(() => {
    const startIdx = page * rowsPerPage;
    return data.slice(startIdx, startIdx + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        {selectable && (
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  theme.palette.primary.main +
                  theme.palette.action.activatedOpacity,
              }),
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
              >
                {selected.length} selected
              </Typography>
            ) : (
              <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                Table
              </Typography>
            )}
          </Toolbar>
        )}
        <TableContainer>
          <MuiTable sx={{ minWidth: 750 }} size="medium">
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      height: 45, // set desired row height in px
                    }}
                  >
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < data.length
                      }
                      checked={
                        data.length > 0 && selected.length === data.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all rows" }}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={col.key as string}
                    align={col.align || "left"}
                    style={{
                      width: col.width,
                      maxWidth: col.width,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    padding="none"
                    sx={{
                      height: 45, // set desired row height in px
                    }}
                    title={col.header}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    role={selectable ? "checkbox" : undefined}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onClick={() => selectable && handleClick(row.id)}
                    sx={{ cursor: selectable ? "pointer" : "default" }}
                  >
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          height: 45, // set desired row height in px
                        }}
                      >
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell
                        key={col.key as string}
                        align={col.align || "left"}
                        style={{
                          width: col.width,
                          maxWidth: col.width,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        padding="none"
                        sx={{
                          height: 45, // set desired row height in px
                        }}
                        title={String(row[col.key])}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Table;
