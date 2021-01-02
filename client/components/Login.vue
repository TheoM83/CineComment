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

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
