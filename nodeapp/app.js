const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Route to display the portfolio
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Mohamed Khaled Baoueb</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <!-- Header -->
  <header>

  
    <div class="logo">
      <h1>Mohamed Khaled Baoueb</h1>
      
    </div>
    <nav>
      <ul>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Intro Section -->
  <section class="intro">
    <div class="text">
      <h2>Hey, I'm Mohamed Khaled.</h2>
      <h5>
        I'm a final-year software engineer student specializing in Cloud Computing & DevOps. I'm passionate about building scalable infrastructures, automating workflows, developing cloud-based applications, and implementing CI/CD pipelines to streamline development and deployment processes.
        Here are some of the technologies I’ve been actively using:
      </h5>
      <div class="tech-stack">
        <span>CI/CD</span>
        <span>Jenkins</span>
        <span>GitHub</span>
        <span>GitLab</span>
        <span>Kubernetes</span>
        <span>Docker</span>
        <span>Terraform</span>
        
        <span>AWS</span>
        <span>OpenStack</span>
        <span>Prometheus</span>
        <span>Grafana</span>
        <span>SonarQube</span>
        <span>OWASP ZAP</span>
        <span>Nexus</span>
        <span>Java</span>
      
        <span>React.js</span>
        <span>Laravel</span>
        <span>Angular</span>
        <span>Spring Boot</span>
        <span>TypeScript</span>
        <span>JavaScript</span>
        

      </div>
    </div>
    <div class="profile">
      <img src="https://avatars.githubusercontent.com/u/79573933?v=4" alt="Your Profile Photo">
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="projects">
    <h2>Projects</h2>
   <div class="carousel">
  <div class="carousel-inner">
    <!-- Project 1 -->
    <div class="carousel-item">
      <div class="project">
        <h3>CI/CD Pipeline with GitHub Actions, Terraform and AWS</h3>
        <p>Built a CI/CD pipeline with Terraform to provision an EC2 instance, deploy a Dockerized Node.js app, and manage infrastructure using AWS ECR for images and S3 for state storage, all automated with GitHub Actions.</p>

        <a href="https://github.com/your-repo" target="_blank">
  <i class="fab fa-github"></i> View Project
</a>
      </div>
    </div>
    <!-- Project 2 -->
    <div class="carousel-item">
      <div class="project">
        <h3>CI/CD Pipeline with Jenkins</h3>
        <p>Built a CI/CD pipeline with Jenkins, using Docker for deployments, SonarQube for code analysis, OWASP ZAP for security, and Prometheus with Grafana for monitoring.</p>
        <a href="https://github.com/your-repo" target="_blank">
  <i class="fab fa-github"></i> View Project
</a>
      </div>
    </div>
    <!-- Project 3 -->
    <div class="carousel-item">
      <div class="project">
        <h3>CI/CD pipeline with GitLab</h3>
<p>Built a GitLab CI/CD pipeline for a Laravel app, integrating DAST, SAST, and deploying to Azure Kubernetes Service (AKS).</p>
       <a href="https://github.com/your-repo" target="_blank">
  <i class="fab fa-github"></i> View Project
</a>
      </div>
    </div>
    <!-- Add more projects as needed -->
  </div>
  <button class="carousel-prev">❮</button>
  <button class="carousel-next">❯</button>
</div>

  </section>

 <!-- Contact Section -->
  <section id="contact" class="contact">
    <h2> </h2>
    
  </section> 

  <!-- Footer -->
  <footer>
    <ul>
      <li><a href="https://github.com/khaledg4g">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/mouhamed-khaled-baoueb/">LinkedIn</a></li>
      
    </ul>
  </footer>

  <script src="carousel.js"></script>
</body>
</html>


  `);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
