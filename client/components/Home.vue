<template>
<div>
  <p>>Commentaires</p>
  <ol>
  <li v-for="commentary in commentaries" :key="commentary.id">
    {{ commentary }}
    <button v-on:click="deleteCommentary(commentary.idavis)">Delete</button>
  </li>
  </ol>
</div>
</template>
<script>

module.exports = {
  props: {
    commentaries : null
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
    }
  }
}
</script>

<style>
</style>
