import React, { ReactNode, useState } from 'react';
import { KeyboardType, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import COLORS from '../assets/colors/Colors';
import { globalStyle } from '../styles/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


interface Props {
    value: string,
    onChange: (val:string) => void,
    affix?: ReactNode, // icon left
    placeholder?: string,
    suffix?: ReactNode, // icon right
    isPassword?: boolean,
    allowClear?: boolean, // delete nếu là text
    type?: KeyboardType,
    onEnd?: () => void, // hàm đợi nhập đủ dữ liệu
    backgroundColor?: string
}

const InputComponent = (props: Props) => {

    const {value, onChange, affix, placeholder, suffix, isPassword, allowClear, type, onEnd, backgroundColor} = props

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false)
    return (
        <View style = {[styles.inputContainer, {backgroundColor: backgroundColor ?? 'transparent'}]}>
            {affix ?? affix}
            <TextInput
                style = {[styles.input, globalStyle.text]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry= {isShowPass}
                placeholderTextColor={COLORS.HEX_LIGHT_GREY}
                keyboardType={type ?? 'default'}
                autoCapitalize='none'
                onEndEditing={onEnd}/>
            {suffix ?? suffix}
            <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isPassword) : () => onChange('')}>
                {isPassword ? (<FontAwesome name={isShowPass ? 'eye-slash' : 'eye'} size={22} color={COLORS.HEX_LIGHT_GRAY} /> 
                ) : (
                    value.length > 0 && allowClear &&
                    (<AntDesign name='close' size={22} color={COLORS.HEX_LIGHT_GRAY}/>)
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.HEX_LIGHT_GREY,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 19
    }, 
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14
    }
})

export default InputComponent