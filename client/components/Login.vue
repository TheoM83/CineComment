<template>
  <div>
    <form @submit.prevent="login" v-if="connected === -1">
    <h2>Connexion</h2>
        <input type="email" v-model="credentials.email" placeholder="Email" required>
        <input type="password" v-model="credentials.password" placeholder="Password" required>
        <button type="submit">Se Connecter</button>
      </form>
  <div v-else>
    <p>Vous êtes déjà connecté</p>
  </div>
      
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
    this.$emit('who-am-i')
    console.log(this.connected)
  },
  methods: {
    login () {
        console.log(this.credentials)
        this.$emit('login', this.credentials)
    },

    async whoAmI () {
      this.$emit('who-am-i')
    },

    async isConnected(){
        if (this.connected == -1) {
          return false
        }
        return true
    }
  }
}
</script>

<style>
</style>