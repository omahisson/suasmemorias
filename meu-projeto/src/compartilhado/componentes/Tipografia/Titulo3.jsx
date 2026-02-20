export default function Titulo3({ children, style = {} }) {
    const estilosPadrao = {
      margin: 0,
      marginBlockEnd: 0,
      marginBlockStart: 0,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      fontFamily: "Nunito",
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "32px",
      tabSize: 4,
      color: "rgb(60, 60, 60)",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
    };
  
    return (
      <h3 style={{ ...estilosPadrao, ...style }}>
        {children}
      </h3>
    );
  }