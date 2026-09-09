import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ─── Tokens de diseño Venoco ─────────────────────────────────────────────────
const FONT_PRIMARY = "'DIN', 'Inter', sans-serif"
const FONT_DISPLAY = "'Serpentine Bold Oblique', 'Anton', sans-serif"

// ─── Datos de productos ───────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'VENOCO 4.PNG',
    title: 'SINTÉTICO / HEAVY DUTY',
    desc: 'Máxima protección contra el desgaste térmico y fricción extrema en motores de alto rendimiento.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/4.png',
    link: 'https://venoco.com/wp-content/uploads/2026/09/4.png',
    bg: '#0033a0',
    panel: '#002470',
  },
  {
    id: 2,
    name: 'VENOCO 3.PNG',
    title: 'TECNOLOGÍA MULTIGRADO',
    desc: 'Formulación avanzada con aditivos detergentes que garantizan la máxima limpieza del motor.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/3.png',
    link: 'https://venoco.com/wp-content/uploads/2026/09/3.png',
    bg: '#ffed00',
    panel: '#e6d500',
  },
  {
    id: 3,
    name: 'VENOCO 2.PNG',
    title: 'PROTECCIÓN INDUSTRIAL',
    desc: 'Lubricante especializado para maquinaria pesada y condiciones de alta exigencia operacional.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/2.png',
    link: 'https://venoco.com/wp-content/uploads/2026/09/2.png',
    bg: '#002470',
    panel: '#001b54',
  },
  {
    id: 4,
    name: 'VENOCO 1.PNG',
    title: 'LUBRICACIÓN DE PRECISIÓN',
    desc: 'Desarrollado con estándares B2B e industriales para extender la vida útil de cada componente.',
    src: 'https://venoco.com/wp-content/uploads/2026/09/1.png',
    link: 'https://venoco.com/wp-content/uploads/2026/09/1.png',
    bg: '#111111',
    panel: '#333333',
  },
] as const

type Product = (typeof PRODUCTS)[number]

// ─── Lógica de posiciones circulares ─────────────────────────────────────────
function getPositions(activeIndex: number) {
  return {
    center: activeIndex,
    left: (activeIndex + 3) % 4,
    right: (activeIndex + 1) % 4,
    back: (activeIndex + 2) % 4,
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
      }
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ToonhubVenocoHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Inyectar Google Fonts en el <head> del documento (necesario en Elementor donde no se sirve index.html)
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

  // Precargar imágenes
  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img = new Image()
      img.src = p.src
    })
  }, [])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) => (prev + dir + 4) % 4)
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating],
  )

  const active: Product = PRODUCTS[activeIndex]
  const positions = getPositions(activeIndex)

  // Color de texto adaptativo: amarillo → tinta oscura, resto → blanco
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
      {/* ── Capa 1: Granulado SVG ───────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 0,
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
          zIndex: 1,
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

      {/* ── Capa 3: Etiqueta de marca superior ────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          left: isMobile ? 16 : 32,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
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

      {/* ── Capa 4: Carrusel 3D ───────────────────────────────────────── */}
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
          gap: isMobile ? 10 : 16,
          maxWidth: isMobile ? 'calc(100vw - 130px)' : 380,
        }}
      >
        {/* Título del producto */}
        <div>
          <p
            style={{
              fontFamily: FONT_PRIMARY,
              fontSize: 'clamp(10px, 1.4vw, 12px)',
              fontWeight: 600,
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
              color: textColor,
              opacity: 0.6,
              marginBottom: 4,
              transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            PRODUCTO ACTIVO
          </p>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: isMobile ? 'clamp(18px, 5vw, 26px)' : 'clamp(24px, 3.2vw, 48px)',
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
        </div>

        {/* Descripción */}
        <p
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: isMobile ? 12 : 'clamp(13px, 1.3vw, 15px)',
            lineHeight: 1.5,
            color: textColor,
            opacity: 0.78,
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1)',
            margin: 0,
          }}
        >
          {active.desc}
        </p>

        {/* Botones de navegación */}
        <div style={{ display: 'flex', gap: 12 }}>
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

      {/* ── Capa 6: CTA inferior derecho ──────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 32,
          right: isMobile ? 16 : 40,
          zIndex: 10,
        }}
      >
        <a
          href={active.link}
          target="_blank"
          rel="noopener noreferrer"
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
            transition: 'color 650ms cubic-bezier(0.4,0,0.2,1), border-color 650ms cubic-bezier(0.4,0,0.2,1)',
            whiteSpace: 'nowrap',
          }}
        >
          DESCUBRIR PRODUCTO
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>

      {/* ── Indicadores de posición ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 32,
          zIndex: 10,
          display: 'flex',
          gap: 6,
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
              opacity: idx === activeIndex ? 1 : 0.35,
              transition:
                'width 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), background-color 650ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
