import * as yup from "yup";

const msg = "Campo obrigatório";

export const clientSchema = yup.object({
  firstName: yup.string().required(msg).trim(),
  lastName: yup.string().required(msg).trim(),
  typeDocument: yup.string().required(msg),
  document: yup.string().required(msg),
  cep: yup.string().required(msg),
  street: yup.string().required(msg).trim(),
  number: yup.string().required(msg),
  neighborhood: yup.string().required(msg).trim(),
  uf: yup.string().required(msg),
  city: yup.string().required(msg).trim(),
});
