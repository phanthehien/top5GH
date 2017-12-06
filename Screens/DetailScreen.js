import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


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
    color: 'black',
    fontSize: 20
  },

  userContainer: {
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


const UserItem = (props) => {
  const { style, user } = props;
  const { name, avatar_url, location } = user;
  return (
    <View style={style.userContainer}>
      <Image style={{width: 50, height: 50}}
        source={{uri: avatar_url}}
      />
      <Text style={style.button}>{name}</Text>
      <Text style={style.button}>{location}</Text>
    </View>
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

  _renderUser = (user) => {
    return (<UserItem user={user} style={styles} />);
  };

  render() {
    const user = this.state;
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
