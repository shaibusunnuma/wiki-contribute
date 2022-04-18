//@ts-nocheck
import React from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Animated, { EasingNode } from "react-native-reanimated";
const {Value, timing} = Animated

//calculate window size
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Search(){
    const [isFocused, setIsFocused] = React.useState(false);
    const [searchWord, setSearchWord] = React.useState('');
    const  inputRef = React.useRef<TextInput>(null);
    //const _input_box_translate_x: any = React.useRef(new Value(width)).current;
    const _input_box_translate_x: any = new Value(width);
    const _back_button_opacity: any = new Value(0);
    const _content_translate_y = height;
    const _content_opacity = 0;

    const onFocused = () => {
        setIsFocused(true);
        const input_box_translate_x_config: any = {
            duration: 0,
            toValue: 0,
            easing: EasingNode.inOut(EasingNode.ease)
        }
        const back_button_opacity_config: any = {
            duration: 200,
            toValue: 1,
            easing: EasingNode.inOut(EasingNode.ease)
        }

        timing(_input_box_translate_x, input_box_translate_x_config).start();
        timing(_back_button_opacity, back_button_opacity_config).start();
        //inputRef.focus();
    }

    const onBlur = () => {
        setIsFocused(false);
        const input_box_translate_x_config: any = {
            duration: 200,
            toValue: width,
            easing: EasingNode.inOut(EasingNode.ease)
        }
        const back_button_opacity_config: any = {
            duration: 50,
            toValue: 0,
            easing: EasingNode.inOut(EasingNode.ease)
        }

        timing(_input_box_translate_x, input_box_translate_x_config).start();
        timing(_back_button_opacity, back_button_opacity_config).start();
        //inputRef.blur();
    }

    return (
        <>
            <SafeAreaView style={styles.header_safe_area}>
                <View style={styles.header}>
                    <View style={styles.header_inner}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#990000', height: 30}}>WikiContribute</Text>
                        <TouchableHighlight 
                            activeOpacity ={1}
                            underlayColor = {'#ccd0d5'}
                            onPress={onFocused}
                            style={styles.search_icon_box}
                        >
                            <MaterialCommunityIcons name="magnify" color={'#000000'} size={29} />
                        </TouchableHighlight>
                        <Animated.View 
                            style={[styles.input_box, {transform: [{translateX: _input_box_translate_x}]}]}
                        >
                            <Animated.View style={{opacity: _back_button_opacity}}>
                                <TouchableHighlight
                                    activeOpacity ={1}
                                    underlayColor = {'#ccd0d5'}
                                    onPress={onBlur}
                                    style={styles.back_icon_box}
                                >
                                    <MaterialCommunityIcons name="chevron-right" color={'#000000'} size={22} />
                                </TouchableHighlight>
                            </Animated.View>
                            <TextInput
                                ref = {inputRef}
                                placeholder='Search WikiData'
                                clearButtonMode='always'
                                value={searchWord}
                                onChangeText={(value) => setSearchWord(value)}
                                style={styles.input}
                            />
                        </Animated.View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}



const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },
    header: {
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        width: width - 32,
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    }
})
