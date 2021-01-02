const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
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
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    const res3 = await axios.get('/api/me')
    this.connected = res3.data
  },
  methods: {
    async register (credentials) {
      const res = await axios.post('/api/register', { email: credentials.email  , password: credentials.password})
      this.$router.push('/login')
    },
    async whoAmI () {
      const res = await axios.get('/api/me')
      this.connected = res.data
    },
    async login (credentials) {
      const res = await axios.post('/api/login', { email: credentials.email  , password: credentials.password})
      if(res.data) {
        this.$router.push('/')
      }
      const res1 = await axios.get('/api/me')
      this.connected = res1.data
    },
    async addToPanier (articleId) {
      const res = await axios.post('/api/panier', { articleId, quantity: 1 })
      this.panier.articles.push(res.data)
    },
    async removeFromPanier (articleId) {
      const res = await axios.delete('/api/panier/' + articleId)
      const idx = this.panier.articles.findIndex(a => a.id === articleId)
      this.panier.articles.splice(idx, 1)
    },
    async changeQuantity ({ articleId, quantity }) {
      const res = await axios.put('/api/panier/' + articleId, { quantity })
      const article = this.panier.articles.find(a => a.id === articleId)
      article.quantity = quantity
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    }
  }
})
