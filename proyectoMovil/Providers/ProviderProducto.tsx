import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ProductoContext = createContext<any>({});

export const ProviderProducto = ({ children }: any) => {
  const [productos, setProductos] = useState<any[]>([]);

  // Cambia esta URL si pruebas en dispositivo real
  const URL_BASE = 'http://10.0.2.2:3000'; // emulador Android usa 10.0.2.2; si usas expo en físico, usar IP de la PC

  const obtenerProductos = async () => {
    try {
      const resp = await axios.get(`${URL_BASE}/productos`);
      setProductos(resp.data);
    } catch (e) {
      console.log('Error al obtener productos', e);
    }
  };

  const crearProducto = async (producto: any) => {
    try {
      const resp = await axios.post(`${URL_BASE}/productos`, producto);
      setProductos(prev => [resp.data, ...prev]);
    } catch (e) {
      console.log('Error al crear', e);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await axios.delete(`${URL_BASE}/productos/${id}`);
      setProductos(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.log('Error al eliminar', e);
    }
  };

  return (
    <ProductoContext.Provider value={{ productos, obtenerProductos, crearProducto, eliminarProducto }}>
      {children}
    </ProductoContext.Provider>
  );
};
