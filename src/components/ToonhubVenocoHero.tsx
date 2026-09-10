import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ─── Tokens de diseño Venoco ─────────────────────────────────────────────────
const FONT_PRIMARY = "'DIN', 'Inter', sans-serif"
const FONT_DISPLAY = "'Serpentine Bold Oblique', 'Anton', sans-serif"

// ─── Datos de productos (6 SKUs, imágenes HTTPS) ─────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'EXPERT EXTRA PLUS',
    category: 'LUBRICANTE MULTIGRADO',
    title: 'MÁXIMO RENDIMIENTO Y PROTECCIÓN',
    desc: 'Protección avanzada contra el desgaste y control térmico en motores de alta exigencia.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/Expert-Extra-plus.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/8-1.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
  },
  {
    id: 2,
    name: 'EXPERT EXTRA',
    category: 'LUBRICANTE PARA MOTOR',
    title: 'LIMPIEZA Y DURABILIDAD',
    desc: 'Mantiene el motor limpio y protegido contra la fricción diaria, garantizando excelente rotación comercial.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-extra.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/9-1.png',
    link: '#productos',
    bg: '#ffed00',
    panel: '#e6d500',
  },
  {
    id: 3,
    name: 'EXPERT PLUS',
    category: 'PROTECCIÓN CONTINUA',
    title: 'EFICIENCIA Y VIDA ÚTIL',
    desc: 'Formulación para extender la vida operativa del motor con respuesta fluida en cada marcha.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-plus.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/10-1.png',
    link: '#productos',
    bg: '#002470',
    panel: '#001b54',
  },
  {
    id: 4,
    name: 'EXPERT POWER',
    category: 'ALTA POTENCIA',
    title: 'RESISTENCIA EN USO CONTINUO',
    desc: 'Película protectora de máxima adherencia para responder ante aceleraciones y exigencia constante.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/expert-power.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/11-1.png',
    link: '#productos',
    bg: '#111111',
    panel: '#333333',
  },
  {
    id: 5,
    name: 'MOTORES 2 TIEMPOS POWER',
    category: 'LUBRICANTE ESPECIALIZADO 2T',
    title: 'POTENCIA Y RESPUESTA INMEDIATA',
    desc: 'Combustión limpia sin residuos para motores 2 tiempos de motos y equipos ligeros.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/motores-2-tiempospower.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/13.png',
    link: '#productos',
    bg: '#0033a0',
    panel: '#002470',
  },
  {
    id: 6,
    name: 'TRANSMISIÓN',
    category: 'FLUIDO DE TRANSMISIÓN',
    title: 'SUAVIDAD EN CAMBIOS Y ENGRANAJES',
    desc: 'Cuidado integral de la caja de cambios previniendo el sobrecalentamiento y la fricción.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/Transmision.png',
    bgImage: 'https://venoco.com/wp-content/uploads/2026/09/12.png',
    link: '#productos',
    bg: '#ffed00',
    panel: '#e6d500',
  },
] as const

const TOTAL = PRODUCTS.length

type Product = (typeof PRODUCTS)[number]

// ─── Posiciones circulares para N productos ───────────────────────────────────
function getPositions(activeIndex: number) {
  return {
    center: activeIndex,
    left: (activeIndex - 1 + TOTAL) % TOTAL,
    right: (activeIndex + 1) % TOTAL,
  }
}

// ─── Estilos de tarjeta por rol ───────────────────────────────────────────────
function getCardStyle(
  role: 'center' | 'left' | 'right' | 'back',
  isMobile: boolean,
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
          width: '52vw',
          maxWidth: 220,
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
          width: '36vw',
          maxWidth: 160,
          bottom: '6%',
          left: '6%',
          transform: 'rotate(-12deg) translateZ(0)',
          opacity: 0.5,
          filter: 'blur(1.5px)',
          zIndex: 2,
        }
      case 'right':
        return {
          ...base,
          width: '36vw',
          maxWidth: 160,
          bottom: '6%',
          right: '6%',
          transform: 'rotate(12deg) translateZ(0)',
          opacity: 0.5,
          filter: 'blur(1.5px)',
          zIndex: 2,
        }
      case 'back':
        return {
          ...base,
          width: '28vw',
          maxWidth: 130,
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
        width: 'clamp(240px, 22vw, 400px)',
        bottom: '6%',
        left: '50%',
        transform: 'translateX(-50%) translateZ(0)',
        opacity: 1,
        filter: 'none',
        zIndex: 4,
      }
    case 'left':
      return {
        ...base,
        width: 'clamp(160px, 14vw, 280px)',
        bottom: '4%',
        left: 'clamp(40px, 12vw, 180px)',
        transform: 'rotate(-14deg) translateZ(0)',
        opacity: 0.55,
        filter: 'blur(2px)',
        zIndex: 2,
      }
    case 'right':
      return {
        ...base,
        width: 'clamp(160px, 14vw, 280px)',
        bottom: '4%',
        right: 'clamp(40px, 12vw, 180px)',
        transform: 'rotate(14deg) translateZ(0)',
        opacity: 0.55,
        filter: 'blur(2px)',
        zIndex: 2,
      }
    case 'back':
      return {
        ...base,
        width: 'clamp(120px, 10vw, 200px)',
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

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ToonhubVenocoHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Inyectar Google Fonts en document.head (idempotente; Elementor no sirve index.html)
  useEffect(() => {
    const id = 'toonhub-venoco-fonts'
    if (document.getElementById(id)) return
    const preconnect1 = document.createElement('link')
    preconnect1.rel = 'preconnect'
    preconnect1.href = 'https://fonts.googleapis.com'
    const preconnect2 = document.createElement('link')
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://fonts.gstatic.com'
    preconnect2.crossOrigin = 'anonymous'
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap'
    document.head.append(preconnect1, preconnect2, link)
  }, [])

  // Detectar responsive
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Precargar imágenes de producto y fondos
  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img1 = new Image()
      img1.src = p.src
      const img2 = new Image()
      img2.src = p.bgImage
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
  const textColor = active.bg === '#ffed00' ? '#002470' : '#ffffff'

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 480,
        overflow: 'hidden',
        backgroundColor: active.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: FONT_PRIMARY,
      }}
      aria-label="Carrusel de productos Venoco"
    >
      {/* ── Capa 0: Imágenes de fondo con crossfade ──────────────────── */}
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
            opacity: idx === activeIndex ? 0.6 : 0,
            transition: 'opacity 650ms cubic-bezier(0.4,0,0.2,1)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Capa 1: Granulado SVG ───────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.14,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <filter id="vnoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vnoise)" />
      </svg>

      {/* ── Capa 2: Texto "VENOCO" gigante de fondo ────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(90px, 26vw, 380px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-2px',
            color: textColor,
            opacity: 0.15,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
            whiteSpace: 'nowrap',
          }}
        >
          VENOCO
        </span>
      </div>

      {/* ── Capa 3: Etiqueta de marca superior izquierda ──────────────── */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          left: isMobile ? 16 : 32,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 'clamp(9px, 1.6vw, 13px)',
            fontWeight: 700,
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            color: textColor,
            opacity: 0.85,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          TOONHUB x VENOCO · INDUSTRIAL LUBRICANTS
        </span>
      </div>

      {/* ── Capa 4: Carrusel 3D (6 productos, 3 visibles) ────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
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
              style={getCardStyle(role, isMobile)}
              draggable={false}
            />
          )
        })}
      </div>

      {/* ── Capa 5: Panel inferior izquierdo ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 32,
          left: isMobile ? 16 : 40,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 8 : 14,
          maxWidth: isMobile ? 'calc(100vw - 130px)' : 400,
        }}
      >
        {/* Categoría */}
        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            fontWeight: 700,
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: textColor,
            opacity: 0.6,
            margin: 0,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {active.category}
        </p>

        {/* Nombre del SKU */}
        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 'clamp(11px, 3vw, 14px)' : 'clamp(13px, 1.6vw, 18px)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: textColor,
            opacity: 0.9,
            margin: 0,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {active.name}
        </p>

        {/* Titular */}
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isMobile ? 'clamp(16px, 4.5vw, 24px)' : 'clamp(22px, 2.8vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
            color: textColor,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
            margin: 0,
          }}
        >
          {active.title}
        </h2>

        {/* Descripción */}
        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 11 : 'clamp(12px, 1.2vw, 14px)',
            lineHeight: 1.55,
            color: textColor,
            opacity: 0.75,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
            margin: 0,
          }}
        >
          {active.desc}
        </p>

        {/* Botones de navegación */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => navigate(-1)}
            disabled={isAnimating}
            aria-label="Producto anterior"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `2px solid ${textColor}`,
              background: 'transparent',
              color: textColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.4 : 1,
              transition:
                'color 650ms cubic-bezier(0.4,0,0.2,1), border-color 650ms cubic-bezier(0.4,0,0.2,1), opacity 0.15s ease',
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => navigate(1)}
            disabled={isAnimating}
            aria-label="Producto siguiente"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `2px solid ${textColor}`,
              background: 'transparent',
              color: textColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.4 : 1,
              transition:
                'color 650ms cubic-bezier(0.4,0,0.2,1), border-color 650ms cubic-bezier(0.4,0,0.2,1), opacity 0.15s ease',
              flexShrink: 0,
            }}
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ── Capa 6: CTA inferior derecho → smooth scroll a #productos ─── */}
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
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            height: 44,
            padding: '0 20px',
            borderRadius: 4,
            border: `2px solid ${textColor}`,
            background: 'transparent',
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 10 : 12,
            fontWeight: 700,
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: textColor,
            transition:
              'color 650ms cubic-bezier(0.4,0,0.2,1), border-color 650ms cubic-bezier(0.4,0,0.2,1)',
            whiteSpace: 'nowrap',
          }}
        >
          DESCUBRIR PRODUCTO
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>

      {/* ── Indicadores de posición (6 puntos) ───────────────────────── */}
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
              transition:
                'width 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), background-color 650ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
