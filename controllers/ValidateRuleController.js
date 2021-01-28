
const valid_conditions = {eq:"===", neq:"!==", gt:">", gte:">=", contains:"contains"}

exports.validate_rule = function (req, res, error) {

    if (req.method == "POST") {
        if(req.body.rule){
            const rule = req.body.rule;
            if(typeof(rule) === 'object'){
                // check for required fields
                let field, condition, condition_value;
                if(rule.field){
                    field = rule.field;
                }else{
                     res.status(400).send({
                        message: "field is required.",
                        status: "error",
                        data: null
                    });
                }
                if(rule.condition){
                    
                    // verify condition is allowed
                    if(valid_conditions[rule.condition]){
                        condition = valid_conditions[rule.condition];
                    }else{ 
                        res.status(400).send({
                        message: "condition is not allowed.",
                        status: "error",
                        data: null
                    });
                    }
                }else{
                     res.status(400).send({
                        message: "condition is required.",
                        status: "error",
                        data: null
                    });
                }
                if(rule.condition_value){
                    condition_value = rule.condition_value;
                }else{
                     res.status(400).send({
                        message: "condition_value is required.",
                        status: "error",
                        data: null
                    });
                }

                if(req.body.data){
                    const data = req.body.data;
                    if (typeof (data) === 'object'
                        || Array.isArray(data)
                        || typeof (data) === 'string'){
                        
                        
                        if(data[field]){
                            switch(condition){
                               case '===':
                                {
                                    if(data[field] === condition_value){
                                    res.status(200).send({
                                        message: `field ${field} successfully validated.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }else{
                                    res.status(400).send({
                                        message: `field ${field} failed validation.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }
                                break;
                                } 
                               case '!==':
                               {
                                   if(data[field] !== condition_value){
                                    res.status(200).send({
                                        message: `field ${field} successfully validated.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }else{
                                    res.status(400).send({
                                        message: `field ${field} failed validation.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }
                                break;
                               }
                               case '>':
                               {
                                   if(data[field] > condition_value){
                                    res.status(200).send({
                                        message: `field ${field} successfully validated.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }else{
                                    res.status(400).send({
                                        message: `field ${field} failed validation.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }
                                break;
                               }
                               case '>=':
                               {
                                   if(data[field] >= condition_value){
                                    res.status(200).send({
                                        message: `field ${field} successfully validated.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }else{
                                    res.status(400).send({
                                        message: `field ${field} failed validation.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }
                                break;
                               }
                               case 'contains':
                               {
                                   if(data[field].includes(condition_value)){
                                    res.status(200).send({
                                        message: `field ${field} successfully validated.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }else{
                                    res.status(400).send({
                                        message: `field ${field} failed validation.`,
                                        status: "success",
                                        data: {
                                            validation:{
                                                error:false,
                                                field: field,
                                                field_value: data[field],
                                                condition: rule.condition,
                                                condition_value: condition_value
                                            }
                                        }
                                    });
                                }
                              
                                break;
                               }
                            default:
                                break;
                            }

                        }else{
                            res.status(400).send({
                                message: `field ${field} is missing from data.`,
                                status: 'error',
                                data: null
                            })
                        }

                    }else{
                        res.status(400).send({
                            message: "data should be an object or an array, or a string.",
                            status: 'error',
                            data: null
                        })

                    }
                }else{
                     res.status(400).send({
                        message: "data is required.",
                        status: "error",
                        data: null
                    });
                }

            }else{
                res.status(400).send({
                message: "rule should be an object.",
                status: "error",
                data: null
            });
        }
        }else{
            res.status(400).send({
                message: "rule is required.",
                status: "error",
                data: null
            });
        }
    }
       
}


