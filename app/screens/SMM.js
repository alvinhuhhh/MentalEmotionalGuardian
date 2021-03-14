import 'react-native-gesture-handler';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Touchable,
} from 'react-native';

function SMM({ navigation }) {
  const [text, onChangeText] = useState("");
  const [username, setUsername] = useState("Ah Boy");
  const [handle, setHandle] = useState("@ahboy1234");
  const [posts, setPosts] = useState([]);

  function renderItem({ item }) {
    return ( 
      <View style={styles.item}>
        <View>
          <View style={styles.profile}/>
        </View>
        <View style={styles.textarea}>
          <View style={styles.namefield}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.subtitle}>{item.handle} • {item.timestamp}</Text>
          </View>
          <Text style={styles.maintext}>{item.maintext}</Text>
          <Text style={styles.rating}>Rating: {item.rating}</Text>
        </View>
      </View>
    )
  };

  function renderSeparator() {
    return (
      <View
      style={{
        height: 1,
        width: '95%',
        backgroundColor: '#ced0ce',
        alignSelf: 'center',
      }}
      />
    );
  };

  const onSend = useCallback(() => {
    let newPost = [{
      id: (posts.length + 1).toString(),
      username: username,
      handle: handle,
      timestamp: (new Date()).toDateString(),
      maintext: text,
      rating: '0.5',
    },];
    setPosts(newPost.concat(posts));
    console.log(posts);
  });

  return (
    <View style={styles.container}>
      <View style={styles.feed}>
        <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <View style={styles.input}>
        <View style={styles.inputField}>
          <TextInput
          style={styles.textInput}
          placeholder={'Type your post here...'}
          onChangeText={text => onChangeText(text)}
          />
          <TouchableOpacity
          style={styles.send}
          onPress={onSend}
          >
            <View
            style={styles.sendButton}
            >
              <Text style={{color: '#fff'}}>POST</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#121212'
  },
  feed: {
    flex: 75,
  },
  input: {
    flex: 25,
  },
  item: {
    padding: 10,
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textarea: {
    paddingLeft: 10,
  },
  namefield: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#E29578',
  },
  username: {
    color: '#fff',
    fontSize: 20,
  },
  subtitle: {
    color: '#8f8f8f',
    fontSize: 12,
    paddingLeft: 5,
    paddingBottom: 3,
  },
  maintext: {
    color: '#fff',
    fontSize: 14,
    paddingBottom: 20,
  },
  rating: {
    color: '#fff',
    fontSize: 14,
  },
  inputField: {
    flex: 100,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    flex: 80,
    height: '100%',
    padding: 10,
  },
  send: {
    width: 70,
    marginRight: '1%',
  },
  sendButton: {
    height: 35,
    borderRadius: 20,
    backgroundColor: '#006D77',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SMM;