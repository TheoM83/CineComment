<template>
<div>

  <h1>Commentaires</h1>
  <ol>
  <li v-for="commentary in commentaries" :key="commentary.id">
    <div id='cadre'>
    <p class='title'>{{commentary.titre}}</p>
    <div class="commentaries-img">
        <div :style="{ backgroundImage: 'url(' + commentary.image + ')' }">
        </div>
      </div>
    <div>
      <p>
      {{commentary.pseudo + " :"}} <br> 
      {{commentary.commentaires}} <br>
      {{'Nombre de like : ' + commentary.count}}
      </p>
      <div v-show="connected > 0">
      <button class='like' v-if="!isLiked(commentary.idavis)" v-on:click="likeCommentary(commentary.idavis)">Like</button>
      <button class='dislike' v-else v-on:click="dislikeCommentary(commentary.idavis)">Dislike</button>
      </div>
      <button class='delete' v-on:click="deleteCommentary(commentary.idavis)">Delete</button>
    </div>
    <br></div><br>
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

#cadre {
  border: 2px solid black;
  padding: .5em;
}

.delete {
  background-color: tomato;
}

.like {
  background-color: greenyellow;
}

.dislike {
  background-color:orange;
}

button {
  font-weight: bolder;
  font-size: 15px;
}

li {
  font-family: cursive;
  text-align: left;
  color: black;
}

</style>
