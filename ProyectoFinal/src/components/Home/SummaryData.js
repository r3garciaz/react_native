import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';
import Box from './Box';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.yellow,
    textAlign: 'center',
    margin: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    flexWrap: 'wrap',
  },
});

const SummaryData = ({
  uf = 0,
  dolar = 0,
  euro = 0,
  ipc = 0,
  libra_cobre = 0,
}) => {
  const {
    mainTheme: {textColor},
  } = useTheme();

  return (
    <>
      <Text style={[styles.title, {color: textColor}]}>
        {`Resumen Principales Indicadores ${new Date().getFullYear()}`}
      </Text>
      <View style={styles.container}>
        <Box variableData={uf} variableName="UF" color={colors.blue} />
        <Box variableData={dolar} variableName="Dólar" color={colors.green} />
        <Box variableData={euro} variableName="Euro" color={colors.red} />
        <Box variableData={ipc} variableName="IPC" color={colors.yellow} />
        <Box
          variableData={libra_cobre}
          variableName="Libra de Cobre"
          color={colors.orange}
        />
      </View>
    </>
  );
};

export default SummaryData;
