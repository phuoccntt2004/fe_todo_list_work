import { ArrowLeft2, Calendar, Flag, Send } from 'iconsax-react-native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import workAPI from '../apis/workAPI';
import COLORS from '../assets/colors/Colors';
import { CategoriesList, ContainerComponent, InputComponent, RowComponent, SectionComponent, TextComponent } from '../component';
import { authSelector } from '../redux/reducers/authReducer';
import { globalStyle } from '../styles/globalStyle';
import { FONTFAMILY } from '../../assets/fonts';
import { useGetPriority } from '../hook/useGetPriority';

const AddNewWork = ({navigation}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isName, setIsName] = useState('');
  const [isdescription, isSetDescription] = useState('');
  const user = useSelector(authSelector);
  const {getPriority}= useGetPriority()
  const [priority,setPriority]= useState<String>("")
  
  const HandlePriority =(priority:String)=>{
    setPriority(priority)    
  }

  const AddNewWork = async () => {
    try {
      await workAPI.HandleWork('/add-work', { id_user: user.id, name: isName, description: isdescription, date_work: date, id_priority: priority }, 'post')
      setIsName('')
      isSetDescription('')
      setDate(new Date())
    } catch (error) {
      console.log("Add error", error);
    }
  }
  return (
    <ContainerComponent>
      <SectionComponent styles={{ marginTop: 40 }}>
        <RowComponent justify='space-between'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TextComponent
            text="Add to work"
            color={COLORS.ORANGE}
            size={25}
            font={FONTFAMILY.poppins_medium} />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{ marginTop: 80 }}>
        <InputComponent
          value={isName}
          onChange={val => setIsName(val)}
          placeholder='Nhập công việc'
          allowClear />
        <TextInput
          style={[styles.input, globalStyle.text]}
          multiline={true}
          placeholder="Nhập nội dung ở đây..."
          value={isdescription}
          onChangeText={isSetDescription}
          placeholderTextColor={COLORS.HEX_LIGHT_GREY}
        />
      </SectionComponent>
      <SectionComponent>
        <CategoriesList dataCategories={getPriority} onDataCategories={HandlePriority}/>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Calendar size={35} variant='Bold' color={COLORS.ORANGE} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity onPress={AddNewWork}>
            <Send size={35} variant='Bold' color={COLORS.ORANGE} />
          </TouchableOpacity>
        </RowComponent>
        <DatePicker
          modal
          open={open}
          date={date}
          minimumDate={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewWork

const styles = StyleSheet.create({
  input: {
    color: COLORS.HEX_LIGHT_GRAY,
    height: 150,
    borderColor: COLORS.HEX_LIGHT_GREY,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    textAlignVertical: 'top', // Đặt văn bản bắt đầu từ phía trên cùng của TextInput
  },
})