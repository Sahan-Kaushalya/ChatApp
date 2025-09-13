import { View } from "react-native";

interface Circle{
width:number,
height:number,
fillColor:string,
borderRadius:number
topValue?:number,
leftValue?:number,
rightValue?:number,
bottomValue?:number,
borderColor?:string,
borderWidth?:number,
opacity?:number
}

export default function CircleShape({width,height,fillColor,borderRadius,topValue,leftValue,rightValue,bottomValue,
    borderColor,borderWidth,opacity}:Circle) {
    return (
        <View style={{
            width:width,
            height:height,
            backgroundColor:fillColor,
            borderRadius:borderRadius,
            position:'absolute',
            ...(topValue !== undefined && {top:topValue}),
            ...(leftValue !== undefined && {left:leftValue} ),
            ...(rightValue !== undefined && {right:rightValue} ),
            ...(bottomValue !== undefined && {bottom:bottomValue}),
            ...(borderColor !== undefined && {borderColor:borderColor} ),
            ...(borderWidth !== undefined && {borderWidth:borderWidth}),
            ...(opacity !== undefined && {opacity:opacity}),
        }}>

        </View>
    );
}