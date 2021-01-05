<template>
<div>
  <h1>Commenter</h1>
  <h2>{{ film.titre }}</h2>
  <div class="films-img">
    <div :style="{ backgroundImage: 'url(' + film.image + ')' }">
    </div>
  </div>
  <br>
  <textarea type="text" v-model="comment.commentaire" placeholder="Commentaire" required></textarea>
  <button type="submit">Ajouter</button>
</div>

  <!-- <new-comment
    :film="film"
    @add-comment="addComment"
  ></new-comment> -->

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

h2 {
  text-decoration: underline;
}
</style>
