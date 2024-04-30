import { Box, Pagination } from '@mui/material'
import { DataPaginationProps } from './types/DataPaginationProps.ts'
import { ChangeEvent } from 'react'

export const DataPagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: DataPaginationProps) => {
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  )
}
