# Use an official Nginx image
FROM nginx:alpine

# Copy the static files to the Nginx html directory
COPY src/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
