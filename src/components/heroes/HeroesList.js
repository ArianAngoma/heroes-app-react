import {getHeroesByPublisher} from "../../selectors/getHeroesByPublisher";
import {HeroCard} from "./HeroCard";
import {useMemo} from "react";

export const HeroesList = ({publisher}) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="card-columns">
            {
                heroes.map(hero => (
                    <HeroCard key={hero.id}
                              {...hero}/>
                ))
            }
        </div>
    )
}