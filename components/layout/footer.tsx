export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-10 text-sm text-slate-500 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} NovaStore. Ecommerce listo para Vercel.</p>
        <p>Pagos con Mercado Pago, transferencia bancaria y WhatsApp integrado.</p>
      </div>
    </footer>
  );
}
