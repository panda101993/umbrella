import React, { Component } from 'react';
import { Alert,Image,Modal,View, Text,FlatList,TouchableOpacity,ScrollView ,StyleSheet, ImageBackground} from 'react-native';
//Default States
import   DefaultStates  from '../OrderReview/constant'
import { CardElement } from '../../components/CardComponent'
import { CustomHeader } from '../../components/globalComponents/Header'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from 'react-navigation';
import ApiRequest from "../../services/webservice"
import Icons from "./constant"
import { Loader } from '../../components/globalComponents/Loader';
class OrderReview extends Component {
  constructor(props) {
    super(props);
    this.state =  DefaultStates
       

  }


  renderOrder = ({ item, index }) => {
    return (
      <CardElement
        productname={item.sub_category.product_name}
        productprice={item.sub_category.amount}
        productquantity={item.sub_category.quantity}
        totalprice={item.totalprice} 
      />
    )
  }
componentDidMount(){
  this.addressListApi()
  this.CheckoutApi()
}

addressListApi(){
  
 
 
    this.setState({isLoading:true})

  ApiRequest({}, "user-management/address", "GET",`JWT ${this.props.Token}`)
    .then(async resp => {
      console.log("resp.data.token===>adreessss", resp)
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
          this.setState({ isLoading: false })
          
        let convertbannerarray = resp.data.data.filter(item => (item.is_default === true) ? item : null)
      

          this.setState({ name:`${convertbannerarray[0].first_name} ${convertbannerarray[0].last_name}`,
          address:convertbannerarray[0].address,
          postal_code:convertbannerarray[0].postal_code,
          mobile_no:convertbannerarray[0].mobile_no})
  
         
          break;
        }


        default: {
          this.setState({ isLoading: false })
          setTimeout(() => {
            Alert.alert(
              '',
              resp.data.subject[0],
              [
                { text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false },
            );
          }, 200);

        }
          break;
      }

    })



  }

CheckoutApi(){
  // this.setState({ isLoading: true })
  ApiRequest('', 'user-management/check-out', "GET", `JWT ${this.props.Token}`)
  .then(async resp => {
    console.log("resp.data.tokencategoryn", resp)
    switch (resp.status) {
      case (900): {
        // this.setState({ isLoading: false })
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
     
        this.setState({ Oderreviewlist: resp.data.data })
        this.setState({subtotal:resp.data.sub_total,gsttotal:resp.data.gst_total,
          paybale_ammount:resp.data.paybale_ammount,expecteddelivery:resp.data.expecteddelivery,
        
        })
    
        break;
      }

      default: {
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
PlaceOrder(){
  this.setState({modalVisible:false}),
  this.props.navigation.navigate("RecieptHistorycart")
}
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{  marginTop: wp('2%'),width:wp("90%"),alignSelf:"center",  }}>
        <Loader
                visible={this.state.isLoading}
                />
          <View style={{
           
            width:wp("90%"),
            alignSelf:"center", 
            flexDirection: 'row', 
            justifyContent:"space-between",
            alignItems:"center"
             }}>
               <View>
            <Text style={{ fontSize: 14, fontWeight: '700', }} >{this.state.name}</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', marginTop: wp('2%') }}>{this.state.address}</Text>
            </View>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("DeliveryAddress")}
            >
            <ImageBackground
           
              style={{alignItems:"center",
              justifyContent:"center",
              width:wp('28%'),
              height:hp('7%'),
              flexDirection:"row"
            }}
         
         
              source={(require('../../assets/images/roundedRectangle3.png'))} >
              <Image 
              style={{ marginLeft:8, width: 13, height: 13 }} resizeMode="contain" 
              source={(require('../../assets/images/edit.png'))} />


                 <Text style={{
                   color:"white",
                   fontSize:13,
                   marginLeft:8,
                 }}>
                   Edit/Change
                 </Text>
                 </ImageBackground>
                 </TouchableOpacity>
          </View>
         


          <Text style={{ marginTop: wp('2%') }}>
            {this.state.postal_code}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp('2%') }} >
            <Image style={{width: 15, height: 15 }}
             resizeMode="contain" 
             source={(require('../../assets/images/phone_icon.png'))} />
            <Text style={{ marginLeft: wp('3%') }} >{this.state.mobile_no}</Text>
          </View>
        </View>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:'rgb(247,249,251)'
     
      }}>

        <FlatList
          data={this.state.Oderreviewlist}
          renderItem={(item, index) => this.renderOrder(item, index)}
          // disableScrollViewPanResponder
          showsVerticalScrollIndicator={false}
        />   
   <View style={{width:wp("90%"),alignSelf:"center"}}>
              <View style={{flexDirection: "row", height: hp("5%") }}>


                <Text style={{fontWeight:"bold",fontSize:15}}>
                  Delivery Expected date:-
              </Text>
                <Text style={{fontWeight:"bold",fontSize:15}}>
                 {this.state.expecteddelivery}
              </Text>
              </View>
              <Text style={{fontWeight:"bold",fontSize:15}}>
                Amount Details
              </Text>
              <View style={{ width:wp("90%"),justifyContent:"space-between",flexDirection: "row",marginVertical:hp("1%")}}>
                <Text style={{fontSize:15}}>
                 Sub-total
              </Text>
                <Text style={{fontSize:15}}>
                ₹{this.state.subtotal}
             </Text>

              </View>
              <View style={{ 
                flexDirection: "row",
                width:wp("90%"),
                justifyContent:"space-between",
                }}>
                <Text style={{fontSize:15}}>
                 GST Amount
              </Text>
                <Text style={{fontSize:15}}>
                {this.state.gsttotal}
             </Text>

              </View>
              <View style={{
                 flexDirection: "row",
                 marginVertical:hp("1%"),
                 width:wp("90%"),
                 justifyContent:"space-between",
                 }}>
                <Text style={{fontSize:15}}>
                Payable Amount
              </Text>
                <Text style={{fontSize:15}}>
                ₹{this.state.paybale_ammount}
             </Text>

              </View>
            
             
            </View>
        <View style={{
          width: wp("100%"),
          height: hp("10%"),
          alignItems: "center",
          justifyContent: "center"
          }}>
         <TouchableOpacity 
         onPress={()=>
           this.setState({modalVisible:!this.state.modalVisible})
         }
         
         style={{
            justifyContent: "center",
            alignItems: "center",
            width: wp("50%"),
            backgroundColor: "rgb(49,176,249)",
            height: hp("7%"),
            borderRadius:5
           }}>
           <Text style={{
             fontSize:18,
             color:"white",
             fontWeight:"bold"
           }}>
           Continue
           </Text>
         </TouchableOpacity>
        </View>          
      </View>

   
        <View style={{alignItems:"center",flex:1,  justifyContent:"center"}}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("70%"),
              backgroundColor: "white",
              height: hp("35%"),
              marginBottom:hp("30%")
            
                }}>
                   
                   <View style={styles.crossView}>
                <TouchableOpacity  onPress={()=>
                  this.setState({modalVisible:!this.state.modalVisible})}>
           <Image source={Icons.crossicon}/>
        
           </TouchableOpacity>
           </View>

     <View style={{height:hp("25%"),width:wp("60%"),alignItems:"center",justifyContent:"center"}} >
              <Text
              
                style={{
                  fontSize:15,
                  textAlign:"center",
                 marginBottom:hp("5%")

                }}
              >
            Congratulations! your order has been placed successfully!

For complete this payment process please taps on the continue button.
             
           </Text>
           <View>
                <TouchableOpacity 
                onPress={()=> 
                  this.PlaceOrder()
                 
                }
                  
                style={{
                  justifyContent:"center",
                  alignItems:"center",
                  width:wp("30%"),
                  height:hp("5%"),
                  borderRadius:7,
                  backgroundColor:"rgba(49,176,249,0.8)"
                  }}>
                  <Text style={{color:"white",fontWeight:"bold"}}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
           </View>
          </View>
          </View>
        </Modal>
        </View>
      </ScrollView>
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
)(withNavigationFocus(OrderReview));

const styles = StyleSheet.create({
crossView:{  
  alignSelf:'flex-end',
  
  // marginBottom: hp('15%'),
  marginHorizontal:wp('-1%')
  
  },
})
