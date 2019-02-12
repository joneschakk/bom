rm -rf build node_modules
npm i 
npx tsc
cp ormconfig.prod.json build/ormconfig.json
npm i --only=production
cp -r .env node_modules build/
mkdir -p build/ui/next
cp -r frontend build/ui/
mkdir -p bom-calculator
mv build bom-calculator/
tar -cf bom-calculator.tar bom-calculator
