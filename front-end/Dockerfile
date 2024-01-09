# Use an official Node runtime as a parent image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local Vite project to the container
COPY . .

# Build the Vite project
RUN npm run build

# Use a lightweight Node image for the final stage
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the production build from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Install 'serve' to run the application
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 5100

# Run the application using 'serve' on port 5100
CMD ["serve", "-s", "dist", "-p", "5100"]
