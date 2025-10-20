#!/bin/bash

# BananaBetting Launch Script
# This script launches both the backend and frontend servers

set -e  # Exit on any error

echo "🚀 Starting BananaBetting Application..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists python3; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.8+${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 14+${NC}"
    exit 1
fi

if ! command_exists npm && ! command_exists pnpm; then
    echo -e "${RED}❌ Neither npm nor pnpm is installed. Please install npm or pnpm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are available${NC}"

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/zbet/backend"
FRONTEND_DIR="$SCRIPT_DIR/zbet/frontend"

# Backend Setup
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd "$BACKEND_DIR"

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
pip install -r requirements.txt

# Frontend Setup
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd "$FRONTEND_DIR"

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    # Check if pnpm is available, otherwise use npm
    if command_exists pnpm; then
        pnpm install
    else
        npm install
    fi
fi

# Function to cleanup processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    
    # Kill backend process
    if [ ! -z "$BACKEND_PID" ] && kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID 2>/dev/null
        sleep 1
        # Force kill if still running
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill -9 $BACKEND_PID 2>/dev/null
        fi
        echo -e "${GREEN}✅ Backend server stopped${NC}"
    fi
    
    # Kill frontend process
    if [ ! -z "$FRONTEND_PID" ] && kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID 2>/dev/null
        sleep 1
        # Force kill if still running
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill -9 $FRONTEND_PID 2>/dev/null
        fi
        echo -e "${GREEN}✅ Frontend server stopped${NC}"
    fi
    
    # Kill any remaining processes that might be hanging
    pkill -f "uvicorn app.main:app" 2>/dev/null || true
    pkill -f "next-server" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
    
    echo -e "${GREEN}🏁 All servers stopped${NC}"
    exit 0
}

# Trap SIGINT and SIGTERM to cleanup
trap cleanup SIGINT SIGTERM

# Start Backend Server
echo -e "\n${BLUE}🔥 Starting Backend Server...${NC}"
cd "$BACKEND_DIR"
source venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend Server
echo -e "\n${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$FRONTEND_DIR"
# Use the appropriate package manager
if command_exists pnpm; then
    pnpm dev &
else
    npm run dev &
fi
FRONTEND_PID=$!

# Display information
echo -e "\n${GREEN}🎉 BananaBetting is now running!${NC}"
echo -e "=================================="
echo -e "${BLUE}📡 Backend API:${NC} http://localhost:8000"
echo -e "${BLUE}📚 API Docs:${NC} http://localhost:8000/docs"
echo -e "${BLUE}🎨 Frontend:${NC} http://localhost:3000"
echo -e "=================================="
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"

# Wait for processes with better handling
while kill -0 $BACKEND_PID 2>/dev/null || kill -0 $FRONTEND_PID 2>/dev/null; do
    sleep 1
done

echo -e "${GREEN}🏁 All processes have ended${NC}"
