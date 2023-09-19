const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;
let poke;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => `
      <a href="pokemon.html?id=${pokemon.number}"
        <li class="pokemon ${pokemon.type}">
          <span id="${pokemon.number}" class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
      `)
      .join('');
    pokemonList.innerHTML += newHtml;
    const pokemonsInfo = document.querySelectorAll('.number');
    console.log(pokemonsInfo);

    pokemonsInfo.forEach((div) => {
      // div.addEventListener('click', () => {
      //   // Extrai o nome ou número do Pokémon da div clicada
      //   const pokemonNumber = div.id;
      //   console.log(`ss`, div.id)

  });
});
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordWithNextPage = offset + limit;

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
