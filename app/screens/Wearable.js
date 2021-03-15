import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Wearable({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileArea}>
        <View style={styles.profilePicture}/>
      </View>
      <View style={styles.dataArea}>
        <Text style={styles.sectionText}>Heart</Text>
        <View style={styles.rowInDataArea}>
          <View style={styles.dataAreaBorderPadding}></View>
          <View style={styles.hrSection}>
            <Text style={styles.hrNumberFont}>[HR]</Text>
            <Text style={styles.bpmFont}>BPM</Text>
          </View>
          <View style={styles.dataDisplayArea}>
            <Text>Display Area</Text>
          </View>
          <View style={styles.dataAreaBorderPadding}></View>
        </View>
        <View style={styles.dataAreaBorderPadding}></View>
        <TouchableOpacity
        style={[styles.buttonArea, {justifyContent: 'flex-end', alignSelf: 'flex-end'}]}
        onPress={null}
        >
          <Text>Measure</Text>
        </TouchableOpacity>
        <View style={styles.dataAreaBorderPadding}></View>
      </View>
      <View style={styles.paddingArea}/>
      <View style={styles.dataArea}>
        <Text style={styles.sectionText}>Sleep</Text>
        <View style={styles.rowInDataArea}>
          <View style={styles.dataAreaBorderPadding}></View>
          <View style={styles.dataDisplayArea}>
            <Text>Sleep Chart</Text>
          </View>
          <View style={styles.dataAreaBorderPadding}></View>
        </View>
        <View style={styles.dataAreaBorderPadding}></View>
      </View>
      <View style={styles.paddingArea}/>
      <View style={styles.buttonArea}>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={null}
        >
          <Text style={styles.bottomButtonFont}>Sync Watch</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={null}
        >
          <Text style={styles.bottomButtonFont}>Sync Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={null}
        >
          <Text style={styles.bottomButtonFont}>Get Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    text: {
        fontSize: 14,
        color: '#fff'
    },
    profileArea: {
        flex:0.8,
        justifyContent: "center",
        alignSelf:"center"
    },
    profilePicture:{
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#E29578'
    },
    sectionText:{
        fontSize:16,
        paddingLeft:7
    },
    dataArea: {
        flex:1,
        backgroundColor: '#83C5BE', 
        borderRadius: 10, 
        borderWidth:2
    },
    rowInDataArea:{
        flex:1,
        flexDirection:'row'
    },
    dataAreaBorderPadding:{
        flex:0.05,
        alignItems:"flex-start",
        justifyContent:'center'
    },
    paddingArea:{
        flex:0.1
    },
    hrSection:{
        flex:0.8,
        alignItems:"flex-start",
        justifyContent:'center'
    },
    hrNumberFont:{
        fontSize:32,
        alignSelf:"center",
        justifyContent:"center"
    },
    bpmFont:{
        fontSize:18,
        alignSelf:"center",
        justifyContent:"center"
    },
    dataDisplayArea:{
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:"#ffffff",
        borderWidth:2,
        borderRadius:5
    },
    buttonArea:{
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:"#2C2C1E"
    },
    buttonStyle: {
        //marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        marginLeft:5,
        paddingLeft:10,
        paddingRight:10,
        marginRight:5,
        backgroundColor:'#E29578',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    bottomButtonFont:{
        fontSize:20
    }
});

export default Wearable;