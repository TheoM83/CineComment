<template>
<div>

  <p>Commentaires</p>
  <ol>
  <li v-for="commentary in commentaries" :key="commentary.id">
    {{ commentary }}
    <div v-show="connected > 0">
    <button v-if="!isLiked(commentary.idavis)" v-on:click="likeCommentary(commentary.idavis)">LIKE</button>
    <button v-else v-on:click="dislikeCommentary(commentary.idavis)">DISLIKE</button>
    </div>
    <button v-on:click="deleteCommentary(commentary.idavis)">Delete</button>
    
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
</style>
