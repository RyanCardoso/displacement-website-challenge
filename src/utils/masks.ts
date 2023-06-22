export const maskCEP = (cep: string) => {
  let cepFormatted = cep.replace(/\D/g, "");
  cepFormatted = cepFormatted.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");

  return cepFormatted;
};
