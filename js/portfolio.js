const grid = document.getElementById("projects");

function caption(p) {
  const rows = [
    ["Title", p.year ? `${p.title} (${p.year})` : p.title],
    ["Category", p.category],
    ["Studio", p.studio],
    ["Director", p.director],
    ["Role", p.role],
  ];
  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><span class="label">${label}:</span> ${value}</p>`)
    .join("");
}

function play(card, p) {
  const media = card.querySelector(".media");
  if (p.youtube) {
    media.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${p.youtube}?autoplay=1" title="${p.title}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
    return;
  }
  const video = document.createElement("video");
  video.src = `videos/${p.video}`;
  video.poster = `images/${p.image}`;
  video.controls = true;
  video.playsInline = true;
  media.replaceChildren(video);
  video.play();
}

// Only one clip plays at a time.
document.addEventListener("play", (e) => {
  document.querySelectorAll("video").forEach((v) => v !== e.target && v.pause());
}, true);

for (const p of PROJECTS) {
  const card = document.createElement("article");
  card.className = "project";
  card.innerHTML = `
    <div class="media">
      <button class="poster" aria-label="Play ${p.title}">
        <img src="images/${p.image}" alt="" loading="lazy">
        <span class="play" aria-hidden="true"></span>
      </button>
    </div>
    <div class="caption">${caption(p)}</div>`;
  card.querySelector(".poster").addEventListener("click", () => play(card, p));
  grid.append(card);
}
