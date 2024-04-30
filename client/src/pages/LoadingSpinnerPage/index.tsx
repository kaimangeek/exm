import { CircularProgress } from '@mui/material'
import { memo } from 'react'
import { LoadingSpinnerBox } from './loadingSpinner.ts'

export const LoadingSpinnerPage = memo(() => {
  return (
    <>
      <p>Loading...</p>
      <LoadingSpinnerBox>
        <CircularProgress
          sx={{ color: 'black' }}
          size={100}
          variant="indeterminate"
        />
      </LoadingSpinnerBox>
    </>
  )
})
