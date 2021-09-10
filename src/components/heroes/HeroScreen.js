import {Redirect, useParams} from "react-router-dom";
import {getHeroById} from "../../selectors/getHeroById";
import {useMemo} from "react";
import {heroImages} from "../../helpers/heroImages";

// import batman from '../../assets/heroes/dc-batman.jpg';
// const heroImages = require.context('../../assets/heroes', true);

export const HeroScreen = ({history}) => {
    const {heroId} = useParams();

    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    if (!hero) return <Redirect to="/"/>

    const handleReturn = () => {
        if (history.length <= 2) history.push('/');
        else history.goBack();
    }

    const {superhero, publisher, alter_ego, first_appearance, characters} = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                {/* Desde public/assets */}
                {/*<img src={`../assets/heroes/${heroId}.jpg`} alt={superhero}
                     className="img-thumbnail animate__animated animate__fadeInLeft"/>*/}

                {/* Cuando tenemos un import */}
                {/*<img src={batman} alt={superhero}
                     className="img-thumbnail animate__animated animate__fadeInLeft"/>*/}

                <img src={heroImages(`./${heroId}.jpg`).default} alt={superhero}
                     className="img-thumbnail animate__animated animate__fadeInLeft"/>
            </div>

            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: {alter_ego}</b></li>
                    <li className="list-group-item"><b>Publisher: {publisher}</b></li>
                    <li className="list-group-item"><b>First appearance: {first_appearance}</b></li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-outline-info"
                        onClick={handleReturn}>
                    Return
                </button>
            </div>
        </div>
    )
}