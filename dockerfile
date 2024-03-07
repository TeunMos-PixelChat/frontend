# Use an official Node.js runtime as the base image
FROM node:20.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the project files to the container
COPY . .

# Build the React app
RUN npm run build

# Set up serve
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build", "-l", "3000"]