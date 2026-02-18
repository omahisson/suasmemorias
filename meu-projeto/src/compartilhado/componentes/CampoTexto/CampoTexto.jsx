import { useState } from "react";

export default function CampoTexto({
    rotulo,
    valor,
    onChange,
    tipo = "text",
    placeholder,
    disabled,
  }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <label style={{ display: "block" }}>
        <div style={{ fontSize: 14, margin: 0,marginBottom: 8, fontFamily: "Nunito", fontWeight: 600, lineHeight: "20px", tabSize: 4, color: "rgb(60, 60, 60)" }}>{rotulo}</div>
        <input
          type={tipo}
          value={valor}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            boxSizing: "border-box",
            width: "100%",
            overflowX: "clip",
            overflowY: "clip",
            padding: "12px 16px",
            fontSize: 16,
            fontFamily: "Nunito",
            fontWeight: 400,
            lineHeight: "24px",
            tabSize: 4,
            color: "rgb(60, 60, 60)",
            letterSpacing: "normal",
            textAlign: "start",
            backgroundColor: "rgb(255, 255, 255)",
            border: isFocused ? "2px solid #58CC02" : "2px solid rgb(229, 229, 229)",
            borderRadius: "16px",
            cursor: "text",
            outline: "none",
            transition: "color 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
            boxShadow: isFocused ? "0 0 0 4px rgba(88, 204, 2, 0.3)" : "none"
          }}
        />
      </label>
    );
  }