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


export default class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Home' };

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarBackgroundColor: 'black'
  };

  state = { users: [] };

  componentWillMount() {
    this._loadUsers();
  }

  _sortById = (user1, user2) => {
    if (user1.id < user2.id)
      return -1;

    if (user1.id > user2.id)
      return 1;

    return 0;
  };

  _getTopUsers = (users = [], top = 5) => {
    if (users && users.length > 1) {
      return users.sort(this._sortById).splice(0, top);
    }

    return users;
  };

  _onPress = (user) => {
    const { navigate } = this.props.navigation;

    console.log('you pressed on ', user);
    const { login } = user;

    navigate('Profile', { login })
  };

  _renderUser(users) {
    return users.map(user =>
      <NamedButton
        key={user.login}
        style={styles}
        onPress={() => this._onPress(user)}
        title={user.login}
      />);
  }

  _loadUsers = () => {
    fetch('https://api.github.com/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(users => {
        const topUsers = this._getTopUsers(users);
        this.setState({ users: topUsers })
      })
      .catch(error => {
        console.error('There is an error', error);
      });
  };

  render() {
    const { users } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Top 5 GitHub Users</Text>
        <Text>Tap the username to see more information</Text>
        <View style={styles.usersContainer}>
          { this._renderUser(users) }
        </View>
      </View>
    );
  }
}
