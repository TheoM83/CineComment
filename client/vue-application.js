const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Home = window.httpVueLoader('./components/Home.vue')
const Films = window.httpVueLoader('./components/Films.vue')
const NewComment = window.httpVueLoader('./components/NewComment.vue')
const NewFilm = window.httpVueLoader('./components/NewFilm.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/films', component: Films },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    connected : null,
    films: [],
    commentaries : []
  },
  async mounted () {
    const res1 = await axios.get('/api/films')
    this.films = res1.data

    const res2 = await axios.get('/api/commentaries')
    this.commentaries = res2.data

    const res3 = await axios.get('/api/me')
    this.connected = res3.data
  },
  methods: {
    async register (credentials) {
      console.log("XXXX")
      console.log(credentials)
      const res = await axios.post('/api/register', { pseudo : credentials.pseudo, email: credentials.email  , password: credentials.password})
      this.$router.push('/login')
    },
    async whoAmI () {
      const res = await axios.get('/api/me')
      this.connected = res.data
    },
    async login (credentials) {
      const res = await axios.post('/api/login', {  email: credentials.email  , password: credentials.password})
      if(res.data) {
        this.$router.push('/')
      }
      const res1 = await axios.get('/api/me')
      this.connected = res1.data
    },
    async addComment (comment) {
      await axios.post('/api/commentary', { idFilm : comment.id , Commentary : comment.commentaire})
      document.location.reload();
    },
    async addFilm (film) {
      await axios.post('/api/film', {titre : film.titre ,date : film.date ,genre : film.genre ,synopsis : film.synopsis ,image : film.image })
      document.location.reload();
    },
    async deleteCommentary (idCommentary) {
      await axios.delete('/api/commentary'+ idCommentary)
      document.location.reload();
    },
    async deleteFilm (idFilm) {
      await axios.delete('/api/film'+ idFilm)
      document.location.reload();
    },
    async comment (idFilm) {
      this.$router.push('/NewComment')
    }
  }
})
