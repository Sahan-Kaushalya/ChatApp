import { View } from "react-native";

interface Circle{
width:number;
height:number;
borderRadius:number;
fillColor?:string;
className?:string;
topValue?:number;
leftValue?:number;
rightValue?:number;
bottomValue?:number;
borderColor?:string;
borderWidth?:number;
opacity?:number;
}

export default function CircleShape(c:Circle) {
    return (
        <View className={`${c.className ?? ""}`} style={{
            width:c.width,
            height:c.height,
            borderRadius:c.borderRadius,
            position:'absolute',
            ...(c.fillColor !== undefined && {backgroundColor:c.fillColor}),
            ...(c.topValue !== undefined && {top:c.topValue}),
            ...(c.leftValue !== undefined && {left:c.leftValue} ),
            ...(c.rightValue !== undefined && {right:c.rightValue} ),
            ...(c.bottomValue !== undefined && {bottom:c.bottomValue}),
            ...(c.borderColor !== undefined && {borderColor:c.borderColor} ),
            ...(c.borderWidth !== undefined && {borderWidth:c.borderWidth}),
            ...(c.opacity !== undefined && {opacity:c.opacity}),
            zIndex:0,
        }}>

        </View>
    );
}