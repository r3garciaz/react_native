import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import TotalData from '../../components/Home/TotalData';
import IconFeather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import Loading from '../../components/Commons/Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalize} from '../../utils';
import {useIndicatorData} from '../../context/IndicatorHandler';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {backgroundColor: '#2c3e50', flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
  },
});

const Home = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {
    mainTheme: {backgroundColor, textColor},
    darkModeEnabled,
  } = useTheme();
  const {
    state: {nombre, isLoading, lastValue, lineChart2020},
  } = useIndicatorData();

  useEffect(() => {
    IconFeather.loadFont();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor, paddingTop: top}]}>
      <Text style={[styles.title, {color: textColor}]}>
        {capitalize(nombre)}
      </Text>

      <Loading isLoading={isLoading} color={colors.white}>
        <TotalData lastValue={lastValue} />
      </Loading>
      <Button
        color={darkModeEnabled ? backgroundColor : textColor}
        onPress={() =>
          navigation.navigate('Charts', {
            lineChart2020,
          })
        }
        title="Ver gráfico"
        textColor={darkModeEnabled ? textColor : backgroundColor}
      />
    </View>
  );
};

export default Home;
