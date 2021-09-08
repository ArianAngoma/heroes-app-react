import {mount} from "enzyme";
import {AuthContext} from "../../auth/AuthContext";
import {DashboardRoutes} from "../../router/DashboardRoutes";
import {MemoryRouter} from "react-router-dom";

describe('Pruebas en <DashboardRoutes/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Arian Angoma Vilchez'
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <DashboardRoutes/>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Arian Angoma Vilchez');
    });
})