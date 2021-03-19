const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Employee = require('../models/employee');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/companies', function(req, res) {
  Company.find({}, (err, companies)=>{
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).render("companies", {companies})
  })
})

router.get("/lessThan", function(req, res) {
  let date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = (date.getDate()).toString().padStart(2, '0');
  Company.find({createdAt : {$gt : new Date(`${year-1}-${month}-${day}T00:00:00.000Z`).toISOString()}}, (err, companies)=> {
    if (err) return res.status(500).send("Internal Server Error");
    res.send(companies);
  })
})

router.get('/changeToTehran', function(req, res) {
  Company.updateMany({}, {$set : {city : "tehran", state:"tehran"}}, function(err) {
    if (err) return res.status(500).send("Internal Server Error");
    Company.find({}, (err, companies)=> {
      if (err) return res.status(500).send("Internal Server Error");
      res.status(200).json(companies);
    })
  })
})

router.get('/deleteAllCompanies', function(req, res) {
  Company.deleteMany({}, function(err) {
    if (err) return res.status(500).send("Internal Server Error");
    Employee.deleteMany({}, function(err) {
      if (err) return res.status(500).send("Internal Server Error");
      res.status(200);
    })
  });
})

router.post('/deleteOne', urlencodedParser, function(req, res) {
  Company.deleteOne({_id:req.body.id}, function(err) {
    if (err) return res.status(500).send("Internal Server Error");
    Employee.deleteMany({company : req.body.id}, function(err) {
      if (err) return res.status(500).send("Internal Server Error");
      res.status(200).send();
    })
  })
})

router.post('/editCompany', urlencodedParser, function(req, res) {
  Company.updateOne({_id:req.body.id}, {name:req.body.name,city:req.body.city,state:req.body.state,phoneNumber:+req.body.phoneNumber}, function(err) {
    
  })
  res.status(200);
})

router.get('/companies/showEmployee:id', function(req, res) {
  Employee.find({company : req.params.id}).populate('company', {name : 1}).exec(function(err, employees) {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).render("employees", {employees});
  })
})

router.post('/companies/filter',urlencodedParser ,function(req, res) {
  Company.find({createdAt : {$gt : new Date(req.body.startDate).toISOString(), $lt : ISODate(req.body.endDate).toISOString()}}, (err, companies)=> {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).send(companies);
  })
})

router.post('/createNewCompany', urlencodedParser, function(req, res) {
  const newCompany = new Company ({
    name : req.body.name,
    city : req.body.city,
    state : req.body.state,
    registrationNumber : req.body.registrationNumber,
    phoneNumber : +req.body.phoneNumber,
    createdAt : new Date(req.body.createdAt)
  })
  newCompany.save(function(err) {
    if (err) res.status(400).send({err:"Invalid inputs"});
    res.status(200);
  })
})
module.exports = router;