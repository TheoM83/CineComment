const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const cookieParser = require('cookie-parser')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'FCMA77127',
  database: 'projetWeb'
 })

client.connect()

//CONNECTIONS
router.get('/me', async (req, res) => {
  if (typeof req.session.userId === 'undefined'){
    res.json(-1)
  }
  else {
    res.json(req.session.userId)
  }
  
})

router.post('/register', async(req, res) => {
  const pseudo = req.body.pseudo
  const email = req.body.email
  const password = req.body.password
  await check(pseudo, email, password)
  res.send()
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const id = await login(email, password)
  if (!(id === -1)){
    if (typeof req.session.userId === 'undefined'){
      req.session.userId = id
    }
  }
  else {
    res.status(401).json({ message: "Wrong"})
  }
  
  res.json(id)
})

async function add (pseudo, email, password) {
  const sql = "INSERT INTO users (pseudo, email, passwords) VALUES ($1, $2, $3)"
  const hash = await bcrypt.hash(password, 10)
  await client.query({
    text: sql,
    values: [pseudo, email, hash] // ici name et description ne sont pas concaténées à notre requête
  })
}

async function check (pseudo, email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rowCount === 0){
    add(pseudo, email, password)
  }
  else {
  }
}

async function login (email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rows[0]){
    if (await bcrypt.compare(password, r.rows[0]['passwords'])){
        return r.rows[0]['iduser']
    }
  }
  return -1
}

router.post('/profileUsr', async(req, res) => {
  const id = req.body.id
  const pseudo = req.body.pseudo
  await updatePseudo(id, pseudo)
  res.send()
})

async function updatePseudo(id, pseudo) {
  const sql = "UPDATE users SET pseudo = $2 WHERE iduser = $1"
  const r = await client.query({
    text: sql,
    values: [id, pseudo]
  })
}

router.post('/profileMDP', async(req, res) => {
  const id = req.body.id
  const pass = req.body.mdp
  await updatePass(id, pass)
  res.send()
})

async function updatePass(id, pass) {
  const hash = await bcrypt.hash(pass, 10)
  const sql = "UPDATE users SET passwords = $2 WHERE iduser = $1"
  const r = await client.query({
    text: sql,
    values: [id, hash]
  })
}

//FILMS
router.get('/films', async(req, res) => {
  r = await getFilms()
  return res.json(r.rows)
})

async function getFilms() {
  const sql = "SELECT * FROM film ORDER BY titre"
  const r = await client.query({
    text: sql,
  })
  return r;
}

router.post('/film', async(req, res) => {
  const titre = req.body.titre
  const date = req.body.date
  const genre = req.body.genre
  const synopsis = req.body.synopsis
  const image = req.body.image
  r = await addFilm(titre,date,genre,synopsis,image)
  return res.json(r.rows)
})

async function addFilm(titre,date,genre,synopsis,image) {
  const sql = "INSERT INTO film (titre,année,genre,synopsis,image) VALUES ($1,$2,$3,$4,$5)"
  const r = await client.query({
    text: sql,
    values: [titre,date,genre,synopsis,image]
  })
  return r;
}

router.delete('/film:filmId', async(req, res) => {
  const idFilm = parseInt(req.params.filmId)
  r = await deleteFilm(idFilm)
  return res.json(r)
})

async function deleteFilm(idFilm) {
  const sql = "DELETE FROM avis WHERE idfilm = $1;"
  const r = await client.query({
    text: sql,
    values: [idFilm]
  })
  const sql1 = "DELETE FROM film WHERE idfilm = $1;"
  const r1 = await client.query({
    text: sql1,
    values: [idFilm]
  })
  return r1;
}

//COMMENTARIES
router.get('/commentaries', async(req, res) => {
  r = await getCommentaries()
  return res.json(r.rows)
})

async function getCommentaries() {
  const sql = "SELECT A.idavis, U.idUser, U.email, U.pseudo,  A.commentaires, F.idfilm, F.titre, F.image ,Count(V.idvoteavis) AS COUNT FROM avis A LEFT OUTER JOIN voteavis V ON V.idavis = A.idavis inner join users U on A.iduser = U.iduser inner join film F on F.idfilm=A.idfilm GROUP BY A.idavis, U.iduser, F.idfilm order by Count(V.idvoteavis) DESC "
  const r = await client.query({
    text: sql,
  })
  return r;
}

router.get('/commentariesLikes', async(req, res) => {
  const id = req.session.userId
  r = await getLikes(id)
  console.log(r.rows)
  return res.json(r.rows)
})

async function getLikes(id) {
  const sql = "SELECT idavis from voteavis where iduser = $1"
  const r = await client.query({
    text: sql,
    values: [id]
  })
  return r;
}


router.post('/commentary', async(req, res) => {
  const userId = req.session.userId
  const idFilm = req.body.idFilm
  const Commentary = req.body.Commentary
  r = await addCommentary(userId, idFilm, Commentary)
  return res.json(r.rows)
})

async function addCommentary(userId, idFilm, Commentary) {
  const sql = "INSERT INTO avis (idfilm, iduser, commentaires) VALUES ($1,$2,$3)"
  const r = await client.query({
    text: sql,
    values: [idFilm, userId, Commentary]
  })
  return r;
}

router.delete('/commentary:commentaryId', async(req, res) => {
  const idCommentary = parseInt(req.params.commentaryId)
  r = await deleteCommentary(idCommentary)
  return res.json(r)
})

async function deleteCommentary(idCommentary) {
  const sql = "DELETE FROM avis WHERE idavis = $1;"
  const r = await client.query({
    text: sql,
    values: [idCommentary]
  })
  return r;
}

router.post('/commentaryL', async(req, res) => {
  const idCommentary = req.body.idCommentary
  const idUser = req.body.idUser
  r = await addCommentaryLike(idCommentary, idUser)
  return res.json(r)
})

async function addCommentaryLike(idCommentary, idUser) {
  const sql = "Insert into voteavis(idavis, iduser) values ($1,$2);"
  const r = await client.query({
    text: sql,
    values: [idCommentary, idUser]
  })
  return r;
}

router.post('/commentaryD', async(req, res) => {
  const idCommentary = req.body.idCommentary
  const idUser = req.body.idUser
  r = await removeCommentaryLike(idCommentary, idUser)
  return res.json(r)
})

async function removeCommentaryLike(idCommentary, idUser) {
  const sql = "DELETE FROM voteavis WHERE idavis = $1 and iduser = $2;"
  const r = await client.query({
    text: sql,
    values: [idCommentary, idUser]
  })
  return r;
}



module.exports = router
