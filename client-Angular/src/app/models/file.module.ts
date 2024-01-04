export interface File {
  Cuit?: number | null;
  Numero_de_Comercio?: number | null;
  Nombre_Comercio?: string | null;
  Nombre_Titular?: string | null;
  Cod_Postal_Legal?: number | null;
  Teléfono?: string | null;
  Calle_Comercio?: string | null;
  Número?: number | null;
  Nombre_Legal?: string | null;
  EMAIL?: string | null;
  Promoción?: string | null;
  Legajo?: number | null;
  Gestionado: string; // Obligatorio según tu modelo Sequelize
}
