import {mount} from "enzyme";
import {AppRouter} from "../../router/AppRouter";
import {AuthContext} from "../../auth/AuthContext";

describe('Pruebas en <AppRouter/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('Debe de mostrar login si no está autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de mostrar el componente de marvel si está autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Arian Angoma Vilchez'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
});