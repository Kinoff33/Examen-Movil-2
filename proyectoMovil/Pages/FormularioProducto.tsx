import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ProductoContext } from '../Providers/ProviderProducto';

export default function FormularioProducto({ navigation }: any) {
  const { crearProducto } = useContext(ProductoContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState(true);
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) return Alert.alert('Permiso denegado');
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5, base64: true });
    if (!result.cancelled) {
      setImagen(result.uri);
    }
  };

  const guardar = async () => {
    if (!nombre) return Alert.alert('El nombre es obligatorio');
    await crearProducto({
      nombre, descripcion, precio: parseFloat(precio) || 0,
      estado: estado ? 'Disponible' : 'No disponible',
      categoria, url_foto: imagen || ''
    });
    navigation.goBack();
  };

  return (
    <View style={styles.contenedor}>
      <Text>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text>Descripción</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} />
      <Text>Precio</Text>
      <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />
      <Text>Categoría</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:8}}>
        <Text>Disponible</Text>
        <Switch value={estado} onValueChange={setEstado} />
      </View>
      <Button title="Tomar foto" onPress={tomarFoto} />
      <Button title="Guardar" onPress={guardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 12 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, marginVertical:6, borderRadius:6 }
});
