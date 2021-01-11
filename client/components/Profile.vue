<template>
  <div>
    <form @submit.prevent="updatePseudo" v-if="connected >0">
    <h1>Changer Pseudo</h1>
        <input type="text" v-model="pseudo" placeholder="pseudo" required><br><br>
        <button type="submit">UPDATE</button>
    </form>
    <br><br><br><br>
    <form @submit.prevent="updateMDP" v-if="connected >0">
    <h1>Changer MDP</h1>
        <input type="text" v-model="mdp" placeholder="MDP" required><br><br>
        <button type="submit">UPDATE</button>
    </form>
  <div v-else>
    <p class='notconnected'>Vous n'êtes pas connecté</p>
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
        },
        pseudo: '',
        mdp: ''
    }
  },
  async mounted () {
    this.$emit('who-am-i')
  },
  methods: {
    updatePseudo () {
      const updateObj = {id : this.connected, pseudo : this.pseudo}
      this.$emit('update-pseudo', updateObj)
    },
    updateMDP () {
      const updateObj = {id : this.connected, mdp: this.mdp}
        this.$emit('update-mdp', updateObj)
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
.notconnected {
  text-align: center;
  font-weight: bold;
  color: red;
  font-size: large;
  font-family: cursive;
}
</style>