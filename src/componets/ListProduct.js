import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {getProducts} from '../api/RestApi';
import Icon from 'react-native-vector-icons/Entypo';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    _getData();
  }, []);

  const _getData = async () => {
    setLoading(true);
    getProducts().then((res) => {
      setLoading(false);
      setProducts(res);
    });
  };

  const _renderItem = (item, index) => {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          marginBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image source={item.img} />
          <Text>{item.name}</Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#0087E1',
                paddingHorizontal: 8,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'normal',
                  marginBottom: 8,
                  fontSize: 22,
                }}>
                Original
              </Text>
              <Text style={{color: '#fff', fontWeight: 'normal', fontSize: 22}}>
                Selling
              </Text>
            </View>
            <View style={{backgroundColor: '#fcfcfc', padding: 8}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'normal',
                  marginBottom: 8,
                  fontSize: 22,
                }}>
                {item.originalPrice}
              </Text>
              <Text
                style={{color: '#2F9752', fontWeight: 'normal', fontSize: 22}}>
                {item.sellingPrice}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#EEEEEE',
                padding: 8,
                justifyContent: 'center',
              }}>
              <Text>{item.brand}</Text>
              <Text style={{marginVertical: 4}}>{item.type}</Text>
              <Text>{item.category}</Text>
            </View>
          </View>
          <View>
            <Text style={{color: 'rgba(84, 93, 105, 0.4)'}}>5 days ago</Text>
          </View>
        </View>
        <View>
          <Icon name="chevron-thin-right" size={60} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {loading ? (
          <View style={{marginTop: 60}}>
            <ActivityIndicator color={'#000'} size={'large'} />
          </View>
        ) : (
          <View style={{marginTop: 40}}>
            {products.map((item, index) => _renderItem(item, index))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListProduct;
