import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllQuery, useGetByUserQuery } from '../../__redux__/services/application.ts';

function ApplicationDetails() {
    const { id } = useParams(); // Получение ID из URL
    const user = useSelector(state => state.userSlice);

    // Поиск деталей заявления по ID или запрос к серверу
    const {data} = user.role === 'USER' ? useGetByUserQuery(user.id) : useGetAllQuery();
    let application
    if (data) {
        application = data.application.find(app => app.id.toString() === id);
    }

    return (
        <div>
            {application ? (
                <div>
                    <h1>Детали заявления</h1>
                    <p>Номер автомобиля: {application.carNumber}</p>
                    <p>Описание: {application.description}</p>
                    <p>Статус: {application.status}</p>
                </div>
            ) : (
                <p>Заявление не найдено.</p>
            )}
        </div>
    );
}

export default ApplicationDetails;
