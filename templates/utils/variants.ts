type VariantConfig = Record<string, Record<string, any>>

export function createVariants(base: any, config: VariantConfig) {
  return (variants: Record<string, string | undefined>) => {
    const styles = [base]

    for (const key in variants) {
      const value = variants[key]

      if (value && config[key] && config[key][value]) {
        styles.push(config[key][value])
      }
    }

    return styles
  }
}