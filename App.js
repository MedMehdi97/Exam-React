import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import Search from './src/components/Search';

export default function App() {
  /*const zomatoSearchResult = getMovies();
  console.log(zomatoSearchResult);*/
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
