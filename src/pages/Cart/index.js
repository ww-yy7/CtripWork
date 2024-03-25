import { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Button} from 'react-native'
import { CartContext } from '../../contexts/CartContext'
import CardItem from '../../components/CardItem'


export default function Cart() {
    const { cart, addItemCart, removeItemCart, clearCart, total } = useContext(CartContext);



    return (
        <View style={stlyes.container}>
            <FlatList
                data={cart}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={() => <Text>购物车空空如也...</Text>}
                renderItem={({ item }) => (
                    <CardItem
                        data={item}
                        addAmount={() => addItemCart(item)}
                        removeAmount={() => removeItemCart(item)}
                        check={() => clearCart(item)}
                    />
                )}
                ListFooterComponent={() => 
                <>
                    <Text style={stlyes.total}>共计: {total} ¥</Text>
                    <Button 
                        title='结账' 
                        onPress={clearCart}
                        style={stlyes.checkoutButton} />
                </>
            }
            />
        </View>
    )
}

const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    checkoutButton: {
        marginTop: 16, 
        paddingHorizontal: 16, 
        paddingVertical: 12,
        borderRadius: 4, 
        backgroundColor: '#007AFF', 
    },
})