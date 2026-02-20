export default function Folder({ width = 24, height = 24, cor = "currentColor" }) {
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
        style={{ display: "inline-block", flexShrink: 0 }}
      >
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
      </svg>
    );
  }