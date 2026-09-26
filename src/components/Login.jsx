import { useState } from 'react'
import './Login.css'

const modes = {
  signin: {
    eyebrow: 'YOUR PRIVATE WORLD AWAITS',
    title: 'Welcome back.',
    description: 'Sign in to continue your journey.',
    button: 'Sign in',
  },
  signup: {
    eyebrow: 'A MORE CONSIDERED WAY TO LIVE',
    title: 'Join us.',
    description: 'Create an account to begin your journey.',
    button: 'Create account',
  },
  recovery: {
    eyebrow: 'HAPPENS TO THE BEST OF US',
    title: 'Let’s find you.',
    description: 'Enter your email and we’ll send a reset link.',
    button: 'Send reset link',
  },
}

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 3.5 31 11v14L18 32.5 5 25V11L18 3.5Z" stroke="currentColor" />
      <path d="M12 23.5V12l6 8 6-8v11.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [notice, setNotice] = useState('')
  const copy = modes[mode]

  function changeMode(nextMode) {
    setMode(nextMode)
    setNotice('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (mode === 'signin') {
      onLoginSuccess?.()
      return
    }

    setNotice(
      mode === 'recovery'
        ? 'If an account exists for that email, a reset link is on its way.'
        : 'Your account details are ready. Connect an authentication service to finish signing up.',
    )
  }

  return (
    <main className="login-page">
      <section className="visual-panel" aria-label="Maison Aurelle interior">
        <div className="visual-image" />
        <div className="visual-shade" />
        <a className="brand visual-brand" href="#top" aria-label="Maison Aurelle home">
          <BrandMark />
          <span>MAISON <b>AURELLE</b></span>
        </a>
        <div className="visual-caption">
          <span className="caption-rule" />
          <p>Make room for<br />the remarkable.</p>
          <span className="caption-location">THE ART OF LIVING WELL&nbsp; · &nbsp;EST. 1998</span>
        </div>
        <span className="image-credit">A STUDY IN STILLNESS&nbsp; — &nbsp;01 / 03</span>
      </section>

      <section className="form-panel" id="top">
        <header className="topbar">
          <a className="brand mobile-brand" href="#top" aria-label="Maison Aurelle home">
            <BrandMark />
            <span>MAISON <b>AURELLE</b></span>
          </a>
          <button className="language-button" type="button" aria-label="Language: English">
            EN <span aria-hidden="true">⌄</span>
          </button>
        </header>

        <div className="form-wrap">
          <div className="form-heading">
            <span className="eyebrow"><span />{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="field-group">
                <label htmlFor="full-name">Full name</label>
                <input id="full-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
              </div>
            )}

            <div className="field-group">
              <label htmlFor="email">{mode === 'signin' ? 'Username or email' : 'Email address'}</label>
              <div className="input-shell">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="6.25" r="3" />
                  <path d="M4.75 16.25v-1a5.25 5.25 0 0 1 10.5 0v1" />
                </svg>
                <input
                  id="email"
                  name="username"
                  type={mode === 'signin' ? 'text' : 'email'}
                  placeholder={mode === 'signin' ? 'Enter your username or email' : 'you@example.com'}
                  autoComplete={mode === 'signin' ? 'username' : 'email'}
                  required
                />
              </div>
            </div>

            {mode !== 'recovery' && (
              <div className="field-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  {mode === 'signin' && (
                    <button className="text-link" type="button" onClick={() => changeMode('recovery')}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="input-shell">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="4.25" y="8.25" width="11.5" height="8.5" rx="1.5" />
                    <path d="M6.75 8V5.75a3.25 3.25 0 0 1 6.5 0V8" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    minLength={8}
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2.5 10s2.7-4.25 7.5-4.25 7.5 4.25 7.5 4.25-2.7 4.25-7.5 4.25S2.5 10 2.5 10Z" /><circle cx="10" cy="10" r="1.8" /><path d="m4 4 12 12" /></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2.5 10s2.7-4.25 7.5-4.25 7.5 4.25 7.5 4.25-2.7 4.25-7.5 4.25S2.5 10 2.5 10Z" /><circle cx="10" cy="10" r="1.8" /></svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <label className="remember-option">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                <span className="custom-check" aria-hidden="true" />
                <span>Remember me</span>
              </label>
            )}

            <button className="submit-button" type="submit">
              {copy.button}<span aria-hidden="true">↗</span>
            </button>

            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>

          {mode === 'signin' && (
            <>
              <div className="divider"><span />or continue with<span /></div>
              <button className="google-button" type="button" onClick={() => setNotice('Google sign-in will be available once authentication is connected.')}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="#4285F4" d="M18.2 10.2c0-.6-.05-1.15-.15-1.7H10v3.2h4.6a4 4 0 0 1-1.7 2.6v2.1h2.75c1.6-1.5 2.55-3.7 2.55-6.2Z"/><path fill="#34A853" d="M10 18.5c2.3 0 4.25-.75 5.65-2.1l-2.75-2.1c-.75.5-1.7.8-2.9.8-2.2 0-4.05-1.5-4.75-3.5h-2.85v2.15A8.5 8.5 0 0 0 10 18.5Z"/><path fill="#FBBC05" d="M5.25 11.6A5.1 5.1 0 0 1 5 10c0-.55.1-1.1.25-1.6V6.25H2.4A8.5 8.5 0 0 0 1.5 10c0 1.35.3 2.65.9 3.75l2.85-2.15Z"/><path fill="#EA4335" d="M10 4.9c1.25 0 2.35.45 3.2 1.3l2.4-2.4C14.25 2.4 12.3 1.5 10 1.5a8.5 8.5 0 0 0-7.6 4.75l2.85 2.15C5.95 6.4 7.8 4.9 10 4.9Z"/></svg>
                Continue with Google
              </button>
            </>
          )}

          <p className="switch-mode">
            {mode === 'signin' ? 'New to Maison Aurelle?' : mode === 'signup' ? 'Already have an account?' : 'Remembered your password?'}{' '}
            <button type="button" onClick={() => changeMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </div>

        <footer className="form-footer">
          <span>© 2025 MAISON AURELLE</span>
          <a href="mailto:concierge@maisonaurelle.example">NEED A HAND? <span aria-hidden="true">↗</span></a>
        </footer>
      </section>
    </main>
  )
}

export default Login
