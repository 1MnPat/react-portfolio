# How to Start the Server

## The Problem
You're getting "network error" because the **backend server is not running**. The React app is trying to make API calls to `http://localhost:5001/api`, but there's no server listening on that port.

## Solution: Start the Backend Server

### Option 1: Start Server Manually (Recommended for Development)

1. **Open a new terminal window/tab**

2. **Navigate to the server directory:**
   ```bash
   cd server
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```
   
   Or if you don't have a dev script:
   ```bash
   npm start
   ```

4. **You should see:**
   ```
   MongoDB Connected Successfully!
   Server running on port 5001
   ```

5. **Keep this terminal open** - the server needs to keep running

### Option 2: Start Both Client and Server Together

From the **root directory** of the project:

```bash
npm run dev
```

This will start both the React client (port 3000) and the Express server (port 5001) simultaneously.

## Verify Server is Running

1. **Check if server is running:**
   ```bash
   curl http://localhost:5001/api/health
   ```
   
   Should return: `{"status":"ok"}`

2. **Or open in browser:**
   ```
   http://localhost:5001/api/health
   ```

## Common Issues

### Issue: "MONGODB_URI is not defined"
- Make sure you have a `.env` file in the `server/` directory
- It should contain: `MONGODB_URI=your_mongodb_connection_string`

### Issue: "Port 5001 is already in use"
- Another process is using port 5001
- Kill it: `lsof -ti:5001 | xargs kill -9`
- Or change the port in `server/server.js`

### Issue: "Cannot connect to MongoDB"
- Check your MongoDB connection string in `.env`
- Make sure MongoDB is running (if local) or your Atlas cluster is accessible

## Quick Start Checklist

- [ ] Server is running on port 5001
- [ ] Client is running on port 3000
- [ ] MongoDB is connected
- [ ] No CORS errors in browser console
- [ ] API calls work (check Network tab in browser DevTools)

