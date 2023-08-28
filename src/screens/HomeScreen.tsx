import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useAtom } from "jotai";
import { useEffect } from "react";

import PokemonLogo from "../../assets/icons/PokemonLogo";
import BasketIcon from "../../assets/icons/BasketIcon";
import { usePokemons } from "../hooks/usePokemons";
import { cardsListAtom, totalCartCardsAtom } from "../utils/atoms";
import PokemonsList from "../components/PokemonsList";

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
  },
  cartText: {
    color: "#fff",
    marginLeft: wp(1)
  },
  notification: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    left: -10,
    minWidth: 20,
    position: "absolute",
    top: -10,
    zIndex: 2
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold"
  },
  cartBtn: {
    alignSelf: "center",
    backgroundColor: "#298bfd",
    borderRadius: wp(3),
    bottom: hp(10),
    flexDirection: "row",
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    position: "absolute",
    width: wp(30),
    zIndex: 1
  }
});

export const HomeScreen = () => {
  const { isError, isInitialLoading, data: response } = usePokemons();
  const [cardsListData, setCardsListData] = useAtom(cardsListAtom);
  const [totalCards, _] = useAtom(totalCartCardsAtom);

  useEffect(() => {
    if (response && response.pages && response.pages.length > 0) {
      const updatedCardsList = response.pages.flatMap((page) =>
        page.data
          ? page.data.map((item) => ({
              cardType: item,
              cartCount: 0
            }))
          : []
      );
      setCardsListData(updatedCardsList);
    }
  }, [response]);

  console.log("Response: ", cardsListData);

  const pokemonList = () => {
    if (isError) {
      return <Text>Something went wrong</Text>;
    }
    if (isInitialLoading) {
      return <ActivityIndicator color="#fdce29" size="large" />;
    }

    if (cardsListData?.length) {
      return (
        <View style={{ flex: 1 }}>
          <PokemonsList {...{ cardsListData }} />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.homeBarWrapper}>
        <Text style={styles.homeBarTitle}>TCG Marketplace</Text>
        <View style={styles.logoContainer}>
          <PokemonLogo width={hp(7)} height={hp(7)} />
        </View>
      </View>

      {pokemonList()}

      {totalCards > 0 ? (
        <Pressable style={styles.cartBtn}>
          <BasketIcon width={hp(2.5)} height={hp(2.5)} />
          <Text style={styles.cartText}>View Cart</Text>
          <View style={styles.notification}>
            <Text style={styles.notificationText}>Notification</Text>
          </View>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};
