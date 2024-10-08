import { Flag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import COLORS from '../assets/colors/Colors';

interface Category {
    dataCategories:any
    onDataCategories: (data: String) => void,
    id_priority?:String
    
}



const CategoriesList = (props:Category) => {
    const {dataCategories,onDataCategories,id_priority}=props
    const [selectedCategory, setSelectedCategory] = useState<String>(id_priority??'');
    
    useEffect(()=>{
        onDataCategories(selectedCategory)
    },[selectedCategory])
    

    const renderCategoryItem = ({ item }:any) => {
        const isSelected = item._id.toString() === selectedCategory;
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected ? styles.selectedCategory : null]}
                onPress={() => setSelectedCategory(item._id.toString())}
            >
                <Flag size={35} variant='Bold' color={item.color}/> 
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={dataCategories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderCategoryItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 5,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: COLORS.HEX_LIGHT_GREY,
    },
    selectedCategory: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});


export default CategoriesList;