import React from 'react';
import {Button, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LineChartData from '../../components/Commons/LineChart';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';

const Charts = ({
  navigation,
  route: {
    params: {lineChart2018, lineChart2019, lineChart2020, lineChart2021},
  },
}) => {
  const {top} = useSafeAreaInsets();
  const {
    mainTheme: {backgroundColor, textColor},
    darkModeEnabled,
  } = useTheme();
  return (
    <ScrollView
      style={{
        backgroundColor: darkModeEnabled ? backgroundColor : colors.gray,
        paddingHorizontal: 20,
        paddingTop: top,
      }}>
      <Button
        color={darkModeEnabled ? backgroundColor : textColor}
        textColor={darkModeEnabled ? textColor : backgroundColor}
        title="Volver atrás"
        onPress={() => navigation.pop()}
      />
      <LineChartData
        data={lineChart2021}
        color={colors.blue}
        title="Gráfica 2021"
      />
      <LineChartData
        data={lineChart2020}
        color={colors.blue}
        title="Gráfica 2020"
      />
      <LineChartData
        data={lineChart2019}
        color={colors.blue}
        title="Gráfica 2019"
      />
       <LineChartData
        data={lineChart2018}
        color={colors.blue}
        title="Gráfica 2018"
      />
    </ScrollView>
  );
};

export default Charts;
