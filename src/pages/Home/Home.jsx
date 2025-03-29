import { useEffect, useRef } from 'react';
import './Home.css'
import { Search } from "lucide-react"
import { Input } from "../../components/Input/Input.jsx";
import { Button } from "../../components/Button/Button.jsx"
import { Building, BookOpen } from "lucide-react"
import { CardLink } from "../../components/CardLink/CardLink.jsx";
import backgroundImage from "../../assets/bg.webp"

const Home = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const particles = [];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 6 + 4;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.4 + 0.1;
      
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity: opacity,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        borderRadius: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        transition: 'transform 0.1s linear',
        zIndex: 0
      });
      
      container.appendChild(particle);
      particles.push({
        element: particle,
        baseX: posX,
        baseY: posY,
        x: posX,
        y: posY,
        speed: Math.random() * 0.2 + 0.05,
        angle: Math.random() * Math.PI * 2
      });
    }

    particlesRef.current = particles;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { x: lastX, y: lastY } = mousePosRef.current;
      
      mousePosRef.current = {
        x: clientX,
        y: clientY,
        lastX,
        lastY,
        velocityX: clientX - lastX,
        velocityY: clientY - lastY
      };

      updateParticles();
    };

    const updateParticles = () => {
      const { x: mouseX, y: mouseY, velocityX, velocityY } = mousePosRef.current;
      const mouseSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      const normalizedSpeed = Math.min(mouseSpeed / 10, 2);

      particlesRef.current.forEach(particle => {
        // Calculate distance from mouse
        const dx = mouseX - (particle.x * window.innerWidth / 100);
        const dy = mouseY - (particle.y * window.innerHeight / 100);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel particles based on mouse velocity
        if (distance < 200) {
          const force = (200 - distance) / 200 * normalizedSpeed * 3;
          const angle = Math.atan2(dy, dx);
          
          particle.x -= Math.cos(angle) * force * particle.speed;
          particle.y -= Math.sin(angle) * force * particle.speed;
        }
        
        // Slowly return to original position
        particle.x += (particle.baseX - particle.x) * 0.01;
        particle.y += (particle.baseY - particle.y) * 0.01;
        
        // Apply slight floating motion
        particle.angle += particle.speed * 0.01;
        particle.x += Math.cos(particle.angle) * 0.1;
        particle.y += Math.sin(particle.angle) * 0.1;
        
        // Update position
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });
    };

    const animate = () => {
      particlesRef.current.forEach(particle => {
        particle.angle += particle.speed * 0.01;
        const floatX = Math.cos(particle.angle) * 0.2;
        const floatY = Math.sin(particle.angle) * 0.2;
        
        particle.x = particle.x + (particle.baseX + floatX - particle.x) * 0.02;
        particle.y = particle.y + (particle.baseY + floatY - particle.y) * 0.02;
        
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      particlesRef.current.forEach(p => p.element.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="absolute inset-0 backdrop-blur-3xl bg-opacity-50 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%
          `,
          zIndex: 0
        }}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            გახდი ის ვინც გინდა
          </h1>
          <p className="mx-auto max-w-2xl mt-4 text-lg text-gray-300">
            მოძებნეთ ასობით უნივერსიტეტი და ფაკულტეტი, რომ იპოვოთ თქვენთვის შესაბამისი მომვალის გზა.
          </p>
        </header>

        <div className="mx-auto mb-16 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="უნივერსიტეტი, ფაკულტეტი..."
              className="h-14 rounded-lg border-gray-300 pl-4 pr-12 text-lg shadow-sm "
            />
            <Button className="absolute right-1 top-1 h-12 w-12 rounded-md" size="icon">
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <CardLink
            to="/universities"
            icon={Building}
            title="უნივერსიტეტები"
            description="იხილეთ საქართველოს უნივერსიტეტების სრული სია"
          />
          <CardLink
            to="/faculties"
            icon={BookOpen}
            title="ფაკულტეტები"
            description="იხილეთ სხვადასხვა ფაკულტეტები და აკადემიური დეპარტამენტები"
          />
        </div>
      </div>
    </div>
  )
}

export default Home;