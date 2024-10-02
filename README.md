# Very Chaotic - React Frontend & Python Flask Backend

**Very Chaotic** is a web application consisting of a React frontend and a Python Flask backend. The frontend serves the user interface, while the backend provides the necessary APIs to power the app. This README covers instructions on running the app locally, deploying it to AWS EC2 using Docker, and setting up HTTPS for secure access.

## Application Overview

This project is a full-stack web application with the following structure:

* **Frontend**: React.js, which interacts with the backend API.
* **Backend**: Python Flask, which handles API requests and serves data.

The app has been containerized with Docker and can be deployed on AWS EC2, where it can be accessed over HTTPS.

Additionally, a CI/CD pipeline has been set up using GitHub Actions to automate the deployment process to AWS EC2.

## How to Run Locally

### 1. Frontend (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:

```bash
npm install
```
3. **Start the frontend development server**:

```bash
npm start
```
By default, the app should run at `http://localhost:3000`.

### 2. Backend (Python Flask)

1. **Navigate to the backend directory**:

```bash
cd backend
```
2. **Set up a virtual environment**:

```bash
python3 -m venv venv
source venv/bin/activate
```
3. **Install the required dependencies**:

```bash
pip install -r requirements.txt
```
4. **Run the Flask app**:

```bash
python app.py
```
By default, the backend will run at `http://localhost:5000`.

### Access the App

* After starting both the frontend and backend servers, you should be able to access the application at:
    * **Frontend**: `http://localhost:3000`
    * **Backend API**: `http://localhost:5000/api`
 ## How to Build and Run with Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iniememUd/very-chaotic.git
   cd very-chaotic
   ```
2. **Build and run the containers with Docker Compose**:

```bash
docker-compose up --build
```
The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## 1. EC2 Setup with Ubuntu and Nginx

### a. Launch an EC2 Instance

1. In the AWS console, launch an EC2 instance using **Ubuntu 20.04** or a similar version.
2. Ensure the security group allows inbound traffic on ports **80 (HTTP)** and **443 (HTTPS)**.

### b. Install Docker and Docker Compose on Ubuntu EC2

SSH into the instance and run the following commands to install Docker and Docker Compose:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```
Install Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
### c. Install Nginx
```bash
sudo apt install -y nginx
```
### 2. Nginx Configuration
#### a. Create Nginx Configuration for Reverse Proxy
Create a new Nginx configuration file for your app:
```bash
sudo nano /etc/nginx/sites-available/very-chaotic
```
Add the following content to proxy the requests to the frontend and backend Docker containers:
### Nginx Reverse Proxy Configuration

To configure Nginx as a reverse proxy for both the React frontend and Flask backend, use the following Nginx configuration(setup may differ as i served my front & backend seperately):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

   # Proxy frontend (React)
    location / {
      proxy_pass http://localhost:3000;
      # ...other headers...
    }

  # Proxy backend (Flask API)
    location /api {
      proxy_pass http://localhost:5000;
      # ...other headers...
    }
}
```
Enable the configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/very-chaotic /etc/nginx/sites-enabled/
sudo nginx -t 
sudo systemctl restart nginx
```
### 3. Set Up HTTPS with Let’s Encrypt

#### a. Install Certbot for SSL
To install Certbot and its Nginx plugin for SSL, run the following command:

```bash
sudo apt install certbot python3-certbot-nginx
```
#### b. Obtain an SSL Certificate
Run the following command to obtain a free SSL certificate from Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically configure Nginx to use the SSL certificate.

#### c. Auto-renew SSL Certificates
Certbot automatically sets up a cron job to renew your certificates. To manually test the renewal process:
```bash
sudo certbot renew --dry-run
```
This ensures that your SSL certificates are renewed automatically before they expire.

### 4. Docker Setup on EC2

#### a. Clone Your Repository

After setting up Nginx and SSL, you can clone your project by running the following commands on your EC2 instance:
```bash
git clone https://github.com/iniememUd/very-chaotic.git
cd very-chaotic
```
#### b. Build and Run the Docker Containers

Now build and run your app using Docker Compose:
```bash
docker-compose up --build -d
```
Nginx will now serve your frontend and backend over HTTPS.

### Access the app on this link: [https://www.verychaoticpodcast.link]

## Conclusion

With these steps, your app will be deployed to an Ubuntu EC2 instance, served through Nginx, and secured with SSL using Let’s Encrypt. The Docker containers will run both the React frontend and Flask backend, with Nginx acting as a reverse proxy.
