#!/bin/bash

# Rebrand remaining instances to HorizonAI
# Run this script: bash rebrand_to_horizonai.sh

cd "$(dirname "$0")"

echo "Rebranding to HorizonAI..."

# Terminal panel - remove emojis from npm, git, and other commands
sed -i '' 's/📦 Starting/Starting/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/⚡ Compiling/Compiling/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Compiled/Compiled/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/🚀 Development/Development/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/📦 Installing/Installing/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Installation/Installation/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/🏃 Running/Running/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Script/Script/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/📜 Executing/Executing/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/🟢/!/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Execution/Execution/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Staged/Staged/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Committed/Committed/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Successfully/Successfully/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/🎉/!/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Created/Created/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/📄 Content/Content/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/✅ Removed/Removed/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/💪 Command not found/Command not found/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/Cocky AI never gives up!/Type "help" for available commands./g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/print("Hello from Cocky AI!")/print("Hello from HorizonAI!")/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/Cocky Developer/Horizon Developer/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/cocky@example.com/horizon@example.com/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/💪 Added awesome/Added awesome/g' frontend/src/components/TerminalPanel.tsx

# Terminal header - remove gradient and emoji
sed -i '' 's/bg-gradient-to-r from-purple-600 via-pink-600 to-red-600/bg-gray-800/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/<span className="text-yellow-300 animate-pulse">💪<\/span>//g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/COCKY AI TERMINAL V2.0/HORIZONAI TERMINAL V2.0/g' frontend/src/components/TerminalPanel.tsx
sed -i '' 's/💪 Terminal cleared/Terminal cleared/g' frontend/src/components/TerminalPanel.tsx

# Backend
sed -i '' 's/CodePilot AI/HorizonAI/g' backend/main.py
sed -i '' 's/CodePilot AI/HorizonAI/g' backend/app/services/ai_service.py
sed -i '' 's/codepilot-ai/horizon-ai/g' backend/main.py

echo "Rebranding complete! ✓"
echo "Now restart your frontend: cd frontend && npm run dev"
