import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Alert } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {  Dimensions } from 'react-native';
import { connect, } from 'react-redux';
import HTML from 'react-native-render-html'
import ApiRequest from '../../services/webservice'
// import CustomHeader from '../../components/globalComponents/Header'
// import Icon from '../../assets/Icon'
export default class Termandcondition extends Component {
    constructor(props) {
        super(props)
        this.state = {
                Term:''
        }
    }

componentDidMount(){
         this.TermAPi()
   
}

TermAPi(){

    ApiRequest('', "content/terms", "GET")
    .then(async resp => {
      console.log("TermandConditionresp.data.token===>", resp)
      this.setState({Term: resp.data.description})
      // switch (resp.status) {
      //   case (900): {
      //     this.setState({ isLoading: false })
      //     setTimeout(() => {
      //       Alert.alert(
      //         '',
      //         "Please check your internet connection",
      //         [
      //           { text: 'OK', onPress: () => console.log('OK Pressed') },
      //         ],
      //         { cancelable: false },
      //       );
      //     }, 200);
      //     break;
      //   }
      //   case (200): {
      //     this.props.actions.SaveTokenAction(resp.data.token)
      //     setTimeout(() => {
      //       Alert.alert(
      //         "",
      //         resp.data.response_message,
      //         [
      //           {
      //             text: 'OK', onPress: () => { console.log('OK Pressed')
                  
      //             }
      //           },
      //         ],
      //         { cancelable: false },
      //       );

      //     }, 500);
      //     break;
      //   }


      //   default: {
      //     setTimeout(() => {
      //       Alert.alert(
      //         '',
      //         resp.data.response_message,
      //         [
      //           { text: 'OK', onPress: () => console.log('OK Pressed') },
      //         ],
      //         { cancelable: false },
      //       );
      //     }, 200);

      //   }
      //     break;
      // }

    })


}









    render() {
        return (
            // <SafeAreaView>
            
            <View style={style.container}>
              
           
                      

       <HTML html={this.state.Term} />
                     
                 
    
            </View>
            
            // </SafeAreaView>
        )
    }

}
const style=StyleSheet.create({
    container: {
        // flex:1,
        width:wp("90%"),
        alignSelf:"center",
        justifyContent: 'center',
        alignItems: 'center',
       marginVertical:Platform.OS==='ios' ? wp('17%') :null,
        backgroundColor:"white"

    },
   

})


