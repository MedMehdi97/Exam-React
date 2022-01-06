import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import DisplayError from '../components/DisplayError';

import { getPersonDetails } from '../api/Movie';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

const Person = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestPerson();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestPerson = async () => {
    try {
      const personResult = await getPersonDetails(personID);
      setPerson(personResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }



  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données de la personne' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :

          (<ScrollView style={styles.containerScroll}>
            {displayRestaurantImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerEstab}>
                <Text style={styles.textName}>
                  {person.name}
                </Text>
                
              </View>
              
            </View>
            
          </ScrollView>)
        )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Restaurant);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: 'white',
  },
  containerNoRestaurantImage: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'white',
  },
  restaurantImage: {
    height: 180,
    backgroundColor: Colors.mainGreen,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textNote: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: 'white',
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitle: {
    fontWeight: 'bold',
    color: Colors.mainGreen,
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});