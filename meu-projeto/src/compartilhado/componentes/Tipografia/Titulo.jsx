export default function Titulo({ children, style = {} }) {
  const estilosPadrao = {
    margin: 0,
    marginBottom: 12,
    fontSize: 30,
    fontFamily: "Nunito",
    fontWeight: 700,
    letterSpacing: -0.75,
    lineHeight: "36px",
    tabSize: 4,
    textAlign: "center",
    color: "rgb(60, 60, 60)"
  };

  return (
    <h1 style={{ ...estilosPadrao, ...style }}>
      {children}
    </h1>
  );
}