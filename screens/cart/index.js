import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView
   } from 'react-native';
import   Icons  from './icon'
import { CardElement } from '../../components/CardComponent'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from 'react-navigation';
import ApiRequest from "../../services/webservice"
import { Loader } from '../../components/globalComponents/Loader';

 class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalforCupon:false,
      modalVisible:false,
      textInputs:[],
      cartList:[],
      cartId:"",
      isFetching:true,
      totol_price:"",
      expecteddelivery:"",
      couponcode:""
    
    };
  }
  DeleteItem(item,index){
    
    this.setState({modalVisible:!this.state.modalVisible,cartId:item.cart_id})
    
   

  }
  componentDidMount(){

   this.getCartList()
  }
   getCartList() {
    this.setState({ isLoading: true })
     ApiRequest('', 'user-management/cart-details', "GET", `JWT ${this.props.Token}`)
       .then(async resp => {
         console.log("resp.data.tokencategorynamecarttt=>>>", resp)
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
            AsyncStorage.setItem("AddItemfromCategoryname" ,JSON.stringify(false))
             this.setState({ cartList: resp.data.data })
             this.setState({totol_price:resp.data.totol_price,expecteddelivery:resp.data.expecteddelivery})
             console.log("all the details=>>>", this.state.cartList)

             break;
           }

           default: {
            this.setState({ isLoading: false })
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

   perticularDelete() {
    this.setState({ isLoading: true })
     ApiRequest(" ", `user-management/delet-cart-product/${this.state.cartId}`, "GET", `JWT ${this.props.Token}`)
       .then(async resp => {
         console.log("resp.data.deleet", resp)
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
             this.setState({ responsemessage: resp.response_message })
             this.setState({ modalVisible: !this.state.modalVisible })
             this.getCartList()
             break;
           }

           default: {
            this.setState({ isLoading: false })
             setTimeout(() => {
               Alert.alert(
                 '',
                 resp.response_message,
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



   Rendercart = ({ item, index }) => {
     console.log("logg=>>>",item.sub_category.image[0].image)
     return (

       <View style={styles.MainContainer}>


         <View style={[styles.UmbrellaImageView, {}]}>

           <Image
             style={{ height: hp('30%'), width: wp('30%'), borderRadius: 10 }}
             source={item.sub_category.image.length === 0 ? "" : {uri:item.sub_category.image[0].image}}
             resizeMode='contain'
           />
         </View>
         <View style={{
           alignItems: "center",
           alignSelf: "center",
           // backgroundColor:"pink",
           height: 90, width: wp("40%"),
           justifyContent: "center",
           justifyContent: "space-evenly"

         }}>
           <Text style={styles.ProductNameStyle}>{item.product_name}</Text>
           <Text style={{ color: 'silver', fontSize: 14, fontWeight: '700', marginRight: wp("10%") }}>₹{item.total_amount}</Text>
           <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
             <Text style={styles.ProductNameStyle}>
               quantity:
        </Text>
             <Text style={{ color: 'grey', fontSize: 14, fontWeight: '700', }}>  {item.quantity}</Text>

           </View>

         </View>

         <TouchableOpacity
           onPress={() => this.DeleteItem(item, index)}

           style={{
             marginLeft: wp("7%"),
             alignSelf: "stretch",
             // backgroundColor: "#ff6781",
             width: wp("19%"),
             height: hp("4%"),

           }}
         >
           <Image resizeMode="contain" source={Icons.delete} />
         </TouchableOpacity>

       </View>
     )
   }
   CouponApply() {

    let couponDetails={
      "coupon_code":"BREAK1291"
      }
      ApiRequest(couponDetails, "user-management/apply-coupon", "POST", `JWT ${this.props.Token}`)
      .then(async resp => {
        console.log("resp.data.deleetCouponnn=>>", resp)
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
           this.setState({modalforCupon:!this.state.modalforCupon})
           this.setState({totol_price:resp.data.totol_price,expecteddelivery:resp.data.expecteddelivery,offer_value:resp.data.offer_value})
            // this.setState({ responsemessage: resp.response_message })
            // this.setState({ modalVisible: !this.state.modalVisible })
            this.getCartList()
            break;
          }

          default: {
           this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.response_message,
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

   validateCoupon(text) {
     this.setState({ couponcode: text })

   }
  render() {

    if (this.props.isFocused) {
      AsyncStorage.getItem("AddItemfromCategoryname").then(resp => {
        console.log("vghdsfhghdsgf=>>", JSON.parse(resp))
        if (JSON.parse(resp) === true) {
          this.getCartList()
        }
        else {
        }
      })
        .catch(error => {
        })
    }


    return (
     
      <View style={{
          // marginTop:Platform.OS==="ios" ? hp('11%') : null,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgb(247,249,251)',
       
       
        
    
      }}>

<Loader
                visible={this.state.isLoading}
                />
         <ScrollView showsVerticalScrollIndicator={false}>
         <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
          {/* <View style={{height:hp("50%")}}> */}

          {this.state.cartList.length === 0 ?
        <View style={{ height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            No Records Found!
            </Text>
        </View>
        :

            <FlatList
              // refreshing={this.state.isFetching}
              // onRefresh={() =>  this.getCartList()}
              data={this.state.cartList}
              renderItem={(item, index) => this.Rendercart(item, index)}

              showsVerticalScrollIndicator={false}
            />}
          {/* </View> */}
            <View style={{width:wp("90%"),alignSelf:"center"}}>
              <View style={{flexDirection: "row", height: hp("5%") }}>


                <Text style={{fontWeight:"bold",fontSize:15}}>
                  Delivery Expected date:-
              </Text>
                <Text style={{fontWeight:"bold",fontSize:15}}>
                 {this.state.expecteddelivery}
              </Text>
              </View>
              <View style={{ flexDirection: "row",justifyContent:"space-between"}}>
                <Text style={{fontWeight:"bold",fontSize:15}}>
                  Total amount:
              </Text>
                <Text style={{fontSize:15,right:wp("15%")}}>
                ₹{this.state.totol_price}
             </Text>

              </View>
              <View style={{width:wp("80%"),alignItems:"flex-end"}}>
                <TouchableOpacity onPress={()=>this.setState({modalforCupon:!this.state.modalforCupon})}>
                <Text style={{color:"rgb(49,176,249)",fontSize:15,fontWeight:"bold"}}>
                  Apply Coupon
              </Text>
              </TouchableOpacity>
              </View>
             
            </View>
            <View style={{width:wp("100%"),alignItems:"center",marginVertical:hp("1%")}}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("OrderReview")}
             style={{
                width:wp("40%"),
                backgroundColor:"rgb(49,176,249)",
                height:hp("6%"),
                justifyContent:"center",
                alignItems:"center",
                borderRadius:8
                }}>
                <Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>
                  Check Out
              </Text>
              </TouchableOpacity>
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
              height: hp("25%"),
              marginBottom:hp("30%")
            
                }}>
                   
                <View style={{width:wp("60%"),alignItems:"center",justifyContent:"center"}} >
              <Text
              
                style={{
                  fontSize:15,
                  textAlign:"center",
                 marginBottom:hp("5%")

                }}
              >
             Are you sure you want to remove this product from the cartlist ?
             
           </Text>
           </View>
              <View
                style={{
                  alignItems:"center",
                  alignSelf:"center",
                  
                  width:wp("60%"),
                  flexDirection:"row",
                  justifyContent:"space-between"
                }
                }>
                <TouchableOpacity
                 onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}

                >
           <Text style={{color:"rgb(49,176,249)",fontSize:18,fontWeight:"bold"}}>
            No
           </Text>
           </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>
                    this.perticularDelete()
                  
                    
                  }
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(49,176,249)",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}
           >
           <Text style={{
             color:"white",
             fontSize:18,fontWeight:"bold"
           }}>
           Yes
           </Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
        </Modal>
        </View>
        <View style={{alignItems:"center",flex:1,  justifyContent:"center"}}>
        <Modal
          transparent={true}
          visible={this.state.modalforCupon}
        
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              // justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("70%"),
              backgroundColor: "white",
              height: hp("35%"),
              marginBottom:hp("30%")
            
                }}>
                   
                <View style={{width:wp("60%"),alignItems:"center",justifyContent:"center",
                height:hp("10%"),
                }} >
              <Text
              
                style={{
                  fontSize:15,
                  textAlign:"center",
                

                }}
              >
           Please Enter Coupon Code
             
           </Text>

           </View>
           <View style={{
           width:wp("35%"),
           height:hp('6%'),
borderWidth:1,
 marginBottom:hp("5%"),
 borderRadius:8,
 borderColor:'rgb(49,176,249)'
 
           }} >
             <TextInput
            style={{  height:hp('6%'),}}
            value={this.state.couponcode}
            onChangeText={(text)=>{this.validateCoupon(text)}}
             >

             </TextInput>
           </View>
              <View
                style={{
                  alignItems:"center",
                  alignSelf:"center",
                  
                  width:wp("60%"),
                  flexDirection:"row",
                  justifyContent:"space-between"
                }
                }>
                <TouchableOpacity
                 onPress={()=>this.setState({modalforCupon:!this.state.modalforCupon})}
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}

                >
           <Text style={{color:"rgb(49,176,249)",fontSize:18,fontWeight:"bold"}}>
        Cancle
           </Text>
           </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>
                  this.CouponApply()
                
                  
                }
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(49,176,249)",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}
           >
           <Text style={{
             color:"white",
             fontSize:18,fontWeight:"bold"
           }}>
          Submit
           </Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
        </Modal>
        </View>
       
        </KeyboardAvoidingView>
        </ScrollView>
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
)(withNavigationFocus(Cart));
const styles = StyleSheet.create({
  MainContainer: {
      alignSelf:"center",
   alignItems: 'flex-start',
      height: hp("20%"),
      width: wp('90%'),
      backgroundColor:'white',
      marginVertical: 5,
      flexDirection: 'row',
      borderRadius: 6,
      // paddingHorizontal: 5,
  // justifyContent:"space-between"
      
  },

  UmbrellaImageView: {
    height: 120,
    // width: wp('40%'),
      // flex: 2,
      // marginTop: wp('25%'),
      // backgroundColor: 'orange',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
  
      
  },
  ProductNameStyle:{
      fontSize: 14, fontWeight: '700',
      color:"grey"
  }
});
