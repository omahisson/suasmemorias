import { useState } from "react";

export default function Botao({ children, onClick, disabled, variante = "primario", type, style = {} }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const base = {
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        height: "56px",
        width: "100%",
        padding: "0 32px",
        marginBottom: "12px",
        fontFamily: "Nunito, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: "28px",
        textAlign: "center",
        color: "#3C3C3C",
        backgroundColor: isActive
            ? "rgb(76, 173, 1)"
            : isHovered
                ? "rgb(111, 219, 31)"
                : "rgb(88, 204, 2)",
        borderTop: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderRight: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderBottom: `4px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderLeft: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderRadius: "999px",
        cursor: disabled ? "not-allowed" : "default",
        outline: "none",
        transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        appearance: "button",
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto"
    };

    const estilosLink = {
        ...base,
        height: "48px",
        width: "fit-content",
        padding: "12px 24px",
        margin: "0 auto",
        marginBottom: "0px",
        marginTop: "-15px",
        fontSize: "16px",
        lineHeight: "24px",
        color: isHovered ? "rgba(88, 204, 2, 0.8)" : "rgb(88, 204, 2)",
        backgroundColor: isHovered ? "rgb(229, 229, 229)" : "transparent",
        border: "none",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
        borderLeft: "none",
        borderRadius: "999px"
    };

    const estilosOk = {
        ...base,
        height: "40px",
        width: "auto",
        padding: "0 16px",
        marginBottom: "0",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "24px",
        backgroundColor: isActive
            ? "rgb(76, 173, 1)"
            : isHovered
                ? "rgb(111, 219, 31)"
                : "rgb(88, 204, 2)",
        borderTop: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderRight: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderBottom: `4px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderLeft: `2px solid ${isActive ? "rgb(58, 128, 0)" : isHovered ? "rgb(88, 204, 2)" : "rgb(76, 173, 1)"}`,
        borderRadius: "9999px",
        boxShadow: isFocused ? "0 0 0 4px rgba(88, 204, 2, 0.3)" : "none"
    };

    const estilos =
        variante === "link"
            ? estilosLink
            : variante === "ok"
                ? estilosOk
                : { ...base };

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled} 
            style={{ ...estilos, ...style }}
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => !disabled && setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            {children}
        </button>
    );
}