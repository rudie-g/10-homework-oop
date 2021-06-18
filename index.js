const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer")
const Engineer = require("./lib/Engineer.js")
const Manager = require("./lib/Manager.js")
const Intern = require("./lib/Intern.js")

const employeeArr = [];
let continueBool = false;

function init() {
  startApplication();
}

function makeDir() {
  fs.mkdir(path.join(process.cwd(), 'dist'), (err) => {
      if (err) {
          return err.message
      }
      return "Directory created"
  })

}

function makeManager() {
  inquirer.prompt([
    {
        type: "input",
        message: "Enter manager's name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter manager's id:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter manager's email address: ",
        name: "email"
    },
    {
        type: "input",
        message: "Enter manager's office number: ",
        name: "officeNumber"
    },
    {
      type: "confirm",
      message: "Would you like to add another team member?",
      name: "yesno"
    }
  ])
  .then(function({ name, id, email, officeNumber, yesno }) {
      let newMember = new Manager(name, id, email, officeNumber)
      addMember(newMember);
      employeeArr.push(newMember);
      if (yesno) {
        pickRole();
      }else {
        finishTeam()
      }
  })
  return;
}

function startApplication() {
  makeDir();
  initHTML();
  makeManager();
}

function pickRole() {
  inquirer.prompt([
    {
      type: "list",
      message: "What is the team member's role:",
      choices: [
          "Engineer",
          "Intern"
      ],
      name: "role"
  },
  ]).then(({role}) => {
    addInquire(role)
  })
}
function addInquire(whichRole) {
  if (whichRole === "Engineer") {
    inquirer.prompt([
      {
          type: "input",
          message: "Enter engineer's name:",
          name: "name"
      },
      {
          type: "input",
          message: "Enter engineer's id:",
          name: "id"
      },
      {
          type: "input",
          message: "Enter engineer's email address: ",
          name: "email"
      },
      {
          type: "input",
          message: "Enter engineer's github: ",
          name: "github"
      },
      {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "yesno"
      }
    ]) 
    .then(function({ name, id, email, github, yesno }) {
        let newMember = new Engineer(name, id, email, github)
        addMember(newMember);
        employeeArr.push(newMember);
        if (yesno) {
          pickRole();
        } else {
          finishTeam();
        }
      }
    )
  } else if (whichRole === "Intern") {
    inquirer.prompt([
      {
          type: "input",
          message: "Enter intern's name:",
          name: "name"
      },
      {
          type: "input",
          message: "Enter intern's id:",
          name: "id"
      },
      {
          type: "input",
          message: "Enter intern's email address: ",
          name: "email"
      },
      {
          type: "input",
          message: "Enter intern's school: ",
          name: "school"
      },
      {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "yesno"
      }
    ])
    .then(function({ name, id, email, school, yesno }) {
      let newMember = new Intern(name, id, email, school)
      addMember(newMember);
      employeeArr.push(newMember);
      if (yesno) {
        pickRole();
      }else {
        finishTeam()
      }
    })
  }
}

function initHTML() {
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
      <title> Team Profile </title>
      <style>
      main{display:flex; flex-direction: row; flex-wrap:wrap; justify-content: space-evenly;background-color: antiquewhite}
      header{background-color:lightblue; min-height:75px; top: 0; border-bottom: solid black}
      h1{text-align:center;font-family:Helvetica, sans-serif;font-variant:small-caps;color:black;}  
      .teamMember{flex: 0 1 30%; margin: 2.5% 5%}
      </style>
  </head>
  <body>
  <header>
  <!-- Change Team Name Here -->
  <h1 class="display-5"> Team Profile </h1>
  </header>
  <main>`

  fs.writeFileSync("./dist/team-profile.html", html, function(err) {
      if (error) {
          console.error(err);
      }
  });
  console.log(`HTML Created`);
}



function addMember(member) {
    return new Promise(function(resolve, reject) {
        let name = member.getName();
        let id = member.getId();
        let email = member.getEmail();
        let role = member.getRole();
        let data = ``;
        if (role === "Manager") {
          let officeNumber = member.getOfficeNumber();
          data = `  <div class="card teamMember">
          <div class="card-content">
            <span class="lead">${name}</span>
          </div>
          <div>
            <span class="">${role}</span>
            <ul class="">
            <li class=""><h4>${name}</h4></li>
            <li class=""><bold>ID:</bold> <br> ${id}</li>
            <li class=""><bold>Email Address:</bold><br> <a href="mailto:${email}" target="_blank">${email}</a></li>
            <li class=""><bold>Office Number:</bold><br> <a href="tel:${officeNumber}" target="_blank">${officeNumber}</a></li>
          </ul>
          </div>
        </div> `
        } else if (role === "Intern") {
            let school = member.getSchool();
            data = ` <div class="card teamMember">
            <div class="card-content">
              <span class="lead">${name}</span>
            </div>
            <div>
              <span class="">${role}</span>
              <ul class="">
              <li class=""><h4>${name}</h4></li>
              <li class=""><bold>ID:</bold><br>  ${id}</li>
              <li class=""><bold>Email Address:</bold><br>  <a href="mailto:${email}" target="_blank">${email}</a></li>
              <li class=""><bold>School:</bold><br>  ${school}</li>
            </ul>
            </div>
          </div>`;
        } else {
          let github = member.getGithub();
            data = `
            <div class="card teamMember">
            <div class="card-content">
              <span class="lead">${name}</span>
            </div>
            <div>
              <span class="">${role}</span>
              <ul class="">
              <li class=""><h4>${name}</h4></li>
              <li class=""><bold>ID:</bold><br>  ${id}</li>
              <li class=""><bold>Email Address:</bold><br>  <a href="mailto:${email}" target="_blank">${email}</a></li>
              <li class=""><bold>Github:</bold><br>  <a href="https://github.com/${github}" target="_blank">${github}</a></li>
            </ul>
            </div>
          </div>`;
        }
        fs.appendFile("./dist/team-profile.html", data, function(err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishTeam() {
    const html = `  </main>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>   
    </body>
    </html>`;

    fs.appendFile("./dist/team-profile.html", html, function(err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Your Team Profile has Been Created");
}

init();