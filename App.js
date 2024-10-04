import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

// Sample product data for FlatList
const products = [
  { id: '1', name: 'AERO SPORT INFINITY PRO', price: 'Rp400.000', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
  { id: '2', name: 'SPORT - INVINCIBLE PRO', price: 'Rp399.000', image: 'data:image/jpeg;base64,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' },
  { id: '3', name: 'SPORT SNEAKERS - BLUE', price: 'Rp200.000', image: 'data:image/jpeg;base64,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' },
  { id: '4', name: 'SPORT - INVINCIBLE MAX', price: 'Rp393.000', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTxZsMnyZtZne8QSu2iwqNs8SEfUyqo_2fa4gIYN5oh1GchRTQoPsRAzxzum8arOJvmFSskhqv5bMEkwDHFng-7YeERqWjXIwvJZBj_kFppoIggOdm-Vk-W' },
  { id: '5', name: 'AIR SPORT', price: 'Rp200.000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '6', name: 'SPORT MAX', price: 'Rp350.000', image: 'data:image/jpeg;base64,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' }
];

// Home Screen Component
function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'grey' }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Sho</Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search items" style={styles.searchInput} />
        </View>
      </View>

      {/* Wallet Section */}
      <View style={styles.walletSection}>
        <View style={styles.walletInfo}>
          <Text>Wallet balance</Text>
          <Text style={styles.balanceText}>$1000</Text>
          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpText}>Top up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.offerText}>25% OFF All Items</Text>
      </View>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <FontAwesome5 name="shoe-prints" size={24} color="white" />
          <Text>Footwear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <FontAwesome5 name="shopping-bag" size={24} color="white" />
          <Text>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <FontAwesome5 name="tshirt" size={24} color="white" />
          <Text>Apparel</Text>
        </TouchableOpacity>
      </View>

      {/* Product Section */}
      <Text style={styles.sectionTitle}>For You</Text>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

// Wishlist Screen Component
function WishlistScreen() {
  return (
    <FlatList
      data={products.slice(0, 4)}  // Displaying fewer items for Wishlist
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.product}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

// Notification Screen Component
function NotificationScreen() {
  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.notificationTitle}>Limited-Time Promo - Up to 50% OFF!</Text>
      <Text style={styles.notificationText}>
        Don't miss out on this special opportunity! Get up to 50% off on all our sports shoes.
      </Text>
      <Text style={styles.notificationTitle}>Flash Sale Alert - Save Big Today!</Text>
      <Text style={styles.notificationText}>
        Hurry, our flash sale is live now! Grab your favorite sports shoes at unbeatable prices.
      </Text>
      <Text style={styles.notificationTitle}>Good Morning, Runner!</Text>
      <Text style={styles.notificationText}>
        It's time to step out and run. Give your best today and enjoy every step.
      </Text>
      <Text style={styles.notificationTitle}>Exclusive Discount Just for You</Text>
      <Text style={styles.notificationText}>
        Enjoy an exclusive 15% discount on our shoe products. Use the code EXCLUSIVE15 at checkout.
      </Text>
    </View>
  );
}

// Profile Screen Component
function ProfileScreen() {
  return;
}


// Exchange Screen Component
function ExchangeScreen() {
  return;
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return <MaterialIcons name="home" size={size} color={color} />;
            } else if (route.name === 'Wishlist') {
              return <Feather name="heart" size={size} color={color} />;
            } else if (route.name === 'Notifications') {
              return <Feather name="bell" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <MaterialIcons name="person" size={size} color={color} />;
            } else if (route.name === 'Exchange') {
              return <MaterialIcons name="swap-horiz" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#ff6f00',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIconStyle: { marginBottom: -5 }, // Matches the icon position in your image
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Exchange" component={ExchangeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
  },
  walletSection: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  walletInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontWeight: 'bold',
  },
  topUpButton: {
    backgroundColor: '#ff6f00',
    padding: 5,
    borderRadius: 5,
  },
  topUpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  offerText: {
    marginTop: 10,
    color: '#ff6f00',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
  },
  product: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    color: 'orange',
    fontSize: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 20,
  },
});
