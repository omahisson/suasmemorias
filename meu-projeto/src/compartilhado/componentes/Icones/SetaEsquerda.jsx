export default function SetaEsquerda({ width = 24, height = 24, cor = "currentColor" }) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={cor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      >
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
    );
  }