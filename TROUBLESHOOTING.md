# Troubleshooting Local Preview

## Quick Check

1. **Is the server running?**
   ```bash
   lsof -i :8000
   ```
   If nothing shows, start the server:
   ```bash
   cd /Users/af/cpro01/kcanva01
   python3 -m http.server 8000
   ```

2. **Open in browser:**
   - http://localhost:8000
   - http://127.0.0.1:8000
   - http://localhost:8000/index.html

3. **Check browser console:**
   - Press F12 or Cmd+Option+I (Mac)
   - Look for errors in the Console tab

## Common Issues

### Issue: "Page not found" or blank page
**Solution:**
- Make sure you're in the project directory: `/Users/af/cpro01/kcanva01`
- Check that `index.html` exists: `ls -la index.html`
- Try accessing: http://localhost:8000/index.html

### Issue: "Styles not loading"
**Solution:**
- Check browser console for 404 errors
- Verify `styles.css` exists: `ls -la styles.css`
- Check that server is running from the correct directory

### Issue: "JavaScript not working"
**Solution:**
- Open browser console (F12)
- Check for errors
- Verify `app.js` exists: `ls -la app.js`
- Make sure `index.html` includes: `<script src="app.js"></script>`

### Issue: Port already in use
**Solution:**
```bash
# Kill existing server
lsof -ti:8000 | xargs kill

# Or use a different port
python3 -m http.server 3000
# Then access: http://localhost:3000
```

### Issue: CORS errors
**Solution:**
- This shouldn't happen with local files
- If you see CORS errors, make sure you're accessing via `http://localhost:8000` not `file://`

## Manual Server Start

1. **Stop any existing server:**
   ```bash
   lsof -ti:8000 | xargs kill
   ```

2. **Start server:**
   ```bash
   cd /Users/af/cpro01/kcanva01
   python3 -m http.server 8000
   ```

3. **Keep terminal open** - server runs in foreground
   - Press Ctrl+C to stop

4. **Or run in background:**
   ```bash
   python3 -m http.server 8000 > /dev/null 2>&1 &
   ```

## Alternative: Direct File Open

If server doesn't work, you can open the file directly:
```bash
open index.html
```
Note: Some features may not work with `file://` protocol.

## Verify Files

Check all required files exist:
```bash
ls -la index.html app.js styles.css
```

All should show file sizes > 0.

