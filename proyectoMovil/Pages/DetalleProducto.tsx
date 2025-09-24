import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetalleProducto({ route }: any) {
  const { producto } = route.params;
  return (
    <View style={styles.contenedor}>
      {producto.url_foto ? <Image source={{ uri: producto.url_foto }} style={styles.imagen} /> : null}
      <Text style={styles.titulo}>{producto.nombre}</Text>
      <Text>{producto.descripcion}</Text>
      <Text>Categoria: {producto.categoria}</Text>
      <Text>Precio: L{producto.precio}</Text>
      <Text>Estado: {producto.estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex:1, padding:12 },
  imagen: { width: '100%', height: 200, marginBottom:12 },
  titulo: { fontSize:18, fontWeight:'bold' }
});
