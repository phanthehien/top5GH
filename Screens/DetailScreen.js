import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },

  header: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'left',
    fontWeight: 'bold'
  },

  button: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    marginRight: 5,
    marginBottom: 5
  },

  buttonContainer: {
  },

  usersContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});


const NamedButton = (props) => {
  const { title, onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress} style={style.buttonContainer}>
      <Text style={style.button}> {title}</Text>
    </TouchableOpacity>
  );
};


export default class Detail extends React.Component {
  static navigationOptions = { title: 'Person' };
  state = { user: {} };

  componentWillMount() {
    const { login: username } = this.props.navigation.state.params;
    this._loadUser(username)
  }

  _loadUser = (username) => {
    fetch(`https://api.github.com/users/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(user => {
        this.setState({ user })
      })
      .catch(error => {
        console.error('There is an error', error);
      });
  };

  _renderUser(user) {
    return
    (
      <NamedButton
        key={user.name}
        style={styles}
        title={user.name}
      />
    );
  }

  render() {
    const user = this.state;

    console.log('There is a navigaiton', this.props);
    console.log('There is a user', user);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Top 5 GitHub Users</Text>
        <Text>Tap the username to see more information</Text>
        <View style={styles.usersContainer}>
          { this._renderUser(user) }
        </View>
      </View>
    );
  }
}
