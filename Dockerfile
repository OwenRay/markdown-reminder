# Start from the official Bun base image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Update package lists and install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Define build-time variables
ARG REPO
ARG GH_PAT
ARG UPDATE_INTERVAL
ARG PUSHBULLET_TOKEN
ARG DATE_REGEX

# Set environment variables
ENV REPO=$REPO
ENV GH_PAT=$GH_PAT
ENV UPDATE_INTERVAL=$UPDATE_INTERVAL
ENV PUSHBULLET_TOKEN=$PUSHBULLET_TOKEN
ENV DATE_REGEX=$DATE_REGEX

# Copy package.json and package-lock.json
COPY package.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Set the command to run your application
CMD [ "bun", "start" ]
