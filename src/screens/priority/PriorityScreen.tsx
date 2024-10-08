import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import workAPI from '../../apis/workAPI';
import { ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../component';
import { ArrowLeft2 } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import CardListWorkComponent from '../../component/CardListWorkComponent';
import moment from 'moment';

const PriorityScreen = ({navigation, route}: any) => {
  const user = useSelector(authSelector);
  const [getWorkPriority, setWorkPriority] = useState<any>([]);

  useEffect(() => {
    const getWorkPriorityAPI = async () => {
      try {
        const response = await workAPI.HandleWork(
          `/get-work-priority?id_user=${user.id}`,
        );
        setWorkPriority(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getWorkPriorityAPI();
  }, [getWorkPriority]);
  
  const WorkDetailHandle = (item : any) => {
    navigation.navigate('DetailWorkScreen', {data:item})
  }


  return (
    <ContainerComponent>
      <SectionComponent styles={{marginTop: 40}}>
        <RowComponent justify="space-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TextComponent
            text="Priority"
            color={COLORS.ORANGE}
            size={25}
            font={FONTFAMILY.poppins_medium}
          />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <FlatList
          data={getWorkPriority}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 200}}
          renderItem={({item}) => (
            <CardListWorkComponent
              onPress={() => WorkDetailHandle(item)}
              name={item.name}
              time={moment(item.date_work).format('HH:mm')}
              description={item.description}
              date={moment(item.date_work).format('DD/MM/YYYY')}
              isSuccess={item.success}
              idWork={item._id}
              id_priority={item.id_priority}
            />
          )}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default PriorityScreen