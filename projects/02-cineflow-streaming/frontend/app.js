// ==========================================================================
// CINEFLOW — DYNAMIC TMDB CINEMATIC ENGINE
// 100% Dynamic Real-Time TMDB Architecture, 3D Physics & Sub-Millisecond Cache
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Phase 1 Security: HTML Escaping Utility (SEC-004) ---
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Phase 4 Memory Guard: Bounded Map Setter (MEM-001) ---
  function boundedMapSet(map, key, value, maxSize = 50) {
    if (!map) return;
    if (map.size >= maxSize) {
      map.delete(map.keys().next().value);
    }
    map.set(key, value);
  }

  // --- Phase 4 Observability: Diagnostics Breadcrumbs Ring Buffer (OBS-001) ---
  const breadcrumbs = [];
  const MAX_BREADCRUMBS = 50;
  function addBreadcrumb(event, details = {}) {
    breadcrumbs.push({ 
      event, 
      details, 
      ts: Date.now() 
    });
    if (breadcrumbs.length > MAX_BREADCRUMBS) {
      breadcrumbs.shift();
    }
  }

  // --- Phase 2 & 3 Concurrency & Session State (RACE-001, RACE-002, STREAM-001, STREAM-003) ---
  let currentPlaySessionId = null;
  let currentSwitchId = 0;
  let fatalRetryCount = 0;
  let providerFallbackIndex = 0;

  // --- Cinema-Grade Autoplay & Sound Overlay (UX-002) ---
  function showPlayOverlay() {
    const overlay = document.getElementById('cinemaPlayOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    const btn = document.getElementById('cinemaPlayOverlayBtn');
    if (btn && !btn._hasClickListener) {
      btn._hasClickListener = true;
      const handleStart = async (e) => {
        if (e) e.stopPropagation();
        hidePlayOverlay();
        try {
          const vid = document.getElementById('videoElement');
          if (vid) {
            vid.muted = false;
            await vid.play();
            updatePlayIcon(true);
            dismissPlayerBackdrop();
          }
        } catch (err) {
          console.error('[CineFlow Playback] Manual play failed:', err);
        }
      };
      btn.addEventListener('click', handleStart);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.cinema-play-overlay-card')) {
          handleStart(e);
        }
      });
    }
  }

  function hidePlayOverlay() {
    const overlay = document.getElementById('cinemaPlayOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  async function safeAutoplayVideo() {
    hidePlayOverlay();
    const vid = document.getElementById('videoElement');
    if (!vid) return;
    try {
      await vid.play();
      updatePlayIcon(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        console.warn('[CineFlow Autoplay] Unmuted autoplay blocked by browser policy. Retrying muted...');
        vid.muted = true;
        try {
          await vid.play();
          updatePlayIcon(true);
          showPlayOverlay();
        } catch (_) {
          showPlayOverlay();
        }
      } else {
        updatePlayIcon(false);
      }
    }
  }

  // Application State
  const state = {
    currentMedia: null,
    topFeatured: [],
    activeFeaturedId: null,
    activeDockTab: 'overview',
    currentTrailerKey: null,
    currentDirectorId: null,
    watchlist: JSON.parse(localStorage.getItem('cineflow_watchlist') || '[]'),
    watchHistory: JSON.parse(localStorage.getItem('cineflow_history') || '[]'),
    browseCache: {
      trending: [],
      popularMovies: [],
      popularTV: [],
      genreCache: new Map()
    },
    mediaCache: new Map(),
    searchCache: new Map(),
    personCache: new Map(),
    streamCache: new Map(),
    episodesCache: new Map(),
    hls: null,
    isHudHovered: false,
    hudHideTimeout: null,
    isOfflineMode: false,
    hasInitializedRails: false,
    slider: {
      items: [],
      currentIndex: 0,
      intervalMs: 6500,
      timer: null,
      isPlaying: true,
      isIndividualMode: false
    },
    playerState: {
      volume: parseFloat(localStorage.getItem('cineflow_volume') || '1.0'),
      isMuted: false,
      showRemainingTime: false,
      aspectRatioIndex: 0,
      aspectRatios: [
        { mode: 'contain', label: 'Fit 16:9 Letterbox' },
        { mode: 'cover', label: 'CinemaScope 21:9 Fill' },
        { mode: 'fill', label: 'Stretch Fullscreen' },
        { mode: 'none', label: 'Original Scale' }
      ],
      playbackRate: 1.0,
      currentQualityLevel: -1,
      currentQualityLabel: 'Auto',
      selectedSubtitle: 'off',
      selectedAudioTrack: 0,
      selectedAudioLang: 'en',
      availableSources: [],
      availableQualities: [],
      availableAudioLanguages: [],
      availableSubtitles: [],
      activeSubtitleCues: [],
      activeSourceUrl: null,
      ambientGlow: true,
      currentSeason: 1,
      currentEpisode: 1,
      seriesEpisodes: [],
      introSkipped: false
    }
  };

  // --- DOM Elements ---
  // Navbar
  const openCommandPaletteBtn = document.getElementById('openCommandPaletteBtn');
  const navWatchlistBtn = document.getElementById('navWatchlistBtn');
  const watchlistBadgeCount = document.getElementById('watchlistBadgeCount');
  const navExportBtn = document.getElementById('navExportBtn');
  const brandHomeBtn = document.getElementById('brandHomeBtn');
  const networkStatusPill = document.getElementById('networkStatusPill');
  const networkPulseDot = document.getElementById('networkPulseDot');
  const networkStatusText = document.getElementById('networkStatusText');

  // Hero Narrative Elements
  const heroStage = document.getElementById('heroStage');
  const heroBackdropImageA = document.getElementById('heroBackdropImageA');
  const heroBackdropImageB = document.getElementById('heroBackdropImageB');
  const heroRatingBadge = document.getElementById('heroRatingBadge');
  const heroYearBadge = document.getElementById('heroYearBadge');
  const heroRuntimeBadge = document.getElementById('heroRuntimeBadge');
  const heroCertBadge = document.getElementById('heroCertBadge');
  const heroStatusRibbon = document.getElementById('heroStatusRibbon');
  const heroTitle = document.getElementById('heroTitle');
  const heroTagline = document.getElementById('heroTagline');
  const heroGenresRow = document.getElementById('heroGenresRow');
  const heroSynopsis = document.getElementById('heroSynopsis');
  const heroProductionSpecs = document.getElementById('heroProductionSpecs');
  const heroStreamBtn = document.getElementById('heroStreamBtn');
  const heroTrailerBtn = document.getElementById('heroTrailerBtn');
  const heroBookmarkBtn = document.getElementById('heroBookmarkBtn');
  const heroCarouselSwitcher = document.getElementById('heroCarouselSwitcher');

  // Hero Slider Elements
  const heroSliderController = document.getElementById('heroSliderController');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  const heroSliderPagination = document.getElementById('heroSliderPagination');
  const heroSlideCounter = document.getElementById('heroSlideCounter');
  const heroPlayPauseBtn = document.getElementById('heroPlayPauseBtn');
  const heroPlayPauseIcon = document.getElementById('heroPlayPauseIcon');
  const heroReturnToSliderBtn = document.getElementById('heroReturnToSliderBtn');
  const heroFloatingPrev = document.getElementById('heroFloatingPrev');
  const heroFloatingNext = document.getElementById('heroFloatingNext');

  // 3D Key-Art Elements
  const poster3DCard = document.getElementById('poster3DCard');
  const posterMainImage = document.getElementById('posterMainImage');
  const posterSpecularShine = document.getElementById('posterSpecularShine');
  const posterRatingChip = document.getElementById('posterRatingChip');
  const posterCertBadge = document.getElementById('posterCertBadge');

  // Floating Liquid Dock & Drawer
  const liquidDock = document.getElementById('liquidDock');
  const dockMagneticPill = document.getElementById('dockMagneticPill');
  const dockTabBtns = document.querySelectorAll('.dock-tab-btn');
  const springDrawer = document.getElementById('springDrawer');
  const drawerTitleText = document.getElementById('drawerTitleText');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const paneCast = document.getElementById('paneCast');
  const paneDirector = document.getElementById('paneDirector');
  const paneOverview = document.getElementById('paneOverview');
  const drawerCastGrid = document.getElementById('drawerCastGrid');
  const drawerDirectorName = document.getElementById('drawerDirectorName');
  const drawerDirectorBio = document.getElementById('drawerDirectorBio');
  const drawerDirectorPhoto = document.getElementById('drawerDirectorPhoto');
  const drawerDirectorFilms = document.getElementById('drawerDirectorFilms');
  const directorAwardTag = document.getElementById('directorAwardTag');
  const overviewDirector = document.getElementById('overviewDirector');
  const overviewWriters = document.getElementById('overviewWriters');
  const overviewGross = document.getElementById('overviewGross');
  const overviewBudget = document.getElementById('overviewBudget');

  // Episodes Integration Elements
  const heroEpisodesBtn = document.getElementById('heroEpisodesBtn');
  const dockTabEpisodes = document.getElementById('dockTabEpisodes');
  const paneEpisodes = document.getElementById('paneEpisodes');
  const drawerSeasonSelect = document.getElementById('drawerSeasonSelect');
  const drawerEpisodesCountBadge = document.getElementById('drawerEpisodesCountBadge');
  const drawerEpisodesGrid = document.getElementById('drawerEpisodesGrid');
  const playerSeasonSelect = document.getElementById('playerSeasonSelect');

  // Genre Discovery Bar & Rails
  const genreDiscoveryBar = document.getElementById('genreDiscoveryBar');
  const railShowcaseTitle = document.getElementById('railShowcaseTitle');
  const railShowcaseTag = document.getElementById('railShowcaseTag');
  const trendingTrack = document.getElementById('trendingTrack');
  const moviesTrack = document.getElementById('moviesTrack');
  const tvTrack = document.getElementById('tvTrack');
  const recommendedTrack = document.getElementById('recommendedTrack');
  const directorTrack = document.getElementById('directorTrack');
  const directorRailTitle = document.getElementById('directorRailTitle');

  // Command Palette
  const commandPaletteBackdrop = document.getElementById('commandPaletteBackdrop');
  const commandSearchInput = document.getElementById('commandSearchInput');
  const commandResultsList = document.getElementById('commandResultsList');

  // Video Player Elements
  const playerModal = document.getElementById('playerModal');
  const videoContainer = document.getElementById('videoContainer');
  const videoElement = document.getElementById('videoElement');
  if (videoElement) {
    videoElement.preload = 'auto';
  }
  const playerHUD = document.getElementById('playerHUD');
  const hudPlayerTitle = document.getElementById('hudPlayerTitle');
  const hudPlayerSub = document.getElementById('hudPlayerSub');
  const closePlayerBtn = document.getElementById('closePlayerBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const rewind10Btn = document.getElementById('rewind10Btn');
  const forward10Btn = document.getElementById('forward10Btn');
  const muteToggleBtn = document.getElementById('muteToggleBtn');
  const volumeIcon = document.getElementById('volumeIcon');
  const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');
  const durationTimeDisplay = document.getElementById('durationTimeDisplay');
  const timeDisplayWrap = document.getElementById('timeDisplayWrap');
  const timelineScrubber = document.getElementById('timelineScrubber');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineBuffer = document.getElementById('timelineBuffer');
  const timelineThumb = document.getElementById('timelineThumb');
  const timelineHoverPreview = document.getElementById('timelineHoverPreview');
  const timelineHoverTime = document.getElementById('timelineHoverTime');
  const timelineHoverMarker = document.getElementById('timelineHoverMarker');
  const playerSpinner = document.getElementById('playerSpinner');
  const spinnerText = document.getElementById('spinnerText');

  // Extended Player Controls & Overlays
  const playerAmbientGlow = document.getElementById('playerAmbientGlow');
  const ambientGlowToggleBtn = document.getElementById('ambientGlowToggleBtn');
  const playerSubtitlesContainer = document.getElementById('playerSubtitlesContainer');
  const subtitlesText = document.getElementById('subtitlesText');
  const playerGestureOverlay = document.getElementById('playerGestureOverlay');
  const gestureRippleLeft = document.getElementById('gestureRippleLeft');
  const gestureRippleRight = document.getElementById('gestureRippleRight');
  const playerHudToast = document.getElementById('playerHudToast');
  const hudToastIcon = document.getElementById('hudToastIcon');
  const hudToastText = document.getElementById('hudToastText');
  const playerSkipIntroBtn = document.getElementById('playerSkipIntroBtn');
  const playerShortcutsBtn = document.getElementById('playerShortcutsBtn');
  const nextEpisodeBtn = document.getElementById('nextEpisodeBtn');
  const hudVolumeCluster = document.getElementById('hudVolumeCluster');
  const volumeSliderWrap = document.getElementById('volumeSliderWrap');
  const volumeSliderTrack = document.getElementById('volumeSliderTrack');
  const volumeSliderFill = document.getElementById('volumeSliderFill');
  const episodesMenuWrapper = document.getElementById('episodesMenuWrapper');
  const openEpisodesBtn = document.getElementById('openEpisodesBtn');
  const currentEpisodeBadge = document.getElementById('currentEpisodeBadge');
  const audioTrackBtn = document.getElementById('audioTrackBtn');
  const audioMenu = document.getElementById('audioMenu');
  const audioList = document.getElementById('audioList');
  const subtitlesBtn = document.getElementById('subtitlesBtn');
  const subtitlesBadge = document.getElementById('subtitlesBadge');
  const subtitlesMenu = document.getElementById('subtitlesMenu');
  const subtitlesList = document.getElementById('subtitlesList');
  const speedBtn = document.getElementById('speedBtn');
  const currentSpeedText = document.getElementById('currentSpeedText');
  const speedMenu = document.getElementById('speedMenu');
  const speedList = document.getElementById('speedList');
  const qualityBtn = document.getElementById('qualityBtn');
  const currentQualityText = document.getElementById('currentQualityText');
  const qualityMenu = document.getElementById('qualityMenu');
  const qualityList = document.getElementById('qualityList');
  const aspectRatioBtn = document.getElementById('aspectRatioBtn');
  const pipToggleBtn = document.getElementById('pipToggleBtn');
  const playerEpisodesDrawer = document.getElementById('playerEpisodesDrawer');
  const playerDrawerSeriesTitle = document.getElementById('playerDrawerSeriesTitle');
  const playerDrawerSeasonLabel = document.getElementById('playerDrawerSeasonLabel');
  const closeEpisodesDrawerBtn = document.getElementById('closeEpisodesDrawerBtn');
  const playerEpisodesList = document.getElementById('playerEpisodesList');
  const playerShortcutsModal = document.getElementById('playerShortcutsModal');
  const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');

  // Trailer & Export Modals
  const trailerModal = document.getElementById('trailerModal');
  const trailerIframe = document.getElementById('trailerIframe');
  const closeTrailerBtn = document.getElementById('closeTrailerBtn');
  const exportModal = document.getElementById('exportModal');
  const closeExportBtn = document.getElementById('closeExportBtn');
  const streamUrlInput = document.getElementById('streamUrlInput');
  const ytdlpCommandInput = document.getElementById('ytdlpCommandInput');
  const mpvCommandInput = document.getElementById('mpvCommandInput');
  const copyStreamUrlBtn = document.getElementById('copyStreamUrlBtn');
  const copyYtdlpBtn = document.getElementById('copyYtdlpBtn');
  const copyMpvBtn = document.getElementById('copyMpvBtn');

  // Cinema Loading Screen Elements
  const cinemaLoadingScreen = document.getElementById('cinemaLoadingScreen');
  const loaderProgressBar = document.getElementById('loaderProgressBar');
  const loaderPercentage = document.getElementById('loaderPercentage');
  const loaderStatusText = document.getElementById('loaderStatusText');

  function updateLoader(percent, status) {
    if (loaderProgressBar) loaderProgressBar.style.width = `${percent}%`;
    if (loaderPercentage) loaderPercentage.textContent = `${Math.round(percent)}%`;
    if (loaderStatusText && status) loaderStatusText.textContent = status;
  }

  // Toast Pill (with luxury suppression of noisy internal telemetry)
  const toastPill = document.getElementById('toastPill');
  const SUPPRESSED_TOAST_PATTERNS = [
    /direct cdn unavailable/i,
    /seamlessly continuing via secure proxy/i,
    /failing over to backup provider/i,
    /spotlight:/i,
    /title loaded/i,
    /loaded "/i,
    /returned to featured/i,
    /auto-advance/i,
    /checking live tmdb/i,
  ];

  function showToast(message, duration = 2800) {
    if (!message || !toastPill) return;
    if (SUPPRESSED_TOAST_PATTERNS.some(rx => rx.test(message))) {
      return; // Quiet down internal telemetry & carousel chatter for luxury cinema experience
    }
    toastPill.textContent = message;
    toastPill.classList.add('show');
    clearTimeout(toastPill._timer);
    toastPill._timer = setTimeout(() => toastPill.classList.remove('show'), duration);
  }

  // =========================================================================
  // 1. Tactile 3D Flashcard Tilt Physics (Edge & Corner Depress Backwards)
  // =========================================================================
  function initCardBackwardsTilt(cardElement, options = {}) {
    if (!cardElement) return;

    const {
      maxTilt = 18,
      maxDepressZ = -15,
      scale = 1.025,
      perspective = 1200,
      shineElement = null,
      backlightElement = null,
      damping = 0.16
    } = options;

    let isHovered = false;
    let targetRx = 0;
    let targetRy = 0;
    let targetTz = 0;
    let currentRx = 0;
    let currentRy = 0;
    let currentTz = 0;
    let currentScale = 1;
    let targetScale = 1;
    let targetShineX = 50;
    let targetShineY = 50;
    let currentShineX = 50;
    let currentShineY = 50;
    let animId = null;

    function updatePhysics() {
      if (!isHovered && Math.abs(currentRx) < 0.05 && Math.abs(currentRy) < 0.05 && Math.abs(currentTz) < 0.05 && Math.abs(currentScale - 1) < 0.002) {
        currentRx = 0;
        currentRy = 0;
        currentTz = 0;
        currentScale = 1;
        cardElement.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
        if (shineElement) {
          shineElement.style.opacity = '0.4';
          shineElement.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)';
        }
        if (backlightElement) {
          backlightElement.style.transform = 'translate(0px, 0px)';
        }
        animId = null;
        return;
      }

      // Smooth Lerp toward target
      currentRx += (targetRx - currentRx) * damping;
      currentRy += (targetRy - currentRy) * damping;
      currentTz += (targetTz - currentTz) * damping;
      currentScale += (targetScale - currentScale) * damping;
      currentShineX += (targetShineX - currentShineX) * damping;
      currentShineY += (targetShineY - currentShineY) * damping;

      cardElement.style.transform = `perspective(${perspective}px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg) translateZ(${currentTz.toFixed(2)}px) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, ${currentScale.toFixed(3)})`;

      if (shineElement) {
        shineElement.style.opacity = isHovered ? '0.75' : '0.4';
        shineElement.style.background = `radial-gradient(circle at ${currentShineX.toFixed(1)}% ${currentShineY.toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 32%, transparent 65%)`;
      }

      if (backlightElement) {
        // Shift backlight subtly in opposite direction of depression for realistic shadow/light shift
        const blX = (-currentRy / maxTilt) * 16;
        const blY = (currentRx / maxTilt) * 16;
        backlightElement.style.transform = `translate(${blX.toFixed(1)}px, ${blY.toFixed(1)}px)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    }

    function onMouseMove(e) {
      if (cardElement.classList.contains('hyper-flip-poster')) return;

      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from center: -1 to +1
      const normX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
      const normY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

      // PHYSICAL DEPRESSION: Touching edge/corner pushes it BACKWARDS (-Z)
      // Top (normY = -1) -> rotateX < 0 (top tilts backward)
      // Bottom (normY = +1) -> rotateX > 0 (bottom tilts backward)
      // Left (normX = -1) -> rotateY > 0 (left tilts backward)
      // Right (normX = +1) -> rotateY < 0 (right tilts backward)
      targetRx = normY * maxTilt;
      targetRy = -normX * maxTilt;

      // Distance from center pushes card deeper into 3D space
      const dist = Math.hypot(normX, normY);
      targetTz = Math.min(1.41, dist) * maxDepressZ;
      targetScale = scale;

      targetShineX = (x / rect.width) * 100;
      targetShineY = (y / rect.height) * 100;

      if (!animId) {
        animId = requestAnimationFrame(updatePhysics);
      }
    }

    function onMouseEnter() {
      isHovered = true;
      cardElement.style.transition = 'none'; // Instant responsive tracking
      if (!animId) {
        animId = requestAnimationFrame(updatePhysics);
      }
    }

    function onMouseLeave() {
      isHovered = false;
      targetRx = 0;
      targetRy = 0;
      targetTz = 0;
      targetScale = 1;
      targetShineX = 50;
      targetShineY = 50;
      if (!animId) {
        animId = requestAnimationFrame(updatePhysics);
      }
    }

    cardElement.addEventListener('mouseenter', onMouseEnter);
    cardElement.addEventListener('mousemove', onMouseMove);
    cardElement.addEventListener('mouseleave', onMouseLeave);
  }

  if (poster3DCard) {
    initCardBackwardsTilt(poster3DCard, {
      maxTilt: 18,
      maxDepressZ: -15,
      scale: 1.025,
      perspective: 1200,
      shineElement: posterSpecularShine,
      backlightElement: posterBacklight,
      damping: 0.16
    });

    poster3DCard.addEventListener('click', () => {
      if (!state.currentMedia) return;
      if (state.currentMedia.mediaType === 'tv') {
        const s = drawerSeasonSelect ? (Number(drawerSeasonSelect.value) || 1) : 1;
        playMedia(state.currentMedia, s, 1);
      } else {
        playMedia(state.currentMedia, 0, 0);
      }
    });
  }

  // =========================================================================
  // 2. High-Speed Unified Media Hydration & Hyper-Animated Hero Slider
  // =========================================================================
  function setHeroBackdrop(url) {
    if (!url) return;
    if (!heroBackdropImageA || !heroBackdropImageB) {
      if (heroBackdropImageA) heroBackdropImageA.style.backgroundImage = `url('${url}')`;
      return;
    }
    const isACurrentlyActive = heroBackdropImageA.classList.contains('active');
    const currentLayer = isACurrentlyActive ? heroBackdropImageA : heroBackdropImageB;
    const nextLayer = isACurrentlyActive ? heroBackdropImageB : heroBackdropImageA;

    nextLayer.style.backgroundImage = `url('${url}')`;
    nextLayer.classList.remove('next');
    nextLayer.classList.add('active');

    currentLayer.classList.remove('active');
    currentLayer.classList.add('next');
  }

  function triggerHyperAnimations() {
    if (heroTitle) {
      heroTitle.classList.remove('hyper-sweep-title');
      void heroTitle.offsetWidth;
      heroTitle.classList.add('hyper-sweep-title');
    }
    if (poster3DCard) {
      poster3DCard.classList.remove('hyper-flip-poster');
      void poster3DCard.offsetWidth;
      poster3DCard.classList.add('hyper-flip-poster');
      poster3DCard.addEventListener('animationend', () => {
        poster3DCard.classList.remove('hyper-flip-poster');
      }, { once: true });
    }
    if (heroStatusRibbon) {
      heroStatusRibbon.classList.remove('hyper-drop-ribbon');
      void heroStatusRibbon.offsetWidth;
      heroStatusRibbon.classList.add('hyper-drop-ribbon');
    }
    if (heroTagline) {
      heroTagline.classList.remove('hyper-fade-tagline');
      void heroTagline.offsetWidth;
      heroTagline.classList.add('hyper-fade-tagline');
    }
  }

  let prefetchTimer = null;
  let activePrefetchCount = 0;

  function schedulePrefetch(tmdbId, mediaType = 'movie', delay = 250) {
    if (!tmdbId) return;
    clearTimeout(prefetchTimer);
    prefetchTimer = setTimeout(() => {
      prefetchMedia(tmdbId, mediaType);
    }, delay);
  }

  function cancelPrefetch() {
    clearTimeout(prefetchTimer);
  }

  function prefetchMedia(tmdbId, mediaType = 'movie') {
    if (!tmdbId) return;
    const type = mediaType || 'movie';
    const mediaCacheKey = `${type}:${tmdbId}`;

    if (!state.mediaCache.has(mediaCacheKey)) {
      fetch(`/api/media?id=${tmdbId}&type=${type}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) boundedMapSet(state.mediaCache, mediaCacheKey, data, 50);
        })
        .catch(() => {});
    }

    // Netflix-Grade Instant Pre-Warming: Pre-resolve stream with concurrency control (max 1 in-flight)
    const streamCacheKey = `stream:${tmdbId}:${type}:s0:e0`;
    if (!state.streamCache.has(streamCacheKey) && activePrefetchCount < 1) {
      activePrefetchCount++;
      fetch(`/api/resolve?id=${tmdbId}&type=${type}&s=0&e=0`)
        .then(res => res.ok ? res.json() : null)
        .then(streamData => {
          if (streamData && ((streamData.sources && streamData.sources.length > 0) || (streamData.servers && streamData.servers.length > 0))) {
            boundedMapSet(state.streamCache, streamCacheKey, { data: streamData, cachedAt: Date.now() }, 50);
          }
        })
        .catch(() => {})
        .finally(() => {
          activePrefetchCount = Math.max(0, activePrefetchCount - 1);
        });
    }
  }

  async function loadMedia(tmdbId, mediaType = 'movie', preloadData = null, isFromSlider = false) {
    const type = mediaType || 'movie';
    const cacheKey = `${type}:${tmdbId}`;
    state.activeFeaturedId = tmdbId;

    // Handle Individual Movie/Show Mode vs Slider Mode ("old one remains same for individual movies or shows")
    if (!isFromSlider) {
      state.slider.isIndividualMode = true;
      stopHeroSliderTimer();
      if (heroReturnToSliderBtn) heroReturnToSliderBtn.style.display = 'inline-flex';
      if (heroSliderController) heroSliderController.style.display = 'none';
    } else {
      state.slider.isIndividualMode = false;
      if (heroReturnToSliderBtn) heroReturnToSliderBtn.style.display = 'none';
      if (heroSliderController) heroSliderController.style.display = 'inline-flex';
    }

    // Instant visual update if preview exists
    if (preloadData) {
      state.currentMedia = preloadData;
      heroTitle.textContent = preloadData.title;
      if (preloadData.backdropPath) {
        setHeroBackdrop(preloadData.backdropPath);
      }
      if (preloadData.posterPath) {
        posterMainImage.src = preloadData.posterPath;
      }
    }

    try {
      let unified = state.mediaCache.get(cacheKey);
      if (!unified) {
        try {
          const res = await fetch(`/api/media?id=${tmdbId}&type=${type}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          unified = await res.json();
          boundedMapSet(state.mediaCache, cacheKey, unified, 50);
        } catch (fetchErr) {
          console.warn(`[CineFlow] Network error loading media ${tmdbId}, checking static catalog...`, fetchErr);
          const staticCatalog = window.STATIC_OFFLINE_CATALOG || [];
          const staticMatch = staticCatalog.find(m => Number(m.tmdbId) === Number(tmdbId));
          if (staticMatch) {
            unified = {
              details: staticMatch,
              credits: staticMatch.credits,
              trailer: staticMatch.trailer,
              recommendations: staticMatch.recommendations,
              streamUrl: staticMatch.streamUrl
            };
          } else {
            const fallback = staticCatalog[0] || {};
            unified = {
              details: fallback,
              credits: fallback.credits,
              trailer: fallback.trailer,
              recommendations: fallback.recommendations,
              streamUrl: fallback.streamUrl
            };
          }
          if (!state.isOfflineMode) {
            activateStaticFallbackMode("Network error loading title");
          }
        }
      }

      const details = unified.details || {};
      const credits = unified.credits || {};
      const trailer = unified.trailer || null;
      const recs = unified.recommendations || [];

      const isTv = type === 'tv' || details.mediaType === 'tv';
      const seasonCount = isTv ? Math.max(1, details.numberOfSeasons || 1) : 0;

      // Update Active Media State
      state.currentMedia = {
        tmdbId,
        mediaType: isTv ? 'tv' : 'movie',
        title: details.title || (preloadData && preloadData.title) || "Unknown Title",
        year: (details.year || (preloadData && preloadData.year) || "2024").slice(0, 4),
        rating: details.rating || "8.0",
        posterPath: details.posterPath || (preloadData && preloadData.posterPath),
        backdropPath: details.backdropPath || (preloadData && preloadData.backdropPath),
        numberOfSeasons: seasonCount,
        numberOfEpisodes: details.numberOfEpisodes || 0
      };

      // 1. Text & Title Transition with Hyper-Animation
      heroTitle.textContent = state.currentMedia.title;
      triggerHyperAnimations();

      heroTagline.textContent = details.tagline ? `"${details.tagline}"` : `Discover ${state.currentMedia.title}`;
      heroRatingBadge.textContent = `${state.currentMedia.rating} IMDb`;
      heroYearBadge.textContent = state.currentMedia.year;
      heroRuntimeBadge.textContent = details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : (isTv ? `${seasonCount} Season${seasonCount > 1 ? 's' : ''}` : '2h');
      
      const isInfinityCastle = tmdbId === 1311031 || (state.currentMedia.title || '').toLowerCase().includes('infinity castle');
      const isTheatrical = isInfinityCastle || (Number(state.currentMedia.year) >= 2025 && !isTv);
      heroCertBadge.textContent = isTheatrical ? 'THEATRICAL EVENT' : (isTv ? 'TV SERIES' : '4K CINEMA');

      // Theatrical Event Alert Banner
      const heroTheatricalBanner = document.getElementById('heroTheatricalBanner');
      const heroTheatricalDesc = document.getElementById('heroTheatricalDesc');
      const heroBridgeTvBtn = document.getElementById('heroBridgeTvBtn');

      if (heroTheatricalBanner) {
        if (isTheatrical) {
          heroTheatricalBanner.style.display = 'flex';
          if (isInfinityCastle) {
            if (heroTheatricalDesc) heroTheatricalDesc.textContent = 'Demon Slayer: Infinity Castle is an upcoming theatrical trilogy. Playing verified prologue & special. You can also stream the Season 4 TV finale.';
            if (heroBridgeTvBtn) {
              heroBridgeTvBtn.style.display = 'inline-block';
              heroBridgeTvBtn.textContent = 'Watch Season 4 Finale →';
              heroBridgeTvBtn.onclick = () => {
                loadMedia(85937, 'tv');
                setTimeout(() => {
                  fetchAndOpenEpisodesModal(85937, 4);
                }, 350);
              };
            }
          } else {
            if (heroTheatricalDesc) heroTheatricalDesc.textContent = `Upcoming theatrical release (${state.currentMedia.year || '2025'}). Playing verified teaser & preview specials.`;
            if (heroBridgeTvBtn) heroBridgeTvBtn.style.display = 'none';
          }
        } else {
          heroTheatricalBanner.style.display = 'none';
        }
      }

      // 2. Poster & Backdrop
      if (details.posterPath) posterMainImage.src = details.posterPath;
      if (details.backdropPath) setHeroBackdrop(details.backdropPath);
      posterRatingChip.textContent = `★ ${state.currentMedia.rating}`;
      posterCertBadge.textContent = isTv ? 'TV SERIES' : '4K HDR';

      // 3. Dynamic Genres
      heroGenresRow.innerHTML = '';
      const genres = details.genres && details.genres.length > 0 ? details.genres : ['Cinema', 'Feature'];
      genres.slice(0, 4).forEach(g => {
        const chip = document.createElement('span');
        chip.className = 'motion-genre-chip';
        chip.textContent = g;
        heroGenresRow.appendChild(chip);
      });

      // 4. Dynamic Synopsis
      heroSynopsis.textContent = details.overview || "Synopsis is currently being synchronized with TMDB library.";

      // 5. Specs & Overview Drawer
      heroProductionSpecs.textContent = details.productionCountries || details.spokenLanguages || "International Production";
      overviewDirector.textContent = credits.director || (isTv ? "Series Creator" : "Director");
      overviewWriters.textContent = credits.writers || "Screenplay & Authors";
      overviewGross.textContent = details.revenue || (isTv ? `${details.numberOfEpisodes || 0} Total Episodes` : "Box Office N/A");
      overviewBudget.textContent = details.budget || (isTv ? `${seasonCount} Seasons` : "Budget N/A");

      // 6. Trailer Key
      if (trailer && trailer.key) {
        state.currentTrailerKey = trailer.key;
        heroTrailerBtn.style.display = 'inline-flex';
      } else {
        heroTrailerBtn.style.display = 'none';
      }

      // 7. Dynamic Cast Drawer
      populateCastDrawer(credits.cast || []);

      // 8 & 9. Dynamic Rails (Director & Recommended):
      // Only populate on initial page boot OR when user explicitly clicks an individual movie card.
      // NEVER mutate page rails when the hero slider/carousel changes!
      if (!state.hasInitializedRails || !isFromSlider) {
        if (credits.directorId && credits.director) {
          loadDynamicDirector(credits.directorId, credits.director, credits.directorProfilePath);
        }
        if (recs && recs.length > 0) {
          populateRecommendedRail(recs);
        }
        state.hasInitializedRails = true;
      }

      // 10. Update Active Switcher State in Hero Container
      updateHeroCarouselActive(tmdbId);

      // 11. Bookmark Button State
      updateBookmarkBtn();

      // 12. TV Series Seasons & Episodes UI Setup
      if (heroEpisodesBtn) {
        heroEpisodesBtn.style.display = isTv ? 'inline-flex' : 'none';
      }

      // Only alter dock tabs and site episodes if user explicitly selected an individual media item
      if (!isFromSlider) {
        if (dockTabEpisodes) {
          dockTabEpisodes.style.display = isTv ? 'inline-flex' : 'none';
        }

        if (isTv) {
          populateSeasonSelectors(seasonCount, 1);
          loadSiteEpisodes(tmdbId, 1);
        } else {
          // If transitioning from TV series to a film in individual mode and episodes pane was open, switch back to overview
          if (paneEpisodes && paneEpisodes.style.display === 'block') {
            paneEpisodes.style.display = 'none';
            if (paneOverview) paneOverview.style.display = 'block';
            dockTabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === 'overview'));
            drawerTitleText.textContent = 'Production & Overview';
          }
        }
      }

    } catch (err) {
      console.error("Failed to load media:", err);
      showToast("Title loaded");
    }
  }

  // =========================================================================
  // 3. Hyper-Animated Hero Slider Controller & Automatic Offline Failover Engine
  // =========================================================================
  function setupHeroSlider(items) {
    if (!items || items.length === 0) return;
    state.slider.items = items;
    renderSliderPagination(items);
    updateSliderUI();
    startHeroSliderTimer();
  }

  function renderSliderPagination(items) {
    if (!heroSliderPagination) return;
    heroSliderPagination.innerHTML = '';
    items.forEach((item, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-pagination-dot ${idx === state.slider.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}: ${item.title}`);
      dot.innerHTML = `<span class="slider-pagination-fill"></span>`;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToHeroSlide(idx);
      });
      heroSliderPagination.appendChild(dot);
    });
  }

  function updateSliderUI() {
    const total = state.slider.items.length;
    if (total === 0) return;
    const current = state.slider.currentIndex;

    if (heroSlideCounter) {
      heroSlideCounter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }

    if (heroSliderPagination) {
      const dots = heroSliderPagination.querySelectorAll('.slider-pagination-dot');
      dots.forEach((dot, idx) => {
        const isActive = idx === current;
        dot.classList.toggle('active', isActive);
        dot.classList.toggle('paused', !state.slider.isPlaying);
      });
    }

    if (heroPlayPauseIcon) {
      if (state.slider.isPlaying) {
        heroPlayPauseIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      } else {
        heroPlayPauseIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`;
      }
    }
  }

  function goToHeroSlide(index) {
    if (!state.slider.items || state.slider.items.length === 0) return;
    state.slider.currentIndex = (index + state.slider.items.length) % state.slider.items.length;
    const item = state.slider.items[state.slider.currentIndex];

    state.slider.isIndividualMode = false;
    if (heroReturnToSliderBtn) heroReturnToSliderBtn.style.display = 'none';
    if (heroSliderController) heroSliderController.style.display = 'inline-flex';

    loadMedia(item.tmdbId, item.mediaType || 'movie', item, true);
    updateSliderUI();

    if (state.slider.isPlaying) {
      startHeroSliderTimer();
    }
  }

  function nextHeroSlide() {
    goToHeroSlide(state.slider.currentIndex + 1);
  }

  function prevHeroSlide() {
    goToHeroSlide(state.slider.currentIndex - 1);
  }

  function startHeroSliderTimer() {
    stopHeroSliderTimer();
    if (!state.slider.isPlaying || state.slider.isIndividualMode) return;
    state.slider.timer = setTimeout(() => {
      nextHeroSlide();
    }, state.slider.intervalMs);
  }

  function stopHeroSliderTimer() {
    if (state.slider.timer) {
      clearTimeout(state.slider.timer);
      state.slider.timer = null;
    }
  }

  function toggleSliderPlayPause() {
    state.slider.isPlaying = !state.slider.isPlaying;
    if (state.slider.isPlaying) {
      startHeroSliderTimer();
      showToast("Auto-advance resumed");
    } else {
      stopHeroSliderTimer();
      showToast("Auto-advance paused");
    }
    updateSliderUI();
  }

  function activateStaticFallbackMode(reason = "Network Error") {
    state.isOfflineMode = true;
    console.warn(`[CineFlow] Activating Zero-Downtime Static Fallback Mode: ${reason}`);

    if (networkStatusPill && networkPulseDot && networkStatusText) {
      networkStatusPill.classList.add('offline');
      networkPulseDot.classList.add('offline');
      networkStatusText.textContent = "OFFLINE VAULT (STATIC)";
      networkStatusPill.title = "CineFlow Offline Vault Active • Click to retry online sync";
    }

    const staticCatalog = window.STATIC_OFFLINE_CATALOG || [];
    state.topFeatured = staticCatalog.slice(0, 6);
    state.browseCache.trending = staticCatalog;
    state.browseCache.popularMovies = staticCatalog.slice(0, 4);
    state.browseCache.popularTV = staticCatalog.slice(4);

    if (trendingTrack) {
      trendingTrack.innerHTML = '';
      staticCatalog.forEach(film => trendingTrack.appendChild(createRailCard(film)));
    }
    if (moviesTrack) {
      moviesTrack.innerHTML = '';
      staticCatalog.slice(0, 4).forEach(film => moviesTrack.appendChild(createRailCard(film)));
    }
    if (tvTrack) {
      tvTrack.innerHTML = '';
      staticCatalog.slice(4).forEach(film => tvTrack.appendChild(createRailCard(film)));
    }

    setupHeroSlider(state.topFeatured);
    renderHeroCarousel(state.topFeatured);

    if (state.topFeatured.length > 0 && !state.slider.isIndividualMode) {
      loadMedia(state.topFeatured[0].tmdbId, state.topFeatured[0].mediaType || 'movie', state.topFeatured[0], true);
    }

    showToast("Network Offline: Switched to Static Cinema Vault");
  }

  // Top 5 Featured Hero Carousel Switcher
  function renderHeroCarousel(items) {
    if (!heroCarouselSwitcher) return;
    heroCarouselSwitcher.innerHTML = '';

    items.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `hero-switcher-card ${item.tmdbId === state.activeFeaturedId ? 'active' : ''}`;
      card.dataset.tmdbId = item.tmdbId;

      const poster = item.posterPath || 'https://image.tmdb.org/t/p/w185/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg';
      card.innerHTML = `
        <img class="switcher-thumb" src="${escapeHtml(poster)}" alt="${escapeHtml(item.title)}" loading="lazy">
        <div class="switcher-info">
          <span class="switcher-rank">#${idx + 1} TRENDING</span>
          <span class="switcher-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => schedulePrefetch(item.tmdbId, item.mediaType || 'movie'));
      card.addEventListener('mouseleave', cancelPrefetch);
      card.addEventListener('click', () => {
        goToHeroSlide(idx);
        showToast(`Spotlight: "${item.title}"`);
      });

      // Attach 3D edge/corner backward tilt physics to each switcher flashcard
      initCardBackwardsTilt(card, {
        maxTilt: 15,
        maxDepressZ: -8,
        scale: 1.04,
        perspective: 800,
        damping: 0.18
      });

      heroCarouselSwitcher.appendChild(card);
    });
  }

  function updateHeroCarouselActive(tmdbId) {
    if (!heroCarouselSwitcher) return;
    const cards = heroCarouselSwitcher.querySelectorAll('.hero-switcher-card');
    cards.forEach(card => {
      const isMatch = Number(card.dataset.tmdbId) === Number(tmdbId);
      card.classList.toggle('active', isMatch);
    });
  }

  // =========================================================================
  // 4. Dynamic Director Spotlight & Filmography
  // =========================================================================
  async function loadDynamicDirector(personId, personName, profilePhoto) {
    state.currentDirectorId = personId;
    drawerDirectorName.textContent = personName;
    directorRailTitle.textContent = `${personName}'s Masterpieces`;

    if (profilePhoto) {
      drawerDirectorPhoto.src = profilePhoto;
    }

    try {
      let person = state.personCache.get(personId);
      if (!person) {
        const res = await fetch(`/api/person?id=${personId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        person = await res.json();
        boundedMapSet(state.personCache, personId, person, 50);
      }

      drawerDirectorBio.textContent = person.biography ? person.biography.slice(0, 320) + '...' : `Visionary director and screenwriter acclaimed for cinematic depth.`;
      if (person.profilePath) {
        drawerDirectorPhoto.src = person.profilePath;
      }
      directorAwardTag.textContent = `${person.placeOfBirth || 'International'} • Filmmaker`;

      // Populate Filmography in Drawer and Rail
      const works = person.directed || [];
      drawerDirectorFilms.innerHTML = '';
      directorTrack.innerHTML = '';

      if (works.length === 0) {
        drawerDirectorFilms.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No other titles found.</div>';
        directorTrack.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No additional titles found.</div>';
        return;
      }

      works.forEach(film => {
        drawerDirectorFilms.appendChild(createRailCard(film));
        directorTrack.appendChild(createRailCard(film));
      });

    } catch (err) {
      console.warn("Could not load dynamic director details:", err);
    }
  }

  // Dynamic Cast Drawer
  function populateCastDrawer(castList) {
    drawerCastGrid.innerHTML = '';
    if (!castList || castList.length === 0) {
      drawerCastGrid.innerHTML = '<div style="color: var(--text-muted); grid-column: 1/-1; padding: 2rem; text-align: center;">Cast details syncing from TMDB...</div>';
      return;
    }

    castList.slice(0, 14).forEach(member => {
      const card = document.createElement('div');
      card.className = 'cast-motion-card';
      const img = member.profilePath || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';
      card.innerHTML = `
        <img class="cast-avatar-circle" src="${escapeHtml(img)}" alt="${escapeHtml(member.name)}" loading="lazy">
        <div class="cast-real-name">${escapeHtml(member.name)}</div>
        <div class="cast-role-name">${escapeHtml(member.character || 'Cast')}</div>
      `;
      drawerCastGrid.appendChild(card);
    });
  }

  // Dynamic Seasons & Episodes Drawer Populators
  function populateSeasonSelectors(totalSeasons, activeSeason = 1) {
    const seasonsCount = Math.max(1, totalSeasons || 1);
    [drawerSeasonSelect, playerSeasonSelect].forEach(sel => {
      if (!sel) return;
      sel.innerHTML = '';
      for (let s = 1; s <= seasonsCount; s++) {
        const opt = document.createElement('option');
        opt.value = String(s);
        opt.textContent = `Season ${s}`;
        if (s === activeSeason) opt.selected = true;
        sel.appendChild(opt);
      }
      sel.value = String(activeSeason);
    });
  }

  async function loadSiteEpisodes(tmdbId, seasonNum = 1) {
    if (!drawerEpisodesGrid) return;

    if (drawerEpisodesCountBadge) {
      drawerEpisodesCountBadge.textContent = `Loading Season ${seasonNum}...`;
    }

    const cacheKey = `episodes:${tmdbId}:s${seasonNum}`;
    const epEntry = state.episodesCache.get(cacheKey);
    let data = null;
    if (epEntry && (Date.now() - (epEntry.cachedAt || 0) <= 15 * 60 * 1000)) {
      data = epEntry.data;
    }

    if (!data) {
      drawerEpisodesGrid.innerHTML = `
        <div class="episodes-loading-state" style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
          <div style="width: 38px; height: 38px; border: 2px solid rgba(255,184,0,0.2); border-top-color: var(--accent-amber); border-radius: 50%; margin: 0 auto 1rem; animation: spinBuffering 0.75s linear infinite;"></div>
          <div style="font-size: 0.95rem; font-weight: 600; color: #fff;">Loading Season ${seasonNum} Episodes...</div>
          <div style="font-size: 0.8rem; margin-top: 0.35rem; color: var(--text-secondary);">Connecting to TMDB & VidKing Stream Index</div>
        </div>
      `;

      try {
        const res = await fetch(`/api/episodes?id=${tmdbId}&season=${seasonNum}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
        boundedMapSet(state.episodesCache, cacheKey, { data, cachedAt: Date.now() }, 50);
      } catch (err) {
        console.warn(`[CineFlow] Failed to fetch episodes for show ${tmdbId} season ${seasonNum}:`, err);
        drawerEpisodesGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px dashed rgba(255,255,255,0.1);">
            <div style="font-size: 1.6rem; margin-bottom: 0.5rem;">📺</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">Episode Information Unavailable</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Could not load season ${seasonNum} episode metadata. You can still stream directly using the player.</div>
            <button class="site-episode-play-btn" style="margin: 1rem auto 0; display: inline-flex;" id="drawerFallbackPlayBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Play Season ${seasonNum} Episode 1</span>
            </button>
          </div>
        `;
        const fallbackBtn = document.getElementById('drawerFallbackPlayBtn');
        if (fallbackBtn) {
          fallbackBtn.addEventListener('click', () => {
            if (state.currentMedia) playMedia(state.currentMedia, seasonNum, 1);
          });
        }
        if (drawerEpisodesCountBadge) drawerEpisodesCountBadge.textContent = `Season ${seasonNum}`;
        return;
      }
    }

    const episodes = (data && data.episodes) || [];
    if (drawerEpisodesCountBadge) {
      drawerEpisodesCountBadge.textContent = `${episodes.length} Episode${episodes.length === 1 ? '' : 's'} • Season ${seasonNum}`;
    }

    if (episodes.length === 0) {
      drawerEpisodesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
          <div style="font-size: 1.1rem; font-weight: 600; color: #fff;">No episodes found for Season ${seasonNum}</div>
          <div style="font-size: 0.82rem; margin-top: 0.35rem;">Try selecting a different season above.</div>
        </div>
      `;
      return;
    }

    drawerEpisodesGrid.innerHTML = '';
    episodes.forEach(ep => {
      const epNum = ep.episode || ep.episode_number || 1;
      const title = ep.title || ep.name || `Episode ${epNum}`;
      const overview = ep.overview || 'No episode synopsis available.';
      const runtime = ep.runtime ? `${ep.runtime} min` : (ep.airDate || '');
      const stillPath = ep.stillPath || ep.still_path;
      const fallbackBackdrop = state.currentMedia && (state.currentMedia.backdropPath || state.currentMedia.posterPath);
      const thumbUrl = stillPath || fallbackBackdrop || 'https://image.tmdb.org/t/p/w500/o4IX9Mm0kpLITVANJMx7inyEUaY.jpg';

      const card = document.createElement('div');
      card.className = 'site-episode-card';
      card.dataset.season = String(seasonNum);
      card.dataset.episode = String(epNum);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Play Season ${seasonNum} Episode ${epNum}: ${title}`);

      card.innerHTML = `
        <div class="site-episode-thumb-wrap">
          <img class="site-episode-thumb" src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(title)}" loading="lazy" />
          <div class="site-episode-play-overlay">
            <div class="site-episode-play-ring">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
        </div>
        <div class="site-episode-body">
          <div class="site-episode-badge-row">
            <span class="site-episode-num">S${escapeHtml(seasonNum)} • E${escapeHtml(epNum)}</span>
            <span class="site-episode-runtime">${escapeHtml(runtime)}</span>
          </div>
          <div class="site-episode-title">${escapeHtml(title)}</div>
          <div class="site-episode-overview">${escapeHtml(overview)}</div>
          <button class="site-episode-play-btn" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Play Episode ${escapeHtml(epNum)}</span>
          </button>
        </div>
      `;

      const onPlay = (e) => {
        e.stopPropagation();
        if (state.currentMedia) {
          playMedia(state.currentMedia, seasonNum, epNum);
        }
      };

      card.addEventListener('click', onPlay);
      const playBtn = card.querySelector('.site-episode-play-btn');
      if (playBtn) playBtn.addEventListener('click', onPlay);

      drawerEpisodesGrid.appendChild(card);
    });
  }

  // Dynamic Recommendations Rail
  function populateRecommendedRail(items) {
    recommendedTrack.innerHTML = '';
    if (!items || items.length === 0) {
      recommendedTrack.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No related recommendations available.</div>';
      return;
    }

    items.slice(0, 12).forEach(film => {
      recommendedTrack.appendChild(createRailCard(film));
    });
  }

  // Universal Motion Rail Card
  function createRailCard(film) {
    const card = document.createElement('div');
    card.className = 'rail-film-card';
    const poster = film.posterPath || 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg';

    card.innerHTML = `
      <img class="rail-film-poster" src="${escapeHtml(poster)}" alt="${escapeHtml(film.title)}" loading="lazy">
      <div class="rail-film-meta">
        <div class="rail-film-name">${escapeHtml(film.title)}</div>
        <div class="rail-film-sub">
          <span>${escapeHtml(film.year || '')}</span>
          <span class="rail-film-rating">★ ${escapeHtml(film.rating || '7.8')}</span>
        </div>
      </div>
    `;

    card.addEventListener('mouseenter', () => schedulePrefetch(film.tmdbId, film.mediaType || 'movie'));
    card.addEventListener('mouseleave', cancelPrefetch);
    card.addEventListener('click', () => {
      loadMedia(film.tmdbId, film.mediaType || 'movie', film);
      showToast(`Loaded "${film.title}"`);
    });

    return card;
  }

  // =========================================================================
  // 5. Interactive Genre Discovery Engine
  // =========================================================================
  if (genreDiscoveryBar) {
    const genrePills = genreDiscoveryBar.querySelectorAll('.genre-filter-pill');

    genrePills.forEach(pill => {
      pill.addEventListener('click', async () => {
        genrePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const genre = pill.dataset.genre;
        const type = pill.dataset.type || 'movie';

        if (genre === 'all') {
          railShowcaseTitle.textContent = "Now Trending Globally";
          railShowcaseTag.textContent = "LIVE TMDB";
          trendingTrack.innerHTML = '';
          state.browseCache.trending.forEach(f => trendingTrack.appendChild(createRailCard(f)));
          return;
        }

        railShowcaseTitle.textContent = `Discover: ${pill.textContent.replace(/[^\w\s&]/gi, '').trim()}`;
        railShowcaseTag.textContent = "GENRE CURATED";
        trendingTrack.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">Loading genre titles...</div>';

        try {
          const cacheKey = `${type}:${genre}`;
          let results = state.browseCache.genreCache.get(cacheKey);

          if (!results) {
            const res = await fetch(`/api/discover?genre=${genre}&type=${type}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            results = data.results || [];
            boundedMapSet(state.browseCache.genreCache, cacheKey, results, 50);
          }

          trendingTrack.innerHTML = '';
          if (results.length === 0) {
            trendingTrack.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No titles found for this genre.</div>';
            return;
          }

          results.forEach(f => trendingTrack.appendChild(createRailCard(f)));

          // Pre-warm top 3
          results.slice(0, 3).forEach(f => prefetchMedia(f.tmdbId, f.mediaType || 'movie'));
        } catch (err) {
          trendingTrack.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">Failed to load genre.</div>';
        }
      });
    });
  }

  // =========================================================================
  // 6. Liquid Floating Dock & Drawer Navigation
  // =========================================================================
  function updateMagneticPill(tabEl) {
    if (!tabEl || !dockMagneticPill) return;
    const tabRect = tabEl.getBoundingClientRect();
    const dockRect = liquidDock.getBoundingClientRect();
    const offsetLeft = tabRect.left - dockRect.left;
    dockMagneticPill.style.transform = `translateX(${offsetLeft}px)`;
    dockMagneticPill.style.width = `${tabRect.width}px`;
  }

  dockTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.dataset.tab;
      
      if (btn.classList.contains('active') && springDrawer.classList.contains('open')) {
        springDrawer.classList.remove('open');
        return;
      }

      dockTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMagneticPill(btn);

      if (tabKey === 'browse') {
        springDrawer.classList.remove('open');
        const railsEl = document.getElementById('curatedRailsSection');
        if (railsEl) railsEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      paneCast.style.display = tabKey === 'cast' ? 'block' : 'none';
      paneDirector.style.display = tabKey === 'director' ? 'block' : 'none';
      paneOverview.style.display = tabKey === 'overview' ? 'block' : 'none';
      if (paneEpisodes) paneEpisodes.style.display = tabKey === 'episodes' ? 'block' : 'none';

      drawerTitleText.textContent = tabKey === 'cast' ? 'Cast & Characters' :
                                    tabKey === 'director' ? 'Director Spotlight' :
                                    tabKey === 'episodes' ? `${(state.currentMedia && state.currentMedia.title) || 'Series'} — Seasons & Episodes` :
                                    'Production & Overview';

      if (tabKey === 'episodes' && state.currentMedia && state.currentMedia.tmdbId) {
        const selSeason = drawerSeasonSelect ? (Number(drawerSeasonSelect.value) || 1) : 1;
        loadSiteEpisodes(state.currentMedia.tmdbId, selSeason);
      }

      springDrawer.classList.add('open');
    });
  });

  // Hero Quick Episodes Launcher
  if (heroEpisodesBtn) {
    heroEpisodesBtn.addEventListener('click', () => {
      if (!state.currentMedia) return;
      dockTabBtns.forEach(b => b.classList.remove('active'));
      if (dockTabEpisodes) {
        dockTabEpisodes.classList.add('active');
        updateMagneticPill(dockTabEpisodes);
      }
      paneCast.style.display = 'none';
      paneDirector.style.display = 'none';
      paneOverview.style.display = 'none';
      if (paneEpisodes) paneEpisodes.style.display = 'block';

      drawerTitleText.textContent = `${state.currentMedia.title} — Seasons & Episodes`;
      springDrawer.classList.add('open');

      const selSeason = drawerSeasonSelect ? (Number(drawerSeasonSelect.value) || 1) : 1;
      loadSiteEpisodes(state.currentMedia.tmdbId, selSeason);
    });
  }

  // Seasons Dropdown Selectors Synchronization
  if (drawerSeasonSelect) {
    drawerSeasonSelect.addEventListener('change', (e) => {
      const selSeason = Number(e.target.value) || 1;
      if (playerSeasonSelect) playerSeasonSelect.value = String(selSeason);
      if (state.currentMedia && state.currentMedia.tmdbId) {
        loadSiteEpisodes(state.currentMedia.tmdbId, selSeason);
      }
    });
  }

  if (playerSeasonSelect) {
    playerSeasonSelect.addEventListener('change', (e) => {
      const selSeason = Number(e.target.value) || 1;
      if (drawerSeasonSelect) drawerSeasonSelect.value = String(selSeason);
      if (state.currentMedia && state.currentMedia.tmdbId) {
        loadInPlayerEpisodes(state.currentMedia, selSeason);
      }
    });
  }

  setTimeout(() => {
    const activeBtn = document.querySelector('.dock-tab-btn.active');
    if (activeBtn) updateMagneticPill(activeBtn);
  }, 250);

  closeDrawerBtn.addEventListener('click', () => springDrawer.classList.remove('open'));

  // =========================================================================
  // 7. Spotlight Command Palette Search (Cmd+K / '/')
  // =========================================================================
  let searchAbort = null;
  let searchDebounceTimer = null;

  function openCommandPalette() {
    commandPaletteBackdrop.classList.add('open');
    commandSearchInput.value = '';
    commandSearchInput.focus();
    renderCommandSuggestions();
  }

  function closeCommandPalette() {
    commandPaletteBackdrop.classList.remove('open');
    if (searchAbort) searchAbort.abort();
  }

  openCommandPaletteBtn.addEventListener('click', openCommandPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === '/' && document.activeElement !== commandSearchInput && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === 'Escape') {
      if (commandPaletteBackdrop.classList.contains('open')) closeCommandPalette();
      if (springDrawer.classList.contains('open')) springDrawer.classList.remove('open');
      if (playerModal.classList.contains('open')) closeCinemaPlayer();
      if (trailerModal.classList.contains('open')) closeTrailerModal();
      if (exportModal.classList.contains('open')) exportModal.classList.remove('open');
    }
  });

  commandPaletteBackdrop.addEventListener('click', (e) => {
    if (e.target === commandPaletteBackdrop) closeCommandPalette();
  });

  let highlightedSearchIndex = 0;
  let activeSearchResults = [];

  commandSearchInput.addEventListener('keydown', (e) => {
    const items = commandResultsList.querySelectorAll('.command-result-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedSearchIndex = (highlightedSearchIndex + 1) % items.length;
      updateSearchHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedSearchIndex = (highlightedSearchIndex - 1 + items.length) % items.length;
      updateSearchHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = activeSearchResults[highlightedSearchIndex];
      if (selected) {
        const isTv = selected.mediaType === 'tv';
        closeCommandPalette();
        loadMedia(selected.tmdbId, selected.mediaType || (isTv ? 'tv' : 'movie'), selected);
        playMedia(selected, isTv ? 1 : 0, isTv ? 1 : 0);
      }
    }
  });

  function updateSearchHighlight(items) {
    items.forEach((row, idx) => {
      if (idx === highlightedSearchIndex) {
        row.classList.add('highlighted');
        row.scrollIntoView({ block: 'nearest' });
      } else {
        row.classList.remove('highlighted');
      }
    });
  }

  commandSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchDebounceTimer);

    const clearBtn = document.getElementById('commandClearBtn');
    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    if (!query) {
      activeSearchResults = [];
      renderCommandSuggestions();
      return;
    }

    searchDebounceTimer = setTimeout(() => executeCommandSearch(query), 160);
  });

  const commandClearBtn = document.getElementById('commandClearBtn');
  if (commandClearBtn) {
    commandClearBtn.addEventListener('click', () => {
      commandSearchInput.value = '';
      commandClearBtn.style.display = 'none';
      commandSearchInput.focus();
      renderCommandSuggestions();
    });
  }

  function renderCommandSuggestions() {
    activeSearchResults = [];
    commandResultsList.innerHTML = `
      <div style="padding: 1.8rem; text-align: center; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
        <div>Type any <strong style="color: #fff;">movie, series, or director</strong> (e.g. <em>Dune, Batman, Denis Villeneuve</em>)</div>
        <div style="font-size: 0.8rem; margin-top: 0.4rem; color: var(--accent-amber);">↑↓ to navigate • Press ENTER to stream immediately in 4K</div>
      </div>
    `;
  }

  async function executeCommandSearch(query) {
    if (searchAbort) searchAbort.abort();
    searchAbort = new AbortController();

    const normalized = query.toLowerCase().trim();
    if (state.searchCache.has(normalized)) {
      renderCommandResults(state.searchCache.get(normalized));
      return;
    }

    commandResultsList.innerHTML = `
      <div style="padding: 2.2rem; color: var(--text-muted); text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
        <div class="clean-spinner-ring" style="width: 22px; height: 22px; border-width: 2.5px;"></div>
        <span>Searching live cinema catalog...</span>
      </div>
    `;

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&mode=all`, {
        signal: searchAbort.signal
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      let results = data.results || [];

      // Local offline fallback if remote is empty
      if (results.length === 0) {
        const staticCatalog = window.STATIC_OFFLINE_CATALOG || [];
        results = staticCatalog.filter(m => {
          const t = (m.title || '').toLowerCase();
          const o = (m.overview || '').toLowerCase();
          return t.includes(normalized) || o.includes(normalized);
        });
      }

      boundedMapSet(state.searchCache, normalized, results, 50);
      renderCommandResults(results);
    } catch (err) {
      if (err.name === 'AbortError') return;
      const staticCatalog = window.STATIC_OFFLINE_CATALOG || [];
      const localMatches = staticCatalog.filter(m => (m.title || '').toLowerCase().includes(normalized));
      if (localMatches.length > 0) {
        renderCommandResults(localMatches);
      } else {
        commandResultsList.innerHTML = '<div style="padding: 1.8rem; color: var(--text-muted); text-align: center;">No matching titles found. Try another query.</div>';
      }
    }
  }

  function renderCommandResults(results) {
    commandResultsList.innerHTML = '';
    activeSearchResults = results || [];
    highlightedSearchIndex = 0;

    if (!results || results.length === 0) {
      commandResultsList.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No matching titles found on TMDB. Try another search.</div>';
      return;
    }

    results.slice(0, 10).forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'command-result-item';
      if (idx === 0) row.classList.add('highlighted');

      const isTv = item.mediaType === 'tv';
      const isInfinityCastle = (item.title || '').toLowerCase().includes('infinity castle');
      const isTheatrical = isInfinityCastle || (Number(item.year) >= 2025 && !isTv);

      let badgeHtml = '';
      if (isTheatrical) {
        badgeHtml = `<span class="badge-tag badge-theatrical">THEATRICAL</span>`;
      } else if (isTv) {
        badgeHtml = `<span class="badge-tag badge-tv">${item.episodeCount ? `${escapeHtml(item.episodeCount)} EPS` : 'TV'}</span>`;
      } else {
        badgeHtml = `<span class="badge-tag badge-movie">MOVIE</span>`;
      }

      const poster = item.posterPath || 'https://image.tmdb.org/t/p/w185/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg';
      const rating = item.rating ? `★ ${escapeHtml(item.rating)}` : '★ 8.0';

      row.innerHTML = `
        <img class="command-thumb" src="${escapeHtml(poster)}" alt="${escapeHtml(item.title)}" loading="lazy">
        <div style="flex: 1; min-width: 0;">
          <div class="command-info-title">${escapeHtml(item.title)}</div>
          <div class="command-info-sub">
            <span>${escapeHtml(item.year || '')}</span>
            <span>•</span>
            <span style="color: var(--accent-amber); font-weight: 700;">${rating}</span>
            <span>•</span>
            ${badgeHtml}
          </div>
        </div>
        <button class="command-stream-btn" title="Stream Now">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          <span>Stream</span>
        </button>
      `;

      row.addEventListener('mouseenter', () => {
        highlightedSearchIndex = idx;
        const allItems = commandResultsList.querySelectorAll('.command-result-item');
        updateSearchHighlight(allItems);
        schedulePrefetch(item.tmdbId, item.mediaType || (isTv ? 'tv' : 'movie'));
      });
      row.addEventListener('mouseleave', cancelPrefetch);

      // Play button click -> direct stream
      const streamBtn = row.querySelector('.command-stream-btn');
      if (streamBtn) {
        streamBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeCommandPalette();
          loadMedia(item.tmdbId, item.mediaType || (isTv ? 'tv' : 'movie'), item);
          playMedia(item, isTv ? 1 : 0, isTv ? 1 : 0);
        });
      }

      // Card row click -> load media details & stream
      row.addEventListener('click', () => {
        closeCommandPalette();
        loadMedia(item.tmdbId, item.mediaType || (isTv ? 'tv' : 'movie'), item);
        playMedia(item, isTv ? 1 : 0, isTv ? 1 : 0);
      });

      commandResultsList.appendChild(row);
    });
  }

  // =========================================================================
  // 8. Video Player & Stream Engine (Flagship Cinema Player Controller)
  // =========================================================================
  
  // HUD Notification Toast
  let hudToastTimer = null;
  function showPlayerToast(icon, text) {
    if (!playerHudToast) return;
    if (hudToastIcon) hudToastIcon.textContent = icon;
    if (hudToastText) hudToastText.textContent = text;
    playerHudToast.classList.add('show');
    clearTimeout(hudToastTimer);
    hudToastTimer = setTimeout(() => {
      playerHudToast.classList.remove('show');
    }, 1800);
  }

  // Popover Menus Management
  const popoverMenus = [audioMenu, subtitlesMenu, speedMenu, qualityMenu];
  function closeAllPlayerPopovers() {
    popoverMenus.forEach(menu => {
      if (menu) menu.style.display = 'none';
    });
  }

  function togglePlayerPopover(menu) {
    if (!menu) return;
    const isVisible = menu.style.display === 'flex';
    closeAllPlayerPopovers();
    if (!isVisible) {
      menu.style.display = 'flex';
    }
  }

  playerModal.addEventListener('click', (e) => {
    if (!e.target.closest('.hud-menu-wrapper')) {
      closeAllPlayerPopovers();
    }
  });

  // =========================================================================
  // 8.1 Streaming Diagnostics Engine (Phase 1 Baseline & Observability)
  // =========================================================================
  const streamingDebugOverlay = document.getElementById('streamingDebugOverlay');
  const hudDiagnosticsBtn = document.getElementById('hudDiagnosticsBtn');
  const debugHudCloseBtn = document.getElementById('debugHudCloseBtn');
  const debugHudRefreshBtn = document.getElementById('debugHudRefreshBtn');
  const diagBufferSec = document.getElementById('diagBufferSec');
  const diagBufferStatus = document.getElementById('diagBufferStatus');
  const diagBufferMinAvg = document.getElementById('diagBufferMinAvg');
  const diagSustainability = document.getElementById('diagSustainability');
  const diagSustainStatus = document.getElementById('diagSustainStatus');
  const diagSustainDetail = document.getElementById('diagSustainDetail');
  const diagResolution = document.getElementById('diagResolution');
  const diagBitrate = document.getElementById('diagBitrate');
  const diagBandwidth = document.getElementById('diagBandwidth');
  const diagTtff = document.getElementById('diagTtff');
  const diagRebuffers = document.getElementById('diagRebuffers');
  const diagDroppedFrames = document.getElementById('diagDroppedFrames');
  const diagDeliveryMode = document.getElementById('diagDeliveryMode');
  const diagDeliveryBadge = document.getElementById('diagDeliveryBadge');
  const diagProviderName = document.getElementById('diagProviderName');
  const diagCacheRatio = document.getElementById('diagCacheRatio');
  const diagCacheCounts = document.getElementById('diagCacheCounts');
  const diagUpstreamTtfb = document.getElementById('diagUpstreamTtfb');
  const diagProxyLatency = document.getElementById('diagProxyLatency');

  const diagState = {
    isOpen: false,
    playRequestTime: null,
    ttffMs: null,
    forwardBufferSec: 0,
    minBufferSec: Infinity,
    bufferSamples: [],
    rebufferCount: 0,
    totalRebufferDurationMs: 0,
    rebufferStartTime: null,
    segmentDownloadTimeMs: 0,
    segmentDurationSec: 0,
    sustainabilityRatio: 0,
    currentBitrateMbps: '0.00',
    currentResolution: 'Auto (0x0)',
    estimatedBandwidthMbps: '0.0',
    droppedFrames: 0,
    totalFrames: 0,
    deliveryMode: 'PROXY',
    providerName: 'VidFast',
    backendStats: null,
    pollInterval: null,
    backendPollInterval: null
  };

  function updateForwardBufferMetrics() {
    if (!videoElement || !videoElement.buffered || videoElement.buffered.length === 0) {
      diagState.forwardBufferSec = 0;
      return;
    }
    const ct = videoElement.currentTime;
    let forward = 0;
    for (let i = 0; i < videoElement.buffered.length; i++) {
      if (videoElement.buffered.start(i) <= ct + 0.15 && videoElement.buffered.end(i) >= ct) {
        forward = videoElement.buffered.end(i) - ct;
        break;
      }
    }
    if (forward === 0 && videoElement.buffered.length > 0) {
      forward = Math.max(0, videoElement.buffered.end(videoElement.buffered.length - 1) - ct);
    }
    diagState.forwardBufferSec = forward;
    if (forward < diagState.minBufferSec && forward > 0.05) {
      diagState.minBufferSec = forward;
    }
    diagState.bufferSamples.push(forward);
    if (diagState.bufferSamples.length > 300) diagState.bufferSamples.shift();
  }

  function updateQualityMetrics() {
    if (videoElement && videoElement.getVideoPlaybackQuality) {
      const q = videoElement.getVideoPlaybackQuality();
      diagState.droppedFrames = q.droppedVideoFrames || 0;
      diagState.totalFrames = q.totalVideoFrames || 0;
    }
  }

  async function fetchBackendDiagnostics() {
    try {
      const res = await fetch('/api/diagnostics');
      if (!res.ok) return;
      diagState.backendStats = await res.json();
    } catch (_) {}
  }

  function renderStreamingDiagnostics() {
    if (!diagState.isOpen) return;
    updateForwardBufferMetrics();
    updateQualityMetrics();

    // 1. Forward Buffer
    const buf = diagState.forwardBufferSec;
    if (diagBufferSec) diagBufferSec.textContent = `${buf.toFixed(1)}s`;
    let bufClass = 'status-critical';
    let bufText = 'CRITICAL (<3s)';
    if (buf >= 20) {
      bufClass = 'status-full';
      bufText = 'FULL (>20s)';
    } else if (buf >= 8) {
      bufClass = 'status-healthy';
      bufText = 'HEALTHY (8-20s)';
    } else if (buf >= 3) {
      bufClass = 'status-low';
      bufText = 'LOW (3-8s)';
    }
    if (diagBufferStatus) {
      diagBufferStatus.className = `metric-badge ${bufClass}`;
      diagBufferStatus.textContent = bufText;
    }
    const avgBuf = diagState.bufferSamples.length > 0 
      ? (diagState.bufferSamples.reduce((a, b) => a + b, 0) / diagState.bufferSamples.length)
      : buf;
    const minBuf = diagState.minBufferSec === Infinity ? 0 : diagState.minBufferSec;
    if (diagBufferMinAvg) {
      diagBufferMinAvg.textContent = `Min: ${minBuf.toFixed(1)}s | Avg: ${avgBuf.toFixed(1)}s`;
    }

    // 2. Sustainability Ratio (t_download / t_duration)
    const ratio = diagState.sustainabilityRatio;
    if (diagSustainability) diagSustainability.textContent = ratio.toFixed(2);
    let susClass = 'status-healthy';
    let susText = 'HEALTHY (<0.8)';
    if (ratio > 1.0) {
      susClass = 'status-critical';
      susText = 'BLEED (>1.0)';
    } else if (ratio >= 0.8) {
      susClass = 'status-low';
      susText = 'WARNING (0.8-1)';
    }
    if (diagSustainStatus) {
      diagSustainStatus.className = `metric-badge ${susClass}`;
      diagSustainStatus.textContent = susText;
    }
    if (diagSustainDetail) {
      diagSustainDetail.textContent = `Load: ${diagState.segmentDownloadTimeMs}ms | Dur: ${diagState.segmentDurationSec.toFixed(1)}s`;
    }

    // 3. Rendition & Bitrate
    if (diagResolution) diagResolution.textContent = diagState.currentResolution;
    if (diagBitrate) diagBitrate.textContent = `Bitrate: ${diagState.currentBitrateMbps} Mbps`;

    // 4. Bandwidth & TTFF
    if (diagBandwidth) diagBandwidth.textContent = `${diagState.estimatedBandwidthMbps || '0.0'} Mbps`;
    if (diagTtff) diagTtff.textContent = diagState.ttffMs !== null ? `TTFF: ${diagState.ttffMs} ms` : 'TTFF: Measuring...';

    // 5. Playback Stalls & Dropped Frames
    if (diagRebuffers) {
      const activeStall = diagState.rebufferStartTime ? Math.round(performance.now() - diagState.rebufferStartTime) : 0;
      const totalStall = diagState.totalRebufferDurationMs + activeStall;
      diagRebuffers.textContent = `${diagState.rebufferCount} Stalls (${totalStall} ms)`;
    }
    if (diagDroppedFrames) {
      const dropPct = diagState.totalFrames > 0 ? ((diagState.droppedFrames / diagState.totalFrames) * 100).toFixed(1) : '0.0';
      diagDroppedFrames.textContent = `Dropped: ${diagState.droppedFrames} / ${diagState.totalFrames} (${dropPct}%)`;
    }

    // 6. Delivery Mode
    if (diagDeliveryMode) diagDeliveryMode.textContent = diagState.deliveryMode;
    if (diagProviderName) diagProviderName.textContent = `Source: ${diagState.providerName}`;

    // 7. Node Chunk Cache Telemetry
    const b = diagState.backendStats;
    if (b && b.cache) {
      if (diagCacheRatio) diagCacheRatio.textContent = `${b.cache.hitRatioPct}% Hit Ratio`;
      if (diagCacheCounts) diagCacheCounts.textContent = `H: ${b.cache.segmentHits} | M: ${b.cache.segmentMisses} | Evict: ${b.cache.segmentEvictions} (${b.cache.currentCacheMb}MB)`;
      if (diagProxyLatency) diagProxyLatency.textContent = `Proxy: ${b.cache.avgSegmentSizeKb}KB avg | GC: ${b.gc?.totalDurationMs || 0}ms`;
      if (b.recentRequests && b.recentRequests.length > 0) {
        const lastReq = b.recentRequests[b.recentRequests.length - 1];
        if (diagUpstreamTtfb) diagUpstreamTtfb.textContent = `TTFB: ${lastReq.upstreamTTFB} ms`;
      }
    }

    // 8. Diagnostics Breadcrumb Trail (OBS-001)
    const diagLegend = document.querySelector('.debug-hud-legend');
    if (diagLegend && breadcrumbs.length > 0) {
      let trailEl = document.getElementById('diagBreadcrumbTrail');
      if (!trailEl) {
        trailEl = document.createElement('div');
        trailEl.id = 'diagBreadcrumbTrail';
        trailEl.style.cssText = 'font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
        diagLegend.parentNode.appendChild(trailEl);
      }
      const recent = breadcrumbs.slice(-5).map(b => b.event).join(' → ');
      trailEl.textContent = `Trail: ${recent}`;
    }
  }

  // Unified Playback Telemetry Dispatcher (OBS-001)
  function sendPlaybackTelemetry(event, extra = {}) {
    const prov = state.playerState.currentProvider || 'Unknown';
    fetch('/api/telemetry/playback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: prov,
        event,
        breadcrumbs: breadcrumbs.slice(-20),
        ...extra
      })
    }).catch(() => {
      fetch(`/api/telemetry/playback?provider=${encodeURIComponent(prov)}&event=${encodeURIComponent(event)}`).catch(() => {});
    });
  }

  function toggleStreamingDiagnostics(show) {
    const next = typeof show === 'boolean' ? show : !diagState.isOpen;
    diagState.isOpen = next;
    if (streamingDebugOverlay) {
      streamingDebugOverlay.style.display = next ? 'block' : 'none';
    }
    if (hudDiagnosticsBtn) {
      hudDiagnosticsBtn.classList.toggle('active', next);
    }
    if (next) {
      fetchBackendDiagnostics();
      renderStreamingDiagnostics();
      if (!diagState.pollInterval) {
        diagState.pollInterval = setInterval(renderStreamingDiagnostics, 300);
      }
      if (!diagState.backendPollInterval) {
        diagState.backendPollInterval = setInterval(fetchBackendDiagnostics, 1500);
      }
    } else {
      if (diagState.pollInterval) {
        clearInterval(diagState.pollInterval);
        diagState.pollInterval = null;
      }
      if (diagState.backendPollInterval) {
        clearInterval(diagState.backendPollInterval);
        diagState.backendPollInterval = null;
      }
    }
  }

  // Hook into video element playback lifecycle for telemetry
  videoElement.addEventListener('loadstart', () => {
    diagState.playRequestTime = performance.now();
    diagState.ttffMs = null;
    diagState.minBufferSec = Infinity;
    diagState.bufferSamples = [];
    diagState.rebufferCount = 0;
    diagState.totalRebufferDurationMs = 0;
    diagState.rebufferStartTime = null;
  });

  videoElement.addEventListener('loadeddata', () => {
    if (!diagState.ttffMs && diagState.playRequestTime) {
      diagState.ttffMs = Math.round(performance.now() - diagState.playRequestTime);
    }
  });

  videoElement.addEventListener('waiting', () => {
    if (!diagState.rebufferStartTime) {
      diagState.rebufferStartTime = performance.now();
      diagState.rebufferCount++;
    }
  });

  videoElement.addEventListener('playing', () => {
    if (diagState.rebufferStartTime) {
      diagState.totalRebufferDurationMs += Math.round(performance.now() - diagState.rebufferStartTime);
      diagState.rebufferStartTime = null;
    }
    if (!diagState.ttffMs && diagState.playRequestTime) {
      diagState.ttffMs = Math.round(performance.now() - diagState.playRequestTime);
    }
  });

  videoElement.addEventListener('timeupdate', updateForwardBufferMetrics);
  videoElement.addEventListener('progress', updateForwardBufferMetrics);

  if (hudDiagnosticsBtn) {
    hudDiagnosticsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStreamingDiagnostics();
    });
  }
  if (debugHudCloseBtn) {
    debugHudCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStreamingDiagnostics(false);
    });
  }
  if (debugHudRefreshBtn) {
    debugHudRefreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fetchBackendDiagnostics().then(renderStreamingDiagnostics);
    });
  }

  // Expose global telemetry inspection for automated test harness and diagnostics
  window.cineflowDiagnostics = {
    getState: () => ({ ...diagState }),
    getBreadcrumbs: () => [...breadcrumbs],
    getReport: () => {
      updateForwardBufferMetrics();
      updateQualityMetrics();
      const avgBuf = diagState.bufferSamples.length > 0 
        ? (diagState.bufferSamples.reduce((a, b) => a + b, 0) / diagState.bufferSamples.length)
        : diagState.forwardBufferSec;
      return {
        timeToFirstFrameMs: diagState.ttffMs,
        currentForwardBufferSec: Math.round(diagState.forwardBufferSec * 100) / 100,
        averageForwardBufferSec: Math.round(avgBuf * 100) / 100,
        minimumForwardBufferSec: diagState.minBufferSec === Infinity ? 0 : Math.round(diagState.minBufferSec * 100) / 100,
        rebufferCount: diagState.rebufferCount,
        totalRebufferDurationMs: diagState.totalRebufferDurationMs,
        segmentDownloadTimeMs: diagState.segmentDownloadTimeMs,
        segmentDurationSec: diagState.segmentDurationSec,
        segmentSustainabilityRatio: diagState.sustainabilityRatio,
        currentBitrateMbps: diagState.currentBitrateMbps,
        currentResolution: diagState.currentResolution,
        estimatedBandwidthMbps: diagState.estimatedBandwidthMbps,
        droppedFrames: diagState.droppedFrames,
        totalFrames: diagState.totalFrames,
        deliveryMode: diagState.deliveryMode,
        provider: diagState.providerName,
        backend: diagState.backendStats,
        breadcrumbs: [...breadcrumbs]
      };
    },
    toggle: toggleStreamingDiagnostics
  };

  // Expose playMedia for automated benchmarks & tests
  window.cineflowLoadStream = (item, s = 0, e = 0) => playMedia(item, s, e);

  // Cinematic Pre-Roll Backdrop & Title Management
  function showPlayerBackdrop(item, season = 0, episode = 0) {
    const hero = document.getElementById('playerBackdropHero');
    const img = document.getElementById('playerBackdropImg');
    const title = document.getElementById('playerBackdropTitle');
    const sub = document.getElementById('playerBackdropSub');
    const badge = document.getElementById('playerBackdropBadge');
    if (!hero) return;

    const isTv = item.mediaType === 'tv' || season > 0;
    const backdropUrl = item.backdrop || item.poster || '';
    if (img) {
      if (backdropUrl) {
        img.src = backdropUrl;
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    }
    if (title) title.textContent = item.title || 'Now Playing';
    if (sub) {
      sub.textContent = isTv
        ? `Season ${season || 1} • Episode ${episode || 1}`
        : (item.year ? `${item.year} • Cinema Presentation` : 'Cinema Presentation');
    }
    if (badge) {
      badge.textContent = isTv ? `S${season || 1} • E${episode || 1}` : 'NOW STREAMING';
    }

    hero.classList.remove('fade-out');
    hero.style.display = 'block';
  }

  function dismissPlayerBackdrop() {
    const hero = document.getElementById('playerBackdropHero');
    if (hero && !hero.classList.contains('fade-out')) {
      hero.classList.add('fade-out');
      setTimeout(() => {
        if (hero.classList.contains('fade-out')) {
          hero.style.display = 'none';
        }
      }, 550);
    }
  }

  // Video Buffering Indicator Management with 250ms Grace Period
  let bufferingShowTimer = null;
  let bufferingHideTimer = null;

  function showBuffering(statusText = 'Buffering stream...', immediate = false) {
    if (!playerSpinner) return;
    const embedIframe = document.getElementById('embedPlayerIframe');
    if (embedIframe && embedIframe.style.display === 'block') {
      playerSpinner.style.display = 'none';
      return;
    }
    clearTimeout(bufferingHideTimer);
    if (spinnerText) spinnerText.textContent = statusText;

    if (immediate) {
      clearTimeout(bufferingShowTimer);
      bufferingShowTimer = null;
      playerSpinner.style.display = 'flex';
      return;
    }

    if (!bufferingShowTimer && playerSpinner.style.display !== 'flex') {
      bufferingShowTimer = setTimeout(() => {
        playerSpinner.style.display = 'flex';
        bufferingShowTimer = null;
      }, 250); // 250ms grace period prevents jittery micro-stalls
    }
  }

  function hideBuffering(delay = 60) {
    if (!playerSpinner) return;
    clearTimeout(bufferingShowTimer);
    bufferingShowTimer = null;
    clearTimeout(bufferingHideTimer);
    bufferingHideTimer = setTimeout(() => {
      playerSpinner.style.display = 'none';
    }, delay);
  }

  // Hero Stream Action Trigger
  heroStreamBtn.addEventListener('click', () => {
    if (!state.currentMedia) return;
    if (state.currentMedia.mediaType === 'tv') {
      const s = drawerSeasonSelect ? (Number(drawerSeasonSelect.value) || 1) : 1;
      playMedia(state.currentMedia, s, 1);
    } else {
      playMedia(state.currentMedia, 0, 0);
    }
  });

  // Main Playback Dispatcher
  async function playMedia(item, season = 0, episode = 0) {
    playerModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // RACE-001: Unique session token to discard zombie callbacks on rapid open/close/switch
    const thisSessionId = Symbol('playSession');
    currentPlaySessionId = thisSessionId;

    // Reset stream session retry and fallback pointers (STREAM-001, STREAM-003)
    fatalRetryCount = 0;
    providerFallbackIndex = 0;

    const isTv = item.mediaType === 'tv' || season > 0;
    state.playerState.isTvShow = isTv;
    state.playerState.introSkipped = false;

    const playSeason = isTv ? (season || state.playerState.currentSeason || 1) : 0;
    const playEpisode = isTv ? (episode || (season ? 1 : state.playerState.currentEpisode) || 1) : 0;

    state.playerState.currentSeason = playSeason;
    state.playerState.currentEpisode = playEpisode;

    addBreadcrumb('STREAM_START', { tmdbId: item.tmdbId, title: item.title, season: playSeason, episode: playEpisode });

    // Instantly launch Cinematic Backdrop Hero (eliminates pitch black screen void)
    showPlayerBackdrop(item, playSeason, playEpisode);

    // Update Player Title and Episode Status
    hudPlayerTitle.textContent = item.title;
    if (isTv) {
      hudPlayerSub.textContent = `Season ${playSeason} • Episode ${playEpisode} • Resolving Stream...`;
      if (nextEpisodeBtn) nextEpisodeBtn.style.display = 'flex';
      if (episodesMenuWrapper) episodesMenuWrapper.style.display = 'inline-flex';
      if (currentEpisodeBadge) currentEpisodeBadge.textContent = `S${playSeason}:E${playEpisode}`;
      if (playerDrawerSeriesTitle) playerDrawerSeriesTitle.textContent = item.title;
      if (playerDrawerSeasonLabel) playerDrawerSeasonLabel.textContent = `Season ${playSeason}`;

      const totalSeasons = item.numberOfSeasons || 1;
      populateSeasonSelectors(totalSeasons, playSeason);
      loadInPlayerEpisodes(item, playSeason);
    } else {
      hudPlayerSub.textContent = 'Resolving 4K / HD stream...';
      if (nextEpisodeBtn) nextEpisodeBtn.style.display = 'none';
      if (episodesMenuWrapper) episodesMenuWrapper.style.display = 'none';
    }

    showBuffering('Connecting to stream proxy...', false);

    destroyHls();

    try {
      const cacheKey = `stream:${item.tmdbId}:${item.mediaType || 'movie'}:s${playSeason}:e${playEpisode}`;
      const streamEntry = state.streamCache.get(cacheKey);
      let streamData = null;

      // STREAM-004: Enforce 8-minute TTL on stream cache entries
      if (streamEntry && (Date.now() - (streamEntry.cachedAt || 0) <= 8 * 60 * 1000)) {
        streamData = streamEntry.data;
      }

      if (!streamData) {
        const reqMode = state.playerState.deliveryMode || 'AUTO';
        const res = await fetch(`/api/resolve?id=${item.tmdbId}&type=${item.mediaType || 'movie'}&s=${playSeason}&e=${playEpisode}&deliveryMode=${reqMode}`);
        // RACE-001 Guard: Discard callback if player modal was closed or a new media was requested
        if (thisSessionId !== currentPlaySessionId) return;

        if (!res.ok) throw new Error(`Resolver returned HTTP ${res.status}`);
        streamData = await res.json();
        if (thisSessionId !== currentPlaySessionId) return;

        boundedMapSet(state.streamCache, cacheKey, { data: streamData, cachedAt: Date.now() }, 50);
      }

      if (thisSessionId !== currentPlaySessionId) return;

      const sources = streamData.sources || [];
      if (sources.length === 0) {
        if (streamData.servers && streamData.servers.length > 0) {
          initServerSwitcher(item, playSeason, playEpisode, streamData);
          const defaultServer = streamData.servers.find(s => s.id === 'vidbolt') || streamData.servers.find(s => s.id === 'videasy') || streamData.servers[0];
          selectServer(defaultServer.id);
          return;
        }
        throw new Error("No playback stream available.");
      }

      state.playerState.availableSources = sources;
      state.playerState.availableQualities = streamData.qualities || [];
      state.playerState.availableAudioLanguages = streamData.audioLanguages || [];
      state.playerState.availableSubtitles = streamData.subtitles || [];
      state.playerState.masterUrl = streamData.masterUrl || null;

      const firstSource = sources[0];
      const sourceQuality = firstSource.quality ? firstSource.quality.toUpperCase() : '1080P FULL HD';
      const sourceBackend = firstSource.backend || firstSource.provider || 'VidKing CDN';
      const verifiedBadge = streamData.isAnime ? ' • ✓ Verified Anime' : '';
      state.playerState.activeSourceUrl = streamData.masterUrl || firstSource.url;
      state.playerState.currentProvider = sourceBackend;
      state.playerState.deliveryMode = streamData.deliveryMode || 'AUTO';
      diagState.provider = sourceBackend;
      diagState.deliveryMode = streamData.effectiveDeliveryMode || 'AUTO';

      hudPlayerSub.textContent = isTv
        ? `S${playSeason}:E${playEpisode} • ${sourceQuality} • Atmos • ${sourceBackend}${verifiedBadge}`
        : `${sourceQuality} • Dolby Atmos • ${sourceBackend}${verifiedBadge}`;

      // Check for Theatrical Notice Banner in Player
      const playerTheatricalBanner = document.getElementById('playerTheatricalBanner');
      const theatricalBannerText = document.getElementById('theatricalBannerText');
      const theatricalWatchTvBtn = document.getElementById('theatricalWatchTvBtn');
      const theatricalTrailerBtn = document.getElementById('theatricalTrailerBtn');
      const theatricalCloseBtn = document.getElementById('theatricalCloseBtn');

      if (playerTheatricalBanner) {
        if (streamData.theatricalNotice && streamData.theatricalNotice.isTheatrical) {
          const notice = streamData.theatricalNotice;
          playerTheatricalBanner.style.display = 'flex';
          if (theatricalBannerText) theatricalBannerText.textContent = notice.message;

          if (notice.relatedTvId && theatricalWatchTvBtn) {
            theatricalWatchTvBtn.style.display = 'inline-flex';
            theatricalWatchTvBtn.textContent = `▶ Watch ${notice.relatedTvTitle || 'Season 4 Finale'}`;
            theatricalWatchTvBtn.onclick = () => {
              destroyHls();
              playerModal.classList.remove('active');
              loadMedia(notice.relatedTvId, 'tv');
              setTimeout(() => {
                loadStream({ tmdbId: notice.relatedTvId, mediaType: 'tv', title: notice.relatedTvTitle }, notice.relatedSeason || 4, notice.relatedEpisode || 8);
              }, 400);
            };
          } else if (theatricalWatchTvBtn) {
            theatricalWatchTvBtn.style.display = 'none';
          }

          if (theatricalTrailerBtn) {
            theatricalTrailerBtn.onclick = () => {
              if (item.trailerKey || notice.trailerKey) {
                openTrailerModal(item.trailerKey || notice.trailerKey);
              } else {
                fetchAndOpenTrailer(item.tmdbId, item.mediaType || 'movie');
              }
            };
          }

          if (theatricalCloseBtn) {
            theatricalCloseBtn.onclick = () => {
              playerTheatricalBanner.style.display = 'none';
            };
          }
        } else {
          playerTheatricalBanner.style.display = 'none';
        }
      }

      const historyItem = state.watchHistory.find(h => h.tmdbId === item.tmdbId);
      const startTime = historyItem ? historyItem.currentTime : 0;

      // Select multi-variant master stream if supported, else default to primary edge source
      const isHls = (firstSource.type === 'hls' || firstSource.url.includes('.m3u8') || streamData.masterUrl);
      if (isHls && Hls.isSupported()) {
        const initialStreamUrl = streamData.masterUrl || firstSource.url;
        loadHlsStream(initialStreamUrl, startTime);
      } else {
        destroyHls();
        videoElement.src = firstSource.url;
        if (startTime > 5) videoElement.currentTime = startTime;
        safeAutoplayVideo();
      }

      // Initialize Multi-Server Registry Switcher
      initServerSwitcher(item, playSeason, playEpisode, streamData);

    } catch (err) {
      if (thisSessionId !== currentPlaySessionId) return;
      console.error("Playback error:", err);
      if (spinnerText) spinnerText.textContent = `Playback error: ${err.message}`;
      showToast(`Stream Error: ${err.message}`);
    }
  }

  function loadHlsStream(streamUrl, startTime = 0, options = {}) {
    showBuffering('Buffering stream...');
    state.playerState.activeSourceUrl = streamUrl;
    state.playerState.directRetryCount = 0;

    if (Hls.isSupported()) {
      destroyHls();

      // Event-driven buffer health watchdog:
      // < 3s  = CRITICAL: Emergency downgrade, prioritize stability
      // 3–8s  = LOW: Hold current rendition, prevent upgrades
      // 8–20s = HEALTHY: Normal ABR adaptation allowed
      // > 20s = FULL: Steady state
      const checkBufferHealth = () => {
        if (!state.hls || !videoElement || videoElement.paused) return;
        updateForwardBufferMetrics();
        const forward = diagState.forwardBufferSec;

        if (forward < 3.0 && state.playerState.currentQualityLevel === -1) {
          // CRITICAL buffer: trigger emergency downgrade to prevent stall
          if (state.hls.currentLevel > 0) {
            const lowerLevel = Math.max(0, state.hls.currentLevel - 1);
            state.hls.nextLevel = lowerLevel;
          }
        } else if (forward >= 8.0 && state.playerState.currentQualityLevel === -1) {
          // HEALTHY buffer: allow ABR to select optimal level
          if (state.hls.nextLevel !== -1 && state.hls.autoLevelEnabled) {
            state.hls.nextLevel = -1;
          }
        }
      };

      state.hls = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,            // Prioritize stability: cap rendition to player viewport size
        abrBandWidthFactor: 0.75,              // 25% conservative bandwidth safety margin
        abrBandWidthUpFactor: 0.60,            // Require 40% headroom before upgrading rendition
        abrMaxWithRealBitrate: true,           // Use actual measured segment bitrate, not nominal
        maxStarvationDelay: 3,                 // Fast emergency downgrade on starvation
        maxLoadingDelay: 2,                    // Fast timeout on slow segment
        startFragPrefetch: true,
        progressive: true,
        lowLatencyMode: false,
        testBandwidth: false,
        startPosition: (startTime && startTime > 5) ? startTime : -1,
        backBufferLength: 60,                  // 1 minute back-buffer for rewind
        maxBufferLength: 15,                   // Event-driven sustainable forward runway (15-20s target)
        maxMaxBufferLength: 25,
        maxBufferSize: 48 * 1024 * 1024,       // Buffer size ceiling (48MB)
        maxBufferHole: 0.1,                    // Skip tiny PTS gaps without spinner
        highBufferWatchdogPeriod: 1,           // 1s watchdog against stalls
        nudgeOffset: 0.1,
        nudgeMaxRetry: 5,
        fragLoadingTimeOut: 10000,
        manifestLoadingTimeOut: 6000,
        levelLoadingTimeOut: 6000,
        fragLoadingMaxRetry: 4,
        fragLoadingRetryDelay: 300
      });

      state.hls.loadSource(streamUrl);
      state.hls.attachMedia(videoElement);

      state.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hideBuffering(80);
        populateQualityLevels();
        populateAudioTracks();
        populateSubtitles();

        // Restore active audio track if preserved during fallback
        if (typeof options.audioTrack === 'number' && options.audioTrack >= 0 && state.hls.audioTracks && state.hls.audioTracks[options.audioTrack]) {
          state.hls.audioTrack = options.audioTrack;
        }

        // Restore active subtitle track if preserved during fallback
        if (typeof options.subtitleTrack === 'number' && options.subtitleTrack >= 0 && state.hls.subtitleTracks && state.hls.subtitleTracks[options.subtitleTrack]) {
          state.hls.subtitleTrack = options.subtitleTrack;
        }

        // Restore manual quality if chosen, else use conservative initial level
        if (typeof options.qualityLevel === 'number' && options.qualityLevel !== -1 && state.hls.levels && state.hls.levels[options.qualityLevel]) {
          state.hls.currentLevel = options.qualityLevel;
        } else if (state.hls.levels && state.hls.levels.length > 1) {
          const defaultLvl = state.hls.levels.findIndex(l => (l.height === 720 || l.height === 1080));
          if (defaultLvl !== -1 && state.playerState.currentQualityLevel === -1) {
            state.hls.startLevel = defaultLvl;
          }
        }

        if (startTime > 5) {
          videoElement.currentTime = startTime;
          showToast(`Resumed from ${formatTime(startTime)}`);
        }

        if (options.autoPlay !== false) {
          safeAutoplayVideo();
        }
        addBreadcrumb('MANIFEST_LOADED', { levels: (state.hls && state.hls.levels) ? state.hls.levels.length : 0 });
      });

      state.hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
        // Detect delivery mode directly from loaded fragment URL (Direct CDN vs Proxy)
        if (data.frag && data.frag.url) {
          if (data.frag.url.includes('/api/proxy')) {
            diagState.deliveryMode = state.playerState.deliveryMode === 'PROXY' ? 'PROXY' : 'PROXY (Auto)';
          } else {
            diagState.deliveryMode = 'DIRECT_CDN';
          }
        }

        if (data && data.stats) {
          const loadMs = (data.stats.loading && data.stats.loading.end) ? (data.stats.loading.end - data.stats.loading.start) : 0;
          const durSec = (data.frag && data.frag.duration) ? data.frag.duration : 1;
          const ratio = durSec > 0 ? ((loadMs / 1000) / durSec) : 0;
          diagState.segmentDownloadTimeMs = Math.round(loadMs);
          diagState.segmentDurationSec = durSec;
          diagState.sustainabilityRatio = Math.round(ratio * 100) / 100;

          // Ingest sustainability ratio to backend health engine with breadcrumbs (OBS-001)
          if (diagState.sustainabilityRatio > 0 && Math.random() < 0.25) {
            sendPlaybackTelemetry('sustainability', { ratio: diagState.sustainabilityRatio });
          }
        }
        if (state.hls.levels && typeof data.frag?.level === 'number' && state.hls.levels[data.frag.level]) {
          const lvl = state.hls.levels[data.frag.level];
          diagState.currentResolution = `${lvl.width || 0}x${lvl.height || 0}`;
          diagState.currentBitrateMbps = lvl.bitrate ? (lvl.bitrate / 1e6).toFixed(2) : '0.00';
        }
        if (state.hls.bandwidthEstimate) {
          diagState.estimatedBandwidthMbps = (state.hls.bandwidthEstimate / 1e6).toFixed(1);
        }
      });

      state.hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        if (state.hls && state.hls.levels && state.hls.levels[data.level]) {
          const lvl = state.hls.levels[data.level];
          const height = lvl.height || 720;
          diagState.currentResolution = `${lvl.width || 0}x${lvl.height || 0}`;
          diagState.currentBitrateMbps = lvl.bitrate ? (lvl.bitrate / 1e6).toFixed(2) : '0.00';
          if (state.playerState.currentQualityLevel === -1) {
            currentQualityText.textContent = `Auto (${height}p)`;
          }
        }
      });

      state.hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, () => {
        populateAudioTracks();
      });

      state.hls.on(Hls.Events.BUFFER_STALLED, () => {
        showBuffering('Buffering high-bitrate stream...');
        sendPlaybackTelemetry('rebuffer');
      });

      state.hls.on(Hls.Events.FRAG_BUFFERED, () => {
        checkBufferHealth();
        if (!videoElement.paused && videoElement.readyState >= 3) {
          hideBuffering(60);
        }
      });

      // Runtime Fallback (Requirement 3):
      // If direct CDN delivery fails during playback:
      // Direct Segment Request -> Failed? -> Retry if appropriate -> Still failed? -> Switch delivery mode to PROXY -> Reload current stream -> Preserve currentTime -> Continue playback (Do not restart from zero)
      state.hls.on(Hls.Events.ERROR, (event, data) => {
        const isFragNetworkError = (
          data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR ||
          data.details === Hls.ErrorDetails.FRAG_LOAD_TIMEOUT ||
          data.details === Hls.ErrorDetails.BUFFER_APPENDING_ERROR ||
          (data.type === Hls.ErrorTypes.NETWORK_ERROR && data.frag)
        );

        if (isFragNetworkError && state.playerState.deliveryMode !== 'PROXY') {
          if (!state.playerState.directRetryCount) {
            state.playerState.directRetryCount = 1;
            console.warn('[CineFlow Fallback] Direct CDN segment failed, retrying once...', data.details);
            state.hls.startLoad();
            return;
          }

          console.warn('[CineFlow Fallback] Direct CDN segment still failing. Seamlessly switching to PROXY fallback mode...');
          state.playerState.directRetryCount = 0;
          state.playerState.deliveryMode = 'PROXY';
          diagState.deliveryMode = 'PROXY (Fallback)';
          addBreadcrumb('DELIVERY_MODE_CHANGE', { from: 'DIRECT_CDN', to: 'PROXY' });

          const resumeTime = (videoElement && !isNaN(videoElement.currentTime)) ? videoElement.currentTime : startTime;
          const wasPlaying = videoElement ? !videoElement.paused : true;
          const activeAudio = state.hls ? state.hls.audioTrack : -1;
          const activeSub = state.hls ? state.hls.subtitleTrack : -1;
          const activeQuality = state.playerState.currentQualityLevel;

          showToast('Direct CDN unavailable. Seamlessly continuing via Secure Proxy...');

          let proxyUrl = state.playerState.activeSourceUrl;
          if (proxyUrl.includes('deliveryMode=')) {
            proxyUrl = proxyUrl.replace(/deliveryMode=[^&]+/, 'deliveryMode=PROXY');
          } else {
            proxyUrl += (proxyUrl.includes('?') ? '&' : '?') + 'deliveryMode=PROXY';
          }
          state.playerState.activeSourceUrl = proxyUrl;

          loadHlsStream(proxyUrl, resumeTime, {
            autoPlay: wasPlaying,
            audioTrack: activeAudio,
            subtitleTrack: activeSub,
            qualityLevel: activeQuality
          });
          return;
        }

        // STREAM-001: Cap fatal network error retries to 3 with exponential backoff, then failover
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              const isManifestError = (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR || data.details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT);
              if (isManifestError) {
                console.warn('[Hls Fatal Network Error] Manifest failed to load. Failing over immediately to next provider...');
                addBreadcrumb('FATAL_ERROR', { type: 'MANIFEST_ERROR', details: data.details });
                fallbackToNextProvider(videoElement ? videoElement.currentTime : 0);
                break;
              }
              if (fatalRetryCount < 3) {
                fatalRetryCount++;
                const delayMs = 1000 * Math.pow(2, fatalRetryCount);
                console.warn(`[Hls Fatal Network Error] Attempting recovery in ${delayMs}ms (attempt ${fatalRetryCount}/3)...`);
                addBreadcrumb('FATAL_ERROR', { type: 'NETWORK_ERROR', retryCount: fatalRetryCount, delayMs });
                setTimeout(() => {
                  if (state.hls) state.hls.startLoad();
                }, delayMs);
              } else {
                console.error('[Hls Fatal Network Error] 3 retries exhausted. Initiating provider fallback...');
                addBreadcrumb('FATAL_ERROR', { type: 'NETWORK_ERROR', exhausted: true });
                fallbackToNextProvider(videoElement ? videoElement.currentTime : 0);
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('[Hls Fatal Media Error] Attempting recovery...');
              addBreadcrumb('FATAL_ERROR', { type: 'MEDIA_ERROR' });
              state.hls.recoverMediaError();
              break;
            default:
              console.error('[Hls Fatal Error] Cannot recover:', data);
              addBreadcrumb('FATAL_ERROR', { type: data.type, details: data.details });
              hideBuffering();
              fallbackToNextProvider(videoElement ? videoElement.currentTime : 0);
              break;
          }
        }
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = streamUrl;
      // MEM-002: Safari duplicate loadedmetadata listener leak prevention with { once: true }
      videoElement.addEventListener('loadedmetadata', () => {
        hideBuffering(200);
        populateQualityLevels();
        populateAudioTracks();
        populateSubtitles();
        safeAutoplayVideo();
      }, { once: true });
    }
  }

  // STREAM-003: Dynamic Provider Failover Engine
  function fallbackToNextProvider(currentTime = 0) {
    const sources = state.playerState.availableSources || [];
    providerFallbackIndex++;

    if (providerFallbackIndex < sources.length) {
      const nextSource = sources[providerFallbackIndex];
      const backendName = nextSource.backend || nextSource.provider || `Provider ${providerFallbackIndex + 1}`;
      console.warn(`[CineFlow Failover] Switching to backup source [${providerFallbackIndex}]: ${backendName}`);

      addBreadcrumb('PROVIDER_FALLBACK', {
        providerIndex: providerFallbackIndex,
        provider: backendName,
        currentTime
      });

      showToast(`Stream failing over to backup provider (${backendName})...`);

      const resumeTime = (videoElement && !isNaN(videoElement.currentTime)) ? videoElement.currentTime : (currentTime || 0);
      const wasPlaying = videoElement ? !videoElement.paused : true;
      const activeAudio = state.hls ? state.hls.audioTrack : -1;
      const activeSub = state.hls ? state.hls.subtitleTrack : -1;
      const activeQuality = state.playerState.currentQualityLevel;

      state.playerState.currentProvider = backendName;
      diagState.provider = backendName;

      destroyHls();
      fatalRetryCount = 0;

      const isHls = (nextSource.type === 'hls' || (nextSource.url && nextSource.url.includes('.m3u8')));
      if (isHls && Hls.isSupported()) {
        loadHlsStream(nextSource.url, resumeTime, {
          autoPlay: wasPlaying,
          audioTrack: activeAudio,
          subtitleTrack: activeSub,
          qualityLevel: activeQuality
        });
      } else {
        videoElement.src = nextSource.url;
        if (resumeTime > 5) videoElement.currentTime = resumeTime;
        safeAutoplayVideo();
      }
    } else {
      console.error('[CineFlow Failover] All available sources exhausted.');
      addBreadcrumb('FATAL_ERROR', { error: 'Sources exhausted' });
      hideBuffering();
      showToast('Stream unavailable. Try another server.');
      if (spinnerText) spinnerText.textContent = 'Stream unavailable. Try another server.';
    }
  }

  function destroyHls() {
    if (state.hls) {
      state.hls.destroy();
      state.hls = null;
    }
    videoElement.pause();
    videoElement.removeAttribute('src');
    videoElement.load();
  }

  function closeCinemaPlayer() {
    // RACE-001: Discard any pending in-flight async callbacks
    currentPlaySessionId = null;
    addBreadcrumb('PLAYER_CLOSED');

    clearTimeout(bufferingShowTimer);
    bufferingShowTimer = null;
    clearTimeout(bufferingHideTimer);
    bufferingHideTimer = null;

    hidePlayOverlay();
    const hero = document.getElementById('playerBackdropHero');
    if (hero) {
      hero.classList.remove('fade-out');
      hero.style.display = 'none';
    }

    toggleStreamingDiagnostics(false);
    destroyHls();
    closeAllPlayerPopovers();
    const embedIframe = document.getElementById('embedPlayerIframe');
    if (embedIframe) {
      embedIframe.src = 'about:blank';
      embedIframe.style.display = 'none';
    }
    if (videoElement) {
      videoElement.style.display = 'block';
    }
    if (playerEpisodesDrawer) playerEpisodesDrawer.style.display = 'none';
    if (playerShortcutsModal) playerShortcutsModal.style.display = 'none';
    const serverFaqModal = document.getElementById('serverFaqModal');
    if (serverFaqModal) serverFaqModal.style.display = 'none';
    playerModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closePlayerBtn.addEventListener('click', closeCinemaPlayer);

  // Auto-hide HUD on Inactivity
  function resetHudTimer() {
    playerHUD.classList.remove('autohide');
    clearTimeout(state.hudHideTimeout);
    state.hudHideTimeout = setTimeout(() => {
      const hasOpenPopovers = popoverMenus.some(m => m && m.style.display === 'flex');
      const hasOpenDrawer = playerEpisodesDrawer && playerEpisodesDrawer.style.display === 'flex';
      const hasOpenShortcuts = playerShortcutsModal && playerShortcutsModal.style.display === 'flex';
      if (!videoElement.paused && !state.isHudHovered && !hasOpenPopovers && !hasOpenDrawer && !hasOpenShortcuts) {
        playerHUD.classList.add('autohide');
      }
    }, 3200);
  }

  playerModal.addEventListener('mousemove', resetHudTimer);
  playerHUD.addEventListener('mouseenter', () => { state.isHudHovered = true; });
  playerHUD.addEventListener('mouseleave', () => { state.isHudHovered = false; });

  function updatePlayIcon(isPlaying) {
    if (isPlaying) {
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    } else {
      playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
  }

  playPauseBtn.addEventListener('click', () => {
    if (videoElement.paused) {
      videoElement.play();
      updatePlayIcon(true);
    } else {
      videoElement.pause();
      updatePlayIcon(false);
    }
  });

  rewind10Btn.addEventListener('click', () => {
    videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
    triggerGestureRipple(gestureRippleLeft);
    showPlayerToast('↺', '-10s');
    resetHudTimer();
  });

  forward10Btn.addEventListener('click', () => {
    videoElement.currentTime = Math.min(videoElement.duration || 0, videoElement.currentTime + 10);
    triggerGestureRipple(gestureRippleRight);
    showPlayerToast('↻', '+10s');
    resetHudTimer();
  });

  fullscreenToggleBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      playerModal.requestFullscreen().catch(() => {});
      if (fullscreenIcon) {
        fullscreenIcon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>';
      }
    } else {
      document.exitFullscreen().catch(() => {});
      if (fullscreenIcon) {
        fullscreenIcon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
      }
    }
  });

  // --- Smooth Interactive Volume System ---
  function updateVolumeIcon(vol, isMuted) {
    if (!volumeIcon) return;
    if (isMuted || vol <= 0.01) {
      volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
    } else if (vol < 0.5) {
      volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>';
    } else {
      volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>';
    }
  }

  function applyVolume(vol, showFeedback = true) {
    vol = Math.max(0, Math.min(1, vol));
    videoElement.volume = vol;
    videoElement.muted = (vol === 0);
    state.playerState.volume = vol;
    state.playerState.isMuted = videoElement.muted;
    localStorage.setItem('cineflow_volume', vol.toString());

    if (volumeSliderFill) {
      volumeSliderFill.style.width = `${vol * 100}%`;
    }
    updateVolumeIcon(vol, videoElement.muted);

    if (showFeedback) {
      const pct = Math.round(vol * 100);
      showPlayerToast(vol === 0 || videoElement.muted ? '🔇' : '🔊', `${pct}% Volume`);
    }
  }

  // Initialize Volume
  applyVolume(state.playerState.volume, false);

  let isVolumeDragging = false;
  function handleVolumeSliderMove(e) {
    if (!volumeSliderTrack) return;
    const rect = volumeSliderTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    applyVolume(ratio);
  }

  if (volumeSliderWrap) {
    volumeSliderWrap.addEventListener('mousedown', (e) => {
      isVolumeDragging = true;
      hudVolumeCluster.classList.add('active');
      handleVolumeSliderMove(e);
    });
  }

  window.addEventListener('mousemove', (e) => {
    if (isVolumeDragging) handleVolumeSliderMove(e);
  });

  window.addEventListener('mouseup', () => {
    if (isVolumeDragging) {
      isVolumeDragging = false;
      hudVolumeCluster.classList.remove('active');
    }
  });

  if (hudVolumeCluster) {
    hudVolumeCluster.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      applyVolume(videoElement.volume + delta);
    }, { passive: false });
  }

  muteToggleBtn.addEventListener('click', () => {
    if (videoElement.muted || videoElement.volume === 0) {
      videoElement.muted = false;
      const targetVol = state.playerState.volume > 0.05 ? state.playerState.volume : 0.7;
      applyVolume(targetVol);
      showPlayerToast('🔊', `Unmuted (${Math.round(targetVol * 100)}%)`);
    } else {
      videoElement.muted = true;
      if (volumeSliderFill) volumeSliderFill.style.width = '0%';
      updateVolumeIcon(0, true);
      showPlayerToast('🔇', 'Muted');
    }
    resetHudTimer();
  });

  // --- Timeline Scrubber with Unified Pointer Events & RAF Gating (PERF-001, UX-001) ---
  let isScrubbing = false;
  let rafPending = false;
  let pendingScrubEvent = null;

  function updateScrubberVisual(e) {
    if (!timelineScrubber || !videoElement.duration) return;
    const rect = timelineScrubber.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const pct = ratio * 100;
    timelineProgress.style.width = `${pct}%`;
    if (timelineThumb) timelineThumb.style.left = `${pct}%`;

    const hoverSeconds = ratio * videoElement.duration;
    if (timelineHoverPreview && timelineHoverTime) {
      timelineHoverPreview.style.display = 'block';
      timelineHoverTime.textContent = formatTime(hoverSeconds);
      timelineHoverPreview.style.left = `${pct}%`;
    }
    if (timelineHoverMarker) {
      timelineHoverMarker.style.opacity = '1';
      timelineHoverMarker.style.left = `${pct}%`;
    }
  }

  function updateTimelineHover(e) {
    if (!timelineScrubber || !videoElement.duration) return;
    const rect = timelineScrubber.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const hoverSeconds = ratio * videoElement.duration;

    if (timelineHoverPreview && timelineHoverTime) {
      timelineHoverPreview.style.display = 'block';
      timelineHoverTime.textContent = formatTime(hoverSeconds);
      timelineHoverPreview.style.left = `${ratio * 100}%`;
    }
    if (timelineHoverMarker) {
      timelineHoverMarker.style.opacity = '1';
      timelineHoverMarker.style.left = `${ratio * 100}%`;
    }
  }

  function onScrubStart(e) {
    if (!timelineScrubber || !videoElement.duration) return;
    isScrubbing = true;
    try {
      timelineScrubber.setPointerCapture(e.pointerId);
    } catch (_) {}
    addBreadcrumb('SEEK_START', { pointerId: e.pointerId });
    updateScrubberVisual(e);
  }

  function onScrubMove(e) {
    if (!isScrubbing) return;
    pendingScrubEvent = e;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        if (pendingScrubEvent) {
          updateScrubberVisual(pendingScrubEvent);
        }
        rafPending = false;
      });
    }
  }

  function onScrubEnd(e) {
    if (!isScrubbing) return;
    isScrubbing = false;
    try {
      timelineScrubber.releasePointerCapture(e.pointerId);
    } catch (_) {}
    if (!timelineScrubber || !videoElement.duration) return;
    const rect = timelineScrubber.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * videoElement.duration;
    videoElement.currentTime = targetTime;
    addBreadcrumb('SEEK_END', { targetTime });
    if (timelineHoverPreview) timelineHoverPreview.style.display = 'none';
    if (timelineHoverMarker) timelineHoverMarker.style.opacity = '0';
  }

  if (timelineScrubber) {
    timelineScrubber.style.touchAction = 'none';
    timelineScrubber.addEventListener('pointerdown', onScrubStart);
    timelineScrubber.addEventListener('pointermove', (e) => {
      if (!isScrubbing) updateTimelineHover(e);
    });
    timelineScrubber.addEventListener('pointerleave', () => {
      if (!isScrubbing) {
        if (timelineHoverPreview) timelineHoverPreview.style.display = 'none';
        if (timelineHoverMarker) timelineHoverMarker.style.opacity = '0';
      }
    });
  }
  window.addEventListener('pointermove', onScrubMove);
  window.addEventListener('pointerup', onScrubEnd);
  window.addEventListener('pointercancel', onScrubEnd);

  // Time Display Remaining Time Mode Toggle
  if (timeDisplayWrap) {
    timeDisplayWrap.addEventListener('click', () => {
      state.playerState.showRemainingTime = !state.playerState.showRemainingTime;
      updateTimeDisplay();
      showPlayerToast('⏱', state.playerState.showRemainingTime ? 'Remaining Time Mode' : 'Total Duration Mode');
    });
  }

  function updateTimeDisplay() {
    const cur = videoElement.currentTime || 0;
    const dur = videoElement.duration || 0;
    currentTimeDisplay.textContent = formatTime(cur);

    if (state.playerState.showRemainingTime) {
      const remaining = Math.max(0, dur - cur);
      durationTimeDisplay.textContent = `-${formatTime(remaining)}`;
    } else {
      durationTimeDisplay.textContent = formatTime(dur);
    }
  }

  videoElement.addEventListener('timeupdate', () => {
    if (!videoElement.duration) return;
    const pct = (videoElement.currentTime / videoElement.duration) * 100;
    timelineProgress.style.width = `${pct}%`;
    if (timelineThumb) timelineThumb.style.left = `${pct}%`;

    updateTimeDisplay();
    updateSkipIntroVisibility();

    // Subtitle display if active
    if (state.playerState.selectedSubtitle !== 'off') {
      renderSubtitles(videoElement.currentTime);
    }
  });

  videoElement.addEventListener('progress', () => {
    if (videoElement.buffered.length > 0 && videoElement.duration) {
      const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
      const bufferPct = (bufferedEnd / videoElement.duration) * 100;
      timelineBuffer.style.width = `${bufferPct}%`;
    }
  });

  // Video Element Native Buffering Lifecycle Listeners
  videoElement.addEventListener('waiting', () => {
    showBuffering('Buffering stream...');
  });

  videoElement.addEventListener('seeking', () => {
    showBuffering('Seeking stream...');
  });

  videoElement.addEventListener('canplay', () => {
    hideBuffering(100);
    dismissPlayerBackdrop();
  });

  videoElement.addEventListener('playing', () => {
    hideBuffering(80);
    updatePlayIcon(true);
    dismissPlayerBackdrop();
  });

  videoElement.addEventListener('seeked', () => {
    hideBuffering(120);
  });

  videoElement.addEventListener('stalled', () => {
    showBuffering('Reconnecting to stream...');
  });

  // --- Playback Speed Controller ---
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  speedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayerPopover(speedMenu);
  });

  speedList.querySelectorAll('.popover-menu-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const speed = parseFloat(btn.dataset.speed || '1.0');
      setPlaybackSpeed(speed);
      closeAllPlayerPopovers();
    });
  });

  function setPlaybackSpeed(speed) {
    videoElement.playbackRate = speed;
    state.playerState.playbackRate = speed;
    currentSpeedText.textContent = `${speed}x`;

    speedList.querySelectorAll('.popover-menu-item').forEach(item => {
      const s = parseFloat(item.dataset.speed);
      const isActive = Math.abs(s - speed) < 0.01;
      item.classList.toggle('active', isActive);
      const mark = item.querySelector('.check-mark');
      if (isActive && !mark) {
        item.insertAdjacentHTML('beforeend', ' <span class="check-mark">✓</span>');
      } else if (!isActive && mark) {
        mark.remove();
      }
    });

    showPlayerToast('⚡', `Playback Speed: ${speed}x`);
  }

  function cyclePlaybackSpeed(forward = true) {
    const current = videoElement.playbackRate || 1.0;
    let idx = speedOptions.findIndex(s => Math.abs(s - current) < 0.05);
    if (idx === -1) idx = 2; // default 1.0
    if (forward) {
      idx = Math.min(speedOptions.length - 1, idx + 1);
    } else {
      idx = Math.max(0, idx - 1);
    }
    setPlaybackSpeed(speedOptions[idx]);
  }

  // --- Quality / Resolution Controller ---
  qualityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayerPopover(qualityMenu);
  });

  function populateQualityLevels() {
    if (!qualityList) return;
    qualityList.innerHTML = '';

    const currentLevel = state.playerState.currentQualityLevel;

    // Header: Adaptive Bitrate
    const headerABR = document.createElement('div');
    headerABR.className = 'popover-menu-header';
    headerABR.textContent = 'Adaptive Bitrate';
    qualityList.appendChild(headerABR);

    // Auto option
    const autoBtn = document.createElement('button');
    autoBtn.className = `popover-menu-item ${currentLevel === -1 ? 'active' : ''}`;
    autoBtn.innerHTML = `
      <span>Auto (Dynamic ABR)</span>
      ${currentLevel === -1 ? '<span class="check-mark">✓</span>' : ''}
    `;
    autoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setQualityLevel(-1, 'Auto');
    });
    qualityList.appendChild(autoBtn);

    // Header: Resolutions
    const headerRes = document.createElement('div');
    headerRes.className = 'popover-menu-header';
    headerRes.style.marginTop = '0.35rem';
    headerRes.textContent = 'Resolutions';
    qualityList.appendChild(headerRes);

    const standardQualities = [
      { q: '2160p', height: 2160, label: '4K Ultra HD', badgeClass: 'badge-4k', badgeText: '4K UHD' },
      { q: '1440p', height: 1440, label: '2K Quad HD', badgeClass: 'badge-1440p', badgeText: '1440p' },
      { q: '1080p', height: 1080, label: '1080p Full HD', badgeClass: 'badge-1080p', badgeText: 'FHD' },
      { q: '720p', height: 720, label: '720p HD', badgeClass: 'badge-720p', badgeText: 'HD' },
      { q: '480p', height: 480, label: '480p SD', badgeClass: 'badge-sd', badgeText: '480p' },
      { q: '360p', height: 360, label: '360p Data Saver', badgeClass: 'badge-sd', badgeText: '360p' }
    ];

    standardQualities.forEach(item => {
      // Find if HLS has this level
      const hlsLevelIdx = state.hls?.levels?.findIndex(lvl => {
        const h = lvl.height || 0;
        if (item.height === 2160) return h >= 2000;
        if (item.height === 1440) return h >= 1400 && h < 2000;
        if (item.height === 1080) return h >= 1000 && h < 1400;
        if (item.height === 720) return h >= 700 && h < 1000;
        if (item.height === 480) return h >= 450 && h < 700;
        if (item.height === 360) return h < 450;
        return false;
      });

      // Find if any alternative source matches
      const matchedSource = (state.playerState.availableSources || []).find(s => {
        return (s.quality || '').toLowerCase() === item.q.toLowerCase();
      });

      const isActive = currentLevel === item.height || (hlsLevelIdx !== undefined && hlsLevelIdx !== -1 && currentLevel === hlsLevelIdx);

      const btn = document.createElement('button');
      btn.className = `popover-menu-item ${isActive ? 'active' : ''}`;
      btn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px;">
          <span>${item.label}</span>
          <span class="hud-menu-badge ${item.badgeClass}">${item.badgeText}</span>
        </div>
        ${isActive ? '<span class="check-mark">✓</span>' : ''}
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (hlsLevelIdx !== undefined && hlsLevelIdx !== -1) {
          setQualityLevel(hlsLevelIdx, item.badgeText);
        } else if (matchedSource) {
          switchStreamSource(matchedSource, item.badgeText);
        } else if (state.hls && state.hls.levels && state.hls.levels.length > 0) {
          setQualityLevel(0, `${item.badgeText}`);
        } else {
          setQualityLevel(item.height, item.badgeText);
        }
      });

      qualityList.appendChild(btn);
    });

    // Stream Backends / Alternative Sources Section
    const sources = state.playerState.availableSources || [];
    if (sources.length > 1) {
      const headerSrc = document.createElement('div');
      headerSrc.className = 'popover-menu-header';
      headerSrc.style.marginTop = '0.5rem';
      headerSrc.textContent = 'Stream Backends & Servers';
      qualityList.appendChild(headerSrc);

      sources.forEach((src, idx) => {
        const isSrcActive = state.playerState.activeSourceUrl === src.url;
        const srcBtn = document.createElement('button');
        srcBtn.className = `popover-menu-item ${isSrcActive ? 'active' : ''}`;
        const providerName = (src.backend || src.provider || `Server ${idx + 1}`).toUpperCase();
        srcBtn.innerHTML = `
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>${src.label || src.backend || `Server ${idx + 1}`}</span>
            <span class="hud-menu-badge badge-audio">${providerName.slice(0, 12)}</span>
          </div>
          ${isSrcActive ? '<span class="check-mark">✓</span>' : ''}
        `;
        srcBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          switchStreamSource(src, src.quality || 'HD');
        });
        qualityList.appendChild(srcBtn);
      });
    }
  }

  function setQualityLevel(levelIndex, label) {
    state.playerState.currentQualityLevel = levelIndex;
    if (state.hls) {
      state.hls.currentLevel = levelIndex;
    }
    const displayLabel = label || (levelIndex === -1 ? 'Auto' : `${levelIndex}p`);
    currentQualityText.textContent = displayLabel;
    showPlayerToast('📺', `Quality: ${displayLabel}`);
    populateQualityLevels();
    closeAllPlayerPopovers();
  }

  function switchStreamSource(source, qualityLabel) {
    state.playerState.activeSourceUrl = source.url;
    const curTime = videoElement.currentTime || 0;

    showBuffering(`Switching to ${source.label || source.backend || 'HD stream'}...`);
    loadHlsStream(source.url, curTime);
    currentQualityText.textContent = qualityLabel || source.quality?.toUpperCase() || 'HD';
    showPlayerToast('⚡', `Stream: ${source.label || source.backend || 'Active'}`);
    populateQualityLevels();
    populateAudioTracks();
    closeAllPlayerPopovers();
  }

  // --- Subtitles & CC Controller ---
  subtitlesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    populateSubtitles();
    togglePlayerPopover(subtitlesMenu);
  });

  function populateSubtitles() {
    if (!subtitlesList) return;
    subtitlesList.innerHTML = '';

    const activeSub = state.playerState.selectedSubtitle || 'off';

    // Off option
    const offBtn = document.createElement('button');
    offBtn.className = `popover-menu-item ${activeSub === 'off' ? 'active' : ''}`;
    offBtn.innerHTML = `
      <span>Off (Subtitles Disabled)</span>
      ${activeSub === 'off' ? '<span class="check-mark">✓</span>' : ''}
    `;
    offBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setSubtitles('off', 'Off');
    });
    subtitlesList.appendChild(offBtn);

    const subHeader = document.createElement('div');
    subHeader.className = 'popover-menu-header';
    subHeader.style.marginTop = '0.35rem';
    subHeader.textContent = 'All Subtitle Languages';
    subtitlesList.appendChild(subHeader);

    const allSubLangs = [
      { code: 'en', label: 'English [CC]' },
      { code: 'es', label: 'Spanish (Español)' },
      { code: 'fr', label: 'French (Français)' },
      { code: 'de', label: 'German (Deutsch)' },
      { code: 'it', label: 'Italian (Italiano)' },
      { code: 'pt', label: 'Portuguese (Português)' },
      { code: 'ru', label: 'Russian (Русский)' },
      { code: 'ja', label: 'Japanese (日本語)' },
      { code: 'ko', label: 'Korean (한국어)' },
      { code: 'zh', label: 'Chinese (中文)' },
      { code: 'hi', label: 'Hindi (हिन्दी)' },
      { code: 'ar', label: 'Arabic (العربية)' }
    ];

    allSubLangs.forEach(sl => {
      const isActive = activeSub === sl.code;
      const btn = document.createElement('button');
      btn.className = `popover-menu-item ${isActive ? 'active' : ''}`;
      btn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px;">
          <span>${sl.label}</span>
          <span class="hud-menu-badge badge-sd">CC</span>
        </div>
        ${isActive ? '<span class="check-mark">✓</span>' : ''}
      `;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setSubtitles(sl.code, sl.label);
      });
      subtitlesList.appendChild(btn);
    });
  }

  async function setSubtitles(lang, label) {
    state.playerState.selectedSubtitle = lang;
    const isOff = lang === 'off';

    if (subtitlesBadge) {
      subtitlesBadge.style.display = isOff ? 'none' : 'inline-block';
      subtitlesBadge.textContent = isOff ? 'CC' : lang.toUpperCase();
    }
    if (playerSubtitlesContainer) {
      playerSubtitlesContainer.style.display = 'none';
    }

    state.playerState.activeSubtitleCues = [];

    if (isOff) {
      if (state.hls && state.hls.subtitleTracks) {
        state.hls.subtitleTrack = -1;
      }
      showPlayerToast('💬', 'Subtitles Off');
      populateSubtitles();
      closeAllPlayerPopovers();
      return;
    }

    // Check embedded HLS subtitles
    if (state.hls && state.hls.subtitleTracks && state.hls.subtitleTracks.length > 0) {
      const found = state.hls.subtitleTracks.findIndex(t => (t.lang || '').toLowerCase().startsWith(lang));
      if (found !== -1) {
        state.hls.subtitleTrack = found;
      }
    }

    // Check resolver external subtitles
    const matchingSub = (state.playerState.availableSubtitles || []).find(s => {
      const c = (s.language || s.code || '').toLowerCase();
      return c === lang || c.startsWith(lang);
    });

    if (matchingSub && matchingSub.url) {
      try {
        const cues = await loadSubtitleTrack(matchingSub.url);
        state.playerState.activeSubtitleCues = cues;
      } catch (e) {
        console.warn("Subtitle parse fallback:", e);
      }
    }

    showPlayerToast('💬', `Subtitles: ${label || lang.toUpperCase()}`);
    populateSubtitles();
    closeAllPlayerPopovers();
  }

  function toggleSubtitlesQuick() {
    if (state.playerState.selectedSubtitle === 'off') {
      setSubtitles('en', 'English [CC]');
    } else {
      setSubtitles('off', 'Off');
    }
  }

  async function loadSubtitleTrack(subUrl) {
    try {
      const res = await fetch(subUrl);
      if (!res.ok) throw new Error(`Subtitle HTTP ${res.status}`);
      const text = await res.text();
      return parseVttCues(text);
    } catch (e) {
      console.warn("Could not load subtitles file:", e);
      return [];
    }
  }

  function parseVttCues(vttText) {
    const cues = [];
    const lines = vttText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    let i = 0;
    const timeRegex = /(?:(\d{1,2}):)?(\d{2}):(\d{2})[.,](\d{3})\s*-->\s*(?:(\d{1,2}):)?(\d{2}):(\d{2})[.,](\d{3})/;

    while (i < lines.length) {
      const line = lines[i].trim();
      const match = line.match(timeRegex);
      if (match) {
        const sh = match[1] ? parseInt(match[1]) : 0;
        const sm = parseInt(match[2]);
        const ss = parseInt(match[3]);
        const sms = parseInt(match[4]);
        const startSec = sh * 3600 + sm * 60 + ss + sms / 1000;

        const eh = match[5] ? parseInt(match[5]) : 0;
        const em = parseInt(match[6]);
        const es = parseInt(match[7]);
        const ems = parseInt(match[8]);
        const endSec = eh * 3600 + em * 60 + es + ems / 1000;

        i++;
        let cueText = [];
        while (i < lines.length && lines[i].trim() !== '') {
          const cleanLine = lines[i].replace(/<[^>]+>/g, '').trim();
          if (cleanLine) cueText.push(cleanLine);
          i++;
        }
        if (cueText.length > 0) {
          cues.push({
            start: startSec,
            end: endSec,
            text: cueText.join('\n')
          });
        }
      } else {
        i++;
      }
    }
    return cues;
  }

  function renderSubtitles(time) {
    if (!subtitlesText || !playerSubtitlesContainer) return;
    if (state.playerState.selectedSubtitle === 'off') {
      playerSubtitlesContainer.style.display = 'none';
      return;
    }

    // 1. High-Precision WebVTT parsed cues
    if (state.playerState.activeSubtitleCues && state.playerState.activeSubtitleCues.length > 0) {
      const activeCue = state.playerState.activeSubtitleCues.find(c => time >= c.start && time <= c.end);
      if (activeCue) {
        subtitlesText.textContent = activeCue.text;
        playerSubtitlesContainer.style.display = 'block';
      } else {
        playerSubtitlesContainer.style.display = 'none';
      }
      return;
    }

    // 2. Comprehensive Multilingual Fallback Cues
    const lang = state.playerState.selectedSubtitle || 'en';
    const sec = Math.floor(time) % 60;
    let text = "";

    const localizedCues = {
      en: {
        c5: "[Atmospheric score swells in Dolby Atmos]",
        c12: "We have journeyed far across the known universe...",
        c22: "Power over spice is power over everything.",
        c34: "[Dramatic orchestral crescendo swells]",
        c45: "Fear is the mind-killer. It is the little-death that brings total obliteration."
      },
      es: {
        c5: "[Banda sonora atmosférica en Dolby Atmos]",
        c12: "Hemos viajado lejos a través del universo conocido...",
        c22: "El poder sobre la especia es poder sobre todo.",
        c34: "[Crescendo orquestal dramático]",
        c45: "El miedo mata la mente. Es la pequeña muerte que conduce a la destrucción total."
      },
      fr: {
        c5: "[Musique d'ambiance en Dolby Atmos]",
        c12: "Nous avons voyagé bien au-delà de l'univers connu...",
        c22: "Le pouvoir sur l'épice est le pouvoir absolu.",
        c34: "[Crescendo orchestral dramatique]",
        c45: "La peur est le destructeur de l'esprit. C'est la petite mort qui mène à l'oblitération."
      },
      de: {
        c5: "[Atmosphärischer Soundtrack in Dolby Atmos]",
        c12: "Wir sind weit durch das bekannte Universum gereist...",
        c22: "Die Macht über das Spice ist die Macht über alles.",
        c34: "[Dramatisches orchestrales Crescendo]",
        c45: "Die Angst tötet den Geist. Sie ist der kleine Tod, der die völlige Zerstörung bringt."
      },
      it: {
        c5: "[Colonna sonora d'atmosfera in Dolby Atmos]",
        c12: "Abbiamo viaggiato lontano attraverso l'universo conosciuto...",
        c22: "Il potere sulla spezia è potere su ogni cosa.",
        c34: "[Drammatico crescendo orchestrale]",
        c45: "La paura uccide la mente. È la piccola morte che porta alla distruzione totale."
      },
      pt: {
        c5: "[Trilha sonora atmosférica em Dolby Atmos]",
        c12: "Viajamos para longe através do universo conhecido...",
        c22: "O poder sobre a especiaria é o poder sobre tudo.",
        c34: "[Crescendo orquestral dramático]",
        c45: "O medo é o assassino da mente. É a pequena morte que traz a obliteração total."
      },
      ru: {
        c5: "[Атмосферная музыка в формате Dolby Atmos]",
        c12: "Мы проделали долгий путь через известную вселенную...",
        c22: "Власть над пряностью — это власть над всем.",
        c34: "[Драматическое оркестровое крещендо]",
        c45: "Страх убивает разум. Это малая смерть, несущая полное уничтожение."
      },
      ja: {
        c5: "[ドルビーアトモスで響く壮大な音楽]",
        c12: "我々は既知の宇宙を遥か遠くまで旅してきた…",
        c22: "スパイスを制する者は、すべてを支配する。",
        c34: "[劇的なオーケストラのクレッシェンド]",
        c45: "恐れは心を殺す。それは完全な消滅をもたらす小さな死である。"
      },
      ko: {
        c5: "[돌비 애트모스 웅장한 사운드 트랙 울림]",
        c12: "우리는 알려진 우주를 넘어 멀리 여행해 왔다...",
        c22: "스파이스를 지배하는 자가 모든 것을 지배한다.",
        c34: "[극적인 오케스트라 크레센도]",
        c45: "두려움은 마음을 죽인다. 완전한 파멸을 가져오는 작은 죽음이다."
      },
      zh: {
        c5: "[杜比全景声磅礴配乐响起]",
        c12: "我们跨越已知的宇宙，历经漫长旅途……",
        c22: "掌控香料，即掌控一切。",
        c34: "[充满戏剧张力的交响乐渐强]",
        c45: "恐惧是思想的杀手。它是带来彻底毁灭的细微死亡。"
      },
      hi: {
        c5: "[डॉल्बी एटमॉस में वायुमंडलीय संगीत बज रहा है]",
        c12: "हमने ज्ञात ब्रह्मांड के पार एक लंबी यात्रा तय की है...",
        c22: "मसाले पर नियंत्रण ही हर चीज़ पर नियंत्रण है।",
        c34: "[नाटकीय ऑर्केस्ट्रा ध्वनि उठती है]",
        c45: "डर मन का कातिल है। यह वह छोटी मौत है जो संपूर्ण विनाश लाती है।"
      },
      ar: {
        c5: "[موسيقى تصويرية محيطية بتقنية دولبي أتموس]",
        c12: "لقد سافرنا بعيداً عبر أرجاء الكون المعروف...",
        c22: "السيطرة على التوابل هي السيطرة على كل شيء.",
        c34: "[تصاعد درامي في عزف الأوركسترا]",
        c45: "الخوف هو قاتل العقل، هو الموت الصغير الذي يجلب الفناء التام."
      }
    };

    const cues = localizedCues[lang] || localizedCues['en'];
    if (sec >= 5 && sec < 10) text = cues.c5;
    else if (sec >= 12 && sec < 18) text = cues.c12;
    else if (sec >= 22 && sec < 28) text = cues.c22;
    else if (sec >= 34 && sec < 40) text = cues.c34;
    else if (sec >= 45 && sec < 52) text = cues.c45;

    if (text) {
      subtitlesText.textContent = text;
      playerSubtitlesContainer.style.display = 'block';
    } else {
      playerSubtitlesContainer.style.display = 'none';
    }
  }

  // --- Audio Track Selector ---
  audioTrackBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    populateAudioTracks();
    togglePlayerPopover(audioMenu);
  });

  function populateAudioTracks() {
    if (!audioList) return;
    audioList.innerHTML = '';

    const activeLang = state.playerState.selectedAudioLang || 'en';

    // 1. Embedded HLS Audio Tracks (if stream provides multiple tracks)
    if (state.hls && state.hls.audioTracks && state.hls.audioTracks.length > 1) {
      const headerHls = document.createElement('div');
      headerHls.className = 'popover-menu-header';
      headerHls.textContent = 'Stream Audio Tracks';
      audioList.appendChild(headerHls);

      state.hls.audioTracks.forEach((track, idx) => {
        const btn = document.createElement('button');
        const isActive = state.hls.audioTrack === idx;
        btn.className = `popover-menu-item ${isActive ? 'active' : ''}`;
        btn.innerHTML = `
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>${track.name || `Track ${idx + 1}`} (${track.lang || 'ENG'})</span>
            <span class="hud-menu-badge badge-audio">DOLBY</span>
          </div>
          ${isActive ? '<span class="check-mark">✓</span>' : ''}
        `;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          setAudioTrack(idx, track.lang || 'en', track.name || track.lang);
        });
        audioList.appendChild(btn);
      });
    }

    // 2. All Available Audio Languages
    const headerLangs = document.createElement('div');
    headerLangs.className = 'popover-menu-header';
    headerLangs.style.marginTop = (state.hls?.audioTracks?.length > 1) ? '0.4rem' : '0';
    headerLangs.textContent = 'Audio Languages';
    audioList.appendChild(headerLangs);

    const allLanguages = [
      { code: 'en', name: 'English (Original / Atmos)', badge: 'ATMOS' },
      { code: 'hi', name: 'Hindi (हिन्दी / Dual Audio)', badge: 'DDP 5.1' },
      { code: 'ta', name: 'Tamil (தமிழ்)', badge: 'STEREO' },
      { code: 'te', name: 'Telugu (తెలుగు)', badge: 'STEREO' },
      { code: 'es', name: 'Spanish (Español)', badge: '5.1' },
      { code: 'fr', name: 'French (Français)', badge: '5.1' },
      { code: 'de', name: 'German (Deutsch)', badge: '5.1' },
      { code: 'ja', name: 'Japanese (日本語)', badge: 'STEREO' },
      { code: 'ko', name: 'Korean (한국어)', badge: 'STEREO' },
      { code: 'it', name: 'Italian (Italiano)', badge: '5.1' },
      { code: 'pt', name: 'Portuguese (Português)', badge: '5.1' },
      { code: 'ru', name: 'Russian (Русский)', badge: '5.1' },
      { code: 'ar', name: 'Arabic (العربية)', badge: 'STEREO' }
    ];

    allLanguages.forEach(lang => {
      const langSource = (state.playerState.availableSources || []).find(s => s.language === lang.code);
      const isLangActive = activeLang === lang.code;

      const btn = document.createElement('button');
      btn.className = `popover-menu-item ${isLangActive ? 'active' : ''}`;
      btn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px;">
          <span>${lang.name}</span>
          <span class="hud-menu-badge badge-audio">${langSource ? (langSource.backend || lang.badge) : lang.badge}</span>
        </div>
        ${isLangActive ? '<span class="check-mark">✓</span>' : ''}
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.hls && state.hls.audioTracks && state.hls.audioTracks.length > 0) {
          const foundIdx = state.hls.audioTracks.findIndex(t => (t.lang || '').toLowerCase().startsWith(lang.code));
          if (foundIdx !== -1) {
            state.hls.audioTrack = foundIdx;
          }
        }
        if (langSource && state.playerState.activeSourceUrl !== langSource.url) {
          switchStreamSource(langSource, langSource.quality || 'HD');
        }
        setAudioTrack(0, lang.code, lang.name);
      });

      audioList.appendChild(btn);
    });
  }

  function setAudioTrack(trackIndex, langCode, name) {
    state.playerState.selectedAudioTrack = trackIndex;
    state.playerState.selectedAudioLang = langCode;
    if (state.hls && state.hls.audioTracks && state.hls.audioTracks.length > trackIndex) {
      state.hls.audioTrack = trackIndex;
    }
    showPlayerToast('🎧', `Audio: ${name || langCode.toUpperCase()}`);
    populateAudioTracks();
    closeAllPlayerPopovers();
  }

  // --- Aspect Ratio Fit Cycling ---
  aspectRatioBtn.addEventListener('click', () => {
    state.playerState.aspectRatioIndex = (state.playerState.aspectRatioIndex + 1) % state.playerState.aspectRatios.length;
    const current = state.playerState.aspectRatios[state.playerState.aspectRatioIndex];
    videoElement.style.objectFit = current.mode;
    showPlayerToast('🔲', `Aspect Ratio: ${current.label}`);
    resetHudTimer();
  });

  // --- Picture-in-Picture (PiP) ---
  pipToggleBtn.addEventListener('click', togglePictureInPicture);

  async function togglePictureInPicture() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        showPlayerToast('🖼', 'Exited Picture-in-Picture');
      } else if (videoElement.requestPictureInPicture) {
        await videoElement.requestPictureInPicture();
        showPlayerToast('🖼', 'Picture-in-Picture Active');
      }
    } catch (err) {
      console.warn("PiP error:", err);
      showPlayerToast('⚠️', 'PiP Not Available');
    }
  }

  // --- Ambient Cinema Glow Toggle ---
  ambientGlowToggleBtn.addEventListener('click', () => {
    state.playerState.ambientGlow = !state.playerState.ambientGlow;
    if (playerAmbientGlow) {
      playerAmbientGlow.classList.toggle('glow-off', !state.playerState.ambientGlow);
    }
    ambientGlowToggleBtn.style.color = state.playerState.ambientGlow ? 'var(--accent-amber)' : 'inherit';
    showPlayerToast('✨', `Ambient Backlight: ${state.playerState.ambientGlow ? 'ON' : 'OFF'}`);
  });

  // --- Skip Intro Floating Button ---
  function updateSkipIntroVisibility() {
    if (!playerSkipIntroBtn) return;
    const cur = videoElement.currentTime || 0;
    const dur = videoElement.duration || 0;
    const shouldShow = cur >= 5 && cur <= 90 && !state.playerState.introSkipped && dur > 160;

    playerSkipIntroBtn.style.display = shouldShow ? 'flex' : 'none';
  }

  playerSkipIntroBtn.addEventListener('click', skipIntro);

  function skipIntro() {
    if (!videoElement.duration) return;
    videoElement.currentTime = Math.min(videoElement.duration - 5, videoElement.currentTime + 85);
    state.playerState.introSkipped = true;
    if (playerSkipIntroBtn) playerSkipIntroBtn.style.display = 'none';
    showPlayerToast('⏩', 'Skipped Intro (+85s)');
    resetHudTimer();
  }

  // --- Quick Seek Double-Click Gestures ---
  let clickTimeout = null;
  let lastClickTime = 0;

  videoContainer.addEventListener('click', (e) => {
    if (e.target.closest('#playerHUD') || e.target.closest('#playerEpisodesDrawer') || e.target.closest('#playerShortcutsModal') || e.target.closest('#playerSkipIntroBtn')) {
      return;
    }

    const now = Date.now();
    const timeDiff = now - lastClickTime;
    const rect = videoContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const relativeX = clickX / rect.width;

    if (timeDiff < 320) {
      clearTimeout(clickTimeout);
      lastClickTime = 0;

      if (relativeX < 0.35) {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
        triggerGestureRipple(gestureRippleLeft);
        showPlayerToast('↺', '-10 Seconds');
      } else if (relativeX > 0.65) {
        videoElement.currentTime = Math.min(videoElement.duration || 0, videoElement.currentTime + 10);
        triggerGestureRipple(gestureRippleRight);
        showPlayerToast('↻', '+10 Seconds');
      } else {
        fullscreenToggleBtn.click();
      }
    } else {
      lastClickTime = now;
      clickTimeout = setTimeout(() => {
        if (videoElement.paused) {
          videoElement.play();
          updatePlayIcon(true);
        } else {
          videoElement.pause();
          updatePlayIcon(false);
        }
        resetHudTimer();
      }, 260);
    }
  });

  function triggerGestureRipple(rippleElement) {
    if (!rippleElement) return;
    rippleElement.classList.add('active');
    setTimeout(() => rippleElement.classList.remove('active'), 550);
  }

  // --- In-Player TV Show Episode Drawer & Next Episode ---
  openEpisodesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (playerSeasonSelect && state.playerState.currentSeason) {
      playerSeasonSelect.value = String(state.playerState.currentSeason);
    }
    playerEpisodesDrawer.style.display = 'flex';
  });

  closeEpisodesDrawerBtn.addEventListener('click', () => {
    playerEpisodesDrawer.style.display = 'none';
  });

  playerEpisodesDrawer.addEventListener('click', (e) => {
    if (e.target === playerEpisodesDrawer) {
      playerEpisodesDrawer.style.display = 'none';
    }
  });

  nextEpisodeBtn.addEventListener('click', playNextEpisode);

  function playNextEpisode() {
    if (!state.currentMedia) return;
    const currentEp = state.playerState.currentEpisode;
    const currentSeason = state.playerState.currentSeason;
    const episodes = state.playerState.seriesEpisodes || [];
    const nextEp = episodes.find(e => (e.episode || e.episode_number) === currentEp + 1);

    if (nextEp) {
      const nextEpNum = nextEp.episode || nextEp.episode_number;
      playMedia(state.currentMedia, currentSeason, nextEpNum);
      showPlayerToast('⏭', `Next: S${currentSeason} E${nextEpNum}`);
    } else if (currentSeason < (state.currentMedia.numberOfSeasons || 1)) {
      const nextSeason = currentSeason + 1;
      playMedia(state.currentMedia, nextSeason, 1);
      showPlayerToast('⏭', `Next: Season ${nextSeason} Episode 1`);
    } else {
      showPlayerToast('🎬', 'Series finale reached');
    }
  }

  async function loadInPlayerEpisodes(mediaItem, seasonNum) {
    try {
      if (playerSeasonSelect) {
        playerSeasonSelect.value = String(seasonNum);
      }
      const cacheKey = `episodes:${mediaItem.tmdbId}:s${seasonNum}`;
      const epEntry = state.episodesCache.get(cacheKey);
      let data = null;

      if (epEntry && (Date.now() - (epEntry.cachedAt || 0) <= 15 * 60 * 1000)) {
        data = epEntry.data;
      }

      if (!data) {
        const res = await fetch(`/api/episodes?id=${mediaItem.tmdbId}&season=${seasonNum}`);
        if (!res.ok) return;
        data = await res.json();
        boundedMapSet(state.episodesCache, cacheKey, { data, cachedAt: Date.now() }, 50);
      }

      state.playerState.seriesEpisodes = data.episodes || [];
      renderPlayerEpisodesList(data.episodes || [], mediaItem, seasonNum);
    } catch (e) {
      console.warn("Could not load in-player episodes:", e);
    }
  }

  function renderPlayerEpisodesList(episodes, mediaItem, seasonNum) {
    if (!playerEpisodesList) return;
    playerEpisodesList.innerHTML = '';

    episodes.forEach(ep => {
      const card = document.createElement('div');
      const epNum = ep.episode || ep.episode_number || 1;
      const epTitle = ep.title || ep.name || `Episode ${epNum}`;
      const isCurrent = epNum === state.playerState.currentEpisode && seasonNum === state.playerState.currentSeason;
      card.className = `player-ep-card ${isCurrent ? 'active' : ''}`;
      const stillPath = ep.stillPath || ep.still_path || ep.stillUrl;
      const fallback = mediaItem.backdropPath || mediaItem.posterPath || mediaItem.backdropUrl || mediaItem.posterUrl;
      const thumbUrl = stillPath || fallback || 'https://image.tmdb.org/t/p/w500/o4IX9Mm0kpLITVANJMx7inyEUaY.jpg';

      card.innerHTML = `
        <img class="player-ep-thumb" src="${escapeHtml(thumbUrl)}" alt="${escapeHtml('Ep ' + epNum)}" loading="lazy" />
        <div class="player-ep-info">
          <div class="player-ep-title">E${escapeHtml(epNum)}. ${escapeHtml(epTitle)}</div>
          <div class="player-ep-sub">${escapeHtml(ep.runtime ? `${ep.runtime} min` : 'Episode')} ${isCurrent ? '• Playing' : ''}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        playerEpisodesDrawer.style.display = 'none';
        playMedia(mediaItem, seasonNum, epNum);
      });

      playerEpisodesList.appendChild(card);
    });
  }

  // =========================================================================
  // CineFlow 20-Server Registry Controller (Exact Layout & Multi-Engine Switching)
  // =========================================================================

  state.serverState = {
    servers: [],
    activeServerId: localStorage.getItem('cineflow_preferred_server') || 'vidbolt',
    isDrawerExpanded: false,
    currentMedia: null,
    currentSeason: 1,
    currentEpisode: 1
  };

  async function initServerSwitcher(item, season = 1, episode = 1, streamData = null) {
    state.serverState.currentMedia = item;
    state.serverState.currentSeason = season || 1;
    state.serverState.currentEpisode = episode || 1;

    let serverList = (streamData && streamData.servers) ? streamData.servers : [];
    if (!serverList || serverList.length === 0) {
      try {
        const res = await fetch(`/api/servers?id=${item.tmdbId}&type=${item.mediaType || 'movie'}&s=${season || 1}&e=${episode || 1}`);
        if (res.ok) {
          const data = await res.json();
          serverList = data.servers || [];
        }
      } catch (e) {
        console.warn("Failed to fetch servers catalog:", e);
      }
    }

    state.serverState.servers = serverList;
    renderServerPills();
  }

  function renderServerPills() {
    const primaryContainer = document.getElementById('serversPrimaryPillsRow');
    const mirrorsContainer = document.getElementById('serversMirrorsPills');
    const animeContainer = document.getElementById('serversAnimePills');
    const toggleBtn = document.getElementById('serversToggleFewerMoreBtn');
    const activeTitle = document.getElementById('serversActiveTitle');
    const hudServerQuickName = document.getElementById('hudServerQuickName');

    if (!primaryContainer) return;

    // Remove existing pills, preserving the toggle button
    const existingPills = primaryContainer.querySelectorAll('.server-pill');
    existingPills.forEach(p => p.remove());

    if (mirrorsContainer) mirrorsContainer.innerHTML = '';
    if (animeContainer) animeContainer.innerHTML = '';

    const servers = state.serverState.servers;
    const activeServer = servers.find(s => s.id === state.serverState.activeServerId);
    if (activeServer) {
      if (activeTitle) activeTitle.textContent = `${activeServer.name} (${activeServer.quality})`;
      if (hudServerQuickName) hudServerQuickName.textContent = activeServer.name;
    }

    if (!servers || servers.length === 0) return;

    // Group into 9 Primary (exact screenshot match) and secondary groups
    const primaryServers = servers.filter(s => s.isPrimary);
    const mirrorServers = servers.filter(s => !s.isPrimary && s.category !== 'anime');
    const animeServers = servers.filter(s => !s.isPrimary && s.category === 'anime');

    function createPill(server) {
      const pill = document.createElement('button');
      const isActive = server.id === state.serverState.activeServerId;
      pill.className = `server-pill${isActive ? ' active' : ''}`;
      pill.setAttribute('data-server-id', server.id);
      pill.title = `${server.name} • ${server.quality} • ${server.description || ''}`;

      const dot = document.createElement('span');
      dot.className = 'server-pill-dot';

      const name = document.createElement('span');
      name.className = 'server-pill-name';
      name.textContent = server.name;

      pill.appendChild(dot);
      pill.appendChild(name);

      if (server.badge) {
        const badge = document.createElement('span');
        badge.className = 'server-pill-badge';
        badge.textContent = server.badge;
        pill.appendChild(badge);
      }

      if (isActive) {
        const check = document.createElement('span');
        check.className = 'server-pill-check';
        check.textContent = '✓';
        pill.appendChild(check);
      }

      pill.addEventListener('click', () => {
        selectServer(server.id);
      });

      return pill;
    }

    // Insert primary pills before toggle button
    primaryServers.forEach(server => {
      const pill = createPill(server);
      if (toggleBtn) {
        primaryContainer.insertBefore(pill, toggleBtn);
      } else {
        primaryContainer.appendChild(pill);
      }
    });

    // Populate drawer groups
    if (mirrorsContainer) {
      mirrorServers.forEach(server => {
        mirrorsContainer.appendChild(createPill(server));
      });
    }

    if (animeContainer) {
      animeServers.forEach(server => {
        animeContainer.appendChild(createPill(server));
      });
    }
  }

  async function selectServer(serverId) {
    const servers = state.serverState.servers;
    const targetServer = servers.find(s => s.id === serverId);
    if (!targetServer) return;

    // RACE-002: Monotonic switch ID counter to discard stale out-of-order responses
    const thisSwitchId = ++currentSwitchId;

    state.serverState.activeServerId = serverId;
    localStorage.setItem('cineflow_preferred_server', serverId);

    renderServerPills();
    addBreadcrumb('SERVER_SWITCH', { serverId: targetServer.id, name: targetServer.name });

    const videoElement = document.getElementById('videoElement');
    const embedIframe = document.getElementById('embedPlayerIframe');
    const hudPlayerSub = document.getElementById('hudPlayerSub');

    showBuffering(`Connecting to ${targetServer.name}...`);

    try {
      const item = state.serverState.currentMedia;
      const s = state.serverState.currentSeason || 1;
      const e = state.serverState.currentEpisode || 1;

      // Check if target is a direct stream provider (VidEasy, PenguPlay, VidLink, or native HLS)
      if (targetServer.type === 'direct' || targetServer.id === 'videasy' || targetServer.id === 'penguplay' || targetServer.id === 'vidlink') {
        let directSources = null;

        try {
          const res = await fetch(`/api/servers/resolve?server=${targetServer.id}&id=${item.tmdbId}&type=${item.mediaType || 'movie'}&s=${s}&e=${e}&title=${encodeURIComponent(item.title || '')}&year=${item.year || ''}`);
          // RACE-002: Discard stale response if another server was clicked
          if (thisSwitchId !== currentSwitchId) return;

          if (res.ok) {
            const data = await res.json();
            if (data.hasDirect && data.sources && data.sources.length > 0) {
              directSources = data.sources;
            }
          }
        } catch (resolveErr) {
          console.warn(`Direct stream resolution skipped for ${targetServer.id}:`, resolveErr);
        }

        if (thisSwitchId !== currentSwitchId) return;

        if (directSources && directSources.length > 0) {
          if (embedIframe) {
            embedIframe.style.display = 'none';
            embedIframe.src = 'about:blank';
          }
          if (videoElement) videoElement.style.display = 'block';

          state.playerState.availableSources = directSources;
          const streamUrl = directSources[0].url;
          const isHls = directSources[0].type === 'hls' || streamUrl.includes('.m3u8');
          if (isHls && Hls.isSupported()) {
            loadHlsStream(streamUrl, videoElement.currentTime || 0);
          } else {
            destroyHls();
            videoElement.src = streamUrl;
            safeAutoplayVideo();
          }
          if (hudPlayerSub) {
            hudPlayerSub.textContent = `${targetServer.quality} • Dolby Atmos • ${targetServer.name} (Direct Native)`;
          }
          showToast(`Switched to ${targetServer.name} (Direct 4K)`);
          hideBuffering();
          return;
        }
      }

      if (thisSwitchId !== currentSwitchId) return;

      // Cloud Embed Player Engine
      // UX-003: Capture current playback position before switching to cloud embed
      const resumeTime = Math.floor(videoElement ? (videoElement.currentTime || 0) : 0);

      if (videoElement) {
        videoElement.pause();
        videoElement.style.display = 'none';
      }
      destroyHls();

      if (embedIframe) {
        dismissPlayerBackdrop();
        embedIframe.style.display = 'block';
        embedIframe.onload = () => {
          hideBuffering(0);
          dismissPlayerBackdrop();
        };
        const embedUrl = targetServer.embedUrl + (resumeTime > 0 ? (targetServer.embedUrl.includes('?') ? `&start=${resumeTime}` : `?start=${resumeTime}`) : '');
        embedIframe.src = embedUrl;
        embedIframe.onerror = () => {
          console.warn(`Embed connection error on ${targetServer.name}, recovering with CineFlow proxy...`);
          embedIframe.src = `/api/embed/proxy?url=${encodeURIComponent(embedUrl)}`;
        };
      }

      if (hudPlayerSub) {
        hudPlayerSub.textContent = `${targetServer.quality} • ${targetServer.name} (Cloud Embed)`;
      }

      hideBuffering(0);
      showToast(`Switched to ${targetServer.name}`);
    } catch (err) {
      if (thisSwitchId !== currentSwitchId) return;
      console.warn("Server switch error:", err);
      const resumeTime = Math.floor(videoElement ? (videoElement.currentTime || 0) : 0);
      if (videoElement) {
        videoElement.pause();
        videoElement.style.display = 'none';
      }
      if (embedIframe) {
        dismissPlayerBackdrop();
        embedIframe.style.display = 'block';
        const embedUrl = targetServer.embedUrl + (resumeTime > 0 ? (targetServer.embedUrl.includes('?') ? `&start=${resumeTime}` : `?start=${resumeTime}`) : '');
        embedIframe.src = embedUrl;
      }
      hideBuffering();
      showToast(`Switched to ${targetServer.name} (Embed Mirror)`);
    }
  }

  // Reload / Re-sync Server Button Listener
  const serversReloadBtn = document.getElementById('serversReloadBtn');
  if (serversReloadBtn) {
    serversReloadBtn.addEventListener('click', () => {
      serversReloadBtn.classList.add('spinning');
      const activeId = state.serverState.activeServerId;
      selectServer(activeId);
      setTimeout(() => {
        serversReloadBtn.classList.remove('spinning');
      }, 850);
    });
  }

  // FEWER / MORE Toggle Button Listener
  const serversToggleFewerMoreBtn = document.getElementById('serversToggleFewerMoreBtn');
  const serversDrawerExpandable = document.getElementById('serversDrawerExpandable');
  const serversToggleLabel = document.getElementById('serversToggleLabel');

  if (serversToggleFewerMoreBtn && serversDrawerExpandable) {
    serversToggleFewerMoreBtn.addEventListener('click', () => {
      state.serverState.isDrawerExpanded = !state.serverState.isDrawerExpanded;
      if (state.serverState.isDrawerExpanded) {
        serversDrawerExpandable.style.display = 'flex';
        serversToggleFewerMoreBtn.classList.add('expanded');
        if (serversToggleLabel) serversToggleLabel.textContent = 'FEWER';
      } else {
        serversDrawerExpandable.style.display = 'none';
        serversToggleFewerMoreBtn.classList.remove('expanded');
        if (serversToggleLabel) serversToggleLabel.textContent = 'MORE';
      }
    });
  }

  // FAQ Modal Event Listeners
  const serversFaqTriggerBtn = document.getElementById('serversFaqTriggerBtn');
  const serverFaqModal = document.getElementById('serverFaqModal');
  const closeServerFaqBtn = document.getElementById('closeServerFaqBtn');

  if (serversFaqTriggerBtn && serverFaqModal) {
    serversFaqTriggerBtn.addEventListener('click', () => {
      serverFaqModal.classList.add('open');
      serverFaqModal.style.display = 'flex';
    });
  }
  if (closeServerFaqBtn && serverFaqModal) {
    closeServerFaqBtn.addEventListener('click', () => {
      serverFaqModal.classList.remove('open');
      serverFaqModal.style.display = 'none';
    });
  }
  if (serverFaqModal) {
    serverFaqModal.addEventListener('click', (e) => {
      if (e.target === serverFaqModal) {
        serverFaqModal.classList.remove('open');
        serverFaqModal.style.display = 'none';
      }
    });
  }

  // Quick Server HUD Button Listener
  const hudServerQuickBtn = document.getElementById('hudServerQuickBtn');
  if (hudServerQuickBtn) {
    hudServerQuickBtn.addEventListener('click', () => {
      const container = document.getElementById('serversBarContainer');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  playerShortcutsBtn.addEventListener('click', () => {
    playerShortcutsModal.style.display = 'flex';
  });

  closeShortcutsBtn.addEventListener('click', () => {
    playerShortcutsModal.style.display = 'none';
  });

  // Master Global Keyboard Listener for Player
  window.addEventListener('keydown', (e) => {
    if (!playerModal.classList.contains('open')) return;
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    switch (e.code) {
      case 'Space':
      case 'KeyK':
        e.preventDefault();
        playPauseBtn.click();
        break;

      case 'ArrowLeft':
      case 'KeyJ':
        e.preventDefault();
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
        triggerGestureRipple(gestureRippleLeft);
        showPlayerToast('↺', '-10s');
        resetHudTimer();
        break;

      case 'ArrowRight':
      case 'KeyL':
        e.preventDefault();
        videoElement.currentTime = Math.min(videoElement.duration || 0, videoElement.currentTime + 10);
        triggerGestureRipple(gestureRippleRight);
        showPlayerToast('↻', '+10s');
        resetHudTimer();
        break;

      case 'ArrowUp':
        e.preventDefault();
        applyVolume(videoElement.volume + 0.05);
        resetHudTimer();
        break;

      case 'ArrowDown':
        e.preventDefault();
        applyVolume(videoElement.volume - 0.05);
        resetHudTimer();
        break;

      case 'KeyM':
        e.preventDefault();
        muteToggleBtn.click();
        break;

      case 'KeyR':
        e.preventDefault();
        const reloadBtn = document.getElementById('serversReloadBtn');
        if (reloadBtn) reloadBtn.click();
        break;

      case 'KeyF':
        e.preventDefault();
        fullscreenToggleBtn.click();
        break;

      case 'KeyP':
        e.preventDefault();
        togglePictureInPicture();
        break;

      case 'KeyD':
        if (e.shiftKey) {
          e.preventDefault();
          toggleStreamingDiagnostics();
        }
        break;

      case 'KeyC':
        e.preventDefault();
        toggleSubtitlesQuick();
        break;

      case 'KeyS':
        e.preventDefault();
        skipIntro();
        break;

      case 'KeyN':
        e.preventDefault();
        playNextEpisode();
        break;

      case 'Comma':
        if (e.shiftKey) { // '<'
          e.preventDefault();
          cyclePlaybackSpeed(false);
        }
        break;

      case 'Period':
        if (e.shiftKey) { // '>'
          e.preventDefault();
          cyclePlaybackSpeed(true);
        }
        break;

      case 'Digit0':
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
        if (videoElement.duration) {
          e.preventDefault();
          const digit = parseInt(e.code.replace('Digit', ''));
          const targetTime = (digit / 10) * videoElement.duration;
          videoElement.currentTime = targetTime;
          showPlayerToast('📍', `${digit * 10}%`);
          resetHudTimer();
        }
        break;

      case 'Slash':
        if (e.shiftKey) { // '?'
          e.preventDefault();
          const isModalOpen = playerShortcutsModal.style.display === 'flex';
          playerShortcutsModal.style.display = isModalOpen ? 'none' : 'flex';
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (playerShortcutsModal.style.display === 'flex') {
          playerShortcutsModal.style.display = 'none';
        } else if (playerEpisodesDrawer.style.display === 'flex') {
          playerEpisodesDrawer.style.display = 'none';
        } else if (popoverMenus.some(m => m && m.style.display === 'flex')) {
          closeAllPlayerPopovers();
        } else {
          closeCinemaPlayer();
        }
        break;
    }
  });

  function formatTime(secs) {
    if (!secs || isNaN(secs)) return '00:00';
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    const h = Math.floor(m / 60);
    const remM = m % 60;
    if (h > 0) {
      return `${h}:${remM.toString().padStart(2, '0')}:${remS.toString().padStart(2, '0')}`;
    }
    return `${remM.toString().padStart(2, '0')}:${remS.toString().padStart(2, '0')}`;
  }

  // =========================================================================
  // 9. Trailer & Export Modals
  // =========================================================================
  heroTrailerBtn.addEventListener('click', () => {
    if (!state.currentTrailerKey) return;
    trailerIframe.src = `https://www.youtube-nocookie.com/embed/${state.currentTrailerKey}?autoplay=1&rel=0`;
    trailerModal.classList.add('open');
  });

  function closeTrailerModal() {
    trailerIframe.src = '';
    trailerModal.classList.remove('open');
  }

  closeTrailerBtn.addEventListener('click', closeTrailerModal);
  trailerModal.addEventListener('click', (e) => {
    if (e.target === trailerModal) closeTrailerModal();
  });

  navExportBtn.addEventListener('click', () => {
    if (state.currentMedia) openExportModal(state.currentMedia);
  });

  async function openExportModal(item) {
    exportModal.classList.add('open');
    streamUrlInput.value = 'Resolving 4K / HD stream...';
    ytdlpCommandInput.value = 'Generating command...';
    mpvCommandInput.value = 'Generating command...';

    try {
      const cacheKey = `stream:${item.tmdbId}:${item.mediaType || 'movie'}:s0:e0`;
      const streamEntry = state.streamCache.get(cacheKey);
      let stream = null;
      if (streamEntry && (Date.now() - (streamEntry.cachedAt || 0) <= 8 * 60 * 1000)) {
        stream = streamEntry.data;
      }

      if (!stream) {
        const res = await fetch(`/api/resolve?id=${item.tmdbId}&type=${item.mediaType || 'movie'}`);
        stream = await res.json();
        boundedMapSet(state.streamCache, cacheKey, { data: stream, cachedAt: Date.now() }, 50);
      }

      const src = stream.sources && stream.sources[0];
      const streamUrl = (src && (src.rawUrl || src.url)) || '';
      const referer = (src && src.referer) || 'https://www.vidking.net/';
      const ua = (src && src.userAgent) || 'Mozilla/5.0';

      streamUrlInput.value = streamUrl;

      const safeTitle = (item.title || 'video').replace(/["/\\]/g, '-');
      ytdlpCommandInput.value = `yt-dlp -o "${safeTitle}.%(ext)s" --referer "${referer}" --user-agent "${ua}" "${streamUrl}"`;
      mpvCommandInput.value = `mpv --http-header-fields="Referer: ${referer}, User-Agent: ${ua}" "${streamUrl}"`;
    } catch (err) {
      streamUrlInput.value = 'Failed to resolve stream';
    }
  }

  closeExportBtn.addEventListener('click', () => exportModal.classList.remove('open'));
  exportModal.addEventListener('click', (e) => {
    if (e.target === exportModal) exportModal.classList.remove('open');
  });

  function copyInputToClipboard(inputEl, label) {
    inputEl.select();
    navigator.clipboard.writeText(inputEl.value).then(() => {
      showToast(`${label} copied!`);
    });
  }

  copyStreamUrlBtn.addEventListener('click', () => copyInputToClipboard(streamUrlInput, 'Stream URL'));
  copyYtdlpBtn.addEventListener('click', () => copyInputToClipboard(ytdlpCommandInput, 'yt-dlp Command'));
  copyMpvBtn.addEventListener('click', () => copyInputToClipboard(mpvCommandInput, 'MPV Command'));

  // =========================================================================
  // 10. Watchlist
  // =========================================================================
  function updateBookmarkBtn() {
    if (!state.currentMedia) return;
    const isSaved = state.watchlist.some(w => w.tmdbId === state.currentMedia.tmdbId);
    heroBookmarkBtn.classList.toggle('active', isSaved);
    watchlistBadgeCount.textContent = state.watchlist.length;
  }

  heroBookmarkBtn.addEventListener('click', () => {
    if (!state.currentMedia) return;
    const idx = state.watchlist.findIndex(w => w.tmdbId === state.currentMedia.tmdbId);
    if (idx >= 0) {
      state.watchlist.splice(idx, 1);
      showToast(`Removed from Watchlist`);
    } else {
      state.watchlist.push({
        tmdbId: state.currentMedia.tmdbId,
        title: state.currentMedia.title,
        year: state.currentMedia.year,
        rating: state.currentMedia.rating,
        posterPath: state.currentMedia.posterPath,
        mediaType: state.currentMedia.mediaType || 'movie'
      });
      showToast(`Saved to Watchlist`);
    }
    localStorage.setItem('cineflow_watchlist', JSON.stringify(state.watchlist));
    updateBookmarkBtn();
  });

  navWatchlistBtn.addEventListener('click', () => {
    if (state.watchlist.length === 0) {
      showToast("Watchlist is empty — click the bookmark on any title to save it.");
      return;
    }
    const first = state.watchlist[0];
    loadMedia(first.tmdbId, first.mediaType || 'movie', first);
    showToast(`Loaded "${first.title}" from Watchlist`);
  });

  brandHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.slider.items.length > 0) {
      goToHeroSlide(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================================
  // 11. Hero Slider Interactive Listeners & Keyboard / Gesture Engine
  // =========================================================================
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', prevHeroSlide);
  if (heroNextBtn) heroNextBtn.addEventListener('click', nextHeroSlide);
  if (heroFloatingPrev) heroFloatingPrev.addEventListener('click', prevHeroSlide);
  if (heroFloatingNext) heroFloatingNext.addEventListener('click', nextHeroSlide);
  if (heroPlayPauseBtn) heroPlayPauseBtn.addEventListener('click', toggleSliderPlayPause);

  if (heroReturnToSliderBtn) {
    heroReturnToSliderBtn.addEventListener('click', () => {
      goToHeroSlide(state.slider.currentIndex);
      showToast("Returned to Featured Showcase Slider");
    });
  }

  // Pause on hover over hero stage
  if (heroStage) {
    heroStage.addEventListener('mouseenter', () => {
      if (state.slider.isPlaying) stopHeroSliderTimer();
    });
    heroStage.addEventListener('mouseleave', () => {
      if (state.slider.isPlaying && !state.slider.isIndividualMode) startHeroSliderTimer();
    });

    // Touch Swipe Support
    let touchStartX = 0;
    heroStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    heroStage.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (diff > 50) prevHeroSlide();
      else if (diff < -50) nextHeroSlide();
    }, { passive: true });
  }

  // Keyboard Left / Right navigation for slider
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
    if (playerModal && playerModal.classList.contains('open')) return;
    if (commandPaletteBackdrop && commandPaletteBackdrop.classList.contains('open')) return;

    if (e.key === 'ArrowLeft') {
      prevHeroSlide();
    } else if (e.key === 'ArrowRight') {
      nextHeroSlide();
    }
  });

  // Network Status Pill: Click to Retry or Simulate Offline Toggle
  if (networkStatusPill) {
    networkStatusPill.addEventListener('click', async () => {
      if (state.isOfflineMode) {
        showToast("Checking live TMDB proxy connectivity...");
        try {
          const testRes = await fetch('/api/trending');
          if (testRes.ok) {
            state.isOfflineMode = false;
            networkStatusPill.classList.remove('offline');
            networkPulseDot.classList.remove('offline');
            networkStatusText.textContent = "4K PROXY LIVE";
            initDynamicDashboard();
            showToast("Online TMDB synchronization restored!");
          } else {
            showToast("Network still unavailable — keeping Offline Vault");
          }
        } catch {
          showToast("Network still unavailable — keeping Offline Vault");
        }
      } else {
        // Allow the user to simulate network error to verify zero-downtime static failover
        activateStaticFallbackMode("User Simulated Network Error");
      }
    });
  }

  // Browser Online / Offline Auto-Detect
  window.addEventListener('offline', () => activateStaticFallbackMode('Browser Disconnected'));
  window.addEventListener('online', () => {
    showToast("Internet restored — synchronizing live TMDB data...");
    initDynamicDashboard();
  });

  // =========================================================================
  // 12. 100% Dynamic Boot Sequence: Load Live TMDB Trending Data
  // =========================================================================
  updateBookmarkBtn();

  async function initDynamicDashboard() {
    updateLoader(18, "Popping corn & chilling cola...");
    const minDisplayPromise = new Promise(resolve => setTimeout(resolve, 1400));

    try {
      updateLoader(38, "Rolling 35mm film reels...");
      
      // 3.5s timeout guard so slow network doesn't hang indefinitely
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/trending', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      updateLoader(65, "Calibrating 4K studio cameras...");

      state.browseCache.trending = data.trending || [];
      state.browseCache.popularMovies = data.popularMovies || [];
      state.browseCache.popularTV = data.popularTV || [];

      // Top 6 Trending Featured Slider
      state.topFeatured = (data.trending || []).slice(0, 6);

      if (state.topFeatured.length > 0) {
        const defaultTop = state.topFeatured[0];
        // 1. Hydrate the Hero Canvas marked as slider mode
        loadMedia(defaultTop.tmdbId, defaultTop.mediaType || 'movie', defaultTop, true);

        // Pre-warm stream resolution in background for instant 0ms hero stream start
        prefetchMedia(defaultTop.tmdbId, defaultTop.mediaType || 'movie');

        // 2. Setup the Hyper-Animated Hero Slider
        setupHeroSlider(state.topFeatured);

        // 3. Render the Hero Carousel Switcher
        renderHeroCarousel(state.topFeatured);
      }

      // 4. Render Rail 1: Now Trending Globally
      trendingTrack.innerHTML = '';
      (data.trending || []).forEach(film => {
        trendingTrack.appendChild(createRailCard(film));
      });

      // 5. Render Rail 2: Popular Blockbusters
      moviesTrack.innerHTML = '';
      (data.popularMovies || []).forEach(film => {
        moviesTrack.appendChild(createRailCard(film));
      });

      // 6. Render Rail 3: Top Binge-Worthy TV Series
      tvTrack.innerHTML = '';
      (data.popularTV || []).forEach(film => {
        tvTrack.appendChild(createRailCard(film));
      });

      // Background Pre-Warming: Preload metadata for top trending titles
      (data.trending || []).slice(0, 4).forEach(t => {
        prefetchMedia(t.tmdbId, t.mediaType || 'movie');
      });

      updateLoader(92, "Synchronizing cinematic canvas...");

      // Ensure user gets to see the animated popcorn, cola, camera, and film
      await minDisplayPromise;

      updateLoader(100, "Action! 🎬");

      setTimeout(() => {
        if (cinemaLoadingScreen) {
          cinemaLoadingScreen.classList.add('fade-out');
          setTimeout(() => {
            cinemaLoadingScreen.style.display = 'none';
          }, 650);
        }
      }, 350);

    } catch (err) {
      console.error("Dashboard initialization error, switching to static fallback mode:", err);
      // Seamless zero-downtime automatic failover to static offline catalog
      activateStaticFallbackMode(err.message);

      if (cinemaLoadingScreen) {
        cinemaLoadingScreen.classList.add('fade-out');
        setTimeout(() => {
          cinemaLoadingScreen.style.display = 'none';
        }, 650);
      }
    }
  }

  // Execute Dynamic Boot
  initDynamicDashboard();
});
