import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { ProductoContext } from '../Providers/ProviderProducto';

export default function ListaProductos({ navigation }: any) {
  const { productos, obtenerProductos, eliminarProducto } = useContext(ProductoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const confirmarEliminar = (id: number) => {
    Alert.alert('Eliminar', '¿Desea eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => eliminarProducto(id) }
    ]);
  };

  return (
    <View style={styles.contenedor}>
      <Button title="Crear producto" onPress={() => navigation.navigate('Formulario')} />
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Detalle', { producto: item })}>
            <Text style={styles.titulo}>{item.nombre} - L{item.precio}</Text>
            <Text>{item.categoria} | {item.estado}</Text>
            <Button title="Eliminar" onPress={() => confirmarEliminar(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 12 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  titulo: { fontWeight: 'bold' }
});
