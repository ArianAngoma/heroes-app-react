import {heroes} from "../data/heroes";

export const getHeroesByPublisher = (id) => heroes.find(hero => hero.id === id);