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
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 60,
  },

  usersContainer: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  contentContainer: {
    flex: 4,
    justifyContent: 'space-between'
  },

  image: {
    borderRadius: 30,
    width: 60,
    height: 60
  },

  content: {
    fontSize: 13,
    marginLeft: 10,
    color: 'grey'
  },

  name: {
    fontSize: 15,
    marginLeft: 10
  },

  line: {
    height: 0.5,
    backgroundColor: 'grey',
    marginRight: 10,
    marginLeft: 10,
  }

});


const UserItem = (props) => {
  const { style, user } = props;
  const { name, avatar_url, location } = user;
  return (

    <View style={style.userContainer}>
      <Image style={styles.image}
        source={{uri: avatar_url}}
      />
      <View style={style.contentContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.content}>{location}</Text>
        </View>
        <View style={styles.line} />
      </View>

    </View>
  );
};


export default class Detail extends React.Component {

  static navigationOptions = {
    title: 'Person',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerBackTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',

  };

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
        console.log('There is an user', user);

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
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.usersContainer}>
          { this._renderUser(user) }
        </View>
      </View>
    );
  }
}
