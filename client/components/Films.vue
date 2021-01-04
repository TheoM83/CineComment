<template>
<div>
  <h1>Films</h1>
  <ol>
  <li v-for="film in films" :key="film.id">
    <h2 class="title">{{ film.titre }}  {{'('+film.année+')'}}</h2>
    <div class="films-img">
      <div :style="{ backgroundImage: 'url(' + film.image + ')' }">
      </div>
    </div>
    <p>{{film.synopsis}}</p>
    <button class="delete" v-on:click="deleteFilm(film.idfilm)">Supprimer</button>
    <button class="comment" v-on:click="comment(film.idfilm)">Commenter</button>
    <new-comment
    :film="film"
    @add-comment="addComment"
  ></new-comment>
  <br>
  </li>
  </ol>
  <new-film
      @add-film="addFilm"
    ></new-film>
</div>
</template>

<script>

module.exports = {
  components: {
    NewComment,
    NewFilm
  },
  props: {
    films : { type: Array, default: [] }
  },
  data () {
    return {
      showForm: false
    }
  },
  methods: {
    addComment (comment) {
        this.$emit('add-comment', comment)
    },
    addFilm (newFilm) {
        this.$emit('add-film', newFilm)
    },
    deleteFilm(idfilm){
        this.$emit('delete-film', idfilm)
    },
    comment(idfilm){
        this.$emit('comment', idfilm);
    }
  }
}
</script>

<style>

films {
  display: flex;
}

.films-img {
  flex: 1;
}

.films-img div {
  width: 200px;
  height: 200px;
  background-size: cover;
}

.films-content {
  flex: 3;
}

.title {
  text-decoration: underline;
}

h1 {
  text-decoration: underline;
  text-align: center;
  padding: 3px;
}

ol {
  margin: 10px;
}

li {
  margin-left: -40px;
  list-style: none;
  border: 2px solid black;
  padding: .5em;
}

button {
  font-weight: bolder;
  font-size: 15px;
}

.delete {
  background-color: tomato;
}

.comment {
  background-color: cadetblue;
}

</style>
