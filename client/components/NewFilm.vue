<template>
    <form @submit.prevent="addFilm">
        <h1>Nouveau film à ajouter :</h1>
        <input type="text" v-model="newFilm.titre" placeholder="Nom du Film" required>
        <input type="text" v-model="newFilm.date" placeholder="Date" required>
        <input type="text" v-model="newFilm.genre" placeholder="Genre" required>
        <textarea type="text" v-model="newFilm.synopsis" placeholder="Synopsis" required></textarea>
        <input type="text" v-model="newFilm.image" placeholder="Lien vers l'image">
        <br><br><button type="submit">Ajouter</button>
    </form>
</template>
 
<script>
module.exports = {
  props: {
    film : null
  },
  data () {
    return {
        newFilm: {
            titre: '',
            date: '',
            genre: '',
            synopsis: '',
            image: ''
        }
    }
  },
  methods: {
    addFilm () {
        this.$emit('add-film', this.newFilm)
    },
  }
}
</script>
 
<style>
</style>
