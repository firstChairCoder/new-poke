/* eslint-disable react/no-unstable-nested-components */
import { FlashList } from "@shopify/flash-list";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useAtom } from "jotai";

import type { SelectedCardType } from "../models/card";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useCartCount } from "../hooks/useCartCount";
import { cardsListAtom } from "../utils/atoms";

interface PokemonCardProps {
  item: SelectedCardType;
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    marginBottom: hp(6),
    marginTop: hp(5),
    zIndex: 0
  },
  cardImage: {
    height: hp(30),
    marginBottom: -hp(9),
    width: wp(40),
    zIndex: 1
  },
  emptyText: {
    alignSelf: "center",
    marginBottom: hp(2)
  },
  cardBtnText: {
    fontSize: wp(5)
  },
  innerCardWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    paddingBottom: hp(5),
    paddingTop: hp(10),
    width: wp(60)
  },
  cardName: {
    fontSize: wp(5)
  },
  cardRarity: {
    color: "#0f6db0",
    fontSize: wp(3),
    marginVertical: hp(0.5)
  },
  cardPriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(20),
    width: wp(70)
  },
  cardBtn: {
    alignItems: "center",
    borderRadius: wp(5),
    justifyContent: "center",
    marginTop: -hp(3),
    paddingVertical: hp(1),
    width: wp(45)
  },
  cardPrice: {
    color: "#6a6a69"
  }
});

const Card = ({ item }: PokemonCardProps) => {
  const { updateCartCount } = useCartCount();
  const [cardsList, setCardsList] = useAtom(cardsListAtom);
  return (
    <View style={styles.cardWrapper}>
      {typeof item.cardType.images !== "undefined" ? (
        <Image
          source={{ uri: item.cardType.images.small }}
          style={styles.cardImage}
        />
      ) : null}
      <View style={styles.innerCardWrapper}>
        <Text style={styles.cardName}>{item.cardType.name ?? ""}</Text>
        <Text style={styles.cardRarity}>{item.cardType.rarity ?? ""}</Text>
        {typeof item.cardType.cardMarket !== "undefined" ? (
          <View style={styles.cardPriceWrapper}>
            <Text style={styles.cardPrice}>
              ${item.cardType.cardMarket.prices.averageSellPrice ?? ""}
            </Text>
            <Text style={styles.cardPrice}>
              {item.cardType.set.total ?? 0} left
            </Text>
          </View>
        ) : null}
      </View>

      <Pressable
        style={[
          styles.cardBtn,
          { backgroundColor: item.cardType.selected ? "black" : "#fdce29" }
        ]}
        onPress={() => {
          if (!item.cardType.selected) {
            updateCartCount(item, cardsList, setCardsList);
          }
        }}
      >
        <Text
          style={[
            styles.cardBtnText,
            { color: item.cardType.selected ? "#fff" : "#000" }
          ]}
        >
          {item.cardType.selected ? "Selected Card" : "Select Card"}
        </Text>
      </Pressable>
    </View>
  );
};

export default function PokemonsList({
  cardsListData
}: {
  cardsListData: SelectedCardType[];
}) {
  const renderItem = ({ item }: { item: SelectedCardType }) => (
    <Card item={item} />
  );
  if (cardsListData) {
    return (
      <FlashList
        data={cardsListData}
        keyExtractor={(item) => item.cardType.id.toString()}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <>
              {cardsListData.length > 10 ? (
                <ActivityIndicator color={"#fdce29"} size={"small"} />
              ) : (
                <Pressable>
                  <SearchIcon />
                  <Text>show more</Text>
                </Pressable>
              )}
            </>
          );
        }}
        ListFooterComponent={() => (
          <>
            <Text style={styles.emptyText}>No data available</Text>
          </>
        )}
        renderItem={renderItem}
      />
    );
  } else {
    return null;
  }
}
