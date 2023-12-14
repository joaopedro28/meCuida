import React from 'react';
import { View, Text , ScrollView, StyleSheet} from 'react-native';
import Accordion from '../components/Accordion';

import jsonData from '../../assets/json/diabetes.json';

const data = jsonData.diabetes;

const ReactPage = () => {
  return (
    <View>
      <ScrollView>
        <Text style={styles.title}>Dúvidas sobre Diabetes Melitus Tipo 2</Text>
        <Accordion data={data} listItemColor="#00ddff" bulletColor="#fff" toggleTextColor="#fff" contentColor="#fff"/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 16,
      textAlign: 'center',
  },
});
export default ReactPage;
