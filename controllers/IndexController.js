
exports.index = function (req, res, error) {

    if (req.method == "GET") {

        res.status(200).send({
            message: "My Rule-Validation API",
            status: "success",
            data: {
                name: "Ikeh Obinna",
                github: "@beesaferoot",
                email: "hikenike6@gmail.com",
                mobile: "08076960623",
                twitter: "@beesaferoot"
            }
        })
       
    }
}


