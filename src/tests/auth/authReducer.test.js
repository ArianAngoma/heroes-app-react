import {authReducer} from "../../auth/authReducer";
import {types} from "../../types/types";

describe('Pruebas en authReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    });

    test('Debe de autenticar y colocar el name del usuario', () => {
        const user = {
            name: 'Arian Angoma Vilchez',
            logged: true
        }
        const state = authReducer({logged: false}, {type: types.login, payload: user});
        expect(state).toEqual(user);
    });

    test('Debe de borrar el name del usuario y logged en false', () => {
        const user = {
            name: 'Arian Angoma Vilchez',
            logged: true
        }
        const state = authReducer(user, {type: types.logout});
        expect(state).toEqual({logged: false});
    });
})