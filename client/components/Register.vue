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
