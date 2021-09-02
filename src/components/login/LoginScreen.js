export const LoginScreen = ({history}) => {
    const handleLogin = () => {
        // Añade a la historia la ruta anterior
        // history.push('/');

        // Reemplaza la el historial que no visitó el login
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