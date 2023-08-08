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
const axios = require("axios");
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
          const downloadPDF = (url, destinationPath) => {
            return new Promise((resolve, reject) => {
              axios
                .get(url, { responseType: "stream" })
                .then((response) => {
                  const writeStream = fs.createWriteStream(destinationPath);
                  response.data.pipe(writeStream);
                  writeStream.on("finish", resolve);
                  writeStream.on("error", reject);
                })
                .catch(reject);
            });
          };

          // ...

          const downloadResume = async (pdfUrl, outputFilename) => {
            try {
              const downloadPath = path.join(process.cwd(), outputFilename);

              const loader = ora({
                text: " Downloading Resume",
                spinner: cliSpinners.material,
              }).start();

              await downloadPDF(pdfUrl, downloadPath);

              loader.succeed("Resume Downloaded!");
              console.log(`Resume Downloaded at ${downloadPath} \n`);
            } catch (error) {
              loader.fail("Failed to download Resume");
              console.error("Error:", error);
            }
          };

          // Example usage
          const pdfUrl =
            "https://raw.githubusercontent.com/akshay-99h/portfolio/main/Akshay%20Prabhat%20Mishra%20-%20Resume.pdf";
          const outputFilename = "akshay-resume.pdf";

          downloadResume(pdfUrl, outputFilename);
        },
      },
      {
        name: "Quit card.",
        value: () => {
          console.log("See you around!\n");
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
  twitter: chalk.cyanBright("https://twitter.com/akshay_99h"),
  github: chalk.greenBright("https://github.com/akshay-99h"),
  linkedin: chalk.blueBright("https://linkedin.com/in/akshay-99h"),
  web: chalk.redBright("https://akshay-99h.codes"),
  biolink: chalk.yellowBright("https://apm.bio.link"),

  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelWeb: chalk.white.bold("    Website:"),
  //   labelCard: chalk.white.bold("       Card:"),
  labelBioLink: chalk.white.bold("    BioLink:"),
};

const me = boxen(
  [
    `${data.name}`,
    `${data.info}`,
    ``,
    `${chalk.italic("  I am dedicated to software development and")}`,
    `${chalk.italic("  tech in general, specialising in full - stack")}`,
    `${chalk.italic("  web development. My DMs are always open for")}`,
    `${chalk.italic("  a chat, or if you have any questions.")}`,
    ``,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelBioLink}  ${data.biolink}`,
    `${data.labelWeb}  ${data.web}`,
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
