import Axios from 'axios';
import React, {createContext, useContext, useReducer, useState} from 'react';
import {Alert} from 'react-native';

export const IndicatorContext = createContext();

const defaultState = {
  nombre: null,
  codigo: null,
  lastValue: 0,
  lineChart2021: [],
  lineChart2020: [],
  lineChart2019: [],
  lineChart2018: [],
};

const getLastValue = (currentValue, key) => {
  const lastValue = currentValue.slice(0);

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
        nombre: action.codigo,
        codigo: action.valor,
      };
    }
    case 'ADD_INDICATOR_DATA': {
      return {
        ...state,
        ...action.indicatorData,
      };
    }
    default:
      return state;
  }
};

const IndicatorHandler = ({children}) => {
  const [state, dispatch] = useReducer(indicatorReducer, defaultState);
  const [isLoading, updateIsLoading] = useState(false);

  const fetchData = async (selectIndicator) => {
    updateIsLoading(true);
    let indicatorData = {
      lastValue: 0,
      lineChart2021: [],
      lineChart2020: [],
      lineChart2019: [],
      lineChart2018: [],
    };
    console.log('indicador:', indicatorData);
    try {
      for (var i = 2018; i <= 2021; i++) {
        const {status, data} = await Axios({
          baseURL: 'https://mindicador.cl',
          method: 'GET',
          url: `/api/${selectIndicator}/2021`,
          timeout: 3000,
        });

        if (status === 200) {
          indicatorData.lastValue = getLastValue(data.serie, 'valor');
          indicatorData[`lineChart${i}`] = data.serie.map(
            (currentValue) => currentValue.valor,
          );
        }
      }
      dispatch({type: 'ADD_INDICATOR_DATA', indicatorData});
    } catch (error) {
      console.log({error});
    }
    updateIsLoading(false);
  };

  const selectIndicator = async (nombre, codigo) => {
    if (nombre === null) {
      await dispatch({type: 'ADD_INDICATOR', nombre: null, codigo: null});
      return;
    }

    await dispatch({type: 'ADD_INDICATOR', nombre, codigo});
    await fetchData(codigo);
  };

  return (
    <IndicatorContext.Provider
      value={{
        state,
        isLoading,
        selectIndicator,
        // backupData,
      }}>
      {children}
    </IndicatorContext.Provider>
  );
};

export default IndicatorHandler;

export const useIndicatorData = () => {
  const context = useContext(IndicatorContext);

  if (context === undefined) {
    throw new Error(
      'useIndicatorData debe ser usado dentro de IndicatorHandler',
    );
  }

  return context;
};
