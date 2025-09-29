import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read CSV file
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Function to process spin-text like [[Quick|Fast|Speedy]]
function processSpinText(text) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (match, options) => {
    const choices = options.split('|').map(s => s.trim());
    return choices[Math.floor(Math.random() * choices.length)];
  });
}

// Function to replace template variables like {{ phone }}
function replaceTemplateVariables(content, data) {
  let processedContent = content;
  
  // Replace template variables
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    processedContent = processedContent.replace(regex, data[key]);
  });
  
  // Add some derived data
  const location = data.address ? data.address.split(',').pop().trim() : 'Bangladesh';
  processedContent = processedContent.replace(/\{\{\s*location\s*\}\}/g, location);
  
  // Process spin-text
  processedContent = processSpinText(processedContent);
  
  return processedContent;
}

// Function to create directory structure
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy and process template files
function createSiteFromTemplate(siteData, buildDir) {
  const siteDir = path.join(buildDir, siteData.domain);
  
  // Create site directory structure
  ensureDir(siteDir);
  ensureDir(path.join(siteDir, 'src'));
  ensureDir(path.join(siteDir, 'src', 'components'));
  ensureDir(path.join(siteDir, 'public'));
  
  // Create Hero component with TailwindCSS
  const heroComponentContent = `import React from "react";

export default function Hero() {
  return (
    <div className="text-center py-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        ${replaceTemplateVariables('[[Quick|Fast|Speedy]] delivery service in dhaka.', siteData)}
      </h1>
    </div>
  );
}`;
  
  fs.writeFileSync(
    path.join(siteDir, 'src', 'components', 'Hero.jsx'),
    heroComponentContent
  );
  
  // Create Contact component with TailwindCSS
  const contactComponentContent = `import React from "react";

export default function Contact() {
  return (
    <div className="text-center py-4 bg-white">
      <div className="max-w-md mx-auto">
        <p className="text-lg mb-2">
          <span className="font-semibold">Phone:</span> ${siteData.phone}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Address:</span> ${siteData.address}
        </p>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync(
    path.join(siteDir, 'src', 'components', 'Contact.jsx'),
    contactComponentContent
  );
  
  // Create main App.jsx with TailwindCSS
  const appContent = `import React from 'react';
import Hero from './components/Hero';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Hero />
      <Contact />
    </div>
  );
}

export default App;
`;
  
  fs.writeFileSync(path.join(siteDir, 'src', 'App.jsx'), appContent);
  
  // Create main.jsx
  const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
  
  fs.writeFileSync(path.join(siteDir, 'src', 'main.jsx'), mainContent);
  
  // Create index.css with TailwindCSS
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  
  fs.writeFileSync(path.join(siteDir, 'src', 'index.css'), indexCss);
  
  // Create simple App.css
  const appCss = `/* Additional custom styles */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
`;
  
  fs.writeFileSync(path.join(siteDir, 'src', 'App.css'), appCss);
  
  // Create index.html
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${siteData.title}</title>
    <meta name="description" content="${siteData.description}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
  
  fs.writeFileSync(path.join(siteDir, 'index.html'), indexHtml);
  
  // Copy vite.svg to public folder
  if (fs.existsSync('./public/vite.svg')) {
    fs.copyFileSync('./public/vite.svg', path.join(siteDir, 'public', 'vite.svg'));
  }
  
  // Create package.json for the site with TailwindCSS v4
  const packageJson = {
    "name": siteData.domain.replace('.', '-'),
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite --port " + (5173 + Math.floor(Math.random() * 100)),
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "@tailwindcss/vite": "^4.1.13", 
      "react": "^19.1.1",
      "react-dom": "^19.1.1",
      "tailwindcss": "^4.1.13"
    },
    "devDependencies": {
      "@tailwindcss/postcss": "^4.1.13",
      "@vitejs/plugin-react": "^5.0.3",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.47",
      "vite": "^7.1.7"
    }
  };
  
  fs.writeFileSync(path.join(siteDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Create vite.config.js with TailwindCSS v4
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;
  
  fs.writeFileSync(path.join(siteDir, 'vite.config.js'), viteConfig);
  
  // Create tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  
  fs.writeFileSync(path.join(siteDir, 'tailwind.config.js'), tailwindConfig);
  
  // Create postcss.config.js for TailwindCSS v4
  const postcssConfig = `export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}`;
  
  fs.writeFileSync(path.join(siteDir, 'postcss.config.js'), postcssConfig);
  
  console.log(`✅ Generated site: ${siteData.domain}`);
}

// Main function
async function generateSites() {
  try {
    console.log('🚀 Starting website generation with TailwindCSS v4...');
    
    // Read CSV data
    const websites = await readCSV('./websites.csv');
    console.log(`📊 Found ${websites.length} websites in CSV`);
    
    // Create build directory
    const buildDir = './build';
    ensureDir(buildDir);
    
    // Clean existing build directory (skip on Windows if permission issues)
    if (fs.existsSync(buildDir)) {
      try {
        fs.rmSync(buildDir, { recursive: true, force: true });
        ensureDir(buildDir);
      } catch (error) {
        console.log('⚠️ Could not clean build directory, proceeding with existing files...', error.code);
        ensureDir(buildDir);
      }
    }
    
    // Generate sites
    for (const site of websites) {
      createSiteFromTemplate(site, buildDir);
    }
    
    console.log('✨ All websites generated successfully!');
    console.log(`📁 Check the 'build' folder for generated sites`);
    console.log('📁 Available sites:');
    websites.forEach((site, index) => {
      console.log(`   ${index + 1}. ${site.domain} - ${site.title}`);
    });
    console.log('🏃 To run a site: cd build/[domain] && npm install && npm run dev');
    
  } catch (error) {
    console.error('❌ Error generating sites:', error);
  }
}

// Run if called directly
console.log('🚀 Starting generator...');
generateSites();

export { generateSites, readCSV, processSpinText, replaceTemplateVariables };