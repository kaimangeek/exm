import {Route, Routes} from "react-router-dom";
import AuthUser from "../AuthUser";
import {MyApplicationsPage} from "../../pages/MyApplicationsPage";
import {CreateApplicationPage} from "../../pages/CreateApplicationPage";
import ApplicationDetails from "../../pages/ApplicationDetail";
import {ErrorPage} from "../../pages/ErrorPage";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const {isAuth} = useSelector(state => state.userSlice);

    return (
        <Routes>
            <Route path="/login" element={<AuthUser />} />
            <Route path="/registration" element={<AuthUser />} />
            {
                isAuth === true && (
                    <>
                        <Route path="/applications" element={<MyApplicationsPage />} />
                        <Route
                            path="/applications/create"
                            element={<CreateApplicationPage />}
                        />
                        <Route path="/application/:id" element={<ApplicationDetails />} />
                    </>
                )
            }
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRouter;