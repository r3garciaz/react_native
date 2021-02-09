import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';
import Loading from '../components/Commons/Loading';
import {ThemeContext} from '../context/Theme';
import SummaryData from '../components/Home/SummaryData';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {backgroundColor: '#2c3e50', flex: 1},
});

class Summary extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    IconFeather.loadFont();

    this.state = {
      currentData: [],
      dateData: new Date().getDay(),
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.fetchSummaryData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {dateData: currentDate} = this.state;
    const {dateData: lastDate} = prevState;

    if (lastDate !== currentDate) {
      this.fetchSummaryData();
    }
  };

  fetchSummaryData = async () => {
    this.setState({isLoading: true});
    try {
      const {status, data} = await axios({
        baseURL: 'https://mindicador.cl',
        method: 'GET',
        url: '/api',
        timeout: 5000,
      });

      if (status === 200) {
        this.setState({currentData: data});
        this.setState({currentDate: new Date(data.fecha).getDate()});
      }
    } catch (error) {
      console.log({error});
      this.setState({currentData: []});
    }

    this.setState({isLoading: false});
  };

  render() {
    const {currentData, isLoading} = this.state;
    const {
      mainTheme: {backgroundColor, textColor},
    } = this.context;

    const uf = currentData?.uf?.valor;
    const dolar = currentData?.dolar?.valor;
    const euro = currentData?.euro?.valor;
    const ipc = currentData?.ipc?.valor;
    const libra_cobre = currentData?.libra_cobre?.valor;

    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={[
              styles.container,
              {backgroundColor, paddingTop: insets.top},
            ]}>
            <Button
              title="Refrescar"
              onPress={() => this.fetchSummaryData()}
              color={textColor}
            />
            <Loading isLoading={isLoading} color={colors.white}>
              <SummaryData
                uf={uf}
                dolar={dolar}
                euro={euro}
                ipc={ipc}
                libra_cobre={libra_cobre}
              />
            </Loading>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
export default Summary;
