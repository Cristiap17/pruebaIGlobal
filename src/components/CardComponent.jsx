import React, { useEffect, useState } from 'react'
import './CardComponent.css'
import { getPokemonById, getPokemonByName, getAllPokemons } from '../services/pokeAPI'
import { POKEMON_TYPE_BACKGROUND_COLORS, POKEMON_TYPE_COLORS } from '../utils/constans'


export default function CardComponent() {

    const [pokeId, setPokeId] = useState(1)
    const [pokemon, setPokemon] = useState({
        types: [{}]
    })
    const [allPokemons, setAllPokemons] = useState([])
    const [pokemonsFilters, setPokemonsFilters] = useState([])
    const [namePokemon, setNamePokemon] = useState('')
    const [inputEmpty, setInputEmpty] = useState(false)
    const [error, setError] = useState(false)

    let pokemonHeight = (pokemon.height * 10) / 100
    let pokemonWeight = (pokemon.weight * 100) / 1000


    const handleChange = (e) => {
        const pokemonSuggested = allPokemons.filter((pokemon) => pokemon.name.includes(e.target.value).toLowerCase().trim())
        setPokemonsFilters(pokemonSuggested)
        setNamePokemon(e.target.value);
        setError(false)
        setInputEmpty(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (namePokemon !== '') {
            getPokemonByName(namePokemon.toLowerCase().trim()).then(response => {
                setPokeId(response.id)
                setPokemon(response)
            }).catch(() => {
                setError(true)
            })
            setNamePokemon('')
        } else {
            setInputEmpty(true)
            setError(false)
        }
    }

    const handleNextClick = () => {
        setPokeId(pokeId + 1)
    }

    const handlePrevClick = () => {
        setPokeId(pokeId - 1);
    }

    useEffect(() => {
        getAllPokemons().then(response => setAllPokemons(response.results))
    }, [])

    useEffect(() => {
        getPokemonById(pokeId).then(response => setPokemon(response))
    }, [pokeId])

    return (
        <div className='max-container'>
            <div className='searcher-container'>
                <h2>Search your favorite pokemón!</h2>
                <form>
                    <div>
                        <input
                            value={namePokemon}
                            onChange={handleChange}
                            type="text"
                            placeholder='Type your pokemon name...'
                            className={inputEmpty ? 'input-form error' : 'input-form'}
                        />
                        {namePokemon !== ''
                            ? <div className='dropdown'>
                                {pokemonsFilters.map((pokemon, index) =>
                                    <ul key={index} onClick={() => setNamePokemon(pokemon.name)}>
                                        - {pokemon.name}
                                    </ul>
                                )}
                            </div>
                            : ''
                        }
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={'button-submit'}
                    >
                        Search
                    </button>
                </form>
                {inputEmpty && <span className='error-title'>This field can not be blank!</span>}
                {error && <span className='error-title'>Invalid pokemon name! Try again.</span>}
            </div>
            <div className='card-container'>
                <div className='elements-container'>
                    <div className='header-container'>
                        <img className='image-style' src={pokemon?.sprites?.front_default} alt="Mobile Header" />
                        <div style={{ backgroundColor: POKEMON_TYPE_BACKGROUND_COLORS[pokemon?.types[0]?.type?.name] }} className='super-position'></div>
                    </div>
                    <div className='main-footer-container'>
                        <div className='main-container'>
                            <h1>Get <span style={{ color: POKEMON_TYPE_COLORS[pokemon?.types[0]?.type?.name] }}>{pokemon?.name}</span> that help your business grow.</h1>
                            <p>This pokemon is {pokemon?.types[0]?.type?.name} type and its base statistics are the following: </p>
                        </div>
                        <div className='footer-container'>
                            <section>
                                <h2>{`${pokemonHeight}m`}</h2>
                                <span>HEIGHT</span>
                            </section>
                            <section>
                                <h2>{`${pokemonWeight}kg`}</h2>
                                <span>WEIGHT</span>
                            </section>
                            <section>
                                <h2>{pokemon.base_experience}</h2>
                                <span>BASE EXPERIENCE</span>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className='buttons-container'>
                <button disabled={pokeId > 1 ? false : true} onClick={handlePrevClick}>Previous</button>
                <button disabled={pokeId === 1281 ? true : false} onClick={handleNextClick}>Next</button>
            </div>
        </div>
    )
}