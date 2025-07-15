# ✅ Use official Node.js image
FROM node:18

# ✅ Set working directory inside container
WORKDIR /app

# ✅ Copy package files first (improves build cache)
COPY package*.json ./

# ✅ Install dependencies
RUN npm install

# ✅ Copy the rest of your backend code
COPY . .

# ✅ Expose the backend port
EXPOSE 5000

# ✅ Start the backend server
CMD ["npm", "run", "dev"]
