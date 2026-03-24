"use strict";

const PROFILE = {
  siteTitle: "卒団おめでとう | 思い出リンク",
  description:
    "卒団おめでとうの気持ちを込めた、思い出写真とムービーのリンクページ。",
  name: "卒団おめでとう",
  romanName: "Mini Basket Graduation",
  copyrightName: "Mini Basket Graduation",
  badge: "Mini Basket Graduation",
  eyebrow: "Memories",
  tagline: "あの日の光景を、もう一度。",
  introNote: "",
  footerCopy:
    "卒団おめでとう。これからの毎日も、それぞれの場所で楽しく輝けますように。",
  galleryHeading: "Gallery",
  galleryNote: "",
  galleryTag: "Mini Basket Memories",
  gallery: [
    {
      src: "./media/gallery-cover.jpg",
      alt: "バスケットボールを高く掲げる後ろ姿の表紙写真",
    },
    {
      src: "./media/memory-01.jpg",
      alt: "卒団式で涙をこらえながら座る子どもたちの写真",
    },
    {
      src: "./media/memory-03.jpg",
      alt: "卒団おめでとうの飾りの前で撮った集合写真",
    },
    {
      src: "./media/memory-04.jpg",
      alt: "卒団式の会場でプレゼントを囲んで並ぶ子どもたちの写真",
    },
    {
      src: "./media/memory-02.jpg",
      alt: "夜にみんなで集まって笑顔を見せる集合写真",
      fit: "contain",
    },
  ],
  videoHeading: "Movie",
  videoNote:
    "みんなで見た、思い出のムービーです。",
  videoSupportText: "",
  video: {
    type: "iframe",
    src: "https://drive.google.com/file/d/1LKVgHTpFjCp1a5Y6lzOCnn-00VLhlyaT/preview",
    title: "思い出の写真で作ったムービー",
  },
  videoActions: [
    {
      label: "Google Drive で大きく開く",
      url: "https://drive.google.com/file/d/1LKVgHTpFjCp1a5Y6lzOCnn-00VLhlyaT/view?usp=sharing",
      tone: "primary",
    },
    {
      label: "式の日の映像へ",
      url: "#day-movie",
      tone: "secondary",
      internal: true,
    },
  ],
  secondaryVideoKicker: "Graduation Day",
  secondaryVideoHeading: "式の日の映像",
  secondaryVideo: {
    type: "video",
    src: "./media/graduation-movie.mp4",
    poster: "./media/memory-03.jpg",
  },
  linksHeading: "Music",
  linksNote: "",
  links: [
    {
      label: "動画で流れた音楽と MV",
      meta: "",
      action: "OPEN",
      url: "https://rainau-official.github.io/",
      platform: "companion",
    },
  ],
};

const ICON_SVG = {
  companion:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><defs><linearGradient id="companionGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#2f9a78"/><stop offset="1" stop-color="#ec72ac"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" fill="url(#companionGradient)"/><path fill="#fff" d="M8 8.25a1 1 0 0 1 1-1h6.7a1 1 0 0 1 0 2H10v5.7a1 1 0 1 1-2 0v-6.7Zm6.6.05a1 1 0 1 1 1.4 1.42l-6.1 6.08a1 1 0 1 1-1.4-1.42l6.1-6.08Z"/></svg>',
};

function createPlatformIcon(platform) {
  const icon = document.createElement("span");
  icon.className = "link-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = ICON_SVG[platform] || ICON_SVG.companion;
  return icon;
}

function setFirstAvailableSource(element, sources) {
  const candidates = sources.filter(Boolean);

  if (!element || candidates.length === 0) {
    return;
  }

  const [currentSource, ...restSources] = candidates;
  const probe = new Image();

  probe.addEventListener("load", () => {
    element.src = currentSource;
  });

  probe.addEventListener("error", () => {
    setFirstAvailableSource(element, restSources);
  });

  probe.src = currentSource;
}

function createLinkButton(link, index) {
  const anchor = document.createElement("a");
  anchor.className = "link-button";

  if (link.platform) {
    anchor.classList.add(`link-${link.platform}`);
  }

  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.style.setProperty("--order", String(index + 1));
  anchor.setAttribute("aria-label", `${link.label}を新しいタブで開く`);

  const icon = createPlatformIcon(link.platform);

  const textGroup = document.createElement("span");
  textGroup.className = "link-text";

  const label = document.createElement("span");
  label.className = "link-label duotone-text";
  label.textContent = link.label;

  const meta = document.createElement("span");
  meta.className = "link-meta";
  meta.textContent = link.meta || "";
  meta.hidden = !link.meta;

  const arrow = document.createElement("span");
  arrow.className = "link-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = link.action || "OPEN";

  textGroup.append(label, meta);
  anchor.append(icon, textGroup, arrow);

  return anchor;
}

function createFeatureAction(action, index) {
  const anchor = document.createElement("a");
  anchor.className = "feature-action";
  anchor.href = action.url;
  anchor.style.setProperty("--order", String(index + 1));

  if (!action.internal) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  if (action.tone) {
    anchor.classList.add(`feature-action-${action.tone}`);
  }

  anchor.textContent = action.label;
  return anchor;
}

function createGallerySlide(item, index) {
  const figure = document.createElement("figure");
  figure.className = "gallery-slide";
  figure.style.setProperty("--order", String(index + 1));

  if (item.fit) {
    figure.dataset.fit = item.fit;
  }

  const image = document.createElement("img");
  image.alt = item.alt;
  image.loading = index === 0 ? "eager" : "lazy";
  image.decoding = "async";
  setFirstAvailableSource(image, [item.src, ...(item.fallbacks || [])]);

  const tagText = item.tag === "" ? "" : item.tag || PROFILE.galleryTag || "";

  figure.append(image);

  if (tagText) {
    const tag = document.createElement("span");
    tag.className = "gallery-slide-tag";
    tag.setAttribute("aria-hidden", "true");
    tag.textContent = tagText;
    figure.append(tag);
  }

  return figure;
}

function createFeatureMedia(config) {
  if (!config?.src) {
    return null;
  }

  if (config.type === "iframe") {
    const iframe = document.createElement("iframe");
    iframe.className = "feature-media-iframe";
    iframe.src = config.src;
    iframe.title = config.title || "memory movie";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    return iframe;
  }

  const video = document.createElement("video");
  video.className = "feature-media-video";
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.src = config.src;

  if (config.poster) {
    video.poster = config.poster;
  }

  return video;
}

function setupGallery(track, dots, prevButton, nextButton, items) {
  if (!track || !dots || !prevButton || !nextButton || items.length === 0) {
    const panel = track?.closest(".memory-gallery-panel");

    if (panel) {
      panel.hidden = true;
    }

    return;
  }

  const slides = items.map((item, index) => createGallerySlide(item, index));
  track.replaceChildren(...slides);
  dots.replaceChildren();

  const dotButtons = items.map((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-dot";
    button.setAttribute("aria-label", `${index + 1}枚目の写真を見る`);
    button.addEventListener("click", () => goToSlide(index));
    dots.appendChild(button);
    return button;
  });

  let activeIndex = 0;
  let scrollTimeoutId = null;

  function setActiveIndex(index) {
    activeIndex = index;

    dotButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });

    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
  }

  function getNearestIndex() {
    let nearestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(track.scrollLeft - slide.offsetLeft);

      if (distance < smallestDistance) {
        nearestIndex = index;
        smallestDistance = distance;
      }
    });

    return nearestIndex;
  }

  function goToSlide(index) {
    const boundedIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides[boundedIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(boundedIndex);
  }

  prevButton.addEventListener("click", () => {
    goToSlide(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goToSlide(activeIndex + 1);
  });

  track.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimeoutId);
    scrollTimeoutId = window.setTimeout(() => {
      setActiveIndex(getNearestIndex());
    }, 60);
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    }
  });

  window.addEventListener("resize", () => {
    setActiveIndex(getNearestIndex());
  });

  if (slides.length <= 1) {
    prevButton.hidden = true;
    nextButton.hidden = true;
    dots.hidden = true;
  }

  setActiveIndex(0);
}

const pageTitle = document.getElementById("page-title");
const romanName = document.getElementById("page-roman-name");
const copyrightName = document.getElementById("copyright-name");
const pageBadge = document.getElementById("page-badge");
const pageEyebrow = document.getElementById("page-eyebrow");
const pageTagline = document.getElementById("page-tagline");
const introNote = document.getElementById("intro-note");
const footerCopy = document.getElementById("footer-copy");
const galleryHeading = document.getElementById("gallery-heading");
const galleryNote = document.getElementById("gallery-note");
const galleryTrack = document.getElementById("gallery-track");
const galleryDots = document.getElementById("gallery-dots");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const videoPanel = document.getElementById("video-panel");
const videoHeading = document.getElementById("video-heading");
const videoNote = document.getElementById("video-note");
const videoSupportText = document.getElementById("video-support-text");
const featureMedia = document.getElementById("feature-media");
const videoActions = document.getElementById("video-actions");
const secondaryVideoKicker = document.getElementById("secondary-video-kicker");
const secondaryVideoHeading = document.getElementById("secondary-video-heading");
const secondaryVideoFrame = document.getElementById("secondary-video-frame");
const secondaryVideoPanel = document.getElementById("day-movie");
const linksHeading = document.getElementById("links-heading");
const linksNote = document.getElementById("links-note");
const linkList = document.getElementById("link-list");
const year = document.getElementById("year");
const descriptionMeta = document.querySelector('meta[name="description"]');

if (pageTitle) {
  pageTitle.textContent = PROFILE.name;
}

if (romanName) {
  romanName.textContent = PROFILE.romanName;
}

if (copyrightName) {
  copyrightName.textContent = PROFILE.copyrightName || PROFILE.name;
}

if (pageBadge) {
  pageBadge.textContent = PROFILE.badge;
}

if (pageEyebrow) {
  pageEyebrow.textContent = PROFILE.eyebrow;
}

if (pageTagline) {
  pageTagline.textContent = PROFILE.tagline;
}

if (introNote) {
  introNote.textContent = PROFILE.introNote;
  introNote.hidden = !PROFILE.introNote;
}

if (footerCopy) {
  footerCopy.textContent = PROFILE.footerCopy;
  footerCopy.hidden = !PROFILE.footerCopy;
}

if (galleryHeading) {
  galleryHeading.textContent = PROFILE.galleryHeading;
}

if (galleryNote) {
  galleryNote.textContent = PROFILE.galleryNote;
  galleryNote.hidden = !PROFILE.galleryNote;
}

setupGallery(galleryTrack, galleryDots, galleryPrev, galleryNext, PROFILE.gallery);

if (videoHeading) {
  videoHeading.textContent = PROFILE.videoHeading;
}

if (videoNote) {
  videoNote.textContent = PROFILE.videoNote;
}

if (videoSupportText) {
  videoSupportText.textContent = PROFILE.videoSupportText;
  videoSupportText.hidden = !PROFILE.videoSupportText;
}

if (featureMedia) {
  const mediaElement = createFeatureMedia(PROFILE.video);

  if (mediaElement) {
    featureMedia.replaceChildren(mediaElement);
  }
}

if (videoActions) {
  const actionButtons = PROFILE.videoActions
    .filter((action) => action.label && action.url)
    .map((action, index) => createFeatureAction(action, index));

  videoActions.replaceChildren(...actionButtons);
}

if (videoPanel) {
  videoPanel.hidden = !PROFILE.video?.src;
}

if (secondaryVideoKicker) {
  secondaryVideoKicker.textContent = PROFILE.secondaryVideoKicker || "";
  secondaryVideoKicker.hidden = !PROFILE.secondaryVideoKicker;
}

if (secondaryVideoHeading) {
  secondaryVideoHeading.textContent = PROFILE.secondaryVideoHeading || "";
}

if (secondaryVideoFrame) {
  const mediaElement = createFeatureMedia(PROFILE.secondaryVideo);

  if (mediaElement) {
    secondaryVideoFrame.replaceChildren(mediaElement);
  }
}

if (secondaryVideoPanel) {
  secondaryVideoPanel.hidden = !PROFILE.secondaryVideo?.src;
}

if (linksHeading) {
  linksHeading.textContent = PROFILE.linksHeading;
}

if (linksNote) {
  linksNote.textContent = PROFILE.linksNote;
  linksNote.hidden = !PROFILE.linksNote;
}

if (linkList) {
  const linkButtons = PROFILE.links
    .filter((link) => link.label && link.url)
    .map((link, index) => createLinkButton(link, index));

  linkList.replaceChildren(...linkButtons);
  linkList.hidden = linkButtons.length === 0;
}

if (PROFILE.siteTitle) {
  document.title = PROFILE.siteTitle;
}

if (descriptionMeta && PROFILE.description) {
  descriptionMeta.content = PROFILE.description;
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (document.body) {
  document.body.classList.add("is-ready");
}
