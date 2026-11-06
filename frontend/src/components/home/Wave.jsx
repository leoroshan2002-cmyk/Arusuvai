const WAVE = 'M0 30q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0q90 -30 180 0t180 0V60H0Z';

// Animated golden/cream wave between the story section and the plant journey.
export default function Wave() {
  return (
    <div className="wv" aria-hidden="true">
      <svg className="w1" viewBox="0 0 2880 60" preserveAspectRatio="none">
        <path d={WAVE} fill="rgba(217,164,65,.5)" />
      </svg>
      <svg className="w2" viewBox="0 0 2880 60" preserveAspectRatio="none">
        <path d={WAVE} fill="#FFF3DA" />
      </svg>
    </div>
  );
}
