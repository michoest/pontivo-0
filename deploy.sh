#!/bin/bash
set -e  # Exit on any error

cd app

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build
npm run build

# Add CNAME for custom domain
echo "pontivo.michoest.com" > dist/CNAME

# Deploy to gh-pages branch
cd dist
git init
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push -f https://github.com/michoest/pontivo-0.git main:gh-pages

cd ..
rm -rf dist/.git

echo "✓ Deployed to GitHub Pages"