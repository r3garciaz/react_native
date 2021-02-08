import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import Box from './Box';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.white,
    margin: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    flexWrap: 'wrap',
  },
});

const TotalData = ({
  lastValue = 0,
  totalConfirmed = 0,
  totalDeaths = 0,
  totalRecovered = 0,
  totalActive = 0,
}) => (
  <>
    <Text style={styles.title}>Total</Text>
    <View style={styles.container}>
      <Box
        variableData={lastValue}
        variableName="Valor del día"
        color={colors.blue}
      />
    </View>
  </>
);

export default TotalData;
