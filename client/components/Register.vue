<template>
  <div>
    <form @submit.prevent="register">
    <h2>Inscription</h2>
        <input type="email" v-model="credentials.email" placeholder="Email" required>
        <input type="password" v-model="credentials.password" placeholder="Password" required>
        <button type="submit">S'Inscrire</button>
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