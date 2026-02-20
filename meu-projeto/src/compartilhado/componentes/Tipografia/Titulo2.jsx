export default function Titulo2({ children }) {
    return (
      <h2 style={{
        margin: 0,
        marginBottom: "16px",
        fontFamily: "Nunito",
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: "28px",
        tabSize: 4,
        color: "rgb(60, 60, 60)",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
      }}>
        {children}
      </h2>
    );
  }