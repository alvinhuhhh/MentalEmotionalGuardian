import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { BleManager, fullUUID } from 'react-native-ble-plx';

function Wearable({ navigation }) {
  var [buttonText,setButtonText] = useState("Connect");
  var [stillSamePage,inPage]=useState(false);
  var [connected,testConn] = useState(false);
  var focused=useIsFocused();
  var bluetoothDevice=useState();
  var deviceID;
  if (!stillSamePage){
    console.log("Watch page entered");
    stillSamePage=inPage(true);
    console.log('New BleManager created');
    return manager=new BleManager();
  }
  console.log("'focused' variable value is",focused);
  //console.log(manager,buttonText,stillSamePage,connected);
  if (!focused){
    manager.destroy();
    console.log('BleManager destroyed');
    console.log("Watch page exited");
  }
  console.log(buttonText,stillSamePage,connected);
  console.log("Bluetooth device:",bluetoothDevice);
  //console.log("Bluetooth device services:",bluetoothDevice.discoverAllServicesAndCharacteristics());
  async function scanAndConnect() {//edited from RoomLightBLE
    console.log('Scanning...');
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'Bluefruit HRM') {
        console.log('Device found!');
        manager.stopDeviceScan();
        bluetoothDevice=device;
        deviceID=device.id
        //console.log('device.id:',device.id)
        console.log('deviceID=device.id=',deviceID)
        console.log('device:',device)
        device.connect()
        .then((device) => {
          return device.discoverAllServicesAndCharacteristics();
        }).then(() => {
          console.log('Device connected.');
        }).catch((error) => {
          console.log(error);
        });
        return bluetoothDevice;
      }
    })
  }

  async function getData(){//edited/taken from RoomLightBLE
    //manager.readCharacteristicForDevice(deviceID,'0000180d-0000-1000-8000-00805f9b34fb',fullUUID('2a37'))
    manager.readCharacteristicForService(deviceID,'074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
    .then((response)=>{
      console.log(response);
      return response;
    }).catch((error) => {
      console.log(error);
    });
  }

  async function stopScan() {//edited/taken from RoomLightBLE
    console.log('Stopping...');
    manager.cancelDeviceConnection(deviceID)
    .then(() => {
      console.log('Disconnected.');
    }).catch((error) => {
      console.log(error);
    });
  }
  
  async function dataFlow(){
    console.log('Scanning...');
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'Bluefruit HRM') {
        console.log('Device found!');
        manager.stopDeviceScan();
        bluetoothDevice=device;
        deviceID=device.id
        //console.log('device.id:',device.id)
        console.log('deviceID=device.id=',deviceID)
        console.log('device:',device)
        device.connect()
        .then((device) => {
          return device.discoverAllServicesAndCharacteristics();
        }).then(() => {
          console.log('Device connected.');
        }).catch((error) => {
          console.log(error);
        });
        //return bluetoothDevice;
      }
    }).then(()=>{
      //manager.readCharacteristicForDevice(deviceID,'0000180d-0000-1000-8000-00805f9b34fb',fullUUID('2a37'))
      manager.readCharacteristicForService(deviceID,'074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
      .then((response)=>{
        console.log(response);
        return response;
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    }).then(()=>{
      console.log('Stopping...');
      manager.cancelDeviceConnection(deviceID)
      .then(() => {
        console.log('Disconnected.');
      }).catch((error) => {
        console.log(error);
      });
    })
  }

  async function scanConnectGetDisconnTry() {//Latest attempt, not really working
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'Bluefruit HRM') {
        console.log('Device found!');
        manager.stopDeviceScan();
        bluetoothDevice = device;
        device.connect()
        .then(async (device) => {
          console.log('Device connected.');
          return await device.discoverAllServicesAndCharacteristics();
          const services= await device.services();
          //return services
        }).then(()=>{
          bluetoothDevice.readCharacteristicForService('074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
            .then((response)=>{
            console.log(response);
            return response;
            })
        }).then(()=>{
          console.log('Stopping...');
          manager.cancelDeviceConnection(deviceID)
          .then(() => {
            console.log('Disconnected.');
          }).catch((error) => {
            console.log(error);
          });
        });
      }
    })
  }
  
  async function scanConnectGetDisconn() {//Works up until trying to read a value
    console.log('Scanning...');
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'Bluefruit HRM') {
        console.log('Device found!');
        manager.stopDeviceScan();
        bluetoothDevice=device;
        deviceID=device.id
        //console.log('device.id:',device.id)
        console.log('deviceID=device.id=',deviceID)
        //console.log('device:',device)
        device.connect()
        .then(async (device) => {
          //return manager.discoverAllServicesAndCharacteristicsForDevice(device.id)
          return await device.discoverAllServicesAndCharacteristics();
        }).then(() => {
            console.log('Device connected.');
            //bluetoothDevice.discoverAllServicesAndCharacteristics().then((scan)=>{console.log(scan)}).catch((error)=>{console.log(error)});
            //manager.servicesForDevice(deviceID).then((scan)=>{console.log(scan)}).catch((error)=>{console.log(error)});
            console.log(deviceID);
            //manager.descriptorsForDevice(deviceID,'0000180d-0000-1000-8000-00805f9b34fb',fullUUID('2a37'))
            //manager.readCharacteristicForDevice(deviceID,'0000180d-0000-1000-8000-00805f9b34fb',fullUUID('3131'))
            //manager.readCharacteristicForDevice(deviceID,'074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
            //bluetoothDevice.writeCharacteristicWithResponseForService('0000180d-0000-1000-8000-00805f9b34fb',fullUUID('2a37'), "AQ==")
            //bluetoothDevice.monitorCharacteristicForService('0000180d-0000-1000-8000-00805f9b34fb',fullUUID('2a37'),(error,response)=>{})
            //return bluetoothDevice.monitorCharacteristicForService('074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
            //manager.readCharacteristicForDevice(deviceID,'074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')
            return device.readCharacteristicForService('074fbcce-b336-419e-b350-7455450a6f2c','074f0001-b336-419e-b350-7455450a6f2c')})
            .then((response)=>{
            console.log(response);
            return response;
            }).then(()=>{
          console.log('Stopping...');
          manager.cancelDeviceConnection(deviceID)
          .then(() => {
            console.log('Disconnected.');
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
          console.log('Stopping due to error...');
          manager.cancelDeviceConnection(deviceID)
          .then(() => {
            console.log('Disconnected.');
          }).catch((error) => {
            console.log(error);
          });
          })
        /*})*/.catch((error) => {
          console.log(error);
        });
        //return bluetoothDevice;
      }
    })
    }

  async function dataGetFlow(){//Outright just putting the functions togetrher
    console.log("step:scanning and connecting");
    await scanAndConnect();
    console.log("step:getting data");
    await getData();
    console.log("disconnecting");
    await stopScan();
  }

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
        style={[styles.buttonStyle, {justifyContent: 'flex-end', alignSelf: 'flex-end'}]}
        //onPress={scanConnectGetDisconn}//works up to before value read
        onPress={scanConnectGetDisconnTry}//tried
        //onPress={dataFlow}//nope
        //onPress={dataGetFlow}//nope
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
        onPress={()=>[testConn(!connected),
          !connected? (scanAndConnect(),setButtonText("Disconnect")):(stopScan(),setButtonText("Connect"))]}
        >
          <Text style={styles.bottomButtonFont}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[styles.buttonStyle,{flexShrink:1}]}
        onPress={null}
        >
          <Text style={[styles.bottomButtonFont,{alignContent:"center"}]}>Send data</Text>
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
        borderColor: '#fff',
        alignItems: "center"
      },
    bottomButtonFont:{
        fontSize:20,
        justifyContent: "center"
    }
});

export default Wearable;