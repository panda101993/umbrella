import React, { Component, useState } from 'react';
import {
    View, Text, TextInput,
    StyleSheet, TouchableOpacity,
    ActivityIndicator,
    ProgressBarAndroid,
    ProgressViewIOS,
    Platform, Image,ImageBackground
} from 'react-native';
import { Dimensions } from 'react-native'
//responsive Module
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//gradient Module
import LinearGradient from 'react-native-linear-gradient'
import SearchComponent from './CustomSearch'
import Icons from '../../Router/NavigationIcons';
import menuicon from '../../assets/images/menu_icon.png'
import Headerimage from '../../assets/images/header_image.png'
import searchicon from '../../assets/images/searchicon.png'
import locationicon from '../../assets/images/location_icon.png'
import bellicon from '../../assets/images/bell_icon.png'
import editicon from '../../assets/images/edit_icon.png'
import LocationHeader from "./locationHeader"
export const CustomHeader = (props) => {
    let standardHeight = props.Size === "medium" ? wp('15%') : props.Size === "small" ? wp('13%') : wp('12%');
    const [totalElements, SetElementsCount] = useState(0);
    const [standardFlex, setFlex] = useState(0.5)
    // switch (props) {
    //     case props.backIcon:
    //         return {

    //         }
    //     case props.
    // }

    return (
        <View style={[styles.MainContainer, {}]}>
          <LinearGradient colors={[ 'rgb(0,101,165)','rgb(61,184,248)']}  style={styles.HeaderBackgroundStyle}>

         <View style={{flexDirection:'column' ,height:hp('15%'),alignContent:'center',justifyContent:'center',marginHorizontal:wp('3%')}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                    {
                props.backicon ?
                <View style={{width:wp('90%',),alignSelf:"center",flexDirection:"row",justifyContent:"space-between"
                // backgroundColor:"yellow"
                }}>
                                    <TouchableOpacity style={[styles.ImageView, { width: wp('6%'),height:hp('3%'),justifyContent:'center'}]} onPress={ props.goback}>

                                        <Image
                                            source={Icons.backicon}
                                            resizeMode='contain'
                                            style={{width: wp('6%'),height:hp('3%')}}
                                        />
                                    </TouchableOpacity>
                                    <View style={{width:wp("20%"),flexDirection:"row",justifyContent:"space-between"}}>
                                    <TouchableOpacity 
                                    onPress={props.EditOnpress}
                                    style={{ width: wp("10%"), flexDirection:'row' }}>
                                        <Image resizeMode="contain" source={props.editimage} />
                                    </TouchableOpacity>
                                    {
                props.Bellicon ?
                       <TouchableOpacity
                       onPress={props.bellnotificationsOnpress}
                       >
                        <Image   source={props.bellicon} />
                        </TouchableOpacity>
                      
                         :null}
                           </View>
                        </View>
                        :
                    null
            }
            
                        </View>
                       
                   
            {/* <TouchableOpacity style={[styles.ImageView, {}]} onPress={()=>props.navigation.goBack()}>
                <Image
                    source={Icons.back_arrow}
                    resizeMode='contain'
                />
            </TouchableOpacity> */}
            <View style={[styles.HeaderView,{flex:1}]}>
                <Text style={[styles.titleText, { fontSize: wp('7%'),fontWeight:'700' }]}>{props.Title}</Text>
            </View>
            </View>
            {/* <TouchableOpacity style={[styles.ImageView,{backgroundColor:'blue'}]}>
                <Image
                    source={Icons.back_arrow}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ImageView,]}>
                <Image
                    source={Icons.back_arrow}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ImageView,{backgroundColor:'blue'}]}>
                <Image
                    source={Icons.back_arrow}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            */}
            </LinearGradient>
        </View>
    )
}



export const CustomHeader2 = (props) => {
    let standardHeight = props.Size === "medium" ? wp('15%') : props.Size === "small" ? wp('13%') : wp('12%');
    const [totalElements, SetElementsCount] = useState(0);
    const [standardFlex, setFlex] = useState(0.5)
    // switch (props) {
    //     case props.backIcon:
    //         return {

    //         }
    //     case props.
    // }

    return (
        <View style={[styles.MainContainer],{zIndex:1}}>
           
            <LinearGradient colors={[ 'rgb(0,101,165)','rgb(61,184,248)']}  style={styles.HeaderBackgroundStyle}>




            {
                props.menuicon ?
                   
                    <View style={{
                     
                        flexDirection:'row',justifyContent:'space-between',alignItems:'center',   width:wp("95%"),
                        alignSelf:"center",}} >
                     <TouchableOpacity style={[styles.ImageView, { paddingHorizontal: 10 }]}  onPress={props.menuonPress}>
                        <Image
                            source={props.menuicon}
                            resizeMode='contain'
                        />
                            </TouchableOpacity>

                       { props.filtericon ?
                        <View  style={{}}>
                       <TouchableOpacity  style={{marginLeft:wp("10%")}}
                       
                       onPress={props.filtericonpress}
                       
                       >
                      <Image   source={props.filtericon} style={{marginVertical:Platform.OS==="ios" ? hp('5%') : wp('1%'),marginLeft:wp('54%')}}/>
                       </TouchableOpacity>
                       </View>
                    :
                    null
                
                       }
                       
                       <TouchableOpacity
                    onPress={props.bellicononpress}
                       >
                        <Image   source={props.bellicon} style={{marginVertical:Platform.OS==="ios" ? hp('5%') : wp('1%')}}/>
                        </TouchableOpacity>
                        </View>
                
                   
                    :
                    null
            }
            {/* <TouchableOpacity style={[styles.ImageView, {}]} onPress={()=>props.navigation.goBack()}>
                <Image
                    source={Icons.back_arrow}
                    resizeMode='contain'
                />
            </TouchableOpacity> */}
            <View style={[styles.HeaderView1,{}]}>
                <Text style={[styles.titleText, { fontSize: wp('7%'),fontWeight:'700' }]}>{props.Title}</Text>
                {   
                    props.location ?
                // <View style={{ flexDirection:'row'}}>
                // <Image source={locationicon} style={styles.locationstyle}/>
                // <Text style={styles.locationtextstyle}>Okhla phase1,New Delhi</Text>
<LocationHeader/>
                
               
                // </View>
             
                :
                null
                }

                </View>
           
            
                

            </LinearGradient>
            
            <View style={{position:'absolute',alignSelf:'center',marginTop: Dimensions.get('screen').height >= '800' ? wp('30%') : Dimensions.get('screen').height >= '700' ? wp('33%') : wp('30%'),}} >
            {props.search ?
            <SearchComponent
  {...props}
            Searchicon={searchicon}
            placeholder="Search by product name"
            />

            :
            null
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        // marginVertical:wp('4%'),
         //flex:1,
        //paddingHorizontal:10,
        //flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent:'flex-end',
        height: hp('20%'),
        //width:wp('100%'),
        //backgroundColor: 'red',
        //marginVertical: hp('-10%'),
         //justifyContent: 'space-evenly',
        // marginVertical: 5,
        // flexDirection: 'column',
        // borderRadius: 12,
        // borderColor: 'grey',
        // width: wp('100%'),
        //  height: hp('30%'), 
    },
    ImageView: {
    // height:hp('2%')
        //flex: 0.8,
         //backgroundColor:'blue'
        //marginVertical:wp('5%'),
        
    },
    titleText: { color: 'white',alignSelf:'center' },
    editiconstyle:{
        marginLeft:8
          
    },
    locationtextstyle:{
        color:'white',
        marginLeft:6
       
    },

    locationstyle:{
        //marginHorizontal:wp('10%')
   
    },
    HeaderView: {
    
        marginVertical:hp('-3%'),
        //marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
         //backgroundColor:'red',
        alignItems: 'center'
    },

    HeaderView1: {
    width:wp("95%"),
    alignSelf:"center",
        marginVertical:Platform.OS==="ios" ? hp('-4%') : hp('3%'),
        //marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        //  backgroundColor:'red',
        alignItems: 'center'
    },
    HeaderBackgroundStyle:{
        width: wp('100%'),
         height: hp('20%'),
        flexDirection:'column'
           
            
              
    },
    

})