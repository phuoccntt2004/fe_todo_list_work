import React from 'react'
import { ImageBackground } from 'react-native'
import COLORS from '../assets/colors/Colors'
import IMAGES from '../assets/images'
import { RowComponent, SpaceComponent, TextComponent } from '../component'
import { ActivityIndicator } from 'react-native'

const SplashScreen = () => {

  return (
    <ImageBackground 
      source={IMAGES.Splash_Logo}
      style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      imageStyle= {{flex: 1}}>
        <RowComponent justify='center'>
          <TextComponent text="TODOLIST " color={COLORS.WHITE} title />
          <TextComponent text="WORK" color={COLORS.ORANGE} title />
        </RowComponent>
        <SpaceComponent height={16}/>
        <ActivityIndicator color={COLORS.ORANGE} size={30}/>
    </ImageBackground>
  )
}

export default SplashScreen