#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Source and destination paths
SOURCE_ZSHRC="$HOME/user/.zshrc"
DEST_ZSHRC="$HOME/.zshrc"

# Function to check if Oh My Zsh is installed
check_oh_my_zsh_installed() {
    if [ -d "$HOME/.oh-my-zsh" ] && [ -n "$(ls -A "$HOME/.oh-my-zsh" 2>/dev/null)" ]; then
        return 0
    else
        return 1
    fi
}

# Function to copy .zshrc
copy_zshrc() {
    #echo  "${YELLOW}Checking for custom .zshrc at $SOURCE_ZSHRC...${NC}"

    if [ -f "$SOURCE_ZSHRC" ]; then
#        echo  "${GREEN}Found custom .zshrc${NC}"

        # Backup existing destination .zshrc if it exists
        if [ -f "$DEST_ZSHRC" ]; then
            backup_file="${DEST_ZSHRC}.backup.$(date +%s)"
#            echo  "${YELLOW}Backing up existing .zshrc to $backup_file${NC}"
            cp "$DEST_ZSHRC" "$backup_file"
        fi

        # Copy the custom .zshrc
        cp "$SOURCE_ZSHRC" "$DEST_ZSHRC"
#        echo  "${GREEN}✓ Custom .zshrc copied to $DEST_ZSHRC${NC}"

        # Set proper permissions
        chmod 644 "$DEST_ZSHRC"
        return 0
    else
        echo  "${RED}✗ Custom .zshrc not found at $SOURCE_ZSHRC${NC}"
        return 1
    fi
}

# Function to install Oh My Zsh
install_oh_my_zsh() {
    echo  "${YELLOW}Installing Oh My Zsh...${NC}"

    # Skip the auto-switch to zsh since we want to keep our custom .zshrc
    export RUNZSH=no

    if command -v curl >/dev/null 2>&1; then
        sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    elif command -v wget >/dev/null 2>&1; then
        sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)" "" --unattended
    else
        echo  "${RED}Error: Neither curl nor wget is available.${NC}"
        exit 1
    fi
    exec zsh
}

# Main script
#echo  "${YELLOW}Starting Oh My Zsh installation with custom config...${NC}"

# Step 1: Copy custom .zshrc first
if copy_zshrc; then
    echo  "${GREEN}✓ Custom config copied successfully${NC}"
else
    echo  "${YELLOW}Continuing without custom .zshrc...${NC}"
fi

# Step 2: Check if Oh My Zsh is already installed
#echo  "${YELLOW}Checking if Oh My Zsh is already installed...${NC}"

if check_oh_my_zsh_installed; then
    echo  "${GREEN}✓ Oh My Zsh is already installed${NC}"
else
    #echo  "${YELLOW}Oh My Zsh not found. Proceeding with installation...${NC}"

    # Check if zsh is installed
    if ! command -v zsh >/dev/null 2>&1; then
        echo  "${YELLOW}Zsh not found. Installing zsh first...${NC}"

        if command -v apt-get >/dev/null 2>&1; then
            apt-get update && apt-get install -y zsh
        elif command -v yum >/dev/null 2>&1; then
            yum install -y zsh
        elif command -v brew >/dev/null 2>&1; then
            brew install zsh
        else
            echo  "${RED}Error: Cannot automatically install zsh.${NC}"
            exit 1
        fi
    fi

    # Install Oh My Zsh
    install_oh_my_zsh

    # Verify installation
    if check_oh_my_zsh_installed; then
        echo  "${GREEN}✓ Oh My Zsh installed successfully!${NC}"
    else
        echo  "${RED}✗ Oh My Zsh installation may have failed.${NC}"
        exit 1
    fi
fi

echo "${GREEN}✓ Setup complete! Your custom .zshrc is in place and Oh My Zsh is ready.${NC}"
echo "${YELLOW}Note: If your custom .zshrc doesn't source Oh My Zsh, you may need to add:${NC}"
echo "${YELLOW}source \$HOME/.oh-my-zsh/oh-my-zsh.sh${NC}"
