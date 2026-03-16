# ⚡ RUBICS UI 

<p align="center">
  <img src="https://i.postimg.cc/Dz7qdWJR/rubics-light.png" width="120" alt="RN UI Logo"/>
</p>

<p align="center">
Install components directly into your project using a CLI.
</p>

---

## 🚀 Features

* 📦 Copy-paste component architecture
* ⚡ CLI powered installation
* 🎨 Built-in theme system
* 🌗 Dark / Light mode
* 🧩 Variant-based components
* 📱 React Native optimized
* 🧠 Fully customizable

---

# 📦 Installation

Install using the CLI.

```bash
npx rubics add button
```

Or if installed globally:

```bash
rubics add button
```

---

# ⚡ CLI Usage

```bash
rubics add button
rubics add input
rubics add checkbox
```

Components will be copied into:

```
components/ui/
```

---

# 🧩 Components

| Component | Status  |
| --------- | ------  |
| Button    | ✅      |
| Checkbox  | ✅      |
| Input     | ✅      |
| Theme     | ✅      |
| Utils     | ✅      |
| Slider    | ✅      |
| Radio     | ✅      |
| Carousel  | ✅      |
| OTP       | ✅      |
---

# 🎨 Button Example

```tsx
import { Button } from "@/components/ui/button"

<Button>Submit</Button>

<Button variant="outline">
Cancel
</Button>

<Button size="lg">
Continue
</Button>
```

---

# ☑ Checkbox Example

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox
 checked
 label="Accept terms"
/>
```

---

# ⌨ Input Example

```tsx
import { Input } from "@/components/ui/input"

<Input
 label="Email"
 placeholder="you@email.com"
/>
```

---

# 🌓 Theme System

Wrap your app with the theme provider.

```tsx
import { ThemeProvider } from "@/components/theme"

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}
```

---

# 📂 Project Structure

```
rn-ui
│
├ templates
│ ├ button
│ ├ checkbox
│ ├ input
│ ├ theme
│ ├ radio
│ ├ otp
│ ├ corousel
│ ├ theme
│ ├ slider
│ └ utils
│
├ registry
│ ├ button.json
│ ├ checkbox.json
│ ├ checkbox.json
│ ├ .....

├ packages
│ └ cli
│
└ apps
  └ example
```

---

# 🧠 How It Works

<details>
<summary>Click to expand</summary>

1️⃣ CLI reads component name

```
rubics add button
```

2️⃣ CLI loads registry

```
registry/button.json
```

3️⃣ CLI resolves dependencies

```
theme
utils
button
```

4️⃣ Templates copied into user project

```
components/ui
```

</details>

---

# 🛠 Development

Clone the repository:

```bash
git clone https://github.com/Rubics-UI/rubics-rn.git
```

Install dependencies:

```bash
npm install
```

Run example app:

```bash
cd apps/example
npm start
```

---

# 📦 Publishing CLI

Inside CLI package:

```bash
npm publish
```

Users can then run:

```bash
npx rubics add button
```

---

# 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---

# ⭐ Roadmap

* [ ] Component registry resolver
* [ ] CLI dependency installer
* [ ] Animation primitives
* [ ] Expo integration
* [ ] Docs site

---

# 📜 License

MIT License

---

<p align="center">
Built with ❤️ for the React Native community
</p>
