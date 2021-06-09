const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
// const path = require('path');

function promptUser() {
    return inquirer.prompt([{
        // Prompt the user for data to populate the HTML sections with
    }])
};

async function init() {
    try {
        const userAnswers = await promptUser();
        const writeTheFile = writeREADME(userAnswers);
        await writeFileAsync(`${userAnswers.dir}/README.md`, writeTheFile);
        console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

function writeREADME(data) {
    // Use the given data from the prompt to create the appropriate HTML and populate with appropriate values
}