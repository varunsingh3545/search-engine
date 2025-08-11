import './App.css'

function App() {
  return (
    <div className="container">
      <div id="three-container"></div>

      <div className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <h1 className="logo"><span className="brand-strong">ZYTHERION</span> <span className="brand-light">BIOVANC</span></h1>
          </div>
          <div className="navbar-center">
            <div className="navbar-search-mini">
              <i className='bx bx-search'></i>
              <input type="search" placeholder="Search..." aria-label="Quick search" />
            </div>
          </div>
          <div className="navbar-right">
            <button className="icon-btn" aria-label="Notifications"><i className='bx bx-bell'></i></button>
            <button className="icon-btn" aria-label="Settings"><i className='bx bx-cog'></i></button>
            <button className="icon-btn" aria-label="Dark Mode"><i className='bx bx-moon'></i></button>
            <div className="avatar" aria-label="Profile" role="img"></div>
            <button className="icon-btn hamburger" aria-label="Menu"><i className='bx bx-menu-alt-right'></i></button>
          </div>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-container">
          <canvas id="blizzard-canvas"></canvas>
          <canvas id="snow-canvas"></canvas>

          <div className="nex-scroll-rail" aria-hidden="true">
            <div className="nex-scroll-label top">01</div>
            <div className="nex-scroll-track">
              <div className="nex-scroll-progress"></div>
              <div className="nex-scroll-thumb"></div>
            </div>
            <div className="nex-scroll-label bottom">04</div>
          </div>

          <div className="hero-content nex-hero">
            <div className="nex-hero-left">
              <div className="hero-text-group">
                <h1 className="nex-hero-title">Know <span className="nex-accent">What’s Out There</span>.</h1>
                <p className="nex-hero-desc">Explore the world’s knowledge with clarity and speed. Discover routes, research, and real‑time insights—all in one search.</p>
                <div className="hero-search-group">
                  <input id="search-input-hero" className="hero-search-input" type="search" placeholder="Search the world’s knowledge" />
                  <button className="nex-hero-cta hero-search-btn">Search</button>
                </div>
              </div>
            </div>
          </div>

          {/* Scripts originally loaded via script tags will be loaded in main.jsx */}
        </div>
      </div>
    </div>
  )
}

export default App
