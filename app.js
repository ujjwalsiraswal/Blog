const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const port = 3000;

const homeContent =
  "Welcome to this homepage this is created with the ejs templating engine";
const aboutContent =
  "Welcome to this baout page this is created with the ejs templating engine";
const contactContent =
  "Welcome to this about page here is your Contact content";
const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
     para: homeContent,
      posts: posts
     });
});
app.get("/about", (req, res) => {
  res.render("about", { para: aboutContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/contact", (req, res) => {
  res.render("contact", { para: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const post = {
    name: req.body.postTitle,
    message: req.body.postBody,
  };
  posts.push(post);

  res.redirect("/");
  
});
app.get("/posts/:postName" ,function(req ,res){

  const requestTitle = _.lowerCase(req.params.postName) 
  posts.forEach(function(post){
    var storedTitle = _.lowerCase(post.name)

  if (requestTitle === storedTitle) {
      res.render("post" , {
        title:post.name   ,
        content: post.message
      })
  }
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
