# Quick Start Guide - UBC Financial Aid Finder

## Get the App Running in 5 Minutes

### Step 1: Install Dependencies

Open two terminal windows.

**Terminal 1 - Backend:**
```bash
cd ubc-financial-aid-app/backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd ubc-financial-aid-app/frontend
npm install
```

### Step 2: Start the Servers

**Terminal 1 - Backend:**
```bash
npm start
```
✅ You should see: "Server is running on port 3001"

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ You should see: "Local: http://localhost:3000/"

### Step 3: Open the App

Open your browser and go to: **http://localhost:3000**

### Step 4: Test It Out

Try this test profile to see matches:

**Academic Info:**
- Campus: Vancouver
- Year: 2nd Year
- Faculty: Arts
- GPA: 3.5

**Demographics:**
- Citizenship: Canadian Citizen
- Check: "I have a full-time Canadian government student loan"
- Check: "I have demonstrated financial need"

Click "Find My Scholarships & Bursaries" and you should see several matches!

## Troubleshooting

**Problem:** "Port 3000 already in use"
**Solution:** Change the port in `frontend/vite.config.ts` to a different number (e.g., 3002)

**Problem:** "Cannot connect to backend"
**Solution:** Make sure the backend is running on port 3001. Check the terminal for errors.

**Problem:** "Module not found" errors
**Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Project Features

✨ **Smart Matching**: Automatically matches students with eligible awards
📊 **Categorized Results**: Perfect, Good, and Partial matches
💰 **Real Data**: Based on actual UBC scholarships and bursaries
📱 **Responsive Design**: Works on desktop, tablet, and mobile
🎨 **Modern UI**: Built with React and Tailwind CSS

## Next Steps

1. **Explore the Code**:
   - `backend/data/awards.js` - Add more awards here
   - `frontend/src/components/StudentForm.tsx` - Customize the form
   - `frontend/src/components/Results.tsx` - Change how results are displayed

2. **Add More Awards**:
   - Visit UBC's financial aid pages
   - Extract eligibility criteria
   - Add to the awards array following the existing format

3. **Customize the Design**:
   - Edit Tailwind classes in the components
   - Modify colors in `tailwind.config.js`
   - Update the header/footer in `App.tsx`

## Need Help?

- Check the full README.md for detailed documentation
- Review the code comments for implementation details
- Test with different student profiles to understand the matching logic

Happy coding! 🚀
