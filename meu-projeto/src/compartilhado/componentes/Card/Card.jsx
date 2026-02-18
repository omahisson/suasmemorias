export default function Card({ children }) {
    return (
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          maxWidth: "448px",
          width: "448px",
          padding: "24px",
          backgroundColor: "rgb(255, 255, 255)",
          border: "2px solid rgb(229, 229, 229)",
          borderRadius: "20px",
          fontFamily: "Nunito",
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgb(60, 60, 60)",
          gap: "24px",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
        }}
      >
        {children}
      </div>
    );
  }