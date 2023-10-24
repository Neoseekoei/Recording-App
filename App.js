import { Text, SafeAreaView, StyleSheet } from 'react-native';




import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    
     <AssetExample/>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    paddingBottom:80,
    
  },

});
