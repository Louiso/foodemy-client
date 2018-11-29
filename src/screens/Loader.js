import React, { Component } from 'react'
import { Image , View, AsyncStorage, StyleSheet, Animated, Easing } from 'react-native'
import { loadFonts } from '../helpers/loader';

export default class Loader extends Component {
  state = {
    vuelta: new Animated.Value(0)
  }

  async componentWillMount(){
    this.spin();
  }
  spin = () => {
    Animated.timing(this.state.vuelta,
      {
        toValue: 1,
        duration: 1000 * 5,
        easing: Easing.linear
      }).start((animation)=>{
        if(animation.finished){
          this.setState({
            vuelta: new Animated.Value(0)
          });
          this.spin();
        }
      });
  }
  componentDidMount =  async () => {
    try{
      await loadFonts();
      const token = await AsyncStorage.getItem('token');
      this.props.navigation.navigate(token?'Old':'New');
    }catch(err){
      console.log(err);
    }
  }
  render() {
    const angle = this.state.vuelta.interpolate({
      inputRange: [ 0, 1],
      outputRange: [ '0deg', '360deg']
    });
    return (
      <View style = { { flex: 1, justifyContent : 'center' , alignItems: 'center'}}>
        <Animated.View style ={{
          transform: [{
            rotate: angle
          }]
        }}>
          <Image style = {{
            width: 120,
            height: 120
          }} source = { require('../../assets/dietaIcon.png')}/>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})
