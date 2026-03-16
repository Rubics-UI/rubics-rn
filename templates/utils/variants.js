"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariants = createVariants;
function createVariants(base, config) {
    return (variants) => {
        const styles = [base];
        for (const key in variants) {
            const value = variants[key];
            if (value && config[key] && config[key][value]) {
                styles.push(config[key][value]);
            }
        }
        return styles;
    };
}
