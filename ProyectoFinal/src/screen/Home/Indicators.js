import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import * as Animatable from 'react-native-animatable'; // https://github.com/oblador/react-native-animatable
import {useTheme} from '../../context/Theme';
import {useIndicatorData} from '../../context/IndicatorHandler';

// import {useCountryData} from '../../context/CountryHandler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
    color: colors.gray,
  },
  textInput: {
    color: colors.gray,
  },
  countryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  country: {
    marginVertical: 5,
    fontSize: 15,
    color: colors.gray,
  },
  inputContainer: {
    justifyContent: 'center',
    width: '70%',
    alignSelf: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.7,
    padding: 10,
  },
});

const Indicators = ({navigation}) => {
  const [indicators, updateIndicators] = useState([]);
  const [searchIndicator, updateSearchIndicator] = useState([]);
  const {
    mainTheme: {backgroundColor, textColor},
  } = useTheme();

  const {
    getItem: getIndicatorsItems,
    setItem: setIndicatorsItems,
  } = useAsyncStorage('@indicators:key');

  const {selectIndicator} = useIndicatorData();
  const {top} = useSafeAreaInsets();

  const getFromStorage = async () => JSON.stringify(await getIndicatorsItems);

  const filterIndicators = useCallback(
    (searchText) => {
      if (searchText) {
        const result = indicators.filter((indicador) =>
          indicador.Nombre.includes(searchText),
        );
        updateSearchIndicator(result);
      } else {
        updateSearchIndicator(indicators);
      }
    },
    [indicators],
  );

  const fetchIndicators = useCallback(async () => {
    try {
      const {status, data} = await Axios.get('https://mindicador.cl/api');
      if (status === 200) {
        const resultArray = [];
        Object.entries(data).forEach((value) => {
          if (value[1].codigo) {
            resultArray.push({
              Codigo: value[1].codigo,
              Nombre: value[1].nombre,
            });
          }
        });
        const orderedIndicators = resultArray.sort((a, b) =>
          a.Nombre.localeCompare(b.Nombre),
        );
        if (orderedIndicators) {
          await setIndicatorsItems(JSON.stringify(orderedIndicators));
        }
        updateIndicators(orderedIndicators || getFromStorage());
        updateSearchIndicator(orderedIndicators);
      }
    } catch (error) {
      updateIndicators([]);
    }
  }, []);

  useEffect(() => {
    fetchIndicators();
  }, [fetchIndicators]);

  return (
    <View style={[styles.container, {paddingTop: top, backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>
        Selecciona un indicador
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Buscar indicador..."
          placeholderTextColor={colors.gray}
          style={styles.textInput}
          onChangeText={filterIndicators}
        />
      </View>
      <FlatList
        data={searchIndicator}
        keyExtractor={(item) => item.Codigo}
        renderItem={({item: {Codigo, Nombre}}) => {
          const fadeIn = {
            0: {
              opacity: 0,
              scale: 0,
            },
            0.5: {
              opacity: 1,
              scale: 0.3,
            },
            1: {
              opacity: 1,
              scale: 1,
            },
          };

          return (
            <TouchableOpacity
              onPress={() => {
                selectIndicator(Nombre, Codigo);
                navigation.navigate('Home');
              }}
              style={styles.countryContainer}>
              <Animatable.Text
                style={[styles.country, {color: textColor}]}
                animation={fadeIn}>
                {Nombre}
              </Animatable.Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Indicators;
