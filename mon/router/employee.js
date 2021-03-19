const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/employees/addNewEmployee', urlencodedParser, function(req, res) {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let company = req.body.company;
  let nationalCode = +req.body.nationalCode;
  let gender = req.body.gender;
  let ceo;
  if (req.body.ceo === "true") {
    ceo = true;
  } else {
    ceo = false
  }
  let birthDate = req.body.birthDate;

  if (!f_name || !l_name || !company || !nationalCode || !gender|| !birthDate) {
    return res.status(404).send("invalid value")
  };


  const employee = new Employee({
    f_name,
    l_name,
    company,
    nationalCode,
    gender,
    ceo,
    birthDate
  })
  employee.save(function(err) {
    if (err) return res.status(500).send("internal Server Error");
    res.status(200).send("success");
  })
})

router.get('/employees/deleteEmployee:id', function(req, res) {
  Employee.deleteOne({_id:req.params.id}, function(err) {
    if (err) return res.status(500).send("Internal Server Error")
    res.status(200).send();
  })
})

router.get('/employees/deleteAll', function(req, res) {
  Employee.deleteMany({}, function(err) {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).send();
  })
})

router.get("/ceos", function (req, res) {
  Employee.find({ ceo: true }, function (err, ceos) {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).json(ceos);
  });
});

router.get("/employees/findEmployee:id", function(req, res) {
  Employee.find({_id:req.params.id}, function(err, employee) {
    if (err) res.status(500).send("Internal Server Error");
    res.status(200).send(employee);
  })
})

router.post("/employees/editEmployee:id", urlencodedParser, function(req, res) {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let company = req.body.company;
  let nationalCode = +req.body.nationalCode;
  let ceo;
  if (req.body.ceo === "true") {
    ceo = true;
  } else {
    ceo = false
  }
  let birthDate = req.body.birthDate;

  if (!f_name || !l_name || !company || !nationalCode || !birthDate) {
    return res.status(404).send("invalid value")
  };
  Employee.findOneAndUpdate({_id:req.params.id},{f_name, l_name, company, nationalCode, ceo, birthDate}, function(err) {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).send();
  })
})

router.get('/employees', function(req, res) {
  Employee.find({}).populate('company', {name : 1}).exec((err, employees)=> {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).render("employees", {employees})
  })
})

router.get('/ceoWithCompany', function(req, res) {
  Employee.find({ceo : true}, {f_name : 1, l_name : 1, _id : 0}).populate("company", {name : 1, _id : 0}).exec((err, ceo)=> {
    if (err) return res.status(500).send(err);
    res.status(200).json(ceo);
  })
})

router.get("/employeeWithCompany/:id", function(req, res) {
  Employee.find({company : req.params.id}).populate("company", {name : 1}).exec((err, employees)=> {
    if (err) return res.status(500).send('Internal server Error');
    res.status(200).json(employees);
  })
})

router.get('/ceo/:id', function(req, res) {
  Employee.find({company : req.params.id, ceo : true}).populate("company", {name:1}).exec((err, ceo)=> {
    if (err) return res.status(500).send('Internal Server Error');
    res.status(200).json(ceo);
  })
})

router.get("/ageBetween", function (req, res) {
  let date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  Employee.find(
    {
      birthDate : {
        $gt: new Date(
          `${year - 30}-${month}-${day}T00:00:00.000Z`
        ).toISOString(),
        $lt: new Date(
          `${year - 20}-${month}-${day}T00:00:00.000Z`
        ).toISOString(),
      },
    },
    {
      "_id" : false
    },
    function (err, employees) {
      if (err) return res.status(500).send('Internal Server Error');
      res.status(200).json(employees);
    }
  );
});

module.exports = router;
