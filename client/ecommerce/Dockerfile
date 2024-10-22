# Use the latest Node.js version with Alpine for a small image size
FROM node:20.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to leverage Docker caching for dependencies
COPY package.json yarn.lock ./

# Install dependencies without cache and avoid optional dependencies for a smaller image
RUN yarn install --frozen-lockfile --production

# Copy the remaining application files to the container
COPY . .

# Expose the application's port (3000 in this case)
EXPOSE 3000

# Define the default command to run your application
CMD ["yarn", "start"]
