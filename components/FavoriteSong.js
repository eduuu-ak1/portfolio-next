export default function FavoriteSong() {
  return (
    <div className="relative flex h-72 w-full max-w-md flex-col justify-end overflow-hidden rounded-2xl border border-line p-6">
      <img
        src="/cinderella-poster.png"
        alt="Cinderella by Mac Miller and Ty Dolla $ign"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="relative">
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          On Repeat
        </span>
        <p className="font-display text-2xl font-bold text-white">Cinderella</p>
        <p className="mb-4 text-sm text-white/70">Mac Miller, Ty Dolla $ign</p>
        <a
          href="https://open.spotify.com/search/Cinderella%20Mac%20Miller%20Ty%20Dolla%20Sign"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit rounded-full bg-white px-5 py-2.5 font-mono text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
        >
          Listen on Spotify &rarr;
        </a>
      </div>
    </div>
  );
}
