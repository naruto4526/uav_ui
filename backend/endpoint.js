const express = require('express');
const {runPythonScript} = require('./callShell');

router = express.Router();

router.route('/').post((req,res) => {
  console.log(req.body);
  res.json({message:'request recieved'})
});

router.route('/').get((req,res) => {
  runPythonScript('./serialComm.py',['hello from','react']);
  res.json({message:"why u here"});
  console.log('connection made');
})
module.exports = router;
