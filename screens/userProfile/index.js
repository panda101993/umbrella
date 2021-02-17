import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserProfileComponent from './component'
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import Icons from './icon'
import { withNavigationFocus } from 'react-navigation';
 class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    pickSingleBase64(cropit) {
      ImagePicker.openPicker({
          width: wp('40%'),
          height: hp('20%'),
          cropping: cropit,
          includeBase64: true,
          includeExif: true,
      }).then(image => {
          console.log('received base64 image====>', image);
          this.setState({
              image: { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height },
              images: null
          });
      }).catch(e => alert(e));
  }

  renderImage(image) {
      return <Image style={{ width: wp('40%'), height: hp('20%'), borderRadius: wp('30%') }} source={image} />
  }
  namecheck = (value, type) => {
      if (type == 'firstName') {
          this.setState({ firstName: value })
          this.validateFname(value);
      }
      else if (type == 'middleName') {
          this.setState({ middleName: value })
          this.validateMname(value);
      }
  }


    componentDidMount(){
        this.EditApi() 
            // this.setState({ isLoading: true })
        
            
            }
    
        EditApi(){
            ApiRequest('', "user-management/profile", "GET",`JWT ${this.props.Token}`)
              .then(async resp => {
                console.log("resp.data.token", resp)
                switch (resp.status) {
                  case (900): {
                    this.setState({ isLoading: false })
                    setTimeout(() => {
                      Alert.alert(
                        '',
                        "Please check your internet connection",
                        [
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                      );
                    }, 200);
                    break;
                  }
                  case (200): {
                    AsyncStorage.setItem("RefreshUserdetails",JSON.stringify(false))
                        
                    this.setState({firstname:resp.data.user_details.name})
                      this.setState({lastname:resp.data.user_details.company_name})
                     //this.setState({value:resp.data.user_address.country_code})
                    this.setState({phoneNumber:resp.data.user_details.mobile_no})
                     this.setState({gstno:resp.data.user_details.gst_no})
                      this.setState({email:resp.data.user_details.email})
                      this.setState({postcode:resp.data.user_details.user_address.postal_code})
                      this.setState({address:resp.data.user_details.user_address.address})
    
    
    
                  }
        
                  default: {
                    // setTimeout(() => {
                    //   Alert.alert(
                    //     '',
                    //     resp.data.response_message,
                    //     [
                    //       { text: 'OK', onPress: () => console.log('OK Pressed') },
                    //     ],
                    //     { cancelable: false },
                    //   );
                    // }, 200);
        
                  }
                    break;
                }
        
              })
          }



    render() {
      if (this.props.isFocused) {
        AsyncStorage.getItem("RefreshUserdetails").then(resp => {
        console.log("vghdsfhghdsgf=>>",JSON.parse(resp))
        if (JSON.parse(resp) === true) {
          this.EditApi() 
        }
        else {
        }
        })
        .catch(error => {
        })
        }
        return (

            <View style={style.container}>

                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                     
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb( 247, 249, 251)", height: hp('30%') }}> */}
                            <View style={{ height: hp('30%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffff',  borderColor: '#FFFFFF' }}>
                            {this.state.image ? this.renderImage(this.state.image) :
                                <Image
                                     source={Icons.Profile}
                                    resizeMode='contain'
                                    style={{ height: hp('25%'), width: wp('35%')}}

                                />}

                                    {/* <View style={{ height: hp('6%'), width: wp('48%'), marginVertical: hp('14%') }}> */}
                                        {/* <View style={{height: hp('6%'),alignItems:'flex-end', width: wp('30%'), marginVertical: hp('14%'), justifyContent: 'flex-end',borderRadius:20,position:'absolute' }}>
                                        <TouchableOpacity onPress={() => this.pickSingleBase64(true)} >
                                            <Image
                                                source={Icons.cameraimage}
                                                resizeMode='contain'
                                                style={{ width:wp('6%'),height:hp('5%') }}
                                            />
                                            </TouchableOpacity>
                                        </View> */}
                                    {/* </View> */}
                               
                            </View>


                        {/* </View> */}
                       
                        <View style={style.cardViewStyle}>
                        <UserProfileComponent
                        firstname="Name"
                        colonIcon=":"
                        apiData={this.state.firstname}
                        />
                          <UserProfileComponent
                        firstname="Company Name"
                        colonIcon=":"
                        apiData={this.state.lastname}
                        />
                            <UserProfileComponent
                        firstname="Phone Number"
                        colonIcon=":"
                        apiData={this.state.phoneNumber}
                        />

                        <UserProfileComponent
                        firstname="E-mail ID"
                        colonIcon=":"
                        apiData={this.state.email}
                        />
                          <UserProfileComponent
                        firstname="GST NO."
                        colonIcon=":"
                        apiData={this.state.gstno}
                        />

                    <UserProfileComponent
                        firstname="Post Code"
                        colonIcon=":"
                        apiData={this.state.postcode}
                        />

                    <UserProfileComponent
                        firstname="Address"
                        colonIcon=":"
                        apiData={this.state.address}
                        />






                         </View>   
                    </ScrollView>
                </SafeAreaView>
            </View>

        )
    }

}

const mapStateToProps = state => {
    console.log("State_on_edit_Page==>>profile ", state)
    return {
      Token: state.AuthReducer.Token
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
  }
  
  export default connect(mapStateToProps,
    mapDispatchToProps
  )(withNavigationFocus(UserProfile));




const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "rgb( 247, 249, 251)"

    },
    cardViewStyle: {

        backgroundColor: '#ffffff',

        borderWidth: 0.3, borderColor: 'lightgray', width: wp('95%'), height: hp('56%')
        , shadowOpacity: 0.4,
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowRadius: 0.9,
        marginHorizontal:wp('2%')

    },

})