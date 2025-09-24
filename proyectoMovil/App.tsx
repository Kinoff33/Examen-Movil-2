import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaProductos from './Pages/ListaProductos';
import FormularioProducto from './Pages/FormularioProducto';
import DetalleProducto from './Pages/DetalleProducto';
import { ProviderProducto } from './Providers/ProviderProducto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProviderProducto>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lista">
          <Stack.Screen name="Lista" component={ListaProductos} options={{ title: 'Productos' }} />
          <Stack.Screen name="Formulario" component={FormularioProducto} options={{ title: 'Crear producto' }} />
          <Stack.Screen name="Detalle" component={DetalleProducto} options={{ title: 'Detalle' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderProducto>
  );
}
