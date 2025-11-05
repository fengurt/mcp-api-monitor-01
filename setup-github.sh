#!/bin/bash

# Complete GitHub Setup Script
# This script will:
# 1. Check if GitHub CLI is installed
# 2. Help you authenticate
# 3. Create a GitHub repository
# 4. Push your code

echo "🚀 GitHub Setup Script"
echo "======================"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo ""
    echo "Please install it first:"
    echo "1. Install Homebrew: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "2. Install GitHub CLI: brew install gh"
    echo ""
    exit 1
fi

echo "✅ GitHub CLI is installed!"
gh --version
echo ""

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 You need to authenticate with GitHub."
    echo "Running 'gh auth login'..."
    gh auth login
else
    echo "✅ Already authenticated with GitHub!"
    gh auth status
fi

echo ""
echo "📦 Ready to create repository and push code!"
echo ""
read -p "Enter your desired repository name (e.g., api-monitor-platform): " REPO_NAME
read -p "Make it private? (y/n) [default: n]: " IS_PRIVATE

if [ "$IS_PRIVATE" = "y" ] || [ "$IS_PRIVATE" = "Y" ]; then
    PRIVATE_FLAG="--private"
else
    PRIVATE_FLAG="--public"
fi

echo ""
echo "Creating repository: $REPO_NAME"
echo ""

# Create repo and push
gh repo create "$REPO_NAME" $PRIVATE_FLAG --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code has been pushed to GitHub!"
    echo ""
    gh repo view --web
else
    echo ""
    echo "⚠️  Repository might already exist or there was an error."
    echo "You can manually push with:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
    echo "  git push -u origin main"
fi

