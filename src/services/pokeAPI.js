const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

export const getAllPokemons= async () =>{
    const resp = await fetch(`${BASE_URL}?limit=100000&offset=0`)
    const data = await resp.json()
    return data
}

export const getPokemonById = async (pokemonId) =>{
    const resp = await fetch(`${BASE_URL}/${pokemonId}`)
    const data = await resp.json()
    return data
}

export const getPokemonByName = async (pokemonName) =>{
    try {
    const resp = await fetch(`${BASE_URL}/${pokemonName}`)
    const data = await resp.json()
    return data
    } catch (error) {
        throw Error('Nombre de pokemon invalido.')
    }
    
}