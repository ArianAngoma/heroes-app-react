import {heroes} from "../../data/heroes";
import {HeroCard} from "../heroes/HeroCard";
import {useForm} from "../../hooks/useForm";

export const SearchScreen = () => {
    const [values, handleInputChange] = useForm({
        searchHero: ''
    });

    const {searchHero} = values;

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchHero);
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
                        heroes.map(hero => (
                            <HeroCard key={hero.id} {...hero}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}