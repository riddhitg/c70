import React from 'react';
import{Text,View,StyleSheet, Image} from 'react-native';
import *as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            /*
            status ==== "granted" is true when user has granted permissions
            status === "granted" is false when user has not granted the permission
            */
           hasCameraPermissions:status === "granted",
           buttonState:id,
           scanned:false  
        })
    }  
      
    handleBarCodeScanned = async({type,data})=>{
        const {buttonState} = this.state

        if(buttonState === "BookId"){
            this.setState({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal'
            })
        }
        else if(buttonState === "StudentId"){
            this.setState({
                scanned:true,
                scannedStudentId:data,
                buttonState:'normal'
            })
        }
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        
        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <View>
                        <Image
                        source = {require("../assets/booklogo.jpg")}
                        style = {{width:200, height:200}}/>
                        <Text style = {{textAlign:'center', fonSize:20}}>Wily</Text>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput
                        style = {styles.inputBox}
                        placeHolder = "BookId"
                        value = {this.state.scannedBookId}/>
                        <TouchableOpacity
                         style = {styles.scanButton}
                         onPress = {()=>{
                             this.getCameraPermissions("BookId")
                         }}>
                             <Text style = {styles.buttonText}>Scan</Text>
                         </TouchableOpacity>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput
                        style = {styles.inputBox}
                        placeHolder = "StudentId"
                        value = {this.state.scannedStudentId}/>
                        <TouchableOpacity
                         style = {styles.scanButton}
                         onPress = {()=>{
                             this.getCameraPermissions("StudentId")
                         }}>
                             <Text style = {styles.buttonText}>Scan</Text>
                         </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecoration:'underline',
    },
    scanButton:{
        backgroundColor:'#2196f3',
        padding:10,
        margin:10
    },
    buttonText:{
        fonSize:20,
        textAlign:'center',
        marginTop:10
    },
    inputView:{
        flexDirection:'row',
        margin:20,
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    },
    scanButton:{
        backgroundColor:'#66bb6a',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
})