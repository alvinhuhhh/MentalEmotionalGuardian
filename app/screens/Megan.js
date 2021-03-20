import 'react-native-gesture-handler';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const APIUrl = 'https://meg-backend-46.herokuapp.com/Megan/';

function Megan({ navigation }) {
  const [firstStart, setFirstStart] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState(Math.floor(Math.random() * 100000000).toString());

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    getReply(APIUrl, userID, messages[0]['text']);
  }, []);

  async function getReply(url, user_id, text) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': user_id,
        'function': 'message',
        'text': text
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      let message = {
        _id: Math.floor(Math.random() * 1000),
        text: jsonResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Megan',
          avatar: require('../assets/avatar.png'),
        }
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, message))
      return true;
    });
  };

  if (firstStart) {
    getReply(APIUrl, userID, 'Wake up!');
    setFirstStart(false);
  };

  let disableInput = true;

  function renderActions(props) {
    return (
      <View style={styles.actions}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={null}
        >
          <Text style={styles.text}>Hello!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderInputToolbar={disableInput ? (props) => renderActions(props) : undefined}
      minInputToolbarHeight={disableInput ? 88 : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  actions: {
    height: 88,
    width: '100%',
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    height: 48,
    width: 96,
    borderRadius: 15,
    backgroundColor: '#E29578',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#121212',
  },
});

export default Megan;