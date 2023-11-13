import axios from "axios";

export default function RegistrationButton() {
  const handleClick = async () => {
    try {
      // Realizar la solicitud a tu endpoint
      const response = await axios.post(
        "http://localhost:3001/user/user-assign"
      );

      // Mostrar un alert con el mensaje específico
      alert("Colaboradores asignados correctamente");
    } catch (error) {
      // Manejar los errores aquí
      console.error("Error al asignar colaboradores:", error);

      // Mostrar un alert con el mensaje de error
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
