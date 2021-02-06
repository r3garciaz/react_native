import Axios from 'axios';
import React, {createContext, useContext, useReducer, useState} from 'react';
import {Alert} from 'react-native';

export const IndicatorContext = createContext();

const defaultState = {
  fecha: new Date().getDay.toString(),
  todayData: {},
  indicadorData: {},
};

const getLastValue = (currentValue, key) => {
  const lastValue = currentValue.slice(-1);

  if (lastValue.length) {
    return lastValue[0][key];
  }
  return 0;
};

const indicatorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INDICATOR': {
      return {
        ...state,
        indicator: action.codigo,
        valor: action.valor,
      };
    }
    case 'ADD_INDICATOR_DATA': {
      return {
        ...state,
        ...action.indicatorData,
      };
    }
    case 'ADD_INDICATOR_SUMMARY_DATA': {
      return {
        ...state,
        todayData: action.todayData,
      };
    }
    default:
      return state;
  }
};

const IndicatorHandler = ({children}) => {
  const [state, dispatch] = useReducer(indicatorReducer, defaultState);
  const [isLoading, updateIsLoading] = useState(false);

  const backupData = async () => {
    const {
      country,
      totalConfirmed,
      totalRecovered,
      totalDeaths,
      totalActive,
    } = state;
    const response = await Axios.post(
      'https://5f79f3e1e402340016f935ed.mockapi.io/react-native',
      {
        datetime: new Date().toISOString(),
        country,
        total_confirmed: totalConfirmed,
        total_recovered: totalRecovered,
        total_deaths: totalDeaths,
        total_active: totalActive,
      },
    );

    Alert.alert('Mensaje', '¡Guardado!');
  };

  const fetchData = async (selectIndicator) => {
    updateIsLoading(true);
    try {
      const {status, data} = await Axios({
        baseURL: 'https://mindicador.cl',
        method: 'GET',
        url: `/api/${selectIndicator}`,
        timeout: 3000,
      });

      if (status === 200) {
        const countryData = {
          totalConfirmed: getLastValue(data, 'Confirmed'),
          totalRecovered: getLastValue(data, 'Recovered'),
          totalDeaths: getLastValue(data, 'Deaths'),
          totalActive: getLastValue(data, 'Active'),
          lineChartConfirmed: data.map(
            (currentValue) => currentValue.Confirmed,
          ),
          lineChartRecovered: data.map(
            (currentValue) => currentValue.Recovered,
          ),
          lineChartDeaths: data.map((currentValue) => currentValue.Deaths),
          lineChartActive: data.map((currentValue) => currentValue.Active),
        };

        dispatch({type: 'ADD_COUNTRY_DATA', countryData});
      }
    } catch (error) {
      console.log({error});
    }
    updateIsLoading(false);
  };

  const fetchSummaryData = async () => {
    updateIsLoading(true);
    try {
      const {status, data} = await Axios({
        baseURL: 'https://mindicador.cl',
        method: 'GET',
        url: '/api',
        timeout: 3000,
      });

      console.log('data fetchSummaryData: ', data);

      if (status === 200) {
        const todayData = {
          uf: data.uf.valor,
          dolar: data.dolar.valor,
          euro: data.euro.valor,
          libra_cobre: data.libra_cobre.valor,
          ipc: data.ipc.valor,
        };

        dispatch({type: 'ADD_INDICATOR_SUMMARY_DATA', todayData});
      }
    } catch (error) {
      console.log('error', {error});
    }
    updateIsLoading(false);
  };

  const selectCountry = async (country, slug) => {
    if (country === null) {
      await dispatch({type: 'ADD_COUNTRY', country: null, slug: null});
      return;
    }

    await dispatch({type: 'ADD_COUNTRY', country, slug});
    await fetchData(slug);
  };

  return (
    <IndicatorContext.Provider
      value={{
        state,
        isLoading,
        selectCountry,
        backupData,
      }}>
      {children}
    </IndicatorContext.Provider>
  );
};

export default IndicatorHandler;

export const useIndicatorData = () => {
  const context = useContext(IndicatorContext);

  if (context === undefined) {
    throw new Error('useIndicatorData debe ser usado dentro de IndicatorHandler');
  }

  return context;
};
