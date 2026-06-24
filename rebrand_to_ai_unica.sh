#!/bin/bash

# Rebrand from HorizonAI to AI Unica
# Run this script: bash rebrand_to_ai_unica.sh

cd "$(dirname "$0")"

echo "Rebranding to AI Unica..."

# Frontend components
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/HorizonAI/AI Unica/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/horizon-ai/ai-unica/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/horizon-developer/ai-unica-developer/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/horizon-shell/ai-unica-shell/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/horizonai-terminal/ai-unica-terminal/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/HORIZONAI/AI UNICA/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/horizon@example.com/ai-unica@example.com/g' {} +
find frontend/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Horizon Developer/AI Unica Developer/g' {} +

# Backend
find backend -type f -name "*.py" -exec sed -i '' 's/HorizonAI/AI Unica/g' {} +
find backend -type f -name "*.py" -exec sed -i '' 's/horizon-ai/ai-unica/g' {} +

echo ""
echo "✓ Rebranding complete!"
echo ""
echo "Your app is now branded as 'AI Unica'"
echo ""
echo "To see the changes, restart your frontend:"
echo "  cd frontend"
echo "  npm run dev"
