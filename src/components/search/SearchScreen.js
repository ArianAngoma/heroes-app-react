import {useLocation} from "react-router-dom";
import queryString from "query-string";
import {heroes} from "../../data/heroes";
import {HeroCard} from "../heroes/HeroCard";
import {useForm} from "../../hooks/useForm";
import {useMemo} from "react";
import {getHeroesByName} from "../../selectors/getHeroesByName";

export const SearchScreen = ({history}) => {
    const location = useLocation();

    const {q = ''} = useMemo(() => queryString.parse(location.search), [location.search]);

    const [values, handleInputChange] = useForm({
        searchHero: q
    });

    const {searchHero} = values;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchHero}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input type="text"
                               placeholder="Find your hero"
                               className="form-control"
                               autoComplete="off"
                               name="searchHero"
                               value={searchHero}
                               onChange={handleInputChange}/>

                        <button type="submit"
                                className="btn m-1 btn-block btn-outline-primary">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '') &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}