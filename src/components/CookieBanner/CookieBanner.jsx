import { useState, useEffect } from 'react'

const CONSENT_KEY = 'lgpd_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    window.dispatchEvent(new Event('lgpd:accepted'))
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={styles.overlay} role="dialog" aria-modal="false" aria-label="Aviso de cookies">
      <div style={styles.banner}>
        <p style={styles.text}>
          Usamos cookies para personalizar sua experiência e medir o desempenho do site.
          Ao aceitar, você concorda com nossa{' '}
          <a href="/privacidade" style={styles.link}>Política de Privacidade</a>.
        </p>
        <div style={styles.actions}>
          <button onClick={reject} style={styles.btnReject} aria-label="Recusar cookies">
            Recusar
          </button>
          <button onClick={accept} style={styles.btnAccept} aria-label="Aceitar cookies">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 16px 16px',
    pointerEvents: 'none',
  },
  banner: {
    background: '#1B1018',
    border: '1px solid rgba(245,238,228,0.12)',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '720px',
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    pointerEvents: 'auto',
    flexWrap: 'wrap',
  },
  text: {
    flex: 1,
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'rgba(245,238,228,0.8)',
    margin: 0,
    minWidth: '200px',
  },
  link: {
    color: '#F5EEE4',
    textDecoration: 'underline',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  btnReject: {
    background: 'transparent',
    border: '1px solid rgba(245,238,228,0.3)',
    borderRadius: '8px',
    color: 'rgba(245,238,228,0.7)',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'inherit',
    padding: '8px 16px',
    minHeight: '44px',
    minWidth: '80px',
  },
  btnAccept: {
    background: '#4B1D3F',
    border: '1px solid transparent',
    borderRadius: '8px',
    color: '#F5EEE4',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'inherit',
    fontWeight: '500',
    padding: '8px 20px',
    minHeight: '44px',
    minWidth: '80px',
  },
}
