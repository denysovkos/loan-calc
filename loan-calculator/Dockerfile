# Start your image with a node base image
FROM node:alpine

# The /app directory should act as the main application directory WITHIN the application
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install Dependencies
RUN npm install --force

# Copy all changes on fronted
COPY . .

# expose the app on port 3000
EXPOSE 3000

# Start your frontend application
CMD [ "npm", "run", "start", "--", "--host", "0.0.0.0"]