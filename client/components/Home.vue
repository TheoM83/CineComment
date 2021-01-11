<template>
<div>

  <h1>Commentaires</h1>
  <ol>
  <li v-for="commentary in commentaries" :key="commentary.id">
    <p class='title'>{{commentary.titre}}</p>
    <div class="commentaries-img">
        <div :style="{ backgroundImage: 'url(' + commentary.image + ')' }">
        </div>
      </div>
    <div>
      <p>
      {{'Pseudo : ' + commentary.pseudo}} <br> 
      {{'Commentaires : ' + commentary.commentaires}} <br>
      {{'Nombre de like : ' + commentary.count}} <br>
      {{commentary.idavis}}
      </p>
      <div v-show="connected > 0">
      <button v-if="!isLiked(commentary.idavis)" v-on:click="likeCommentary(commentary.idavis)">Like</button>
      <button v-else v-on:click="dislikeCommentary(commentary.idavis)">Dislike</button>
      </div>
      <button v-on:click="deleteCommentary(commentary.idavis)">Delete</button>
    </div>
  </li>
  </ol>
</div>
</template>
<script>

module.exports = {
  props: {
    commentaries : null,
    likedcomms : null,
    connected : Number
  },
  data () {
    return {
      showForm: false
    }
  },
  methods: {
    async whoAmI () {
      this.$emit('who-am-i')
    },
    async deleteCommentary(idCommentary) {
      this.$emit('delete-commentary', idCommentary)
    },
    async likeCommentary(idCommentary) {
      this.$emit('like-commentary', idCommentary)
    },
    async dislikeCommentary(idCommentary) {
      this.$emit('dislike-commentary', idCommentary)
    },
    isLiked(idavis) {
      for (i = 0; i < this.likedcomms.length; i++) {
          if(this.likedcomms[i].idavis === idavis){
            return true
          }
        } 
        return false
    },
  }
}
</script>

<style>
.commentaries-img {
  flex: 1;
}

.commentaries-img div {
  width: 200px;
  height: 200px;
  background-size: cover;
}

.commentaries-content {
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
</style>
