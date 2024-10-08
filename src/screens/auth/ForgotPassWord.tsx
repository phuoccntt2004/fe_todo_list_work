import { ArrowLeft, Sms } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import authenticationAPI from '../../apis/authAPI';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, SectionComponent, TextComponent } from '../../component';
import { LoadingModal } from '../../modal';
import { globalStyle } from '../../styles/globalStyle';
import { Validate } from '../../utils/validate';

const ForgotPassWord = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    }

    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(api, { email }, 'post');
            console.log(res);
            Alert.alert('Gửi Mật Khẩu Cho Bạn: ', 'Chúng tôi đã gửi đến email của bạn bao gồm mật khẩu mới!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Không thể tạo mật khẩu mới api quên mật khẩu, ${error}`);
        }
    }

    return (
        <KeyboardAvoidingViewWrapper>
            <View style={globalStyle.container}>
                <SectionComponent>
                    <TouchableOpacity style={{ paddingTop: 50, paddingBottom: 10 }}>
                        <ArrowLeft size={24} color={COLORS.WHITE}
                            onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <SectionComponent>
                        <Image source={IMAGES.ForgotPass} style={{ width: '100%', height: 270, marginTop: 25 }} />
                    </SectionComponent>
                    <TextComponent text='Resset Mật Khẩu' title font={FONTFAMILY.poppins_bold}/>
                    <TextComponent text='Để đặt lại mật khẩu, bạn cần có email có thể được xác thực.' styles={{ paddingBottom: 30 }}/>
                    <InputComponent
                        value={email}
                        onChange={val => setEmail(val)}
                        placeholder='abc123@gmail.com'
                        affix={<Sms size={24} color={COLORS.HEX_LIGHT_GREY} />}
                        onEnd={handleCheckEmail} />
                </SectionComponent>
                <SectionComponent styles={{ alignItems: 'center' }}>
                    <ButtonComponent
                        text='Gửi'
                        type='orange'
                        styles={{ width: '80%' }}
                        disable={isDisable}
                        onPress={handleForgotPassword}
                    />
                </SectionComponent>
                <LoadingModal visible={isLoading} />
            </View>
        </KeyboardAvoidingViewWrapper>
    )
}

export default ForgotPassWord