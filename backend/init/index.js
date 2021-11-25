const Role = require("../models/roles");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require('../models/db');
require("dotenv").config();

exports.initRoles = async () => {
    const roles = await Role.findAll();
    if(roles && roles.length > 0){
        return;
    }
    await Role.bulkCreate ([{nameRole : 'ADMIN'}, {nameRole : 'EMPLOYE'}])
    
}

exports.initAdmin = () => {
    User.findOne({ where : {email : process.env.ADMIN_EMAIL}})
    .then((user)=>{
        if(user){
            return;
        }
        Role.findAll()
        .then((roles)=> {
            
            bcrypt
            .hash(process.env.ADMIN_PASSWORD, 10)
            .then((hash) => {
                const password = hash;
                User.create({
                    email: process.env.ADMIN_EMAIL,
                    password: password,
                    pseudo: process.env.ADMIN_PSEUDO,
                    
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