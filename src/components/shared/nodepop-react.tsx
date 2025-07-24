import type { SVGProps } from "react";

const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 200 200"
    color={props.color ?? "var(--primary)"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="10"
      y="40"
      width="180"
      height="140"
      rx="20"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path
      d="M55 40 Q100 0 145 40"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <g
      transform="translate(100, 110) scale(1.6)"
      stroke="currentColor"
      strokeWidth="5"
    >
      <circle cx="0" cy="0" r="5" fill="currentColor" />
      <ellipse rx="30" ry="12" transform="rotate(0)" fill="none" />
      <ellipse rx="30" ry="12" transform="rotate(60)" fill="none" />
      <ellipse rx="30" ry="12" transform="rotate(120)" fill="none" />
    </g>
  </svg>
);
export default SVGComponent;
