#!/bin/bash

# GitHub CLI Installation Script for macOS

echo "🚀 Installing GitHub CLI..."

# Check if Homebrew is installed
if command -v brew &> /dev/null; then
    echo "✅ Homebrew found. Installing GitHub CLI via Homebrew..."
    brew install gh
    echo "✅ GitHub CLI installed!"
    gh --version
    echo ""
    echo "📝 Next step: Run 'gh auth login' to authenticate"
else
    echo "⚠️  Homebrew not found. Installing Homebrew first..."
    echo ""
    echo "Please run this command in your terminal (it will ask for your password):"
    echo ""
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo ""
    echo "After Homebrew is installed, run this script again, or run:"
    echo "brew install gh"
    echo ""
    echo "Alternatively, you can download GitHub CLI directly from:"
    echo "https://github.com/cli/cli/releases/latest"
    exit 1
fi

