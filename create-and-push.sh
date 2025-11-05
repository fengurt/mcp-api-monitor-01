#!/bin/bash

# Script to create GitHub repository and push code
# Repository: github.com/fengurt/mcp-api-monitor-01

echo "🚀 Creating GitHub repository and pushing code..."
echo ""

# Check if gh is available
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found. Creating repository..."
    gh repo create fengurt/mcp-api-monitor-01 --public --source=. --remote=origin --push
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Success! Repository created and code pushed!"
        echo "📦 Repository URL: https://github.com/fengurt/mcp-api-monitor-01"
        exit 0
    fi
fi

# If gh is not available, provide manual instructions
echo "⚠️  GitHub CLI not found in PATH."
echo ""
echo "Please do ONE of the following:"
echo ""
echo "Option 1: Create repository on GitHub website first"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: mcp-api-monitor-01"
echo "3. Choose Public or Private"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo "6. Then run: git push -u origin main"
echo ""
echo "Option 2: Use GitHub CLI (if installed but not in PATH)"
echo "Run: /usr/local/bin/gh repo create fengurt/mcp-api-monitor-01 --public --source=. --remote=origin --push"
echo ""
echo "Current git remote:"
git remote -v

