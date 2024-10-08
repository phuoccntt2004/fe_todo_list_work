import { View, Text, Image, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, TextComponent } from '../../component'
import IMAGES from '../../assets/images'
import COLORS from '../../assets/colors/Colors'
import { FONTFAMILY } from '../../../assets/fonts'
import { Lock, Sms } from 'iconsax-react-native'
import { globalStyle } from '../../styles/globalStyle'
import { Facebook, Google } from '../../assets/svgs'
import { LoadingModal } from '../../modal'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';
import { Validate } from '../../utils/validate'
import authenticationAPI from '../../apis/authAPI'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
GoogleSignin.configure({
  webClientId: '860030721968-ocbku2gcgc9gna2u05ihquh69ick2qj1.apps.googleusercontent.com',
});

Settings.setAppID('527574866473646');

const LoginScreen = ({navigation}: any) => {

  // Lấy dữ liệu
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
        setIsDisable(true);
    } else {
        setIsDisable(false);
    }
}, [email, password]);

const handleLogin = async () => {

    const emailValidation = Validate.email(email);
    setIsLoading(true);
    if (emailValidation) {
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post');
            dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email);
        } catch (error) {
            console.log(error)
        }

    } else {
        Alert.alert('Email is not correct!!!');
    }
}

const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true, // hiển thị dialog chọn gg đăng nhập
    });

    const api = '/signInWithGoogle';
    setIsLoading(true);
    try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn(); // gọi đến đăng nhập
        const user = userInfo.user
        const res: any = await authenticationAPI.HandleAuthentication(api, user, 'post')
        // console.log(res);
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem(
            'auth',
            JSON.stringify(res.data),
        );
    } catch (error) {
        console.log(error)
    }
}

const handleLoginWithFacebook = async () => {
    const api = '/signInWithGoogle';
    try {
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
        ]);

        if (result.isCancelled) {
            console.log('Login cancel');
        } else {
            const profile = await Profile.getCurrentProfile();

            if (profile) {
                setIsLoading(true);
                const data = {
                    name: profile.name,
                    givenName: profile.firstName,
                    familyName: profile.lastName,
                    email: profile.userID, // vì khi lấy thông tin của ng dùng trên fb thì không có email nên lấy userID làm thế
                    // mục đích để khi người dùng đăng nhập lại thì mình biết nó đã tồn tại hay chưa và nó biết để cập nhật hoặc tạo mới.
                    photo: profile.imageURL,
                };

                const res: any = await authenticationAPI.HandleAuthentication(
                    api,
                    data,
                    'post',
                );

                dispatch(addAuth(res.data));

                await AsyncStorage.setItem('auth', JSON.stringify(res.data));

                setIsLoading(false);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <KeyboardAvoidingViewWrapper>
      <SectionComponent>
        <Image source={IMAGES.Login} style = {{width: '100%', height: 270, marginTop: 25}}/>
      </SectionComponent>
      <SectionComponent>
        <TextComponent 
          title
          text='Đăng Nhập'
          size={45}
          font={FONTFAMILY.poppins_bold}
          styles= {{marginBottom: 20}}/>
        <InputComponent
          value={email}
          placeholder='Email'
          onChange={val => setEmail(val)}
          allowClear
          affix= {<Sms size={22} color={COLORS.HEX_LIGHT_GREY}/>}/>
        <InputComponent
          value={password}
          placeholder='Mật khẩu'
          onChange={val => setPassword(val)}
          isPassword
          affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY}/>}/>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch 
              trackColor={{false: COLORS.WHITE, true: COLORS.ORANGE}}
              thumbColor={isRemember ? COLORS.WHITE : COLORS.ORANGE}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}/>
            <TextComponent text='Ghi nhớ tài khoản' />
          </RowComponent>
          <ButtonComponent 
            text='Quên mật khẩu?'
            type='link'
            onPress={() => {navigation.navigate('ForgotPassWord')}}/>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text='Đăng Nhập'
          type='orange'
          onPress={handleLogin}
          disable={isDisable}/>
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          text='Đăng nhập với'
          color={COLORS.HEX_LIGHT_GREY}
          styles = {{
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 10,
            fontFamily: FONTFAMILY.poppins_medium
          }}/>
        <RowComponent>
          <ButtonComponent 
            text='Google'
            iconFlex='left'
            type='orange'
            onPress={handleLoginWithGoogle}
            styles= {globalStyle.shadow}
            textColor={COLORS.HEX_LIGHT_GREY}
            icon= {<Google/>}/>
          <ButtonComponent 
            text='Facebook'
            iconFlex='left'
            type='orange'
            onPress={handleLoginWithFacebook}
            styles= {globalStyle.shadow}
            textColor={COLORS.HEX_LIGHT_GREY}
            icon= {<Facebook/>}/> 
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent 
            text='Bạn chưa có tài khoản? '/>
          <ButtonComponent
            type='link'
            text='Đăng ký'
            onPress={() => {navigation.navigate('SignUpScreen')}}/>
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading}/>
    </KeyboardAvoidingViewWrapper>
  )
}

export default LoginScreen