import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard} from 'react-native';
import Colors from '../definitions/Colors';
import { getPeople } from '../api/Movie';
import DisplayError from '../components/DisplayError';
import PersonListItem from '../components/PersonListItem'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [people, setPeople] = useState([]);
    const [nextOffset, setNextOffset] = useState(2);
    const [isMoreResults, setIsMoreResults] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    const requestPeople = async (prevPeople, offset) => {
        setIsRefreshing(true);
        setIsError(false);
        try {
          const peopleSearchResult = await getPeople(searchTerm, offset);
          setPeople([...prevPeople, ...peopleSearchResult.results]);
          if (peopleSearchResult.results_start + peopleSearchResult.results_shown < peopleSearchResult.results_found) {
            setIsMoreResults(true);
            setNextOffset(peopleSearchResult.results_start + peopleSearchResult.results_shown);
          } else {
            setIsMoreResults(false);
          }
        } catch (error) {
          setIsError(true);
          setPeople([]);
          setIsMoreResults(true);
          setNextOffset(1);
        }
        setIsRefreshing(false);
      };
    const searchPeople = () => {
        Keyboard.dismiss();
        requestPeople([], 1);
    };
    
    const loadMorePeople = () => {
        if (isMoreResults) {
          requestPeople(people, nextOffset);
        };
    };

    return (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder='Nom de la personne'
              style={styles.inputPersonName}
              onChangeText={(text) => setSearchTerm(text)}
              onSubmitEditing={searchPeople}
            />
            <Button
              title='Rechercher'
              color={Colors.mainBlue}
              onPress={searchPeople}
            />
          </View>
          {
        isError ?
          (<DisplayError message='Impossible de récupérer les personnes' />) :
          (<FlatList
            data={people}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                
              <PersonListItem
                personData={item}
                /*onClick={navigateToRestaurantDetails}
                isFav={amIaFavRestaurant(item.restaurant.id)}*/ />
            )}
            onEndReached={loadMorePeople}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchPeople}
          />)
        }
        </View>
         
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      marginTop: 16,
    },
    searchContainer: {
      marginBottom: 16,
    },
    inputPersonName: {
      marginTop: 35,
      marginBottom: 8,
      width: 300,
    },
  });

  export default Search;