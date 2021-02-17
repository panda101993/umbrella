import React, { Component } from 'react';
import { Alert,View, Text,StyleSheet,ScrollView,FlatList,Image,TouchableOpacity,ImageBackground,Modal,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icons from '../icon'
const { width, height } = Dimensions.get("window");
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from 'react-navigation';
import ApiRequest from "../../../services/webservice"
import { Loader } from '../../../components/globalComponents/Loader';
import NavIcons from "../../../Router/NavigationIcons"
import { CustomHeader2 } from '../../../components/globalComponents/Header';
 class CategoryName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      modalVisible2:false,
          toggleradio:false,
          subcategorylist:"",
          responsemessage:"",
          isLoading:false,
          Shopbycategory:"",

   
    };
  }

  AddItem(item,index){
    this.setState({ isLoading: true })
    let AddItemdeatils=
    {
      "product_id": item.product_id
    }

    ApiRequest(AddItemdeatils, 'user-management/cart-management', "POST", `JWT ${this.props.Token}`)
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
            AsyncStorage.setItem("AddItemfromCategoryname" ,JSON.stringify(true))
            this.setState({ isLoading: false })
            this.setState({ responsemessage: resp.data.response_message })
            this.setState({ modalVisible: !this.state.modalVisible })
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


  filterdata=({item,index})  =>{

    <View style={{flexDirection:'row'}}>

      <Image source={ this.state.toggleradio ? Icons.emptyradio : Icons.fillradio}></Image>

      <Text>{item.name}</Text>
      


    </View>
  }

  Shopbycategory = ({ item, index }) => {
    console.log("subcategoryyy=>>>",item, index)
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]}/>;
    }
    return (
      <View
        style={styles.item}
      >     
         <TouchableOpacity 
         style={{}}
         
         onPress={() => this.props.navigation.navigate("ProductName",{"user_sub_category":item})}>
          <Image  resizeMode="contain" style={{width:100,height:100}}source={{uri:`${item.image[0].image}`}} />
          </TouchableOpacity>
        <Text style={styles.itemText}>{item.product_name}</Text>
        <View style={styles.container2}>
        <Text style={styles.itemprice}>₹{item.amount}</Text>
          <TouchableOpacity onPress={() =>this.AddItem(item,index)}>
           <ImageBackground source={Icons.roundedRectabgle} style={{justifyContent:"center",width:wp('28%'),height:hp('7%')}}>
               
             <Text style={styles.addstyle}>Add to Cart</Text>
           </ImageBackground>
           </TouchableOpacity>
        </View>
       
      </View>
    );
  };

  handlefilter=() => {
    //alert('dfdfdf')
    this.setState({modalVisible2:!this.state.modalVisible2})
  }
  componentDidMount(){
  console.log ( "this.props.navigation.state.params.ID==>>>>>",this.props.navigation.state.params.Ctegoryname)
    // this.props.navigation.setParams({handlefilter : this.handlefilter})
    this.subcategorylistApi()
    this.SortCategoryList()
  }
  subcategorylistApi(){
    this.setState({ isLoading: true })
    ApiRequest('', `user-management/category/${this.props.navigation.state.params.ID}`, "GET", `JWT ${this.props.Token}`)
    .then(async resp => {
      console.log("resp.data.tokencategoryname", resp)
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
          this.setState({subcategorylist:resp.data.data})
          console.log("all the details=>>>",this.state.subcategorylist)
       
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


SortCategoryList(){
  ApiRequest('', "user-management/category-list", "GET", `JWT ${this.props.Token}`)
  .then(async resp => {
    console.log("resp.data.tokencategory", resp)
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
        this.setState({
          Shopbycategory:resp.data.data
      
        })
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
 
  sortCategory(id){

    this.setState({modalVisible2 :!this.state.modalVisible2})

    this.setState({ isLoading: true })
    ApiRequest('', `user-management/category/${id}`, "GET", `JWT ${this.props.Token}`)
    .then(async resp => {
      console.log("resp.data.tokencategoryname", resp)
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
          this.setState({subcategorylist:resp.data.data})
          console.log("all the details=>>>",this.state.subcategorylist)
       
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
render() {


  return (  

        <View style={styles.container}>
            
      <CustomHeader2
        menuonPress={() =>
          this.props.navigation.openDrawer()
        }
        bellicononpress={()=>this.props.navigation.navigate("Notification")}
        Size={"medium"}  bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon}
        filtericonpress={()=>this.handlefilter()} filtericon={NavIcons.filtericon} Title={this.props.navigation.state.params.Ctegoryname} />
      <Loader
        visible={this.state.isLoading}
      />  
                            <Modal
                            style={{ height: height / 3 }}
                            animationType="none"
                            transparent={true}
                            visible={this.state.modalVisible2}
                            onRequestClose={() => {
                              this.handlefilter()
                                 Alert.alert('Modal has been closed.');
                            }}>
                           
                                <View style={{
                                    height:hp("20%"),
                                    width: wp("50%"), 
                                    alignItems:"flex-start", 
                                    backgroundColor: 'white',
                                    justifyContent:'center',
                                    alignSelf:'center',
                                   marginTop:wp('15%'),
                                   marginLeft:wp('20%'),
                                  
                        
                                }}>
                                    <FlatList
                                    showsHorizontalScrollIndicator={false}
                                        data={this.state.Shopbycategory}
                                        onRequestClose={() => console.log("modal has been closeds")}
                                       showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) =>
                                            // console.log("modal has been closeds",item),
                                            <View style={{ flexDirection:'row',alignItems:"center" }}>

                                                <TouchableOpacity onPress={() =>this.sortCategory(item.id)}
                                              
                                                    style={{
                                                       justifyContent: "space-evenly",
                                            
                                                       
                                                    }}
                                                >
                                                    <Image source={ item.id ?  Icons.emptyradio : Icons.fillradio  }
                                                     style={{ width: wp("10%"), height: hp("4%"), marginVertical: 10,resizeMode:'contain' }} />
                                                    
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 15, marginVertical: 10, }}>{item.name}</Text>
                                            </View>
                                        }

                                   
                                       
                                    />
                                   
                                </View>
                        </Modal>
      {this.state.subcategorylist.length === 0 ?
        <View style={{ height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            No Records Found!
            </Text>
        </View>
        :

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.subcategorylist}

          renderItem={(item, index) => this.Shopbycategory(item, index)}
          numColumns={2}
          keyExtractor={item => item.key}

        />
      }


        
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
                <View style={styles.crossView}>
                <TouchableOpacity  onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
           <Image source={Icons.crossicon}/>
        
           </TouchableOpacity>
           </View>

                <View style={{width:wp("60%")}}>
               
              <Text
              
                style={{
                  fontSize:15,
                 marginBottom:hp("13%"),
                 marginHorizontal:wp('8%'),
                 marginVertical:hp('-8%'),
                 alignSelf:'center'


                }}
              >
              {this.state.responsemessage}
           </Text>
           </View>   
             
       
          </View>
          </View>
        </Modal>
        </View>
                         
         </View>
        
       
  
  );
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
)(withNavigationFocus(CategoryName));


const styles = StyleSheet.create({
container: {
  
  flex: 1,
   
    backgroundColor:'rgb(247,249,251)',
  
  
},

crossView:{  
alignSelf:'flex-end',

marginBottom: hp('15%'),
marginHorizontal:wp('-1%')

},

container2:{

  flexDirection:'row',
 alignItems: 'center',
 margin:10
},

titlestyle:{
 
  fontWeight: "bold",
  marginLeft: wp("4%"),
  marginVertical:wp('7%')
  
},

item: {
  backgroundColor: 'white',
  // backgroundColor: 'red',
  alignItems: 'center',
  justifyContent: 'center',
  // flex: 1,
  // margin: 5,
  height: hp('29%')
  },
  addstyle:{
    color:'white',
   textAlign:"right",
  // fontWeight:"bold",
  // fontSize:,
    marginRight:wp('1%')
  },
  

itemInvisible: {
  backgroundColor: 'transparent',
},
itemText: {
  fontSize:10,
  color: 'black',
},
itemprice:{
 marginHorizontal:wp('3.5%')
}
})
