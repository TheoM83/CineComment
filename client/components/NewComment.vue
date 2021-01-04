<template>
    <form @submit.prevent="addComment">
        <h2>Commenter</h2>
        {{ film.titre }}
        {{ film.image }}
        <textarea type="text" v-model="comment.commentaire" placeholder="Commentaire" required></textarea>
        <button type="submit">Ajouter</button>
    </form>
</template>
 
<script>
module.exports = {
  props: {
    film : Object
  },
  data () {
    return {
       comment: {
            id : this.film.idfilm,
            commentaire : ''
        }   
    }
  },
  methods: {
    addComment () {
      this.$emit('add-comment', this.comment)
    },
  }
}
</script>
 
<style>
</style>
