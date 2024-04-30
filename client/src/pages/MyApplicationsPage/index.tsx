import { Container } from './style.ts'
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useEffect, useState, MouseEvent } from 'react'
import {
  useGetAllQuery,
  useGetByUserQuery,
  useUpdateStatusApplicationMutation,
} from '../../__redux__/services/application.ts'
import { useSelector } from 'react-redux'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import { useNavigate } from 'react-router-dom'
import { DataPagination } from '../../components/DataPagination'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'


export const MyApplicationsPage = () => {
  const itemsPerPage = 5
  const [page, setPage] = useState(1)
  const user = useSelector(userSelector)

  console.log(user.role)

  const { data: userData, refetch: userDataRefetch } = useGetByUserQuery(
      user.id
  )
  const { data: allData, refetch: allDataRefetch } = useGetAllQuery({})

  const data = user.role === 'USER' ? userData : allData
  // const isLoading = user.role === 'USER' ? isUserDataLoading : isAllDataLoading

  const [updateStatusApplication] = useUpdateStatusApplicationMutation()

  const handleChange = (value: number) => {
    setPage(value)
  }

  const getDataSlice = () => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.application.slice(startIndex, endIndex)
  }

  const handleUpdateStatus = (
      carNumber: string,
      isAccepted: boolean,
      event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    updateStatusApplication({ carNumber, isAccepted })
    allDataRefetch()
  }

  const navigate = useNavigate()

  console.log(data)

  useEffect(() => {
    if (user.role === 'USER' && userDataRefetch) {
      userDataRefetch()
    } else if (allDataRefetch) {
      allDataRefetch()
    }
  }, [user.role, userDataRefetch, allDataRefetch])

  return (
      <Container>
        <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
          Мои заявления
        </Typography>
        <div>
          {!data && <Typography>Актуальные заявления отсутствуют</Typography>}
          <List>
            {data && (
                <>
                  {getDataSlice().map((application) => (
                      <ListItem
                          key={application.id}
                          onClick={() => navigate(`/application/${application.id}`)}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            backgroundColor:
                                application.status === 'Принят'
                                    ? '#8bc34a5c'
                                    : application.status === 'Отклонен'
                                        ? '#ff572273'
                                        : '#E0E0E0',
                            borderRadius: '5px',
                            padding: '10px',
                            marginBottom: '10px',
                            cursor: 'pointer',
                          }}
                      >
                        <ListItemText>
                          <strong>Номер автомобиля:</strong> {application.carNumber}
                        </ListItemText>
                        <ListItemText>
                          <strong>Описание:</strong> {application.description}
                        </ListItemText>
                        <ListItemText>
                          <strong>Статус:</strong> {application.status}
                        </ListItemText>
                        {application.status === 'В ожидании' &&
                            user.role !== 'USER' && (
                                <>
                                  <IconButton
                                      onClick={(e) =>
                                          handleUpdateStatus(application.carNumber, true, e)
                                      }
                                      size="small"
                                  >
                                    <DoneIcon fontSize="small" color="success" />
                                  </IconButton>
                                  <IconButton
                                      onClick={(e) =>
                                          handleUpdateStatus(application.carNumber, false, e)
                                      }
                                      size="small"
                                  >
                                    <ClearIcon fontSize="small" color="error" />
                                  </IconButton>
                                </>
                            )}
                      </ListItem>
                  ))}
                </>
            )}
          </List>
          {data && data.application.length && (
              <DataPagination
                  pageCount={Math.ceil(data.application.length / itemsPerPage)}
                  currentPage={page}
                  onPageChange={handleChange}
              />
          )}
        </div>
      </Container>
  )
}
