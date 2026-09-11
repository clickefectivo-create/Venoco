import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const FONT_PRIMARY = "'DIN', 'Inter', sans-serif"
const FONT_DISPLAY = "'Serpentine Bold Oblique', 'Anton', sans-serif"

const PRODUCTS = [
  {
    id: 1,
    name: 'EXPERT EXTRA PLUS',
    category: 'LUBRICANTES PARA MOTOR',
    title: 'MÁXIMO RENDIMIENTO Y PROTECCIÓN',
    desc: 'Protección avanzada contra el desgaste y control térmico en motores de alta exigencia.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/Expert-Extra-plus.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/8-1.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
    small: false,
  },
  {
    id: 2,
    name: 'EXPERT EXTRA',
    category: 'LUBRICANTES PARA MOTOR',
    title: 'LIMPIEZA Y DURABILIDAD',
    desc: 'Mantiene el motor limpio y protegido contra la fricción diaria, garantizando excelente rotación comercial.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-extra.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/9-1.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
    small: false,
  },
  {
    id: 3,
    name: 'EXPERT PLUS',
    category: 'LUBRICANTES PARA MOTOR A GASOLINA',
    title: 'EFICIENCIA Y VIDA ÚTIL',
    desc: 'Formulación para extender la vida operativa del motor con respuesta fluida en cada marcha.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-plus.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/10-1.png',
    link: '#productos',
    bg: '#002470',
    panel: '#001b54',
    small: true,
  },
  {
    id: 4,
    name: 'EXPERT POWER',
    category: '4T MOTO',
    title: 'RESISTENCIA EN USO CONTINUO',
    desc: 'Película protectora de máxima adherencia para responder ante aceleraciones y exigencia constante.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-power.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/11-1.png',
    link: '#productos',
    bg: '#111111',
    panel: '#333333',
    small: true,
  },
  {
    id: 5,
    name: 'MOTOR 2T',
    category: 'ACEITE PARA MOTORES 2 TIEMPOS',
    title: 'POTENCIA Y RESPUESTA INMEDIATA',
    desc: 'Combustión limpia sin residuos para motores 2 tiempos de motos y equipos ligeros.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/motores-2-tiempospower.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/13.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
    small: true,
  },
  {
    id: 6,
    name: 'AUTOMÁTICA / MANUAL',
    category: 'FLUIDOS DE TRANSMISIÓN',
    title: 'SUAVIDAD EN CAMBIOS Y ENGRANAJES',
    desc: 'Cuidado integral de la caja de cambios previniendo el sobrecalentamiento y la fricción.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/Transmision.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/12.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
    small: false,
  },
] as const

const TOTAL = PRODUCTS.length

type Product = (typeof PRODUCTS)[number]

function getPositions(activeIndex: number) {
  return {
    center: activeIndex,
    left: (activeIndex - 1 + TOTAL) % TOTAL,
    right: (activeIndex + 1) % TOTAL,
  }
}

// small: reduce tamaño 25% para productos 4 y 5
function getCardStyle(
  role: 'center' | 'left' | 'right' | 'back',
  isMobile: boolean,
  small: boolean,
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    transition: 'all 650ms cubic-bezier(0.4,0,0.2,1)',
    transformOrigin: 'center bottom',
    willChange: 'transform, opacity, filter',
  }

  if (isMobile) {
    switch (role) {
      case 'center':
        return {
          ...base,
          width: small ? '75vw' : '100vw',
          maxWidth: small ? 330 : 440,
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0)',
          opacity: 1,
          filter: 'none',
          zIndex: 4,
        }
      case 'left':
        return {
          ...base,
          width: small ? '54vw' : '72vw',
          maxWidth: small ? 240 : 320,
          bottom: '6%',
          left: '2%',
          transform: 'rotate(-12deg) translateZ(0)',
          opacity: 0.5,
          filter: 'blur(1.5px)',
          zIndex: 2,
        }
      case 'right':
        return {
          ...base,
          width: small ? '54vw' : '72vw',
          maxWidth: small ? 240 : 320,
          bottom: '6%',
          right: '2%',
          transform: 'rotate(12deg) translateZ(0)',
          opacity: 0.5,
          filter: 'blur(1.5px)',
          zIndex: 2,
        }
      case 'back':
        return {
          ...base,
          width: '56vw',
          maxWidth: 260,
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0)',
          opacity: 0,
          filter: 'blur(4px)',
          zIndex: 1,
          pointerEvents: 'none',
        }
    }
  }

  switch (role) {
    case 'center':
      return {
        ...base,
        width: 'auto',
        maxWidth: small ? '28vw' : '38vw',
        maxHeight: '68vh',
        objectFit: 'contain',
        bottom: '4%',
        left: '50%',
        transform: 'translateX(-50%) translateZ(0)',
        opacity: 1,
        filter: 'none',
        zIndex: 4,
      }
    case 'left':
      return {
        ...base,
        width: 'auto',
        maxWidth: small ? '18vw' : '24vw',
        maxHeight: '48vh',
        objectFit: 'contain',
        bottom: '4%',
        left: 'clamp(20px, 4vw, 80px)',
        transform: 'rotate(-14deg) translateZ(0)',
        opacity: 0.55,
        filter: 'blur(2px)',
        zIndex: 2,
      }
    case 'right':
      return {
        ...base,
        width: 'auto',
        maxWidth: small ? '18vw' : '24vw',
        maxHeight: '48vh',
        objectFit: 'contain',
        bottom: '4%',
        right: 'clamp(20px, 4vw, 80px)',
        transform: 'rotate(14deg) translateZ(0)',
        opacity: 0.55,
        filter: 'blur(2px)',
        zIndex: 2,
      }
    case 'back':
      return {
        ...base,
        width: 'clamp(240px, 20vw, 400px)',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%) translateZ(0)',
        opacity: 0,
        filter: 'blur(6px)',
        zIndex: 1,
        pointerEvents: 'none',
      }
  }
}

export default function ToonhubVenocoHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Inyectar CSS con !important para sobrescribir estilos de h1/p del tema de WordPress
  useEffect(() => {
    const id = 'toonhub-venoco-overrides'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      #toonhub-venoco-root * {
        color: #ffffff !important;
      }
      #toonhub-venoco-root h1 {
        font-family: 'Serpentine Bold Oblique', 'Anton', sans-serif !important;
        color: #ffffff !important;
      }
      #toonhub-venoco-root a.toonhub-cta {
        color: #ffffff !important;
        background-color: #ffed00 !important;
      }
      #toonhub-venoco-root button svg,
      #toonhub-venoco-root a svg {
        stroke: #ffffff !important;
        color: #ffffff !important;
      }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img1 = new Image(); img1.src = p.src
      const img2 = new Image(); img2.src = p.bgImage
    })
  }, [])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) => (prev + dir + TOTAL) % TOTAL)
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating],
  )

  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const active: Product = PRODUCTS[activeIndex]
  const positions = getPositions(activeIndex)
  // Texto siempre blanco para garantizar legibilidad sobre cualquier fondo
  const textColor = '#ffffff'

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        minHeight: 384,
        overflow: 'hidden',
        backgroundColor: active.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: FONT_PRIMARY,
      }}
      aria-label="Carrusel de productos Venoco"
    >
      {/* Capa 0: Crossfade de imágenes de fondo al 20% */}
      {PRODUCTS.map((p, idx) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${p.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === activeIndex ? 0.2 : 0,
            transition: 'opacity 650ms cubic-bezier(0.4,0,0.2,1)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Capa 1: Granulado */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <filter id="vnoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vnoise)" />
      </svg>

      {/* Capa 2: Carrusel 3D */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
        aria-live="polite"
        aria-atomic="true"
      >
        {PRODUCTS.map((product, idx) => {
          let role: 'center' | 'left' | 'right' | 'back' = 'back'
          if (idx === positions.center) role = 'center'
          else if (idx === positions.left) role = 'left'
          else if (idx === positions.right) role = 'right'

          return (
            <img
              key={product.id}
              src={product.src}
              alt={role === 'center' ? product.title : ''}
              style={getCardStyle(role, isMobile, product.small)}
              draggable={false}
            />
          )
        })}
      </div>

      {/* Capa 3: Panel inferior izquierdo */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 32,
          left: isMobile ? 16 : 40,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 6 : 12,
          maxWidth: isMobile ? 'calc(100vw - 130px)' : 420,
        }}
      >
        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            fontWeight: 700,
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            color: textColor,
            opacity: 0.65,
            margin: 0,
          }}
        >
          {active.category}
        </p>

        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 'clamp(12px, 3.5vw, 16px)' : 'clamp(14px, 1.8vw, 20px)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: textColor,
            opacity: 0.92,
            margin: 0,
          }}
        >
          {active.name}
        </p>

        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isMobile ? 'clamp(16px, 4.5vw, 24px)' : 'clamp(22px, 2.8vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
            color: textColor,
            margin: 0,
          }}
        >
          {active.title}
        </h1>

        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 11 : 'clamp(12px, 1.2vw, 14px)',
            lineHeight: 1.55,
            color: textColor,
            opacity: 0.75,
            margin: 0,
          }}
        >
          {active.desc}
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => navigate(-1)}
            disabled={isAnimating}
            aria-label="Producto anterior"
            style={{
              width: 52, height: 52,
              borderRadius: '50%',
              border: '2.5px solid #ffffff',
              background: 'rgba(0,0,0,0.65)',
              color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.35 : 1,
              transition: 'opacity 0.15s ease',
              flexShrink: 0,
              lineHeight: 0,
            }}
          >
            <ArrowLeft size={22} strokeWidth={2.5} color="#ffffff" />
          </button>

          <button
            onClick={() => navigate(1)}
            disabled={isAnimating}
            aria-label="Producto siguiente"
            style={{
              width: 52, height: 52,
              borderRadius: '50%',
              border: '2.5px solid #ffffff',
              background: 'rgba(0,0,0,0.65)',
              color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.35 : 1,
              transition: 'opacity 0.15s ease',
              flexShrink: 0,
              lineHeight: 0,
            }}
          >
            <ArrowRight size={22} strokeWidth={2.5} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Capa 4: CTA inferior derecho → "VER PRODUCTOS" */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 32,
          right: isMobile ? 16 : 40,
          zIndex: 10,
        }}
      >
        <a
          href="#productos"
          onClick={handleCtaClick}
          className="toonhub-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            height: 44,
            padding: '0 20px',
            borderRadius: 4,
            border: '2px solid #ffed00',
            background: '#ffed00',
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 10 : 12,
            fontWeight: 700,
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          VER PRODUCTOS
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>

      {/* Indicadores de posición */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 32,
          zIndex: 10,
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {PRODUCTS.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === activeIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: textColor,
              opacity: idx === activeIndex ? 1 : 0.3,
              transition: 'width 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
