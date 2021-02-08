import React from 'react';
import {Button, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LineChartData from '../../components/Commons/LineChart';
import colors from '../../config/colors';

const Charts = ({
  navigation,
  route: {
    params: {
      lastValue,
      lineChart2020,
      lineChartRecovered,
      lineChartDeaths,
      lineChartActive,
    },
  },
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView
      style={{
        backgroundColor: colors.black,
        paddingHorizontal: 20,
        paddingTop: top,
      }}>
      <Button title="Volver atrás" onPress={() => navigation.pop()} />
      <LineChartData data={lineChart2020} color={colors.blue} title="Gráfica" />
      {/* <LineChartData
        data={lineChartRecovered}
        color={colors.green}
        title="Recuperados"
      />
      <LineChartData
        data={lineChartDeaths}
        color={colors.red}
        title="Fallecidos"
      />
      <LineChartData
        data={lineChartActive}
        color={colors.yellow}
        title="Activos"
      /> */}
    </ScrollView>
  );
};

export default Charts;
