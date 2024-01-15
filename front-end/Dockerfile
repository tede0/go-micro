# Use an official Node runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the local source files to the container
COPY . .

# Build the React app
RUN npm run build

# Install the 'serve' package globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5100

# Define the command to run the application
CMD ["serve", "-s", "dist", "-l", "5100"]
