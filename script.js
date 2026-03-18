"use strict";

// Replace values in this object when updating the page.
const PROFILE = {
  nameLines: ["卒団", "おめでとう!"],
  copyrightName: "Mini Basket Graduation",
  badge: "Mini Basket Graduation",
  eyebrow: "FOR THE TEAM",
  tagline: "がんばってきた時間のつづきを、これからも。みんなに届けたい配信先をひとつにまとめました。",
  message:
    "このページは卒団式で配るリンク集です。Spotify、Apple Music、YouTube をまとめて、思い出のつづきを気軽に開けるようにしました。",
  photoSrc: "./profile-photo.jpg",
  photoFallbacks: [
    "./rainau-profile.jpg",
  ],
  photoAlt: "ミニバスの卒団式向けプロフィール画像",
  photoNote: "Mini Basket Memories",
  photoCaption: "Last pass, next dream.",
  linksHeading: "配信先はこちら",
  linksNote: "Spotify / Apple Music / YouTube",
  links: [
    {
      label: "Spotify",
      meta: "音楽アプリで聴く",
      url: "https://open.spotify.com/intl-ja/artist/2lDWdr6KzAdEK9APsVWWXs?si=1xyx3cKMRRuWrVPdZcIJEw",
      platform: "spotify",
    },
    {
      label: "Apple Music",
      meta: "iPhone や Mac でも開きやすい",
      url: "https://music.apple.com/jp/album/let-em-talk-ep/1882663325",
      platform: "apple",
    },
    {
      label: "YouTube",
      meta: "動画で観る",
      url: "https://youtu.be/e6zycLKYLHs",
      platform: "youtube",
    },
  ],
};

const ICON_SVG = {
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="M10 9.2 15.8 12 10 14.8Z" fill="#fff"/></svg>',
  spotify:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7 10.1c3.8-1.1 7.4-.8 10.5 1M7.8 12.8c3.1-.9 5.9-.7 8.5.7M8.7 15.3c2.4-.6 4.6-.4 6.6.5" stroke="#fff" stroke-width="1.55" stroke-linecap="round" fill="none"/></svg>',
  apple:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.5 1.5c.1 1-.3 1.9-.9 2.6-.6.6-1.5 1.1-2.4 1-.1-1 .3-1.9.9-2.5.6-.7 1.6-1.1 2.4-1.1Zm2.4 16.1c-.4 1-.9 1.8-1.5 2.6-.8 1-1.5 1.4-2.4 1.4-.8 0-1.3-.2-2-.5-.6-.2-1.2-.4-2-.4-.8 0-1.4.2-2 .5-.7.2-1.2.4-2 .4-.9 0-1.7-.4-2.5-1.4-.9-1.1-1.6-2.3-2-3.6-.6-1.7-.7-3.3-.2-4.6.4-1.1 1-1.9 1.8-2.5.8-.6 1.7-.9 2.6-.9.8 0 1.5.2 2.2.5.7.3 1.2.5 1.6.5.3 0 .9-.2 1.8-.6.8-.3 1.5-.4 2.1-.4 1.6.1 2.8.7 3.6 1.8-1.4.8-2.1 2-2.1 3.6 0 1.2.5 2.2 1.4 2.9.4.3.8.5 1.2.7-.1.4-.3.7-.4 1Z"/></svg>',
};

function createPlatformIcon(platform) {
  const icon = document.createElement("span");
  icon.className = "link-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = ICON_SVG[platform] || ICON_SVG.youtube;
  return icon;
}

function setFirstAvailablePhoto(imageElement, sources) {
  const photoSources = sources.filter(Boolean);

  if (!imageElement || photoSources.length === 0) {
    return;
  }

  const [currentSource, ...restSources] = photoSources;
  const probeImage = new Image();

  probeImage.addEventListener("load", () => {
    imageElement.src = currentSource;
  });

  probeImage.addEventListener("error", () => {
    setFirstAvailablePhoto(imageElement, restSources);
  });

  probeImage.src = currentSource;
}

const pageTitle = document.getElementById("page-title");
const copyrightName = document.getElementById("copyright-name");
const pageBadge = document.getElementById("page-badge");
const pageEyebrow = document.getElementById("page-eyebrow");
const pageTagline = document.getElementById("page-tagline");
const messageCopy = document.getElementById("message-copy");
const artistPhoto = document.getElementById("artist-photo");
const photoNote = document.getElementById("photo-note");
const photoCaption = document.getElementById("photo-caption");
const linksHeading = document.getElementById("links-heading");
const linksNote = document.getElementById("links-note");
const linkList = document.getElementById("link-list");
const year = document.getElementById("year");

if (pageTitle) {
  pageTitle.innerHTML = "";

  (PROFILE.nameLines || []).forEach((line) => {
    const lineElement = document.createElement("span");
    lineElement.className = "title-line";
    lineElement.textContent = line;
    pageTitle.appendChild(lineElement);
  });
}

if (copyrightName) {
  copyrightName.textContent = PROFILE.copyrightName || (PROFILE.nameLines || []).join(" ");
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

if (messageCopy) {
  messageCopy.textContent = PROFILE.message;
}

if (photoNote) {
  photoNote.textContent = PROFILE.photoNote;
}

if (photoCaption) {
  photoCaption.textContent = PROFILE.photoCaption;
}

if (linksHeading) {
  linksHeading.textContent = PROFILE.linksHeading;
}

if (linksNote) {
  linksNote.textContent = PROFILE.linksNote;
}

if (artistPhoto) {
  artistPhoto.alt = PROFILE.photoAlt;

  const photoSources = [PROFILE.photoSrc, ...(PROFILE.photoFallbacks || [])];
  setFirstAvailablePhoto(artistPhoto, photoSources);
}

if (linkList) {
  linkList.innerHTML = "";

  PROFILE.links.forEach((link, index) => {
    if (!link.label || !link.url) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.className = "link-button";
    if (link.platform) {
      anchor.classList.add(`link-${link.platform}`);
    }
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.style.setProperty("--order", String(index + 1));

    const icon = createPlatformIcon(link.platform);

    const textGroup = document.createElement("span");
    textGroup.className = "link-text";

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = link.label;

    const meta = document.createElement("span");
    meta.className = "link-meta";
    meta.textContent = link.meta || "";

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "OPEN";

    textGroup.append(label, meta);
    anchor.append(icon, textGroup, arrow);
    linkList.appendChild(anchor);
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (document.body) {
  document.body.classList.add("is-ready");
}
