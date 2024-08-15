<script lang="ts">
    interface Properties {
        id: number;
        name: string;
    }
    export let pokemon_info: Properties;
    let image_element:HTMLImageElement;
    function alternative() {
        image_element.src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    }
</script>
<div class="wrapper">
    <div class="card">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_info.id}.png`} 
        alt="pokemon img here" 
        bind:this={image_element}
        on:error={alternative}/>
        <h1>
            {pokemon_info.name}
        </h1>
    </div>
</div>

<style>
    .wrapper {
  display: flex;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.447), rgba(156, 137, 156, 0.515),rgba(0, 98, 128, 0.668));
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  transition: transform 0.2s;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(227, 159, 159, 0.1);
  width: 200px;
}
.card {
        width: 100%;
        border-radius: 10px;
        background-color: #000000;
        text-align: center;
    }

    .wrapper:hover {
        transform: scale(1.05);
    }

    .card img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
        height: auto;
    }

    .card h1 {
        font-size: 1.5em;
        margin: 10px 0;
        color: #b8abab;

        background: linear-gradient(90deg, #5f74ff, #fef77b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
