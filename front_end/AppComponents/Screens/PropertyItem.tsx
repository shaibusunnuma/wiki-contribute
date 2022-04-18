import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ListItem, Card } from "@rneui/base";

//@ts-ignore
export default ({ property }) => {
    let Value;
    if (property.wdLabel.value ===  'image'){
        Value = <ImageValue value={property.ps_Label.value} />
    } else {
        Value = <TextValue value={property.ps_Label.value} />
    }
    return (
    <ListItem containerStyle={styles.itemContainer}>
        <Card containerStyle={styles.card}>
            <View style={styles.top}>
                <Text style={styles.property}>{property.wdLabel.value}</Text>
                <TouchableOpacity style={styles.iconContainer} onPress={() =>console.log('You clicked a property')}>
                    <MaterialCommunityIcons name="pencil" size={18} color="black" />
                </TouchableOpacity>
            </View>
            <Card.Divider />
            {Value}
            {/* <Text style={styles.value}> {property.ps_Label.value}</Text> */}
        </Card>
    </ListItem>
    )
  
};
//@ts-ignore
const TextValue = ({value}) => (<Text style={styles.value}>{value}</Text>)

//@ts-ignore
const ImageValue = ({ value }) => (
    <Card.Image
        style={{ padding: 0 }}
        source={{
            uri:value,
        }}
    />
)



const styles = StyleSheet.create({
  itemContainer: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card: {
      width: '100%',
      margin: 0
  },
  property: {
    fontSize: 13,
  },
  value: {
    fontSize: 16,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})