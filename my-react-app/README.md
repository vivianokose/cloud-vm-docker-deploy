# Multi-Stage Docker Build for a React App

![Azure](https://img.shields.io/badge/Azure-VM-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-29.1.3-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Node](https://img.shields.io/badge/Node-18_Alpine-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> Using multi-stage Docker builds to reduce a React app image from 760MB down to 94MB — an 87.6% reduction — while improving security and CI/CD performance.

---

## What This Project Does

This project compares two approaches to containerizing a React application:

- **Single-stage build**: Everything in one image. Node.js, npm, build tools, source code, and finished files all packed together. Result: 760MB.
- **Multi-stage build**: Builder stage compiles the app, runtime stage serves only the finished files via Nginx. Result: 94MB.

Same application. Same output. 87.6% smaller image.

---

## The Numbers

| Image | Size | Reduction |
|---|---|---|
| react-single:latest | 760 MB | baseline |
| react-multi:latest | 94 MB | 87.6% smaller |

---

## Architecture

```
Single-Stage Flow:
node:18-alpine --> install deps --> build app --> serve on port 3000
(everything stays in one image: Node, npm, 1342 packages, source code, build output)

Multi-Stage Flow:
Stage 1 (builder): node:18-alpine --> install deps --> build app --> build/ folder
                                                                          |
                                                                    COPY --from=builder
                                                                          |
Stage 2 (runtime): nginx:alpine --> serve build/ on port 80
(only Nginx + finished files make it into the final image)
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Microsoft Azure | Cloud provider |
| Ubuntu 24.04 LTS | VM operating system |
| Docker 29.1.3 | Container runtime |
| Node 18 Alpine | React app builder stage |
| Nginx Alpine | Lightweight production runtime |
| React 19 | Frontend framework |

---

## Project Structure

```
my-react-app/
├── Dockerfile              (multi-stage - production)
├── Dockerfile.single       (single-stage - baseline)
├── .dockerignore
├── package.json
├── package-lock.json
├── public/
├── src/
│   └── App.js             (customized with personal details)
└── screenshots/
    ├── 01_VM_Basics_Configuration.png
    ├── 02_NSG_Inbound_Rules.png
    ├── 03_Advanced_Tab_Custom_Data.png
    ├── 04_Review_Validation_Passed.png
    ├── 05_VM_Deployment_Complete.png
    ├── 06_SSH_Connected_To_VM.png
    ├── 07_Docker_Version_And_PS.png
    ├── 08_Git_Clone_React_App.png
    ├── 09_Dockerignore_Content.png
    ├── 10_Dockerfile_Single_Content.png
    ├── 11_Docker_Build_Single_Complete.png
    ├── 12_Docker_Build_Multi_Complete.png
    ├── 13_Docker_Images_Size_Comparison.png
    ├── 14_Docker_PS_Both_Containers_Running.png
    ├── 15_React_Multi_Live_In_Browser.png
    ├── 16_React_Single_Live_In_Browser.png
    └── 17_Docker_Images_Final_Comparison.png
```

---

## Dockerfile.single (Baseline)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

This image carries everything. Node.js never leaves.

---

## Dockerfile (Multi-Stage - Production)

```dockerfile
# Stage 1 - build React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - serve with nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Node.js, npm, and all 1,342 packages never make it into the final image.

---

## .dockerignore

```
node_modules
build
.dockerignore
.git
.gitignore
*.md
```

---

## Step-by-Step Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/pravinmishraaws/my-react-app.git
cd my-react-app
```

### Step 2: Create the .dockerignore

```bash
cat > .dockerignore <<'EOF'
node_modules
build
.dockerignore
.git
.gitignore
*.md
EOF
```

### Step 3: Build the Single-Stage Image

```bash
docker build -f Dockerfile.single -t react-single:latest .
```

### Step 4: Build the Multi-Stage Image

```bash
docker build -t react-multi:latest .
```

### Step 5: Run Both Containers

```bash
# Single-stage on port 3000
docker run -d --name react-single \
  -p 3000:3000 \
  --restart unless-stopped \
  react-single:latest

# Multi-stage on port 80
docker run -d --name react-multi \
  -p 80:80 \
  --restart unless-stopped \
  react-multi:latest
```

### Step 6: Compare Image Sizes

```bash
docker images
```

### Step 7: Open in Browser

```
Multi-stage: http://<YOUR_PUBLIC_IP>
Single-stage: http://<YOUR_PUBLIC_IP>:3000
```

---

## Why Multi-Stage Builds Matter

**Security**: Every package not in the runtime image cannot be exploited. A compromised nginx:alpine container gives an attacker access to a minimal web server. A compromised Node.js container gives them a full package manager and 1,342 dependencies to probe.

**Speed**: An 87.6% smaller image means faster pushes to your registry and faster pulls to your server. In a CI/CD pipeline deploying multiple times a day, this adds up to real time saved.

**Caching**: Copying package.json before the rest of the source code means Docker caches the npm install layer. If only your source files change, Docker skips the install entirely on the next build.

---

## Success Criteria

- [x] Dockerfile.single builds and serves the app on port 3000
- [x] Multi-stage Dockerfile builds a smaller image than the baseline
- [x] Both apps accessible in browser simultaneously
- [x] 87.6% image size reduction achieved
- [x] Security and caching analysis documented

---

## Author

**Vivian Chiamaka Okose**
DevOps Engineer

- GitHub: [vivianokose](https://github.com/vivianokose)
- LinkedIn: [linkedin.com/in/okosechiamaka](https://linkedin.com/in/okosechiamaka)

---
