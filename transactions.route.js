var express = require('express')
var router = express.Router()
module.exports = router
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const adapter = new FileSync("db.json");
const db = low(adapter);
var connect = {lists:db.get("userList").value(),list:db.get("listBook").value()}
var list = db.get("listBook").value();
var lists = db.get("userList").value();

router.get("/", (req,res)=>{
  var id = shortid.generate();
  res.render("transactions.pug", {lists:db.get("userList").value(),list:db.get("listBook").value(),id:id})
})
router.post("/create",(req,res)=>{
  var id = shortid.generate();
  var findUserId = db.get("userList").find({user: req.body.user}).value()
  var findBookId = db.get("listBook").find({title: req.body.book}).value()
  db.get("transactions").push({userId:findUserId.id,bookId: findBookId.id,id: id}).write()
  res.redirect('/')
})