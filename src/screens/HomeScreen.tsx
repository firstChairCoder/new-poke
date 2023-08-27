import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import PokemonLogo from "../../assets/icons/PokemonLogo";

const styles = StyleSheet.create({
  homeBarWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: hp(3),
    paddingVertical: hp(4)
  },
  homeBarTitle: {
    alignSelf: "center",
    color: "#000",
    fontSize: wp(5),
    fontWeight: "bold"
  },
  logoContainer: {
    backgroundColor: "#fff",
    borderRadius: hp(3),
    bottom: -hp(3),
    position: "absolute"
  }
});

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.homeBarWrapper}>
        <Text style={styles.homeBarTitle}>TCG Marketplace</Text>
        <View style={styles.logoContainer}>
          <PokemonLogo width={hp(7)} height={hp(7)} />
        </View>
      </View>
    </SafeAreaView>
  );
};
