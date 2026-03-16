#!/usr/bin/env node

import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import React from 'react'
import { execSync } from "child_process"

const program = new Command()

// Resolves correctly whether running from src/ or dist/
const TEMPLATES_DIR = path.join(__dirname, "../../../templates")
const REGISTRY_DIR = path.join(__dirname, "../../../registry")

console.log("Looking for registry at:", REGISTRY_DIR)
console.log("Registry exists:", fs.existsSync(REGISTRY_DIR))

interface Registry {
  name: string
  files: string[]
  registryDependencies?: string[]
  npmDependencies?: string[]
}

function readRegistry(component: string): Registry | null {
  const registryFile = path.join(REGISTRY_DIR, `${component}.json`)
  if (!fs.existsSync(registryFile)) return null
  return fs.readJsonSync(registryFile)
}

function installComponent(component: string, root: string, installed = new Set<string>()) {
  // Prevent infinite loops from circular deps
  if (installed.has(component)) return
  installed.add(component)

  const registry = readRegistry(component)

  if (!registry) {
    console.log(chalk.red(`✘ Component "${component}" not found in registry`))
    process.exit(1)
  }

  // 1. Install registryDependencies first (recursively)
  if (registry.registryDependencies?.length) {
    for (const dep of registry.registryDependencies) {
      console.log(chalk.gray(`  Installing dependency: ${dep}`))
      installComponent(dep, root, installed)
    }
  }

  // 2. Copy template files
  const templatePath = path.join(TEMPLATES_DIR, component)

  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`✘ Template folder for "${component}" not found`))
    process.exit(1)
  }

  const targetPath = path.join(root, "components/ui", component)
  fs.copySync(templatePath, targetPath)
  console.log(chalk.green(`✔ Copied ${component}`))

  // 3. Install npm dependencies
  if (registry.npmDependencies?.length) {
    console.log(chalk.blue(`  Installing npm packages: ${registry.npmDependencies.join(", ")}`))
    execSync(`npm install ${registry.npmDependencies.join(" ")}`, {
      cwd: root,
      stdio: "inherit",
    })
  }
}

program
  .command("add")
  .argument("<component>")
  .action((component) => {
    const root = process.cwd()
    console.log(chalk.white(`\nAdding ${chalk.bold(component)}...\n`))
    installComponent(component, root)
    console.log(chalk.green(`\n✔ Done! Import from components/ui/${component}\n`))
  })

program.parse()