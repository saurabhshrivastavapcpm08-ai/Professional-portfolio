export function Squiggle({
  className = "",
  width = 120,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={18}
      viewBox="0 0 120 18"
      aria-hidden
    >
      <path
        className="squiggle"
        d="M2 10 C 18 2, 28 16, 42 10 S 68 2, 82 11 108 16, 118 8"
      />
    </svg>
  );
}

export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M44.7,-67.2C57.2,-59.3,66.1,-45.6,72.8,-30.4C79.5,-15.2,84,1.6,79.8,16.1C75.6,30.6,62.7,42.8,48.8,53.4C34.9,64,20,73,2.9,74.9C-14.2,76.8,-33.5,71.6,-48.4,60.8C-63.3,50,-73.8,33.6,-77.4,15.6C-81,-2.4,-77.7,-22,-68.5,-37.1C-59.3,-52.2,-44.2,-62.8,-28.8,-69.5C-13.4,-76.2,2.3,-79,17.4,-75.2C32.5,-71.4,47,-63.9,44.7,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function StarBurst({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M32 2l4.2 18.3L54 14l-10.2 15.4L60 38l-18.4 1.2L46 58 32 46.2 18 58l4.4-18.8L4 38l16.2-8.6L10 14l17.8 6.3z"
      />
    </svg>
  );
}
