import 'react-native-gesture-handler';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
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
  const [disableInput, setDisableInput] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState(Math.floor(Math.random() * 100000000).toString());
  const [stage, setStage] = useState(0);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    getReply(APIUrl, userID, messages[0]['text']);
  }, []);

  const buttonPress = useCallback((text, messages = []) => {
    let message = {
      _id: Math.floor(Math.random() * 1000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 1,
      }
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, message));
    getReply(APIUrl, userID, text.toString());
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
        text: jsonResponse['text'],
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Megan',
          avatar: require('../assets/avatar.png'),
        }
      }
      console.log(jsonResponse['text']);
      setMessages(previousMessages => GiftedChat.append(previousMessages, message));
      setStage(parseInt(jsonResponse['stage']));
      if (parseInt(jsonResponse['stage']) === 3 || parseInt(jsonResponse['stage']) === 4) {
        setDisableInput(false);
      } else {
        setDisableInput(true);
      }
      return true;
    });
  };

  function renderActions() {
    const buttonLayouts = {
      '2': (
      <View style={styles.actions}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['Hello!'])}
        >
          <Text style={styles.text}>Hello!</Text>
        </TouchableOpacity>
      </View>
      ),
      '5': (
      <View style={styles.actions}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['Thanks!'])}
        >
          <Text style={styles.text}>Thanks!</Text>
        </TouchableOpacity>
      </View>
      ),
      '6': (
      <View style={styles.actions}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['1'])}
        >
          <Text style={styles.text}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['2'])}
        >
          <Text style={styles.text}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['3'])}
        >
          <Text style={styles.text}>3</Text>
        </TouchableOpacity>
      </View>
      ),
      '7': (
      <View style={styles.actions}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => buttonPress(['Nice!'])}
        >
          <Text style={styles.text}>Nice!</Text>
        </TouchableOpacity>
      </View>
      )
    };
    return (
      buttonLayouts[stage.toString()]
    );
  };

  function renderBubble(props) {
    return (
      <Bubble
      {...props}
      textStyle={{
        left: {
          color: '#121212',
        },
        right: {
          color: '#fff',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#EDF6F9',
        },
        right: {
          backgroundColor: '#006d77',
        },
      }}
      />
    );
  };

  if (firstStart) {
    getReply(APIUrl, userID, 'Wake up!');
    setFirstStart(false);
  };

  return (
    <View style={styles.container}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={(props) => renderBubble(props)}
      renderInputToolbar={disableInput ? () => renderActions() : undefined}
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
    backgroundColor: '#006d77',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Megan;