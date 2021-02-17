import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList,ImageBackground } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from './icon'
export default class MyOrderHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    product_name: 'Product Name',
                    price: "$220.00",
                    quantity: "10.000",
                    order_id: "12234556",
                    delivery_date: "10/10/2020",
                    status: 'Pending',
                    image: Icon.BlackUmbrellaIcon,
                    status1: false
                },
                {
                    product_name: 'Product Name',
                    price: "$220.00",
                    quantity: "10.00",
                    order_id: "12234556",
                    delivery_date: "10/10/2020",
                    status: "Delivered",
                    image: Icon.BlackUmbrellaIcon,
                    image2: Icon.RecordIcon,
                    status1: true

                },
                {
                    product_name: 'Product Name',
                    price: "$220.00",
                    quantity: "10.00",
                    order_id: "12234556",
                    delivery_date: "10/10/2020",
                    status: 'Pending',
                    image: Icon.BlackUmbrellaIcon,
                    status1: false

                },

            ]
        }
    }

    renderData = (item, index) => {
        console.log("item in renderitem flatlist", item)
        return (
                <View style={{justifyContent:'center',alignItems:'center',}}>
            <View style={style.cardViewStyle}>

            <View style={style.cardDataStyle}>
                        
                        <View style={style.umbrellaImageViewStyle}>
                        <Image
                                source={item.image}
                                resizeMode='contain'
                                style={{ width: wp('30%'), height: hp('28%'), }}
                            />

                         </View>   
                       
                       <View  style={style.ProductViewStyle}> 

                        <View style={{width:wp('58%'),height:hp('15%')}}>

                                <View style={{flexDirection:'row',width:wp('57%'),height:hp('8%'),alignItems:'center',paddingTop:3}}>
                                {
                                item.status1 == false ?
                                    <Text style={{ fontWeight: '700', fontSize: 16, color: 'rgb(84,88,90)', marginVertical: hp('2%'),paddingTop:3, }}>{item.product_name}</Text>     
                                    :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('62%'), alignItems: 'center', }}>
                                        <Text style={{ fontWeight: '700', fontSize: 15, color: 'rgb(84,88,90)', marginVertical: hp('1%') }}>{item.product_name}</Text>
                                       <TouchableOpacity>
                                        <ImageBackground
                                            source={item.image2} style={{ width: wp('32%'), height: hp('7%'), alignItems: 'center', justifyContent: 'center' }}
                                            resizeMode='stretch'
                                        >
                                            
                                            <Text style={{ color: '#fff', fontWeight: '600',textAlign:'center' }}>Reorder</Text>

                                        </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                            }


                                 </View>
                                    <View style={{width:wp('57%'),height:hp('5%'),}}>
                                    <Text style={{ fontWeight: '700', fontSize: 15, color: 'rgb(123,125,127)',}}>{item.price}</Text>  
                                  </View>
                                  <View style={{flexDirection:'row',height:hp('3%'),width:wp('57%'),}}>
                            <Text >Quantity</Text>
                            <Text style={{ width: wp('2%'),marginHorizontal:wp('1%') }}>:</Text>
                            <Text style={{ width: wp('23%'),}}>{item.quantity}</Text>
                            </View>          

                        <View>
                         </View>   
                           

                        </View>  
                       
                        <View style={{width:wp('57%'),height:hp('12%'),flexDirection:'column'
                        }
                        }>
                          

                            <View style={{flexDirection:'row',height:hp('5%'),width:wp('57%'),justifyContent:'space-between',paddingTop:3}}>
                            <Text style={{ width: wp('30%'),paddingTop:5 }}>Order ID</Text>
                            <Text style={{ width: wp('2%'),paddingTop:5 }}>:</Text>
                            <Text style={{ width: wp('23%'), textAlign: 'right',paddingTop:5 }}>{item.order_id}</Text>
                            
                            </View>
                            <View style={{flexDirection:'row',height:hp('3%'),width:wp('57%'),backgroundColor:'#fff',justifyContent:'space-between'}}>
                            <Text style={{ width: wp('30%') }}>Delivery Date</Text>
                                    <Text style={{ width: wp('2%'), }}>:</Text>
                                    <Text style={{ width: wp('23%'), textAlign: 'right'}}>{item.delivery_date}</Text>
                            </View>
                            <View style={{flexDirection:'row',height:hp('4%'),width:wp('57%'),backgroundColor:'#fff',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{ width: wp('30%')}}>Status</Text>
                                    <Text style={{ width: wp('2%'), }}>:</Text>
                                    <Text style={{
                                        width: wp('23%'), textAlign: 'right', fontsize: 8,
                                        color: item.status === "Pending" ? "rgb(255,56,56)" : item.status === "Delivered" ? "rgb(12,182,77)" : "red"
                                    }}>{item.status}</Text>
                          </View>
                      
                      </View>    

                        </View>   
                       
                       
                       
                       
                       
                       
                        </View>    



            </View>
            </View>




        )
    }
    render() {
        return (
            <View style={style.container}>
              

                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: "#E6EAED"}}>
                        <FlatList showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={({ item, index }) => this.renderData(item, index)}
                        />
                     
                    </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    // headerView: {
    //     height: hp('20%')
    // },
    cardViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'rgb(245,245,245)',
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('26%'),
        backgroundColor: '#fff',
       marginVertical:hp('0.2%')

    },
    cardDataStyle:{
        width:wp('89%'),
        height: hp('29%'),
        flexDirection:'row',
    },
    umbrellaImageViewStyle:{
        width:wp('31%'),
       
        height: hp('28%'),
        
    },
    ProductViewStyle:{
        width:wp('55%'),
        flexDirection:'column'
    }

})       