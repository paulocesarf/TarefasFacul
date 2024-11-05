import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefa, definirTarefa] = useState('');
  const [tarefas, definirTarefas] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const hdTarefas = await AsyncStorage.getItem('tarefas');
      if (hdTarefas) definirTarefas(JSON.parse(hdTarefas));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const salvarTarefas = async () => {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    };
    salvarTarefas();
  }, [tarefas]);

  const addTarefa = () => {
    if (tarefa.trim() === '') return;
    definirTarefas([...tarefas, tarefa]);
    definirTarefa('');
  };

  const deletarTarefa = (index) => {
    const novoApagado = tarefas.filter((_, i) => i !== index);
    definirTarefas(novoApagado);
  };

  const apagarTudo = () => {
    definirTarefas([]);
  };

  const ItemLista = ({ item, index }) => (
    <View style={styles.caixaTarefa}>
      <Text style={styles.textoTarefa}>{item}</Text>
      <TouchableOpacity onPress={() => deletarTarefa(index)} style={styles.botao}>
        <Text style={styles.botaoApagar}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui a Tarefa"
        value={tarefa}
        onChangeText={definirTarefa}
      />
      <TouchableOpacity style={styles.button} onPress={addTarefa}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        ItemLista={ItemLista}
        style={styles.listaTarefas}
      />
      <TouchableOpacity style={styles.deletarTudoButton} onPress={apagarTudo}>
        <Text style={styles.deletarTudo}>Apagar Todas Tarefas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 50, 
    paddingHorizontal: 20 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    alignSelf: 'center', 
    marginBottom: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  listaTarefas: { 
    marginTop: 20 
  },
  caixaTarefa: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  textoTarefa: { 
    fontSize: 18 
  },
  botao: { 
    backgroundColor: '#FF3B30', 
    padding: 5, 
    borderRadius: 5 
  },
  botaoApagar: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  deletarTudoButton: { 
    backgroundColor: '#FF3B30', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 20 
  },
  deletarTudo: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});

