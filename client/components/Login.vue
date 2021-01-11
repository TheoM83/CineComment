<template>
  <div>
    <form @submit.prevent="login" v-if="connected === -1">
    <h1>Connexion</h1>
        <input type="email" v-model="credentials.email" placeholder="Email" required> <br><br>
        <input type="password" v-model="credentials.password" placeholder="Password" required> <br><br>
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
  },
  methods: {
    login () {
        this.$emit('login', this.credentials)
    },

    async whoAmI () {
      this.$emit('who-am-i')
    },

    async isConnected(){
        if (this.connected > 0) {
          return true
        }
        return false
    }
  }
}
</script>

<style>
p {
  text-align: center;
  color : blue;
  font-weight: bold;
  font-size: x-large;
}

form {
  text-align: center;
}
</style>