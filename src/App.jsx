import { useState, useRef, useCallback, useEffect } from 'react'

const CONFIG = {
  day1Date:     'शनिवार, 28 नवंबर 2026',
  day1Time:     'प्रातः 10:00 बजे से',
  day1Location: '538, ब्रम्हनगर, औरैया, उत्तर प्रदेश,206122',
  day1MapsUrl:  'https://maps.app.goo.gl/Tsc9fwD6avUBPhuc8',
  day2Date:     'रविवार, 29 नवंबर 2026',
  day2Time:     'प्रातः 12:00 बजे से',
  ahutiLocation:  '538, ब्रम्हनगर, औरैया, उत्तर प्रदेश, 206122',
  ahutiMapsUrl:   'https://maps.app.goo.gl/Tsc9fwD6avUBPhuc8',
  bhojTime:     'सायं 4:00 बजे से',
  bhojLocation: 'शांति वाटिका गेस्ट हाउस, ब्रम्हनगर, औरैया, उत्तर प्रदेश, 206122',
  mapsUrl:      'https://www.google.com/maps/place/Shanti+Vatika+Function+Hall',
  mapsEmbed:    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.69959006139862!2d79.511500261724!3d26.457208795184915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399df3aa7730b57b%3A0x3f0a00c2b25d5897!2sShanti%20Vatika%20Function%20Hall%20(Banquet%20Hall)!5e1!3m2!1sen!2sin!4v1777787132409!5m2!1sen!2sin',
  names:       ['श्री अनंत कुमार श्रीवास्तव', 'श्रीमती रंजना श्रीवास्तव'],
  contacts:    [
    { name: 'श्री शशांक श्रीवास्तव', phone: '+91 9045341566' },
    { name: 'श्री सूर्यांश श्रीवास्तव',    phone: '+91 7895589330' },
  ],
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left:  `${(i * 6.25 + Math.random() * 5).toFixed(1)}%`,
  size:  `${3 + (i % 3)}px`,
  dur:   `${7 + (i % 5) * 1.8}s`,
  delay: `${(i * .5) % 7}s`,
  dx:    `${((i % 2 === 0 ? 1 : -1) * (20 + i * 3))}px`,
}))

function Particles() {
  return (
    <div className="particles">
      {PARTICLES.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, width: p.size, height: p.size,
          '--dur': p.dur, '--delay': p.delay, '--dx': p.dx,
        }} />
      ))}
    </div>
  )
}

function Diya() {
  return (
    <div className="diya-wrap">
      <div className="diya-glow" />
      <div className="wick" />
      <div className="flame-wrap"><div className="flame" /></div>
      <div className="diya-body" />
    </div>
  )
}

function Divider() { return <div className="divider" /> }

function DetailRow({ emoji, label, value }) {
  return (
    <div className="detail-row">
      <span className="d-emoji">{emoji}</span>
      <div>
        <span className="d-label">{label}</span>
        <span className="d-value">{value}</span>
      </div>
    </div>
  )
}

function BtnRow({ onBack, onNext, nextLabel }) {
  return (
    <div className="btn-row">
      {onBack && <button className="back-btn" onClick={onBack}>← वापस</button>}
      {onNext && <button className="next-btn" onClick={onNext}>{nextLabel} →</button>}
    </div>
  )
}

function PageOpening({ gone, onEnter }) {
  return (
    <div className={`page page-opening${gone ? ' gone' : ''}`} onClick={onEnter}>
      <Particles />
      <Diya />
      <div className="opening-text">
        <p className="opening-shraddha">श्रद्धा एवं कृतज्ञता सहित</p>
        <p className="opening-touch"><span>✦ स्पर्श करें ✦</span></p>
      </div>
    </div>
  )
}

function PageInvite({ active, onNext }) {
  return (
    <div className={`page page-invite${active ? ' active' : ''}`}>
      <Particles />
      <div className="inner">
        <div className="mandala-ring">
          <span className="mandala-om">🕉</span>
        </div>
        <p className="mantra">॥ श्री राम जय राम जय जय राम ॥</p>
        <div className="invite-block">
          <p className="invite-line a1" style={{ animationFillMode:'both' }}>
            आपको सपरिवार सादर आमंत्रित करते हैं
          </p>
          <p className="invite-line bold a2" style={{ animationFillMode:'both' }}>
            अखंड रामायण पाठ एवं गया भोज में
          </p>
          <Divider />
          <p className="invite-line sub a3" style={{ animationFillMode:'both' }}>
            हमारे समस्त पितरों की पावन स्मृति में
          </p>
          <span className="lotus a4" style={{ opacity:0, animation:'fadeUp .8s ease .85s forwards' }}>🪷</span>
        </div>
        <BtnRow onNext={onNext} nextLabel="आगे बढ़ें" />
      </div>
    </div>
  )
}

function PageDay1({ active, onBack, onNext }) {
  return (
    <div className={`page page-day1${active ? ' active' : ''}`}>
      <div className="card-wrap">
        <div className="card">
          <span className="card-icon">📖</span>
          <h2 className="card-title">अखंड रामायण पाठ</h2>
          <p className="card-subtitle">२४ घंटे का निरंतर पाठ</p>
          <Divider />
          <p className="card-body">
            भक्ति एवं श्रद्धा के साथ अखंड रामायण पाठ का आयोजन किया गया है।
          </p>
          <DetailRow emoji="📅" label="प्रारंभ तिथि" value={CONFIG.day1Date} />
          <DetailRow emoji="⏰" label="समय"          value={CONFIG.day1Time} />
          <DetailRow emoji="🏠" label="स्थान"        value={CONFIG.day1Location} />
          <a className="map-btn" style={{ marginTop: 14 }} href={CONFIG.day1MapsUrl} target="_blank" rel="noopener noreferrer">
            🗺️ मानचित्र देखें
          </a>
        </div>
        <div className="spiritual-box" style={{ marginTop: 14 }}>
          <p className="spiritual-text">
            <strong>पितृ पक्ष</strong> के पावन अवसर पर हम अपने पूर्वजों की आत्मा की
            <strong> शांति एवं मोक्ष</strong> हेतु यह आयोजन कर रहे हैं।
          </p>
        </div>
        <BtnRow onBack={onBack} onNext={onNext} nextLabel="अगला दिन" />
      </div>
    </div>
  )
}

function PageDay2({ active, onBack, onNext }) {
  return (
    <div className={`page page-day2${active ? ' active' : ''}`}>
      <div className="card-wrap">

        {/* Purnahuti card */}
        <div className="card">
          <span className="card-icon">🕏</span>
          <h2 className="card-title">पूर्णाहुति</h2>
          <Divider />
          <p className="card-body">रामायण पाठ की पूर्णाहुति एवं हवन का आयोजन।</p>
          <DetailRow emoji="📅" label="तिथि" value={CONFIG.day2Date} />
          <DetailRow emoji="⏰" label="समय" value={CONFIG.day2Time} />
          <DetailRow emoji="🏠" label="स्थान" value={CONFIG.ahutiLocation} />
          <a className="map-btn" style={{ marginTop: 14 }} href={CONFIG.ahutiMapsUrl} target="_blank" rel="noopener noreferrer">
            🗺️ मानचित्र देखें
          </a>
        </div>

        {/* Gaya Bhoj card */}
        <div className="card" style={{ marginTop: 14 }}>
          <span className="card-icon">🍽️</span>
          <h2 className="card-title">गया भोज</h2>
          <Divider />
          <p className="card-body">पूर्णाहुति के पश्चात गया भोज का आयोजन किया जाएगा।</p>
          <DetailRow emoji="⏰" label="समय" value={CONFIG.bhojTime} />
          <DetailRow emoji="📍" label="स्थान" value={CONFIG.bhojLocation} />
          <div className="map-embed">
            <iframe
              src={CONFIG.mapsEmbed}
              width="100%" height="180"
              style={{ border: 0, borderRadius: '12px', marginTop: '14px' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="map-btn" href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer">
            🗺️ मानचित्र में खोलें
          </a>
        </div>

        <div className="spiritual-box" style={{ marginTop: 14 }}>
          <p className="spiritual-text">
            आपकी उपस्थिति हमारे लिए <strong>सौभाग्य</strong> होगी।
            कृपया पधारकर इस पावन अवसर को सफल बनाएं।
          </p>
        </div>
        <BtnRow onBack={onBack} onNext={onNext} nextLabel="संपर्क" />
      </div>
    </div>
  )
}

function PageContact({ active, onBack }) {
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(CONFIG.whatsappMsg)}`
  return (
    <div className={`page page-contact${active ? ' active' : ''}`}>
      <div className="contact-wrap">
        <p className="contact-heading">सादर सहयोग एवं सौजन्य से</p>
        <ul className="names-list">
          {CONFIG.names.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
        <p className="contact-heading">संपर्क हेतु</p>
        {CONFIG.contacts.map((c, i) => (
          <div key={i} className="contact-card">
            <p className="contact-name">{c.name}</p>
            <a className="contact-phone" href={`tel:${c.phone.replace(/\s/g, '')}`}>
              📞 {c.phone}
            </a>
          </div>
        ))}
        <div className="blessing-box">
          <p className="blessing-line">आपकी उपस्थिति ही हमारे लिए</p>
          <span className="blessing-main">आशीर्वाद है 🙏</span>
        </div>
        <BtnRow onBack={onBack} />
        <p className="footer-note">॥ श्री राम ॥</p>
      </div>
    </div>
  )
}

const TOTAL = 4

export default function App() {
  const [entered, setEntered]       = useState(false)
  const [activePage, setActivePage] = useState(0)
  const [muted, setMuted]           = useState(true)
  const appRef                      = useRef(null)
  const pageRef                     = useRef(0)
  const touchStartX                 = useRef(0)
  const touchStartY                 = useRef(0)
  const enteredRef                  = useRef(false)

  pageRef.current   = activePage
  enteredRef.current = entered

  const goTo = useCallback((idx) => {
    setActivePage(Math.max(0, Math.min(TOTAL - 1, idx)))
  }, [])

  // Native non-passive listeners — must be attached via useEffect so we can
  // call preventDefault() and stop the page's vertical scroll eating the swipe
  useEffect(() => {
    const el = appRef.current
    if (!el) return

    const onStart = (e) => {
      if (!enteredRef.current) return
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const onEnd = (e) => {
      if (!enteredRef.current) return
      const dx = touchStartX.current - e.changedTouches[0].clientX
      const dy = touchStartY.current - e.changedTouches[0].clientY
      // horizontal swipe must dominate and exceed 30px
      if (Math.abs(dx) < 30 || Math.abs(dx) <= Math.abs(dy)) return
      e.preventDefault()
      goTo(pageRef.current + (dx > 0 ? 1 : -1))
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend',   onEnd,   { passive: false })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [goTo])

  const audioElRef = useRef(null)

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m
      if (!next) {
        if (!audioElRef.current) {
          const audio = new Audio('/music.mp3')
          audio.loop = true
          audio.volume = 0.5
          audioElRef.current = audio
        }
        audioElRef.current.play()
      } else {
        audioElRef.current?.pause()
      }
      return next
    })
  }, [])

  const handleEnter = useCallback(() => {
    setEntered(true)
  }, [])

  return (
    <div ref={appRef} className="app">
      <button className="mute-btn" onClick={toggleMute} aria-label="ध्वनि">
        {muted ? '🔇' : '🔔'}
      </button>

      {entered && (
        <div className="nav-dots">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className={`dot${activePage === i ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      )}

      <PageOpening gone={entered} onEnter={handleEnter} />

      <div className="pages-wrap">
        <PageInvite  active={activePage === 0} onNext={() => goTo(1)} />
        <PageDay1    active={activePage === 1} onBack={() => goTo(0)} onNext={() => goTo(2)} />
        <PageDay2    active={activePage === 2} onBack={() => goTo(1)} onNext={() => goTo(3)} />
        <PageContact active={activePage === 3} onBack={() => goTo(2)} />
      </div>
    </div>
  )
}
