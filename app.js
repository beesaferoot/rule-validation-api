const express = require('express');

// require controllers
const indexController = require('./controllers/IndexController');
const validateRuleController = require('./controllers/ValidateRuleController');

const app = express();

app.use(express.json());

// handle json errors 
app.use((err, req, res, next) => {
  // you can error out to stderr still, or not; your choice
  console.error(err); 

  if(err.status === 400)
    return res.status(err.status).send({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null
    });

  return next(err); // if it's not a 400, let the default error handling do it. 
});


// routes 
app.route('/validate-rule').post(validateRuleController.validate_rule);
app.route('/').get(indexController.index)

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server up and runing on port ${PORT}`);
})
