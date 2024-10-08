import { ArrowLeft2 } from 'iconsax-react-native'
import moment from 'moment'
import React, { useState } from 'react'
import { StatusBar, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FONTFAMILY } from '../../../../assets/fonts'
import COLORS from '../../../assets/colors/Colors'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../../component'
import { authSelector } from '../../../redux/reducers/authReducer'
import workAPI from '../../../apis/workAPI'
import { ReactNativeModal } from 'react-native-modal/dist/modal';
import LinearGradient from 'react-native-linear-gradient'
import { globalStyle } from '../../../styles/globalStyle'
import { Delete, Update } from '../../../assets/svgs'

const DetailWorkScreen = ({ navigation, route }: any) => {
    const user = useSelector(authSelector);
    const { data } = route.params
    console.log(data);

    const [isRemember, setIsRemember] = useState(data.success);
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const deleteWorkHandle = async () => {
        try {
            await workAPI.HandleWork(`/delete-work/${data._id}`, {}, 'delete');
            closeModal();
            navigation.navigate('Home');
        } catch (error) {
            console.log('Lỗi khi xóa công việc', error);
            closeModal();
        }
    };

    const HandleDataWork = (item : any) => {
        navigation.navigate('UpdateWorkScreen', {data: item})
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
                        text="Chi tiết công việc "
                        size={25}
                        font={FONTFAMILY.poppins_medium} />
                    <View></View>
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ alignItems: 'flex-end' }}>
                <TextComponent
                    text={isRemember ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                    color={COLORS.ORANGE}
                    styles={{ fontSize: 13, marginLeft: 10 }}
                />
            </SectionComponent>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.HEX_BLACK]}
                style={{ padding: 10, borderRadius: 25, marginBottom: 10 }}>
                <SectionComponent>
                    <TextComponent
                        text={data.name}
                        styles={{ fontFamily: FONTFAMILY.poppins_medium }}
                        size={20} />
                </SectionComponent>
                <SectionComponent>
                    <TextComponent
                        text={data.description}
                        styles={{ fontFamily: FONTFAMILY.poppins_regular, textAlign: 'justify' }}
                        size={15} />
                </SectionComponent>
                <SectionComponent>
                    <RowComponent justify="space-between">
                        <TextComponent
                            text={`Thời gian tạo: ${moment(data.createdAt).format('HH:mm')}`}
                            color={COLORS.ORANGE}
                            styles={{ fontSize: 14 }}
                        />
                        <TextComponent
                            text={`Ngày tạo: ${moment(data.createdAt).format('DD/MM/YYYY')}`}
                            color={COLORS.ORANGE}
                            styles={{ fontSize: 14 }}
                        />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <TextComponent
                        text={`Ngày hết hạn: ${moment(data.date_work).format('HH:mm')}    ${moment(data.date_work).format('DD/MM/YYYY',)}`}
                        color={COLORS.ORANGE}
                        styles={{ fontSize: 14 }}
                    />
                </SectionComponent>
                <SectionComponent styles={{ marginTop: 20 }}>
                    <RowComponent>
                        <ButtonComponent
                            text=''
                            iconFlex='left'
                            type='orange'
                            styles={[globalStyle.shadow, { flex: 0.2, marginRight: 20, backgroundColor: COLORS.primaryGreyHex }]}
                            icon = {<Update style={{marginLeft: 13}}/>}
                            onPress={() => HandleDataWork(data)}
                        />
                        <ButtonComponent
                            onPress={openModal}
                            text=''
                            iconFlex='left'
                            type='orange'
                            styles={[globalStyle.shadow, { flex: 0.2, marginRight: 20, backgroundColor: COLORS.primaryGreyHex }]}
                            icon={<Delete style={{ marginLeft: 13 }} />}
                        />
                    </RowComponent>
                </SectionComponent>
            </LinearGradient>
            <ReactNativeModal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                style={{ marginHorizontal: 10, justifyContent: 'center' }}
            >
                <View style={{ borderRadius: 10, padding: 20, backgroundColor: COLORS.WHITE }}>
                    <TextComponent text='Bạn có chắc muốn xóa công việc này không?' color={COLORS.ORANGE} size={15} />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                borderWidth: 1,
                                backgroundColor: COLORS.LIGHT,
                                padding: 8,
                                borderRadius: 10,
                                width: 70,
                                borderColor: COLORS.LIGHT
                            }}
                            onPress={closeModal}>
                            <TextComponent text='No' color={COLORS.HEX_LIGHT_GREY} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginRight: 10,
                                borderWidth: 1,
                                backgroundColor: COLORS.ORANGE,
                                padding: 8,
                                borderRadius: 10,
                                width: 70,
                                borderColor: COLORS.ORANGE
                            }}
                            onPress={deleteWorkHandle}>
                            <TextComponent text='Yes' color={COLORS.WHITE} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </ContainerComponent>
    )
}

export default DetailWorkScreen