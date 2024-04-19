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

# Accept the build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_TEST
ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_AUDIENCE

# Use the build arguments as environment variables
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_TEST=$REACT_APP_TEST
ENV REACT_APP_AUTH0_DOMAIN=$REACT_APP_AUTH0_DOMAIN
ENV REACT_APP_AUTH0_CLIENT_ID=$REACT_APP_AUTH0_CLIENT_ID
ENV REACT_APP_AUTH0_AUDIENCE=$REACT_APP_AUTH0_AUDIENCE

# Build the React app
RUN npm run build

# Set up serve
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build", "-l", "3000"]