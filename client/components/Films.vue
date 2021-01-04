<template>
<div>
  <h1>Films</h1>
  <ol>
  <li v-for="film in films" :key="film.id">
    {{ film.titre }} {{'('+film.année+')'}}
    <br><br>
    <div class="films-img">
      <div :style="{ backgroundImage: 'url(' + film.image + ')' }">
      </div>
      {{film.synopsis}}
    </div>
    <br>
    <button v-on:click="deleteFilm(film.idfilm)">Delete</button>
    <div id="example">
  <new-comment
      :film="film"
      @add-comment="addComment"
    ></new-comment>
  </div>
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
  width: 100px;
  height: 100px;
  background-size: cover;
}

.films-content {
  flex: 3;
}
</style>
