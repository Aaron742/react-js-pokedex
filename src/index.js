import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import Tilt from "react-parallax-tilt" // Inclinaison de carte
import redCloudImage from './images/red-cloud.png'

function PokemonList({ clickPokemon }) {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(data => {
                const promises = data.results.map(pokemon => fetch(pokemon.url)
                    .then(response => response.json()));
                Promise.all(promises)
                    .then(pokemonData => {
                        const updatedPokemonList = pokemonData.map((data, index) => ({
                            name: data.name,
                            types: data.types.map(type => type.type.name),
                            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                        }));
                        setPokemonList(updatedPokemonList);
                    })
                })
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getTypeBackground = (type) => {
        switch (type) {
            case 'fairy':
                return <span class="badge" style={{color: 'white', backgroundColor: "deeppink"}}>{type.toUpperCase()}</span>
                break;
            case 'ground':
                return <span class="badge" style={{color: 'white', backgroundColor: "sandybrown"}}>{type.toUpperCase()}</span>
                break;
            case 'fire':
                return <span class="badge" style={{color: 'white', backgroundColor: "orange"}}>{type.toUpperCase()}</span>
                break;
            case 'bug':
                return <span class="badge" style={{color: 'white', backgroundColor: "lightgreen"}}>{type.toUpperCase()}</span>
                break;
            case 'grass':
                return <span class="badge text-bg-success">{type.toUpperCase()}</span>
                break;
            case 'water':
                return <span class="badge text-bg-primary">{type.toUpperCase()}</span>
                break;
            case 'flying':
                return <span class="badge text-bg-secondary">{type.toUpperCase()}</span>
                break;
            case 'ice':
                return <span class="badge text-bg-info">{type.toUpperCase()}</span>
                break;
            case 'psychic':
                return <span class="badge" style={{color: 'white', backgroundColor: "pink"}}>{type.toUpperCase()}</span>
                break;
            case 'rock':
                return <span class="badge" style={{color: 'white', backgroundColor: "brown"}}>{type.toUpperCase()}</span>
                break;
            case 'electric':
                return <span class="badge text-bg-warning">{type.toUpperCase()}</span>
                break;
            case 'fighting':
                return <span class="badge text-bg-danger">{type.toUpperCase()}</span>
                break;
            case 'poison':
                return <span class="badge" style={{color: 'white', backgroundColor: "purple"}}>{type.toUpperCase()}</span>
                break;
            case 'dragon':
                return <span class="badge" style={{color: 'white', backgroundColor: "darkblue"}}>{type.toUpperCase()}</span>
                break;
            default:
                return <span class="badge text-bg-light">{type.toUpperCase()}</span>
                break;
        }
    }

    return (
        <div className="container p-4">
            <Tilt>
                <h1 className="title mb-3">Liste des Pokémons</h1>
            </Tilt>
            <div className="row">
                {pokemonList.map(pokemon => (
                    <div className="col-sm-6 col-md-4 col-lg-3 p-3" key={pokemon.name}>
                        <Tilt glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius="20px">
                            <div className="crd">
                                <img src={redCloudImage} alt="Red cloud" className="redcloud" />
                                <img src={pokemon.image} className="card-image card-img-top border-bottom border-primary" alt={pokemon.name} />
                                <div className="card-body">
                                    <h5 className="card-title mt-2">{capitalizeFirstLetter(pokemon.name)}</h5>
                                    <div className="d-flex gap-2 justify-content-center mt-2">
                                        {pokemon.types.map(type => getTypeBackground(type)) }
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<PokemonList clickPokemon={(pokemon) => console.log(pokemon)} />);