import axios from "axios";

export default function RegistrationButton() {
  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3001/user/user-assign");

      alert("Colaboradores asignados correctamente");
    } catch (error) {
      console.error("Error al asignar colaboradores:", error);

      alert(
        "Error al asignar colaboradores. Consulta la consola para obtener más detalles."
      );
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Asignar Colaboradores</button>
    </div>
  );
}
