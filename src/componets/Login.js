import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {login} from '../api/RestApi';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  let {navigation} = props;

  const submitLogin = async () => {
    setLoading(true);
    login(username, password)
      .then((res) => {
        if (res) {
          setLoading(false);
          navigation.navigate('ListProductPage');
          setErr('');
          setUsername('');
          setPassword('');
        } else {
          setLoading(false);
          console.log('Failed Login.');
          setErr('Username & Password not correct.');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('Failed Login.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logo}>
          <Image source={require('../assets/logo.png')} />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.subTitle}>Please login to your account</Text>
        </View>
        <View style={styles.vInput}>
          <TextInput
            value={username}
            onChangeText={(val) => setUsername(val)}
            placeholder="Email Address"
            style={styles.input}
            placeholderTextColor={'rgba(0,0,0,0.5)'}
          />
          <TextInput
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="Password"
            style={styles.input}
            placeholderTextColor={'rgba(0,0,0,0.5)'}
            secureTextEntry
          />
        </View>
        {err ? <Text style={{color: 'red'}}>{err}</Text> : null}
        <Pressable onPress={submitLogin} style={styles.btn}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.txtLogin}>LOGIN</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 38,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 58,
  },
  title: {
    marginTop: 14,
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.6)',
  },
  vInput: {
    marginTop: 34,
  },
  input: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginBottom: 34,
  },
  btn: {
    backgroundColor: '#0087E1',
    padding: 26,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 100,
  },
  txtLogin: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
