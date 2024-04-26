exports.create= function(req,res){
    // Validate request
    if(!req.body.name){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }
    // Create a Student
    const student = {
        name: req.body.name,
        age: req.body,
        course: req.body.course,
        registered: req.body.registered ? req.body.registered : false
    };
    // Save Student in the database
    student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Student."
            });
        });

}

exports.findAll = function(req,res){
    const name = req.query.name;
    var condition = name ? {name: {$regex: new RegExp(name), $options: "i"}} : {};
    Student.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving students."
            });
        });
}