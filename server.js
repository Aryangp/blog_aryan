const express = require("express")
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article=require('./models/article')
const methodOverride=require("method-override")
const app = express()



mongoose.connect('mongodb://localhost/blog'); 
 const db = mongoose.connection
 db.on('error', error => console.error(error))
 db.once('open', () => console.log('Connected to Mongoose'))
 app.use(methodOverride("_method"))


app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.get('/',async (req, res) => {
  const articles=await Article.find().sort({createdAt:-1})
  res.render('articles/index.ejs', { articles: articles })
})
app.use('/articles', articleRouter)

app.listen(5000)