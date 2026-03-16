#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const program = new commander_1.Command();
// Resolves correctly whether running from src/ or dist/
const TEMPLATES_DIR = path_1.default.join(__dirname, "../../../templates");
const REGISTRY_DIR = path_1.default.join(__dirname, "../../../registry");
console.log("Looking for registry at:", REGISTRY_DIR);
console.log("Registry exists:", fs_extra_1.default.existsSync(REGISTRY_DIR));
function readRegistry(component) {
    const registryFile = path_1.default.join(REGISTRY_DIR, `${component}.json`);
    if (!fs_extra_1.default.existsSync(registryFile))
        return null;
    return fs_extra_1.default.readJsonSync(registryFile);
}
function installComponent(component, root, installed = new Set()) {
    // Prevent infinite loops from circular deps
    if (installed.has(component))
        return;
    installed.add(component);
    const registry = readRegistry(component);
    if (!registry) {
        console.log(chalk_1.default.red(`✘ Component "${component}" not found in registry`));
        process.exit(1);
    }
    // 1. Install registryDependencies first (recursively)
    if (registry.registryDependencies?.length) {
        for (const dep of registry.registryDependencies) {
            console.log(chalk_1.default.gray(`  Installing dependency: ${dep}`));
            installComponent(dep, root, installed);
        }
    }
    // 2. Copy template files
    const templatePath = path_1.default.join(TEMPLATES_DIR, component);
    if (!fs_extra_1.default.existsSync(templatePath)) {
        console.log(chalk_1.default.red(`✘ Template folder for "${component}" not found`));
        process.exit(1);
    }
    const targetPath = path_1.default.join(root, "components/ui", component);
    fs_extra_1.default.copySync(templatePath, targetPath);
    console.log(chalk_1.default.green(`✔ Copied ${component}`));
    // 3. Install npm dependencies
    if (registry.npmDependencies?.length) {
        console.log(chalk_1.default.blue(`  Installing npm packages: ${registry.npmDependencies.join(", ")}`));
        (0, child_process_1.execSync)(`npm install ${registry.npmDependencies.join(" ")}`, {
            cwd: root,
            stdio: "inherit",
        });
    }
}
program
    .command("add")
    .argument("<component>")
    .action((component) => {
    const root = process.cwd();
    console.log(chalk_1.default.white(`\nAdding ${chalk_1.default.bold(component)}...\n`));
    installComponent(component, root);
    console.log(chalk_1.default.green(`\n✔ Done! Import from components/ui/${component}\n`));
});
program.parse();
