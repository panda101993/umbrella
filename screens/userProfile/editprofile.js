import React, { Component } from 'react'
import {Loader} from '../../components/globalComponents/Loader'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground,Alert,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserProfileComponent from './component'
import {handleValidations} from "./function"
import Mask from 'react-native-mask'
// import ImagePicker from 'react-native-image-crop-picker'
// import CustomHeader from '../../components/globalComponents/Header'
 import Icons from './icon'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { SubmitButton } from '../../components/globalComponents/Button'
import  DefaultState from  "./constant"
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import{withNavigationFocus} from "react-navigation"



 class editprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: "",         //Image Picker source
            isUploadImg: false,
            isLoading:false,         //for default image 
            DefaultState
        }

    }


    componentDidMount(){
        this.ProfileApi() 
            // this.setState({ isLoading: true })
        
            
            }
    
        ProfileApi(){
            ApiRequest('', "user-management/profile", "GET",`JWT ${this.props.isLoading}`)
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
                    this.setState({
                    firstnameStatus:true,
                    firstnameError:"",
                    activefirstnameBorderColor:true,
                
                    lastnameStatus:true,
                    lastnameError:"",
                    activelastnameBorderColor:true,
                
                    phoneNumberStatus: true,
                    phoneNumberError: '',
                    activephoneNumberBorderError: true,
                
                    emailStatus:true,
                    emailError:"",
                    activeemailBorderColor:true,
                
                
                    gstnoStatus:true,
                    gstnoError:"",
                    activegstnoBorderColor:true,
                    
                
                 
                    postcodeStatus:true,
                    postcodeError:"",
                    activepostcodeBorderColor:true,
                   
                
                  
                    addressStatus:true,
                    addressError:"",
                    activeaddressBorderColor:true,
                
                  
                    
                
                })
                    //AsyncStorage.setItem("RefreshUserdetails",JSON.stringify(false))
                       
                    this.setState({firstname:resp.data.user_details.name})
                      this.setState({lastname:resp.data.user_details.company_name})
                     //this.setState({value:resp.data.user_address.country_code})
                    this.setState({phoneNumber:resp.data.user_details.mobile_no})
                     this.setState({gstno:resp.data.user_details.gst_no})
                      this.setState({email:resp.data.user_details.email})
                      this.setState({postcode:resp.data.user_details.user_address.postal_code})
                      this.setState({address:resp.data.user_details.user_address.address})
    
    
    
                    // var backendresp = resp.data.responseCode
                    // console.log("resp.data.token", resp.data.token)
                    // resp.data.token == !null ? this.setState({ Token: resp.data.token }) : null
                //  AsyncStorage.setItem("Token",JSON.stringify(resp.data.token))
                // backendresp === 200 ? this.props.actions.SaveTokenAction(resp.data.token) : null
                    // this.setState({ isLoading: false })
                  //   setTimeout(() => {
                  //     Alert.alert(
                  //       "",
                  //       resp.data.response_message,
                  //       [
                  //         {
                  //           text: 'OK', onPress: () => {
                  //           //   backendresp === 200 ?
                  //             this.props.navigation.navigate("OtpVerify")
                  //               // : console.log('OK Pressed')
        
                  //           }
                  //         },
                  //       ],
                  //       { cancelable: false },
                  //     );
        
                  //   }, 500);
                  //   break;
                  // }
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
        return <Image style={{ width: wp('40%'), height: hp('20%'), borderRadius: wp('30%'),position:'absolute' }} source={image}/>
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
  
       

    EditApi(){
         this.setState({isLoading:true})
        let EditDetails =
        {

            "name": this.state.firstname,
            "company_name": this.state.lastname,

            // "mobile_no": this.state.phoneNumber,
            "email": this.state.email,

            "user_address": {
                "address": this.state.address,
                "postal_code": this.state.postcode,
            }

        }
        console.log("dataaaa===>>>",EditDetails)
        ApiRequest(EditDetails, "user-management/profile", "POST",`JWT ${this.props.isLoading}`)
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
               this.setState({isLoading:false})
                setTimeout(() => {
                  Alert.alert(
                    "",
                    resp.data.response_message,
                    [
                      {
                        text: 'OK', onPress: () => {
                            AsyncStorage.setItem("RefreshUserdetails",JSON.stringify(true))
                            this.props.navigation.navigate("UserProfile")
                        //   backendresp === 200 ?
                          //this.props.navigation.navigate("OtpVerify")
                            // : console.log('OK Pressed')
    
                        }
                      },
                    ],
                    { cancelable: false },
                  );
    
                }, 500);
                break;
              }
    
    
              default: {
                this.setState({isLoading:false})
                setTimeout(() => {
                  Alert.alert(
                    '',
                    resp.data.response_message,
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                  );
                }, 200);
    
              }
                break;
            }
    
          })
      }
    

    SignupSubmit() {
        if (this.state.firstnameStatus) {
            if (this.state.lastnameStatus) {
                
                    if (this.state.emailStatus) {
                   
                       
                            if(this.state.postcodeStatus){
                                if(this.state.addressStatus){
                                            
                                    this.EditApi()
                           
                                   
                                }
                        else { this.setState({ addressError: '*Please enter address.', addressStatus: false, activeaddressBorderColor: true }) }
                        }
                        else { this.setState({ postcodeError: '*Please enter postcode.', postcodeStatus: false, activepostcodeBorderColor: true }) }
                        }
                        
                    
                    else { this.setState({ emailError: '*Please enter email.', emailStatus: false, activeemailBorderColor: true }) }
                }
               
            else { this.setState({ lastnameError: '*Please enter company name.', lastnameStatus: false, activelastnameBorderColor: true }) }
        }
        else { this.setState({ firstnameError: '*Please enter name.', firstnameStatus: false, activefirstnameBorderColor: true }) }


    }

    handlevalidate = (text, type) => {
        // console.log("text, type==>", text, type)

        let status = `${type}Status`;
        let errorText = `${type}Error`;
        let activeBorderColor = `active${type}BorderColor`;
        let resp = handleValidations(text, type)
        console.log("Resp==>", resp)
        this.setState({
            [type]: resp.value,
            [errorText]: resp.errorText,
            [status]: resp.status,
            [activeBorderColor]: !resp.status
        })

    }

    render() {
        return (

            <View style={style.container}>

                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                     
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb( 247, 249, 251)", height: hp('30%') }}> */}
                            <View style={{ height: hp('30%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffff',  borderColor: '#FFFFFF' }}>
                            {this.state.image ? this.renderImage(this.state.image) :
                           
                                <Image
                                     //source={Icons.Profile}
                                     source={Icons.Profile}
                                    resizeMode='contain'
                                    style={{ height: hp('25%'), width: wp('35%')}}
                                   
                                 />
                            }
                                    {/* <View style={{ height: hp('6%'), width: wp('48%'), marginVertical: hp('14%') }}> */}
                                        <View style={{height: hp('6%'),alignItems:'flex-end', width: wp('30%'), marginVertical: hp('14%'), justifyContent: 'flex-end',borderRadius:20,position:'absolute'}}>
                                        {/* <TouchableOpacity onPress={()  => this.pickSingleBase64(true)}>
                                            <Image
                                                source={Icons.cameraimage}
                                                resizeMode='contain'
                                                style={{ width:wp('6%'),height:hp('5%') }}
                                                 
                                            />
                                           </TouchableOpacity> */}

                                        </View>
                                    {/* </View> */}
                              
                               
                            </View>


                            <CustomTextInput
                                    MyPlaceholder="Name*"
                                    onChangeText={(text) => this.handlevalidate(text, "firstname")}
                                    ErrorText={this.state.firstnameError}
                                    textCon={{ borderBottomColor: this.state.activefirstnameBorderColor ? "red" : "white" }}
                                    maxLength={15}
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.firstname}
                                    returnKeyType="next"
                                    InputRef={(input) => this.firstname = input}
                                    onSubmitEditing={() => { this.lastname.focus(); }}
                                    textInputStyle={{ paddingLeft: 20 }}

                                />
                                <CustomTextInput
                                    MyPlaceholder="Company Name*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.lastname}
                                    onChangeText={(text) => this.handlevalidate(text, "lastname")}
                                    ErrorText={this.state.lastnameError}
                                    textCon={{ borderBottomColor: this.state.activelastnameBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.lastname = input}
                                    onSubmitEditing={() => { this.phoneNumber.focus(); }}
                                    maxLength={15}
                                />
                                {/* <View style={style.MobileNumberCountryCodeView}>
                                    <CustomTextInput
                                        InputFieldMainContainer={{ width: wp('22%'), height: hp("10%"), justifyContent: 'space-between' }}

                                        MyPlaceholder="+91"
                                        textInputStyle={{ width: wp('20%'), paddingLeft: 20, height: hp('8%'), }}
                                        value={this.state.value}
                                        //onChangeText={(value) => this.mobileNumberValidate(value)}
                                        // ErrorText={this.state.lastNameErrorMessage}
                                    />
                                    <CustomTextInput
                                        InputFieldMainContainer={{  marginTop:hp("1%"),width: wp('55%'), justifyContent: 'flex-end', }}
                                        MyPlaceholder="Phone Number*"
                                        textInputStyle={{ paddingLeft: 20, width: wp('52%'), height: hp('8%') }}
                                        value={this.state.phoneNumber}
                                        onChangeText={(text) => this.handlevalidate(text, "phoneNumber")}
                                        // ErrorText={this.state.phoneNumberError}
                                     
                                        textCon={{borderBottomColor: this.state.activephoneNumberBorderError ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.phoneNumber = input}
                                    onSubmitEditing={() => { this.email.focus(); }}
                                    maxLength={10}
                                    />
                               
                                </View> */}
                                
                                <CustomTextInput
                                    MyPlaceholder="Email*"
                                    textInputStyle={{ paddingLeft: 20, }}
                                    value={this.state.email}
                                    onChangeText={(text) => this.handlevalidate(text, "email")}
                                    ErrorText={this.state.emailError}
                                    textCon={{ borderBottomColor: this.state.activeemailBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.email = input}
                                    onSubmitEditing={() => { this.gstno.focus(); }}
                                    
                                />
                                {/* <CustomTextInput
                                    MyPlaceholder="GST No.*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.gstno}
                                    onChangeText={(text) => this.handlevalidate(text, "gstno")}
                                    ErrorText={this.state.gstnoError}
                                    textCon={{ borderBottomColor: this.state.activegstnoBorderColor ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.gstno = input}
                                    onSubmitEditing={() => { this.postcode.focus(); }}
                                /> */}
                                <CustomTextInput
                                    MyPlaceholder="Postcode*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.postcode}
                                    onChangeText={(text) => this.handlevalidate(text, "postcode")}
                                    ErrorText={this.state.postcodeError}
                                    textCon={{ borderBottomColor: this.state.activepostcodeBorderColor ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.postcode = input}
                                    onSubmitEditing={() => { this.address.focus(); }}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Address*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.address}
                                    onChangeText={(text) => this.handlevalidate(text, "address")}
                                    ErrorText={this.state.addressError}
                                    textCon={{ borderBottomColor: this.state.activeaddressBorderColor ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.address = input}
                                    // onSubmitEditing={() => { this.password.focus(); }}
                                />
                                <SubmitButton
                                // disabled={this.state.termAndConditionToggle===true?false:true}
                                   submitOnpress={() => 
                                   
                                    
                                    this.SignupSubmit()}
                                    
                                    Size={"medium"}
                                    ButtonText={{fontSize:18}}
                                    ButtonName="S A V E"
                                />
                       
                    </ScrollView>
                </SafeAreaView>
                <Loader
                visible={this.state.isLoading}
               
                
                />
            </View>

        )
    }

}


const mapStateToProps = state => {
    console.log("State_on_edit_Page==>> ", state)
    return {
      isLoading: state.AuthReducer.Token
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
  }
  
  export default connect(mapStateToProps,
    mapDispatchToProps
  )(withNavigationFocus(editprofile));



const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "rgb( 247, 249, 251)"
            // backgroundColor: "red"

    },
    cardViewStyle: {

        backgroundColor: '#ffffff',

        borderWidth: 0.3, borderColor: 'lightgray', width: wp('95%'), height: hp('56%')
        , shadowOpacity: 0.4,
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowRadius: 0.9,
        marginHorizontal:wp('2%')

    },
    MobileNumberCountryCodeView: {
        flexDirection: 'row',
        width: wp('83%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    ErrorView:{
        alignSelf:"center", 
        width: wp("80%"),
         height: hp("4%"),
         
        //  backgroundColor:'yellow'

    },
    ErrorText:{
        color: "red",
    },

})