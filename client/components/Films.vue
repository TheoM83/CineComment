<template>
<div>
  <p>>Films</p>
  <ol>
  <li v-for="film in films" :key="film.id">
    {{ film }}
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
    films : null
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
</style>
