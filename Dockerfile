# Use an official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /index

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev

# Copy the rest of your source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the server
CMD ["node", "index.js"]
