import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../../../assets/fonts';
import workAPI from '../../../../apis/workAPI';
import COLORS from '../../../../assets/colors/Colors';
import { ButtonComponent, CategoriesList, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../../component';
import { useGetPriority } from '../../../../hook/useGetPriority';

const UpdateWorkScreen = ({ navigation, route }: any) => {

    const { data } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { getPriority } = useGetPriority()
    const [priority, setPriority] = useState<String>(data.id_priority._id.toString())

    const HandlePriority = (priority: String) => {
        setPriority(priority)
    }

    useEffect(() => {
        if (data) {
            setName(data.name || '');
            setDescription(data.description || '');
        }
    }, [data]);

    const updateWorkHandle = async () => {
        try {
            const response: any = await workAPI.HandleWork(`/update-work/${data._id}`, { name, description, id_priority:priority }, 'put');
            const updatedWork = response.work;
            setName('');
            setDescription('');
            navigation.navigate('DetailWorkScreen', { data: updatedWork });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContainerComponent>
            <SectionComponent styles={{ marginTop: 40 }}>
                <RowComponent justify='space-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft2 size={24} color={COLORS.WHITE} />
                    </TouchableOpacity>
                    <TextComponent
                        text="Cập nhật công việc"
                        size={25}
                        color={COLORS.ORANGE}
                        font={FONTFAMILY.poppins_medium} />
                    <View></View>
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={30} />
            <SectionComponent>
                <TextComponent text="Tên công việc:" />
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Tên công việc"
                    style={{ borderColor: COLORS.HEX_LIGHT_GREY, borderWidth: 1, padding: 10, borderRadius: 16, color: COLORS.HEX_LIGHT_GREY }}
                />
            </SectionComponent>

            <SectionComponent>
                <TextComponent text="Mô tả công việc:" />
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Mô tả công việc"
                    style={{ borderColor: COLORS.HEX_LIGHT_GREY, borderWidth: 1, padding: 10, borderRadius: 16, height: 150, textAlignVertical: 'top', color: COLORS.HEX_LIGHT_GREY }}
                    multiline
                />
            </SectionComponent>
            <SpaceComponent height={30} />
            <SectionComponent>
                <CategoriesList
                    dataCategories={getPriority}
                    onDataCategories={HandlePriority}
                    id_priority={data.id_priority._id.toString()}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    type='orange'
                    text="Cập nhật"
                    onPress={updateWorkHandle}
                    styles={{ backgroundColor: COLORS.ORANGE }}
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default UpdateWorkScreen