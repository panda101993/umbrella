//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,Image,Alert, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icons from './icons'
import { connect, } from 'react-redux';
import ApiRequest from "../../../services/webservice"
import { Loader } from '../../../components/globalComponents/Loader'



// create a component
class DeliveryAddress extends Component {

    constructor(){
        super()
        this.state= {
          isLoading:false,
         
          addressList:[],
          isRefreshing:false
         
        }
        
    }
      
    componentDidMount(){
        this.addressListApi()
    }
    addressListApi(){
    
          this.setState({isLoading:true})

        ApiRequest("", "user-management/address", "GET",`JWT ${this.props.Token}`)
          .then(async resp => {
            console.log("resp.data.token===>adddressss13e3", resp)
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
                this.setState({modalVisible:!this.state.modalVisible})
                this.setState({ addressList: resp.data.data })
                console.log("resp.data.token2===>", this.state.addressList)

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
    

        makeDefaultAddress(ID){
          this.setState({isLoading:true})
          let defaultAddress = {
            address_id:ID
          }

          ApiRequest(defaultAddress, "user-management/make-default-address", "POST",`JWT ${this.props.Token}`)
            .then(async resp => {
              console.log("resp.data.token===>adddressss13e3", resp)
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
                  this.addressListApi()
  
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

    selectAddress(item) {
      
      this.makeDefaultAddress(item.id)
      
        
    }
  deleteAddress(Id) {
    console.log("deleteAddress",Id)
    this.setState({ isLoading: true })


    ApiRequest("", `user-management/delete-user-address/${Id}`, "GET", `JWT ${this.props.Token}`)
      .then(async resp => {
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
            this.addressListApi()
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


    
    renderOrder = ({ item, index }) => {
    return (
      
      <View style={styles.MainContainer}>

        <View style={{ flexDirection: 'column', marginTop: wp('4%'), marginLeft: wp('3%') }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'space-between', alignItems: 'center' }} >

            <TouchableOpacity onPress={() => this.selectAddress(item)} >
              <Image source={item.is_default ? Icons.FillRadio : Icons.EmptyRadio} />
            </TouchableOpacity>
            <Text style={{
              width: wp("25%"),
              fontSize: 14, fontWeight: '700', marginLeft: wp('2%')
            }} >{`${item.first_name} ${item.last_name}`}</Text>
            <View
              style={{
                marginLeft: wp("40%"),
                backgroundColor: 'rgb(0, 101, 165)',
                width: wp("15%"),
                height: hp("4%"),
                borderTopLeftRadius: 13,
                borderBottomLeftRadius: 13
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: wp('1%'), marginTop: wp('1%') }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditAddress", {"itemofAddress":item})} >
                  <Image style={{marginLeft:8}}resizeMode="contain" source={Icons.EditIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.deleteAddress(item.id)}>
                  <Image resizeMode="contain" source={Icons.delete} style={{ marginRight: wp('3%') }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={{ marginLeft: wp('7%'), fontSize: 14, fontWeight: '700', marginTop: wp('1%') }}>{item.address}</Text>


          <Text style={{ marginTop: wp('2%'), marginLeft: wp('7%') }}>
            {item.postal_code}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp('2%') }} >
              <Image source={require('../../../assets/images/phone_icon.png')} style={{ marginLeft: wp('6%') }} />
              <Text style={{ marginLeft: wp('3%') }} >{item.mobile_no}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  handleRefresh = () => {
    this.setState({
   
      isRefreshing: true,
    }, () => {
      this.addressListApi();
    });
  };
 
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:'rgb(247,249,251)'
       
    
      }}>
         <Loader
                visible={this.state.isLoading}
                />
       <View style={{width:wp("90%"),alignSelf:"center",alignItems:"flex-start"}}>
        <TouchableOpacity style={{justifyContent:"center",width:wp('28%'),height:hp('7%'),alignItems:"center"}} onPress={() =>this.props.navigation.navigate("AddressScreen")}>
           <ImageBackground source={Icons.roundedRectabgle} style={{justifyContent:"center",width:wp('40%'),height:hp('7%'),alignItems:"center"}}>
               
             <Text style={{marginLeft:10,color:"white"}}>+Add new address</Text>
           </ImageBackground>
           </TouchableOpacity>
           </View>
         {this.state.addressList.length === 0 ?
        <View style={{ height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            No Records Found!
            </Text>
        </View>
       
        :

    
        <FlatList
          data={this.state.addressList}
          renderItem={(item, index) => this.renderOrder(item, index)}
          // extraData={this.state.isRefresh}
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
          showsVerticalScrollIndicator={false}
        />   

        
         }
      </View>
    )
  }
}


const mapStateToProps = state => {
    console.log("State_on_edit_Page==>> ", state)
    return {
      Token: state.AuthReducer.Token
    }
  }

  export default connect(mapStateToProps,
  
    )(DeliveryAddress);

const styles = StyleSheet.create({
  MainContainer: {
   alignItems: 'center',

      height: 120,
      width: wp('90%'),
      backgroundColor: 'white',
      marginVertical: 6,
      flexDirection: 'row',
      borderRadius: 6,  
  }
})
//make this component available to the app

