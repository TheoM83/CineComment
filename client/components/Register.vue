<template>
  <div>
    <form @submit.prevent="register">
    <h1>Inscription</h1>
        <input type="text" v-model="credentials.pseudo" placeholder="Pseudo" required>
        <input type="email" v-model="credentials.email" placeholder="Email" required>
        <input type="password" v-model="credentials.password" placeholder="Password" required>
        <button type="submit">S'inscrire</button>
      </form>
  </div>
</template>

<script>
module.exports = {
  props: {
    connected: Number
  },
  data () {
    return {
        credentials: {
            pseudo: '',
            email: '',
            password: '',
        }
    }
  },
  async mounted () {
  },
  methods: {
      register () {
        this.$emit('register', this.credentials)
    },
  }
}
</script>

<style>
</style>