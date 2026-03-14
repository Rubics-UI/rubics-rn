#!/usr/bin/env node

import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import chalk from "chalk"

const program = new Command()

program
  .command("add")
  .argument("<component>")
  .action((component) => {

    const root = process.cwd()

    const templatePath = path.join(
      __dirname,
      "../../../templates",
      component
    )

    const targetPath = path.join(
      root,
      "components/ui",
      component
    )

    if (!fs.existsSync(templatePath)) {
      console.log(chalk.red(`Component ${component} not found`))
      process.exit(1)
    }

    fs.copySync(templatePath, targetPath)

    console.log(chalk.green(`✔ Installed ${component}`))
  })

program.parse()