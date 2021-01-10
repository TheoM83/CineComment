<template>
<div>
  <h1>Commenter</h1>
  <div class="films-img">
    <div :style="{ backgroundImage: 'url(' + film.image + ')' }">
    </div>
  </div>
  <h2>{{ film.titre }}</h2>
  <form @submit.prevent="addComment">
  <textarea type="text" v-model="comment.commentaire" placeholder="Commentaire" required></textarea>
  <button type="submit">Ajouter</button>
  </form>
</div>
</template>
 
<script>
module.exports = {
  props: {
    film : Object
  },
  data () {
    return {
      showForm: false,
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
</style>
