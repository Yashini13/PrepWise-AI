# Use official Python runtime as a parent image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirement file and install dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application code and model files
COPY . .

# Expose port (Cloud Run uses 8080)
ENV PORT=8080
EXPOSE  8080
# Tell Flask to run on 0.0.0.0 so it's externally accessible
ENV FLASK_RUN_HOST=0.0.0.0

# Run the app
CMD ["python", "app.py"]
