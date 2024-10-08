import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import workAPI from '../../apis/workAPI'
import { ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../component'
import CardListWorkComponent from '../../component/CardListWorkComponent'
import { authSelector } from '../../redux/reducers/authReducer'
import { ArrowLeft2 } from 'iconsax-react-native'
import COLORS from '../../assets/colors/Colors'
import { FONTFAMILY } from '../../../assets/fonts'

const SuccessWork = ({ navigation }: any) => {

  const user = useSelector(authSelector);

  const [successWork, setSuccessWork] = useState<any>([])

  useEffect(() => {
    const getWorkSuccessById = async () => {
      try {
        const SetWorkSuccessById = await workAPI.HandleWork(`/success-work/${user.id}`);
        setSuccessWork(SetWorkSuccessById.data)

      } catch (error) {
        console.log(error);
      }
    }
    getWorkSuccessById()
  }, [successWork]);

  const WorkDetailHandle = (item: any) => {
    navigation.navigate('DetailWorkScreen', { data: item })
  }

  return (
    <ContainerComponent>
      <StatusBar barStyle={'light-content'} />
      <SectionComponent styles={{ marginTop: 40 }}>
        <RowComponent justify='space-between'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TextComponent
            text="Lịch sử hoàn thành"
            size={25}
            font={FONTFAMILY.poppins_medium} />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={30}/>
      <SectionComponent>
        <FlatList
          data={successWork}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
          renderItem={({ item }) => (
            <CardListWorkComponent
              onPress={() => WorkDetailHandle(item)}
              name={item.name}
              time={moment(item.date_work).format("HH:mm")}
              description={item.description}
              date={moment(item.date_work).format("DD/MM/YYYY")}
              isSuccess={item.success}
              idWork={item._id}
            />)} />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default SuccessWork