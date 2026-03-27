import { MercadoPagoConfig, Preference } from "mercadopago";

export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  return new MercadoPagoConfig({
    accessToken,
    options: { timeout: 5000 },
  });
}

export function getPreferenceClient() {
  const client = getMercadoPagoClient();
  return client ? new Preference(client) : null;
}
