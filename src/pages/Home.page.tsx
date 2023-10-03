import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NavbarSimpleColored } from '../components/NavbarMinimalColored/NavbarMinimalColored';

import React, { useState } from 'react';

import { AFNThompsonComponent } from '../components/AFNThompson/ContenidoAFN';
import { EjemplosComponent } from '../components/Ejemplos/ContenidoEjemplos';
import { FAQComponent } from '../components/FAQ/ContenidoFAQ';
import { CreditosComponent } from '../components/Creditos/ContenidoCreditos';

export function HomePage() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const renderComponent = () => {
    switch (selectedOption) {
      case 'AFN Thompson':
        return <AFNThompsonComponent />;
      case 'Ejemplos':
        return <EjemplosComponent />;
      case 'FAQ':
        return <FAQComponent />;
      case 'Créditos':
        return <CreditosComponent />;
      case 'Configuración':
        return <ColorSchemeToggle />;
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}> {/* Asegúrate de que el contenedor principal tenga una altura de 100vh */}
        <NavbarSimpleColored setSelectedOption={setSelectedOption} />
        <div style={{ flex: 1, overflow: 'auto', margin: '15px' }}> {/* Ajusta la propiedad flex a 1 para que este div crezca para llenar el espacio restante */}
          {renderComponent()}
        </div>
      </div >
    </>
  );
}
