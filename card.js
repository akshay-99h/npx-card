#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
const fetch = require("node-fetch");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What action would you like to take?",
    choices: [
      {
        name: `Send me an ${chalk.blue.bold("email")}?`,
        value: () => {
          open("mailto:akshayprabhatmishra@gmail.com");
          console.log("\nDone, see you soon at inbox.\n");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
        value: () => {
          // cliSpinners.dots;
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();

          async function downloadPDF(url, filename) {
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(filename, buffer, () => {
              console.log(`PDF downloaded successfully: ${filename}`);
            });
          }

          // Replace 'pdfUrl' with the actual raw URL of the PDF hosted on GitHub
          const pdfUrl =
            "https://raw.githubusercontent.com/akshay-99h/portfolio/main/Akshay%20Prabhat%20Mishra%2015th%20July%202023.pdf";
          const outputFilename = "akshay-resume.pdf";

          downloadPDF(pdfUrl, outputFilename);
          let downloadPath = path.join(process.cwd(), "akshay-resume.html");
          console.log(`\nResume Downloaded at ${downloadPath} \n`);
          loader.stop();
        },
      },
      {
        name: "Just quit.",
        value: () => {
          console.log("see you around!\n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.blue("               Akshay Prabhat Mishra"),
  info:
    "   " + chalk.bgCyanBright("Community person looking for SDE job roles"),
  handle: chalk.white("@akshay-99h"),
  twitter: chalk.gray("https://twitter.com/") + chalk.cyan("akshay_99h"),
  github: chalk.gray("https://github.com/") + chalk.green("akshay-99h"),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("akshay-99h"),
  web: chalk.cyan("https://akshay-99h.codes"),
  npx: chalk.red("npx") + " " + chalk.white("akshay_99h"),

  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelWeb: chalk.white.bold("    Website:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    `${data.info}`,
    ``,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("  I am dedicated to software development and")}`,
    `${chalk.italic("  tech in general, specialising in full - stack")}`,
    `${chalk.italic("  web development. My DMs are always open for")}`,
    `${chalk.italic("  a chat, or if you have any questions.")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "blue",
  }
);

console.log(me);
const tip = [
  `Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
  "",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());
