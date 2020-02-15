import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right, Fab } from 'native-base';
// import { MapView } from 'expo';
import MapView from 'react-native-maps';
import Meteor, { createContainer } from 'react-native-meteor';

let mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#AFFFA0"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#EAFFE5"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f9f8c7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#59A499"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#F0FF8D"
            },
            {
                "weight": 2.2
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fdfabf"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#1A87D6"
            }
        ]
    }
];


const PokeMap = ({ pokemon, flipLogin }) => {
    // if (!pokemon) {
    //     return
    // }

    const [location, setLocation] = useState({});

    const recordEvent = (x) => {
        console.log(x);
        setLocation(x)
    }

    const addPokemon = () => {
        Meteor.call('pokemon.add', location, (err, res) => {
            console.log('add function', err, res);
        })
    }

    const removePokemon = () => {
        if (pokemon && pokemon.length === 0) {
            return;
        }

        let remove = pokemon[0]._id;

        Meteor.call("pokemon.subtract", remove, (err, res) => {
            console.log('remove function', err, res);
        })
    }

    const renderPokemon = () => {
        return pokemon && pokemon.length > 0 && pokemon.map(p => {
            return (
                <MapView.Marker
                    coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                    key={p._id}
                >
                    <Image
                        source={{ uri: "http://localhost:3000/" + p.image }}
                        style={{ height: 50, width: 50 }}
                    />
                </MapView.Marker>
            )
        })
    }

    const logout = () => {
        Meteor.logout();
        flipLogin(false);
    }

    console.log(pokemon);
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Left>

                </Left>
                <Body>
                    <Title>PokeMap</Title>
                </Body>
                <Right>
                    <Button transparent onPress={logout}>
                        <Icon name="power" />
                    </Button>
                </Right>
            </Header>
            <MapView
                style={{ flex: 1 }}
                initialRegion={location}
                provider={MapView.PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                onRegionChangeComplete={(x) => recordEvent(x)}
            >
                {renderPokemon()}
            </MapView>
            <Fab
                direction="left"
                position="bottomRight"
                style={{ backgroundColor: 'green' }}
                onPress={addPokemon}
            >
                <Icon name="add" />
            </Fab>
            <Fab
                direction="right"
                position="bottomLeft"
                style={{ backgroundColor: 'red' }}
                onPress={removePokemon}
            >
                <Icon name="remove" />
            </Fab>
        </View>
    )

}

export default PokeMap
