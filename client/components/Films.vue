<template>
<div>
  <div v-show="!addingFilm">
  <h1>Films</h1>
  <ol>
    

    
  <li v-for="film in films" :key="film.id">
      <h2 v-show="displayFilms()" class="title">{{ film.titre }}  {{'('+film.année+')'}}</h2>
      <div v-show="displayFilms()" class="films-img">
        <div :style="{ backgroundImage: 'url(' + film.image + ')' }">
        </div>
      </div>
    <p v-show="displayFilms()" >{{film.synopsis}}</p>
    <button v-show="displayFilms()" class="delete" v-on:click="deleteFilm(film.idfilm)">Supprimer</button>
    <button v-show="displayFilms()" class="comment" v-on:click="setId(film.idfilm)">Commenter</button>
    <div v-show="displayComment(film.idfilm)">
      <button class="retour" v-on:click="setId(-1)">Retour</button>
      <new-comment 
    :film="film"
    @add-comment="addComment"
  ></new-comment>
    </div>
    
  <br>
  </li>
  </ol>
  <button v-on:click="addingFilm = !addingFilm" >Ajouter film</button>
  </div>
  <div v-show="addingFilm">
  <button v-on:click="addingFilm = !addingFilm" >retour</button>
  <new-film 
      @add-film="addFilm" v-show="displayFilms()"
    ></new-film>
  </div>
</div>
</template>

<script>

module.exports = {
  props: {
      connected: Number
  },
  components: {
    NewComment,
    NewFilm
  },
  props: {
    films : { type: Array, default: [] }
  },
  data () {
    return {
      commentId: -1,
      addingFilm: false
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
    },
    displayComment(filmId){
      if (this.commentId === filmId){
        return true
      }
      return false
    },
    displayFilms(){
      if (this.commentId === -1){
        return true
      }
      return false
    },
    setId(idfilm){
      this.commentId = idfilm
    },
    async isConnected(){
        if (this.connected > 0) {
          return true
        }
        return false
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

li {
  list-style: none;
}

li:before {
  content: '';
  position: absolute;
  width: 3em;
  height: 3.5em;
  margin-left: -3.5em;
  margin-top: -1em;
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
