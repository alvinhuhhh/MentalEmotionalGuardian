import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

function Wearable({ navigation }) {
  var bluetoothDevice;
  const bleService = '180d';
  const bleCharacteristic = '2a37';

  let manager = new BleManager();

  var [noDevice,setNoDevice]=useState(true);

  var [displayedString,setDisplayedString] = useState("Press measure");
  var [pressedCount,setPressedCount] = useState(0);
  var [placeholderHR,setPlaceholderHR] = useState(Math.floor(Math.random()*(Math.floor(121)-Math.ceil(60))+Math.ceil(60)));
  console.log('noDevice is:',noDevice);

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
      if (result) {
        console.log("Permissions are OK");
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log('Accept');
          } else {
            console.log('Refuse');
          }
        })
      }
    })
  }

  async function scanAndConnect() {
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device.name);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'Bluefruit HRM') {
        console.log('Device found!');
        manager.stopDeviceScan();

        bluetoothDevice = device;

        device.connect()
        .then((device) => {
          console.log('Device connected.');
          return device.discoverAllServicesAndCharacteristics();
        }).then((device) => {
          return device.characteristicsForService(bleService);
        }).then((services) => {
          console.log(services);
        }).catch((error) => {
          console.log(error);
        })
      }
    })
  }

  function stopScan() {
    manager.stopDeviceScan();
    console.log('Scanning stopped.');
  }

  async function disconnect() {
    manager.cancelDeviceConnection(bluetoothDevice.id)
    .then((device) => {
      console.log('Device disconnected.');
      return;
    });
  }

  function monitor() {
    console.log('Read');
    if (noDevice){
      const randHR=Math.floor(Math.random()*(Math.floor(121)-Math.ceil(60))+Math.ceil(60));
        console.log(randHR);
        setPlaceholderHR(randHR);
        console.log(placeholderHR);
        setTimeout(() => {
          setDisplayedString(placeholderHR.toString());
            pressedCount+=1;
            console.log(pressedCount);
        }, 1500);
            
    }
    else{
      manager.characteristicsForDevice(bluetoothDevice, bleService)
      .then((chars) => {
        console.log(chars);
        return;
      }).catch((error)=>{
        console.log(error);
        manager.cancelDeviceConnection(bluetoothDevice.id).then(()=>{
          console.log("disconnected");
          const randHR=Math.floor(Math.random()*(Math.floor(121)-Math.ceil(60))+Math.ceil(60));
          console.log(randHR);
          setPlaceholderHR(randHR);
          console.log(placeholderHR);
              setDisplayedString(placeholderHR.toString());
              pressedCount+=1;
              console.log(pressedCount);
        });
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileArea}>
      <TouchableOpacity onPress={()=>setNoDevice(!noDevice)}><View style={styles.profilePicture}/></TouchableOpacity>
      </View>

      <View style={styles.dataArea}>
        <Text style={styles.sectionText}>Heart</Text>
        <View style={styles.rowInDataArea}>
          <View style={styles.dataAreaBorderPadding}/>
            <View style={styles.hrSection}>
              <Text style={styles.hrNumberFont}>{displayedString}</Text>
              <Text style={styles.bpmFont}>BPM</Text>
            </View>
          {/*<View style={styles.dataDisplayArea}>
            <Text>Display Area</Text>
          </View>*/}
          <View style={styles.dataAreaBorderPadding}/>
        </View>
        <View style={styles.dataAreaBorderPadding}/>
        <TouchableOpacity
          style={[styles.buttonStyle, {justifyContent: 'flex-end', alignSelf: 'flex-end'}]}
          onPress={monitor}
          >
          <Text>Measure</Text>
        </TouchableOpacity>
        <View style={styles.dataAreaBorderPadding}/>
      </View>
      {/*<View style={styles.paddingArea}/>
      <View style={styles.dataArea}>
        <Text style={styles.sectionText}>Sleep</Text>
        <View style={styles.rowInDataArea}>
          <View style={styles.dataAreaBorderPadding}/>
          <View style={styles.dataDisplayArea}>
            <Text>Sleep Chart</Text>
          </View>
          <View style={styles.dataAreaBorderPadding}/>
        </View>
        <View style={styles.dataAreaBorderPadding}/>
      </View>*/}

      <View style={styles.paddingArea}/>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={scanAndConnect}
          >
          <Text style={styles.bottomButtonFont}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={stopScan}
          >
          <Text style={styles.bottomButtonFont}>Stop Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={()=>Linking.openURL("tel:+6518002214444")}
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
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: '#E29578'
    },
    sectionText:{
        fontSize: 20,
        paddingLeft: 8
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
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 8
    },
    buttonArea:{
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:"#2C2C1E"
    },
    buttonStyle: {
        padding: 10,
        margin: 8,
        backgroundColor: '#E29578',
        borderRadius: 10,
      },
    bottomButtonFont:{
        fontSize:20
    }
});

export default Wearable;