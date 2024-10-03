#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

# Install Node.js dependencies and build the React app
npm install --prefix task-manager-frontend
npm run build --prefix task-manager-frontend
