#!/bin/bash
cd /Users/af/cpro01/kcanva01
echo "Starting server on http://localhost:8000"
echo "Press Ctrl+C to stop"
python3 -m http.server 8000
