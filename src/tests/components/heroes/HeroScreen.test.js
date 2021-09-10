import {mount} from "enzyme";
import {HeroScreen} from "../../../components/heroes/HeroScreen";
import {MemoryRouter, Route} from "react-router-dom";

describe('Pruebas en <HeroScreen/>', () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Debe de mostrar un hero si el parametro existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Debe de regrear a la pantalla anterior con PUSH', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId"
                       component={(props) => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('Debe de llamar a la función goBack', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId"
                       component={(props) => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledTimes(0);
        expect(historyMock.goBack).toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spiderErrooooooor']}>
                <Route path="/hero/:heroId"
                       component={(props) => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    })
})