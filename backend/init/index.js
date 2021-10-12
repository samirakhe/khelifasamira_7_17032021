const Role = require("../models/roles");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require('../models/db');

exports.initRoles = () => {
    Role.findAll()
    .then((roles)=>{
        if(roles && roles.length > 0){
            return;
        }
        Role.bulkCreate ([{nameRole : 'ADMIN'}, {nameRole : 'EMPLOYE'}])
    })
}

exports.initAdmin = () => {
    User.findOne({ where : {email : 'adminocr@gmail.com'}})
    .then((user)=>{
        if(user){
            return;
        }
        Role.findAll()
        .then((roles)=> {
            console.log(roles[0].Roleid)
            bcrypt
            .hash('adminOCR78', 10)
            .then((hash) => {
                const password = hash;
                User.create({
                    email: 'adminocr@gmail.com',
                    password: password,
                    pseudo: 'adminOCR',
                    
                })
                    .then((user) => {
                        user.setRoles(roles)
                        console.log('Administrateur créé')
                    })
                    .catch((error) =>{
                        console.log('Erreur lors de l\'enregistrement de l\'administrateur');
                        console.log(error);
                    });
    
            })
            .catch((error) =>{
                console.log('Erreur lors de l\'enregistrement de l\'administrateur');
                console.log(error);
            });
    
        })
      
    })
    
  

}