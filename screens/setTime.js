import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, } from "react-native";


class setTime extends React.Component  {
    constructor(){
        super()
        this.state = {
            isStart : false,
            minutes_Counter : '00',
            seconds_Counter : '00',
            kcal:10,
            Totalkcal:1,
        }
       
    }

    timer () {
            let time = setInterval(() => {
            let second = ( Number( this.state.seconds_Counter ) + 1 ).toString()
            let minute = this.state.minutes_Counter
            

            if (Number(this.state.seconds_Counter) == 59) {
                minute = (Number(this.state.minutes_Counter) + 1).toString()
                second = '00'
            }

            this.setState({
                minutes_Counter : minute.length == 1 ? '0'+minute : minute,
                seconds_Counter : second.length == 1 ? '0'+second : second,
                
            })
        }, 1000)
        
        this.setState({ time })
        this.setState({ isStart : true })
    }

    stop () {
        console.log(this.state)
        clearInterval(this.state.time);
        this.setState({ isStart : false })
    }

    reset() {
      console.log(this.state)
        clearInterval(this.state.time);
        this.setState({
            isStart : false,
            minutes_Counter : '00',
            seconds_Counter : '00'
        })
    }
    
   render() {
    return ( 
        <>
            <View>
                <View style={ styles.text }>
                    <Text style={ styles.text }>{this.state.minutes_Counter +" : " + this.state.seconds_Counter }</Text>
                </View>
                <View style={ styles.btn }>
                    <TouchableOpacity>
                        <Button  title="START" onPress={ () => {this.timer()} } disabled={this.state.isStart}></Button>
                    </TouchableOpacity>
                </View>
                <View style={ styles.btn }>
                    <TouchableOpacity>
                        <Button title="STOP" onPress={ () => {this.stop()} }></Button>
                    </TouchableOpacity>
                </View>
                <View style={ styles.btn }>
                    <TouchableOpacity>
                        <Button title="CLEAR" onPress={ ()=>{this.reset()} }></Button>
                    </TouchableOpacity>
                </View>
            </View>  
        </>
    )
   }
}



 
const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center' 
    },
    btn : {
        // width: 500,
        marginBottom : 20,
        alignItems : 'center',

    },
    text : {
      fontSize : 50,
        textAlign : 'center',

        // justifyContent:'center',
        marginBottom : 10
    }
})

export default setTime;