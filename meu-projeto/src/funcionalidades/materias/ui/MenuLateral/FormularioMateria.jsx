import CampoTexto from "../../../../compartilhado/componentes/CampoTexto/CampoTexto.jsx";
import Botao from "../../../../compartilhado/componentes/Botao/Botao.jsx";

export default function FormularioMateria({ 
  valor, 
  onChange, 
  onSalvar, 
  onCancelar, 
  dataAttribute,
  inputRef 
}) {
  return (
    <div data-attribute={dataAttribute} style={{ margin: "0 8px", marginBottom: "4px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <CampoTexto
            ref={inputRef}
            semRotulo
            valor={valor}
            onChange={onChange}
            placeholder="Nome da pasta"
            style={{
              height: "40px",
              width: "16ch",
              padding: "0 16px",
              fontSize: "14px",
              borderRadius: "12px",
              color: "#3C3C3C",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSalvar();
              if (e.key === "Escape") onCancelar();
            }}
          />
        </div>
        <Botao
          variante="ok"
          onClick={onSalvar}
          disabled={!valor.trim()}
        >
          OK
        </Botao>
      </div>
    </div>
  );
}