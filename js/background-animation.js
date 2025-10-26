// Three.js Background Animation for Nexus Group AI
class NexusBackground {
    constructor() {
        this.container = document.getElementById('hero-background');
        if (!this.container) return;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.connections = null;
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.z = 300;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.container.appendChild(this.renderer.domElement);

        // Create particles and connections
        this.createParticles();
        this.createConnections();
    }

    createParticles() {
        // Reduce particle count on mobile devices
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 60 : 120;
        
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 800;
            positions[i + 1] = (Math.random() - 0.5) * 800;
            positions[i + 2] = (Math.random() - 0.5) * 800;
            
            velocities[i] = (Math.random() - 0.5) * 0.3;
            velocities[i + 1] = (Math.random() - 0.5) * 0.3;
            velocities[i + 2] = (Math.random() - 0.5) * 0.3;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x865dff, // Nexus purple color
            size: 2,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.particles.userData = { velocities: velocities };
        this.scene.add(this.particles);
    }

    createConnections() {
        // Reduce connection count on mobile devices
        const isMobile = window.innerWidth <= 768;
        const connectionCount = isMobile ? 20 : 40;
        
        const positions = new Float32Array(connectionCount * 6);
        
        for (let i = 0; i < connectionCount * 6; i += 6) {
            const x1 = (Math.random() - 0.5) * 800;
            const y1 = (Math.random() - 0.5) * 800;
            const z1 = (Math.random() - 0.5) * 800;
            
            const x2 = x1 + (Math.random() - 0.5) * 150;
            const y2 = y1 + (Math.random() - 0.5) * 150;
            const z2 = z1 + (Math.random() - 0.5) * 150;
            
            positions[i] = x1;
            positions[i + 1] = y1;
            positions[i + 2] = z1;
            positions[i + 3] = x2;
            positions[i + 4] = y2;
            positions[i + 5] = z2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.LineBasicMaterial({
            color: 0x9d7fff, // Even lighter purple for optimal visibility
            transparent: true,
            opacity: 0.18, // Increased opacity for better visibility
            blending: THREE.AdditiveBlending
        });

        this.connections = new THREE.LineSegments(geometry, material);
        this.scene.add(this.connections);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.userData.velocities;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Boundary check with bounce
                if (positions[i] > 400 || positions[i] < -400) velocities[i] *= -1;
                if (positions[i + 1] > 400 || positions[i + 1] < -400) velocities[i + 1] *= -1;
                if (positions[i + 2] > 400 || positions[i + 2] < -400) velocities[i + 2] *= -1;
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Mouse interaction - subtle camera movement
        this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.01;
        this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.01;
        
        this.camera.lookAt(this.scene.position);

        // Gentle rotation for particles and connections
        if (this.particles) {
            this.particles.rotation.y += 0.0005;
        }
        if (this.connections) {
            this.connections.rotation.x += 0.0002;
            this.connections.rotation.y -= 0.0003;
        }

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
    }

    onWindowResize() {
        this.windowHalf.x = window.innerWidth / 2;
        this.windowHalf.y = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX - this.windowHalf.x) * 0.05;
        this.mouse.y = (event.clientY - this.windowHalf.y) * 0.05;
    }
}

// Fallback Canvas Animation for devices without WebGL support
class NexusCanvasBackground {
    constructor() {
        this.container = document.getElementById('hero-background');
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
    }

    createParticles() {
        // Reduce particle count on mobile devices
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 40 : 80;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.4 + 0.3
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
                particle.vx += dx * 0.00005;
                particle.vy += dy * 0.00005;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(134, 93, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(157, 127, 255, ${0.4 - distance / 800})`; // Even lighter purple with better opacity
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });
    }
}

// Initialize background animation
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl && typeof THREE !== 'undefined') {
        // Use Three.js for devices with WebGL support
        new NexusBackground();
    } else {
        // Use Canvas fallback for devices without WebGL support
        new NexusCanvasBackground();
    }
});