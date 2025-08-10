// Slow falling snow effect
class SnowEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { this.canvas.style.display = 'none'; return; }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 120;
        if (window.innerWidth < 900) { this.particleCount = Math.max(20, Math.round(this.particleCount/4)); }
        this.maxSpeed = 0.35; // Slower speed
        this.minSpeed = 0.08;
        
        this.init();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create snow particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed,
                opacity: Math.random() * 0.5 + 0.3,
                drift: Math.random() * 0.5 - 0.25
            });
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    drawSnowflake(x, y, radius, opacity) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fill();
        this.ctx.restore();
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.y += particle.speed;
            particle.x += particle.drift;

            // Reset particle when it goes off screen
            if (particle.y > this.canvas.height) {
                particle.y = -10;
                particle.x = Math.random() * this.canvas.width;
            }

            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.drawSnowflake(particle.x, particle.y, particle.radius, particle.opacity);
        });
        
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize slow snow effect when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const snowEffect = new SnowEffect('snow-canvas');
});
