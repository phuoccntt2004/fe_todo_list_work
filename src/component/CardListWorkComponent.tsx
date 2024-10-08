import { Clock, Flag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
import workAPI from '../apis/workAPI';
import { ObjectId } from 'mongoose'
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    name?: string,
    time?: string,
    date?: string,
    description?: string,
    onPress?: () => void,
    isSuccess?: boolean,
    idWork: ObjectId,
    id_priority?: any
}

const CardListWorkComponent = (props: Props) => {
    const { name, time, date, description, onPress, isSuccess, idWork, id_priority } = props
    const [isRemember, setIsRemember] = useState(isSuccess);

    useEffect(() => {
        const updateSuccess = async () => {
            try {
                await workAPI.HandleWork(`/update-success/${idWork}`, { success: isRemember }, 'put')
            } catch (error) {
                console.log('Lỗi update success', error);

            }
        }
        updateSuccess()
    }, [isRemember])

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.HEX_BLACK]}
                style={{ padding: 10, borderRadius: 25, marginBottom: 10 }}>
                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <Flag size={20} variant='Bold' color={id_priority?.color} />
                        <RowComponent
                            justify="flex-end"
                            onPress={() => setIsRemember(!isRemember)}>
                            <Switch
                                trackColor={{ false: COLORS.WHITE, true: COLORS.ORANGE }}
                                thumbColor={isRemember ? COLORS.WHITE : COLORS.HEX_LIGHT_GRAY}
                                value={isRemember}
                                onChange={() => setIsRemember(!isRemember)}
                            />
                            <TextComponent
                                text={isRemember ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                styles={{ fontSize: 13, marginLeft: 10 }}
                                color={isRemember ? COLORS.ORANGE : COLORS.WHITE}
                            />
                        </RowComponent>
                    </RowComponent>
                    <TextComponent text={name} size={16} styles={{ fontWeight: 'bold', marginBottom: 5 }} />
                    <TextComponent text={description} size={12} numberOfLines={2} />
                    <RowComponent justify="space-between" styles={{ alignItems: 'center' }}>
                        <RowComponent justify="flex-start" styles={{ alignItems: 'center' }}>
                            <Clock size={22} color={COLORS.ORANGE} variant='Bold' />
                            <TextComponent text={time} size={14} styles={{ marginTop: 4, marginStart: 3 }} />
                        </RowComponent>
                        <TextComponent text={date} size={14} styles={{ marginTop: 5 }} />
                    </RowComponent>
                </SectionComponent>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CardListWorkComponent