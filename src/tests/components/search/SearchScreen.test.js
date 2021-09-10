import {mount} from "enzyme";
import {MemoryRouter, Route} from "react-router-dom";
import {SearchScreen} from "../../../components/search/SearchScreen";

describe('Pruebas en <SearchScreen/>', () => {
    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route oath="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route oath="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batmanError']}>
                <Route oath="/search" component={SearchScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batmanError')
    });

    test('Debe de llamar el push del history', () => {
        const historyMock = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route oath="/search" component={() => <SearchScreen history={historyMock}/>}/>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchHero',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault() {
            }
        });

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman');
    });
});