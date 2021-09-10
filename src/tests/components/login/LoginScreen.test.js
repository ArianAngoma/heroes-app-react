import {mount} from "enzyme";
import {LoginScreen} from "../../../components/login/LoginScreen";
import {AuthContext} from "../../../auth/AuthContext";
import {MemoryRouter} from "react-router-dom";
import {types} from "../../../types/types";

describe('Pruebas en <LoginScreen/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const historyMock = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <LoginScreen history={historyMock}/>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegación', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {name: 'Arian Angoma Vilchez'}
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/');

        // Creamos un localStorage para poder hacer la prueba
        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect(historyMock.replace).toHaveBeenCalledWith('/dc');
    });
})