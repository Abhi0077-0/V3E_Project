#!/bin/bash

# Use Rustup to install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable

# Set environment variables to ensure Rust is available in the PATH
source $HOME/.cargo/env

# Install Python dependencies
pip install -r requirements.txt

# Build React frontend
npm install --prefix task-manager-frontend
npm run build --prefix task-manager-frontend

chmod +x build.sh