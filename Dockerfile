# Use an official Node.js runtime as a base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build files (assuming your build files are in a 'build' directory)
COPY build/ .

# Install the 'serve' package globally
RUN npm install -g serve

# Expose the port on which the 'serve' command will run (default is 5000)
EXPOSE 5000

# Define the command to run when the container starts
CMD ["serve", "-s", "."]
