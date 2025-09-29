# Task 2: CSV to React Website Generator

This project automatically generates multiple React websites from CSV data. Each row in the CSV file creates a complete, standalone React application with TailwindCSS v4 styling.

## 🎯 Task Overview

**Goal:** Create a small software that generates websites from CSV data. Each CSV row becomes a complete React website. Uses JavaScript ecosystem only (React, Node.js).

## 🚀 Features

- **CSV-Driven Generation**: Reads `websites.csv` and creates individual React sites
- **Spin-Text Randomization**: `[[Quick|Fast|Speedy]]` → randomizes to different words each generation
- **Template Variables**: `{{ phone }}`, `{{ address }}` → replaced with actual CSV data
- **TailwindCSS v4 Integration**: Each site comes with TailwindCSS v4 pre-configured
- **Complete React Apps**: Each generated site is a full React+Vite project
- **Individual Ports**: Each site runs on its own port

## 📁 Project Structure

```
task2/
├── package.json              # Main project with npm start script
├── generator.js              # Main generator script
├── websites.csv              # Data source (domain,title,description,phone,address)
├── templates/                # Template components and configs
└── build/                    # Generated sites (auto-created)
    ├── foodexpress.com/      # Complete React app
    ├── techhubbd.com/        # Complete React app
    ├── bookbazaar.com/       # Complete React app
    └── fashionstore.com/     # Complete React app
```

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## 🎯 Usage

### Generate All Websites
```bash
npm start
```

This command:
1. Reads data from `websites.csv`
2. Processes spin-text `[[Quick|Fast|Speedy]]` with randomization
3. Replaces template variables `{{ phone }}`, `{{ address }}` with CSV data
4. Creates complete React projects in `build/[domain]/`
5. Each site includes full Vite + React + TailwindCSS v4 setup

### Run Individual Sites
```bash
cd build/foodexpress.com
npm install
npm run dev
```

Each generated site runs on a different port automatically:
- foodexpress.com → http://localhost:5208
- techhubbd.com → http://localhost:5219  
- bookbazaar.com → http://localhost:5230
- fashionstore.com → http://localhost:5197

## 📊 CSV Format

The `websites.csv` file should have these columns:

```csv
domain,title,description,phone,address
foodexpress.com,Food Express,Delicious meals delivered fast,01712345678,"House 12, Road 5, Banani, Dhaka"
techhubbd.com,Tech Hub BD,Your trusted tech partner,01898765432,"Level 4, Block B, Dhanmondi, Dhaka"
bookbazaar.com,Book Bazaar,Buy and sell books online,01911223344,"Shop 22, New Market, Chittagong"
fashionstore.com,Fashion Store,Latest fashion trends,01555666777,"Shop 45, Gulshan-2, Dhaka"
```

## 🎨 Template System

### Spin-Text Randomization
Use `[[option1|option2|option3]]` for random text selection:
```jsx
// Input template:
<h1>[[Quick|Fast|Speedy]] delivery service in dhaka.</h1>

// Output (randomized each generation):
<h1>Fast delivery service in dhaka.</h1>
```

### Template Variables
Use `{{ variableName }}` for CSV data replacement:
```jsx
// Input template:
<p>Phone: {{ phone }}</p>
<p>Address: {{ address }}</p>

// Output (with CSV data):
<p>Phone: 01712345678</p>
<p>Address: House 12, Road 5, Banani, Dhaka</p>
```

### Available Variables
- `{{ domain }}` - Website domain
- `{{ title }}` - Site title  
- `{{ description }}` - Site description
- `{{ phone }}` - Phone number
- `{{ address }}` - Full address
- `{{ location }}` - Extracted city from address

## 🏗️ Generated Site Structure

Each generated site includes:

```
domain.com/
├── package.json              # Site-specific dependencies & scripts
├── vite.config.js           # Vite configuration with TailwindCSS
├── tailwind.config.js       # TailwindCSS v4 configuration
├── postcss.config.js        # PostCSS with TailwindCSS plugin
├── index.html               # HTML template
├── src/
│   ├── App.jsx              # Main app component (Hero + Contact)
│   ├── main.jsx             # Entry point
│   ├── index.css            # TailwindCSS imports
│   └── components/
│       ├── Hero.jsx         # Generated hero with spin-text
│       └── Contact.jsx      # Generated contact with CSV data
└── public/
    └── vite.svg             # Vite logo
```

## 🎨 Site Design

### React Template Requirements (Task 2)
- **Simple Layout:** No complex design, just Hero and Contact sections
- **Hero Section:** Single heading with randomized spin-text
- **Contact Section:** Phone number and address from CSV
- **Minimal CSS:** TailwindCSS for alignment, no heavy styling needed

### TailwindCSS v4 Integration
- **Full TailwindCSS v4.1.13** with @tailwindcss/vite plugin
- **PostCSS configuration** with @tailwindcss/postcss
- **Responsive utilities** built-in
- **Clean, professional styling**

## ⚡ Adding New Sites

1. Add a new row to `websites.csv`:
```csv
newdomain.com,New Site,Description here,01234567890,"Address here"
```
2. Run `npm start`
3. New site generated automatically in `build/newdomain.com/`
4. Install and run: `cd build/newdomain.com && npm install && npm run dev`

## 🌐 Site Features

### Hero Section
- **Single heading** with randomized spin-text: `[[Quick|Fast|Speedy]] delivery service in dhaka.`
- **TailwindCSS styling**: `text-3xl font-bold text-gray-800`
- **Gray background**: `bg-gray-100`
- **Centered layout**: `text-center py-8`

### Contact Section
- **Phone number**: From CSV `{{ phone }}` data
- **Address**: From CSV `{{ address }}` data  
- **Clean layout**: TailwindCSS utilities for spacing and typography
- **White background**: `bg-white`

## 📱 Example Generated Sites

Based on current `websites.csv`:

| Domain | Title | Phone | Address | Port |
|--------|-------|-------|---------|------|
| **foodexpress.com** | Food Express | 01712345678 | House 12, Road 5, Banani, Dhaka | 5208 |
| **techhubbd.com** | Tech Hub BD | 01898765432 | Level 4, Block B, Dhanmondi, Dhaka | 5219 |
| **bookbazaar.com** | Book Bazaar | 01911223344 | Shop 22, New Market, Chittagong | 5230 |
| **fashionstore.com** | Fashion Store | 01555666777 | Shop 45, Gulshan-2, Dhaka | 5197 |

## 🛠️ Technical Implementation

- **React 19.1.1**: Latest React version
- **Vite 7.1.7**: Fast build tool and dev server  
- **TailwindCSS v4.1.13**: Latest utility-first CSS framework with @tailwindcss/vite plugin
- **Node.js ES Modules**: Modern JavaScript module system
- **csv-parser**: Efficient CSV file processing library

## ✅ Task 2 Requirements Met

- ✅ **CSV to React Generator**: Each CSV row = 1 React website
- ✅ **npm start script**: Runs generator automatically
- ✅ **Individual React apps**: Complete projects in `/build/[domain]/`
- ✅ **Spin-text randomization**: `[[Quick|Fast|Speedy]]` works
- ✅ **Template variables**: `{{ phone }}`, `{{ address }}` replacement
- ✅ **JavaScript ecosystem only**: React + Node.js (no C#, C++, Python)
- ✅ **Independent sites**: Each can run with `npm install && npm run dev`

## � Deployment

Each generated site in `build/[domain]/` is production-ready:
1. **Build for production**: `npm run build`  
2. **Deploy anywhere**: Vercel, Netlify, GitHub Pages, etc.
3. **Zero configuration**: Everything pre-configured

---

**Task 2 Complete ✅** - CSV-to-React website generator working perfectly!

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
