const inquirer = require("inquirer");


class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        // this.role = role;
    }
    getRole() {
        return "Employee";
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
}


// class Employee {
//     constructor(name, id, email, role){
//         this.name = name;
//         this.id = id;
//         this.email = email;
//         this.role = role;
//     }

//     getName () {
//         await inquirer.prompt([
//             {
//                 name: "newName",
//                 message: "Yo, what name you go by?"
//             }
//         ]).then(({newName}) => {
//             this.name = newName;
//         })
//     }
// }
module.exports = Employee;