<script lang="ts">
    import PokemonCard from "../components/PokemonCard.svelte";
    import {
        POKEMONS_NAMES,
        POKEMONS_IDS,
        INDEXES_MAP,
        range,
    } from "../stores/pokemon_store";

    const elements_per_page: number = 10;

    let pagination_boundaries: number[] = [0, elements_per_page];
    let indexes_range: number[] = [0, $POKEMONS_NAMES.length];
    let pagination_offset: number = indexes_range[0];

    function next_page() {
        if (pagination_boundaries[1] === indexes_range[1]) return
        pagination_boundaries[0] = pagination_boundaries[1];
        if (pagination_boundaries[1] + elements_per_page <= indexes_range[1]) {
            pagination_boundaries[1] += elements_per_page;
        } else {
            pagination_boundaries[1] = indexes_range[1];
        }
    }
    function prev_page() {
        if (pagination_boundaries[0] === indexes_range[0]) return
        pagination_boundaries[1] = pagination_boundaries[0];
        if (pagination_boundaries[0] - elements_per_page >= indexes_range[0]) {
            pagination_boundaries[0] -= elements_per_page;
        } else {
            pagination_boundaries[0] = indexes_range[0];
        }
    }

    let pokemon_filtered_name: string = "";

    function filter_elements(e: any) {
        pokemon_filtered_name = e.currentTarget.value;
        
        if (pokemon_filtered_name[0] === undefined) {
            pagination_boundaries = [0, elements_per_page];
            indexes_range = [0, $POKEMONS_NAMES.length];
            pagination_offset = 0;
            return;
        }
        let range_trgt = $INDEXES_MAP.get(pokemon_filtered_name[0]);
        if (range_trgt === undefined) {
            indexes_range = [0, 0];
            pagination_boundaries = [0, 0];
            return;
        }
        // deep copy, avoiding mutation of reference
        range_trgt = [range_trgt[0],range_trgt[1]]

        // delimiting start
        for (let i = range_trgt[0]; i < range_trgt[1]; i++) {
            if ($POKEMONS_NAMES[i].startsWith(pokemon_filtered_name)) {
                range_trgt[0] = i;
                break;
            }
        }

        for (let i = range_trgt[0]; i < range_trgt[1]; i++) {
            if (!$POKEMONS_NAMES[i].startsWith(pokemon_filtered_name)) {
                indexes_range = [range_trgt[0], i];
                pagination_boundaries = [range_trgt[0], range_trgt[0]];
                next_page();
                pagination_offset = indexes_range[0];
                return;
            }
        }
        indexes_range = range_trgt;
        pagination_boundaries = [range_trgt[0], range_trgt[0]];
        next_page();
        pagination_offset = indexes_range[0];
    }
</script>

<main>
    <div class="main-container">
        <a href="/" style="text-decoration: none;">
            <h1 id="page-title">Pokemon Catalogue</h1>
        </a>
        <div class="search-bar-container">
            <label for="pokemon-search-input">Filter by name</label>
            <input
                type="text"
                name="pokemon-search-input"
                on:input={filter_elements}
            />
        </div>
        <div class="card-container">
            {#each range(pagination_boundaries) as i}
                <PokemonCard
                    pokemon_info={{
                        id: $POKEMONS_IDS[i],
                        name: $POKEMONS_NAMES[i],
                    }}
                ></PokemonCard>
            {/each}
        </div>
        <div class="page-options">
            {#if pagination_boundaries[0] !== indexes_range[0]}
                <button on:click={prev_page}>&lt;</button>
            {/if}
            <p>
                {pagination_boundaries[0] - pagination_offset} - {pagination_boundaries[1] -
                    pagination_offset} de {indexes_range[1] - indexes_range[0]}
            </p>
            {#if pagination_boundaries[1] !== indexes_range[1]}

            <button on:click={next_page}>&gt;</button>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;
    }
    .main-container {
        margin: 0;
        place-items: center;
        text-align: center;
        margin: 0 auto;
    }
    #page-title{
        font-size: 500%;
        background: linear-gradient(90deg, #5f74ff, #fef77b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .card-container {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        
    }
    .search-bar-container {
        width: 80%;
        margin: 0 auto;
        margin-bottom: 40px;
        padding: 40px;
        border-radius: 8px;
        background: linear-gradient(40deg, #373737, #1f1f1f, #201b1b);
        /* -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; */
    }
    .search-bar-container > input {
        padding: 1%;
        border-radius: 8px;
        border: 1px solid rgb(186, 186, 186);
        background-color: rgb(65, 64, 64);
        font-size: large;
        /* border-style: do; */
    }
    .page-options {
        display: flex;
        justify-content: center;
    }
    .page-options > p {
        margin: auto 10px;
    }
    h1 {
        font-size: 3.2em;
    }


button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
</style>
