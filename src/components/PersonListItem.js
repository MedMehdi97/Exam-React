import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';


const RestaurantListItem = ({ personData, isFav = false}) => {

  const getThumbnail = () => {
    if (personData.profile_path) {
      return (
        <Image style={styles.thumbnail} source={{ uri: 'https://image.tmdb.org/t/p/w500/'+personData.profile_path }} />
      );
    };
    return (
      <View style={styles.noThumbnailContainer}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={() => {  }}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {personData.name}
          </Text>
          {/*isFav ?
            (<Image style={[styles.icon, { marginLeft: 'auto' }]} source={Assets.icons.favFull} />) :
            (null)
          */}
        </View>
        <Text>{personData.known_for_department}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});