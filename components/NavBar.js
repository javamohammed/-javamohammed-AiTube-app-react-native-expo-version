import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, Dimensions,WebView, ListView } from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';



const NavBar = props =>{
    const [numberColumn, setNumberColumn] = useState(Dimensions.get('window').width > 700 ? 3 : 1)
    useEffect(()=>{
       StatusBar.setHidden(true);
       const updateLayout = () => {
           setNumberColumn(Dimensions.get('window').width > 700 ? 3 : 1)
       }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [])
    //console.log('width - ', width)
    return (
        <View style={styles.navBar}>
          <Image
            source={require("../assets/aictube.png")}
            style={{ width: 98, height: 22 }}
          />
          <View style={styles.rightNav}>
            <TouchableOpacity>
              <Ionicons
                style={styles.navItem}
                title="Search"
                name="md-search"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPress}>
              <MaterialCommunityIcons
                style={styles.navItem}
                title="Account"
                name="account-circle"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        height: 55,
        backgroundColor: 'white',
        elevation: 3,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rightNav: {
        flexDirection: 'row'
    },
    navItem: {
        marginLeft: 25
    }
})
export default NavBar