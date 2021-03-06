//Root Library
import React, { Component } from 'react';

//Root Components
import {
    Platform, AsyncStorage, StyleSheet,
    SafeAreaView, View, Text, TouchableOpacity, Image, Dimensions, Alert, TouchableWithoutFeedback,ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; //Responsive Screen
import TabbarImage from '../assets/images/tabbar_image.png'
var path = '../assets/';


export default {
    //tab Icons
    tab1Icon : require(path+'tab1_icon/tab1_icon.png'),
    tab1iconSel: require(path + 'tab1_icon/tab1Icon.png'),
    tab2Icon : require(path+'tab2_icon/tab2_icon.png'),
    tab2iconSel: require(path + 'tab2_icon/tab2Icon.png'),
    tab3Icon: require(path + 'tab3_icon/tab3_icon.png'),
    tab3iconSel : require(path+'tab3_icon/tab3Icon.png'),
    tab4Icon: require(path + 'tab4_icon/tab4_icon.png'),
    tab4iconSel: require(path + 'tab4_icon/tab4Icon.png'),
    menuicon: require("../assets/images/menu_icon.png"),
    backicon: require("../assets/images/backarrow_icon.png"),
    bellicon:require("../assets/images/bell_icon.png"),
    Profile: require("../assets/images/profile_icon.png"),
    Home:require("../assets/images/Home.png"),
    shopbycategory:require("../assets/images/group2.png"),
    mycart:require("../assets/images/layer7.png"),
    setting:require("../assets/images/layer10.png"),
    receipthistory:require("../assets/images/layer4.png"),
    paymentdescription:require("../assets/images/layer3.png"),
   orderhistory:require("../assets/images/order_icon.png"),
   Productenquiry:require("../assets/images/layer9.png"),
   logout:require("../assets/images/layer11.png"),
   editicon:require("../assets/images/layer62.png"),
   filtericon:require("../assets/images/filter_icon.png")
    //back_arrow: require(path + 'back_arrow.png'),
}


//Icon Component
export const IconComponent = (props) => {
    let size = props.Size ? props.Size : wp('8%')
    return (
        <View style={[styles.ImageView, {}]}>
        
            <Image
                resizeMode='contain'
                source={props.source}
                style={{ height: size, width: size }}
            />
           
        </View>
    )
}

const styles = StyleSheet.create({
    ImageView: {
        
        
    },
    Tabbarstyle:{
        width:wp('50%'),
        //height:wp('25%')
        
    }

})