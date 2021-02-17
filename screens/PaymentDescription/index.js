import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {GotoReceiptHistory} from '../../components/globalComponents/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default class Payment extends Component {

    render() {
        return (

            // <View style={styles.container}>

            <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.textWrap}>

               
                    <Text style={{ alignSelf: 'center', marginHorizontal: 12, fontSize: 16 }}>
                        For confirm the booking order kindly done the payment by using our following details and upload the receipt.
                        </Text>
                    <View style={styles.detailStyle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>Bank Details</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>Account Name</Text>
                            <Text style={{ fontSize: 15, marginLeft: 75 }}>Classic International</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>Account Number</Text>
                            <Text style={{ fontSize: 15, marginLeft: 135 }}>1234566</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>IFSC Code</Text>
                            <Text style={{ fontSize: 15, marginLeft: 132 }}>SBINOO134556</Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, alignItems: 'center', height: hp('3%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                            <Text style={{ color: 'rgb(61,184,248)' }}>   OR   </Text>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                        </View>
                    </View>

                    <View style={styles.contactStyle}>
                        {/* <Image style={styles.imageInner} source={require('../../assets/images/dropdown.png')} /> */}
                        <Text style={styles.inputField}>  +91-7525241014</Text>
                    </View>

                    <View style={{ marginTop: 20, alignItems: 'center', height: hp('3%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                            <Text style={{ color: 'rgb(61,184,248)' }}>   OR   </Text>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                        </View>
                    </View>

                    {/* <View style={styles.contactStyle}>
                        {/* <Image style={styles.imageInner} source={require('../../assets/images/popup.png')} /> */}
                        {/* <Text style={styles.inputField}>   +91-7525241014</Text>
                    </View> */} 
 <View style={styles.detailStyle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>Bank Details 2</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>Account Name</Text>
                            <Text style={{ fontSize: 15, marginLeft: 75 }}>Classic International</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>Account Number</Text>
                            <Text style={{ fontSize: 15, marginLeft: 135 }}>1234566</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10, }}>
                            <Text style={{ fontSize: 15 }}>IFSC Code</Text>
                            <Text style={{ fontSize: 15, marginLeft: 132 }}>SBINOO134556</Text>
                        </View>

                    </View>
                    {/* <GotoReceiptHistory
                    submitOnpress={alert("ffdfdf")}
                    ButtonName="GO TO RECEIPT HISTORY"
                    /> */}
                    <TouchableOpacity  
                    style={{
                        height:hp("8%"),
                        width:wp("70%"),
                        backgroundColor: 'rgb(49,176,249)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        marginVertical: wp('5%'),
                        alignSelf: 'center',
                    }}
                    >
                        <Text style={{color:'white',fontSize:wp('5.5%')}}>
                        GO TO RECEIPT HISTORY
                        </Text>
                    </TouchableOpacity>
              
            </View>

            </ScrollView>
        //   </View>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#cccccc'
    },
    textWrap: {
       marginVertical:hp('2%'),
        //flex: 1,
        //backgroundColor: 'white'
      backgroundColor:'rgb(247,249,251)'
    },
    detailStyle: {
        width: wp('90%'),
        height: hp('20%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        //borderWidth:1,
        //borderColor:'grey',
        //marginTop: 10,
        shadowColor: 'red',
        shadowRadius: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        //borderWidth:1,
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
    },
    contactStyle: {
        width: wp('90%'),
        height: hp('8%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 20,
        borderRadius: 5,
    },
    imageInner: {
        height: hp('7%'),
        marginTop: 4,
        width: wp('8%')

    },
    inputField: {
        width: wp('75%'),
        marginLeft: 10,
        alignSelf: 'center'
        //backgroundColor:'black'
    },
  

});