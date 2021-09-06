import {types} from "../../types/types";
import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext";

export const LoginScreen = ({history}) => {
    const {dispatch} = useContext(AuthContext);

    const handleLogin = () => {
        // Añade a la historia la ruta anterior
        // history.push('/');

        // Reemplaza la el historial que no visitó el login
        // history.replace('/');

        dispatch({
            type: types.login,
            payload: {
                name: 'Arian Angoma Vilchez'
            }
        });

        history.replace('/');
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <hr/>

            <button
                className="btn btn-primary"
                onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}