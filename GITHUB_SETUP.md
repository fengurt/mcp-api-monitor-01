# GitHub Setup Guide

## Installing GitHub CLI

### Option 1: Using Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   Follow the prompts and enter your password when requested.

2. **Install GitHub CLI**:
   ```bash
   brew install gh
   ```

3. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```
   Follow the interactive prompts to authenticate.

### Option 2: Direct Download

1. Visit: https://github.com/cli/cli/releases/latest
2. Download the macOS `.pkg` installer
3. Double-click to install
4. Open Terminal and run:
   ```bash
   gh auth login
   ```

### Option 3: Manual Install (No Homebrew)

```bash
# Download
curl -L https://github.com/cli/cli/releases/latest/download/gh_*_macOS_amd64.tar.gz -o gh-cli.tar.gz

# Extract
tar -xzf gh-cli.tar.gz

# Install (requires sudo)
sudo mv gh_*_macOS_amd64/bin/gh /usr/local/bin/

# Verify
gh --version
```

## Creating and Pushing to GitHub Repository

### Method 1: Using GitHub CLI (After Installation)

Once GitHub CLI is installed:

```bash
cd /Users/af/cpro01/kcanva01

# Create repository on GitHub
gh repo create api-monitor-platform --public --source=. --remote=origin

# Push code
git push -u origin main
```

### Method 2: Manual GitHub Web Interface

1. **Create Repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `api-monitor-platform` (or any name you prefer)
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect and Push**:
   ```bash
   cd /Users/af/cpro01/kcanva01
   
   # Add remote (replace YOUR_USERNAME and REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/api-monitor-platform.git
   
   # Push code
   git branch -M main
   git push -u origin main
   ```

### Method 3: Using the Provided Script

If you've already created the repository on GitHub:

```bash
./push-to-github.sh YOUR_GITHUB_USERNAME YOUR_REPO_NAME
```

## Verify Installation

After installing GitHub CLI, verify it works:

```bash
gh --version
```

You should see something like:
```
gh version 2.x.x (xxxx-xx-xx)
```

## Authentication

After installing, authenticate:

```bash
gh auth login
```

Choose:
- GitHub.com
- HTTPS
- Yes to authenticate Git
- Login with a web browser (recommended)

## Troubleshooting

### Permission Issues
If you get permission errors, you may need to add GitHub CLI to your PATH or use sudo:
```bash
sudo mv gh /usr/local/bin/
```

### Already Has Remote
If you get "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Authentication Issues
```bash
gh auth refresh
```

