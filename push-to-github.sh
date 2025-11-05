#!/bin/bash

# Script to push code to GitHub
# Usage: ./push-to-github.sh <your-github-username> <repo-name>

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./push-to-github.sh <github-username> <repo-name>"
    echo "Example: ./push-to-github.sh myusername api-monitor-platform"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2

echo "Setting up GitHub remote..."
git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git 2>/dev/null || git remote set-url origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git

echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "Done! Your code is now on GitHub: https://github.com/${GITHUB_USER}/${REPO_NAME}"

