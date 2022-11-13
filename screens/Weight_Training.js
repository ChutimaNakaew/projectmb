// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../Database/firebaseDB'



class Weight_Training extends Component   {
 

  constructor() {
    
    super();
    this.firestoreRef = firebase.firestore().collection('workout').doc('XXVlurGq69GuDCTFmCU2').collection('exercise').doc('Weight Training').collection('Weight_Training_posture');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }
  componentDidMount() { //ถูกเรียกใช้งานหลังrenderเสร็จ
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){ //หากcomponentมีการถูกลบออกไป 
    this.unsubscribe();//จะมาเรียกใช้อันนี้
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => { //เอาparameterมาloopโดยใช้foreach -> โดยรับparameter resมา(res=response/ข้อมูลที่ตอบกลับมา)
      const { posture_name, id, } = res.data(); //ดึงข้อมูลมาสร้างเป็นตัวแปร(ตัวแปร= name, id, detail)
      userArr.push({ // pushค่าเข้าไปในarray
        key: res.id,
        res,
        posture_name,
        id,
        // detail,
      });
    });
    this.setState({ //หลังจากpushค่าต้องทำการupdate
      userArr,
      isLoading: false, //หลังจากมีข้อมูลไม่ต้องขึ้นloading
   });
  }
  render=() =>{
    
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    return (
      
      <ScrollView style={styles.container}>
        
          {
             
            this.state.userArr.map((item, i) => { //item = ข้อมูล , i = index
              return (
                
                <ListItem style={{padding:20} } 
                  key={i}
                  chevron
                  bottomDivider
                  
                  // onPress={()=> {this.props.navigation.navigate("BlogDetail",{blogId:item.id, blogdetail:item.detail, blogName:item.name})}}
                  >
                   
                    <ListItem.Content style={styles.lists}>
                        <ListItem.Subtitle> {item.posture_name}  </ListItem.Subtitle>
                        
                    </ListItem.Content>
                    
                </ListItem>
                
              );
            })
          }
          
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   margin:0,
   padding:0,
  //  flexDirection: 'row',
  //  flexWrap: 'wrap',
  //  alignItems: 'flex-start'
  //  paddingBottom: 
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  lists:{
    flex: 1,
    // flexDirection: 'row',
    // marginBottom:10,
    // padding:10,
    // marginTop:10,
    // borderRadius:50,
    // width: '100%',
    // alignItems: 'center',
  }
})
export default Weight_Training;

