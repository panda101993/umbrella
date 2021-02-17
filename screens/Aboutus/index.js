import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import ApiRequest from '../../services/webservice'
import HTML from 'react-native-render-html'
// import CustomHeader from '../../components/globalComponents/Header'
// import Icon from '../../assets/Icon'
export default class Aboutus extends Component {
    constructor(props) {
        super(props)
        this.state = {

            About:''

        }
    }
componentDidMount(){


    this.AboutApi()
    

}

AboutApi(){


    ApiRequest('', 'content/about-us', "GET")
    .then(async resp => {
      console.log("Aboutesp.data.token===>", resp)
      this.setState({About: resp.data.data.description})
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
              <ScrollView>
                                                {/* <Text  style={style.PrivacyAndPolicyText}>
                                   
                                   
                                 Lorem ipsum dolor sit amet, consectetur 
                                  adipiscing elit, sed do eiusmod tempor incididunt 
                                 ut labore et dolore magna aliqua. Ut enim ad minim 
                                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                   sunt in culpa qui officia deserunt mollit anim id est laborum.
                                  
                                
                                   
                                  </Text>   */}

                            
          <HTML html={this.state.About}/>
                   
              </ScrollView>
            </View>
            // </SafeAreaView>
        )
    }

}
const style=StyleSheet.create({
    container: {
         //flex:1,
        width:wp("90%"),
        alignSelf:"center",
        justifyContent: 'center',
        alignItems: 'center',
      
        backgroundColor:"white"

    },
    headerView: {
        height: hp('20%')
    },
    PrivacyAndPolicyView:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
 
        width:wp('90%'),
        //marginVertical:('5%')
        
    },
    PrivacyAndPolicyText:{
        margin:10,
      fontSize:18,
      color:"grey"
        // textAlign:"center",
    //   justifyContent:'center',
    //   alignItems:'baseline',
    //   alignSelf:'center' ,
      // width:wp('90%'), 
    }
})