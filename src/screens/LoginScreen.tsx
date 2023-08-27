import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Controller, useForm } from "react-hook-form";
import { useAtom } from "jotai";

import PokemonLogo from "../../assets/icons/PokemonLogo";
import { isAuthenticatedAtom } from "../utils/atoms";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center"
  },
  loginTitle: {
    color: "#000",
    fontSize: wp(7),
    fontWeight: "bold"
  },
  input: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    height: hp(7),
    marginBottom: 20,
    padding: 10,
    width: wp(80)
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 5,
    height: hp(7),
    justifyContent: "center",
    width: "80%"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export const LoginScreen = () => {
  const { control, handleSubmit } = useForm();
  const [_, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const onSubmit = (data: any) => {
    console.log(data);
    setIsAuthenticated(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar animated barStyle={"dark-content"} backgroundColor={"white"} />
      <Text style={styles.loginTitle}>TCG Marketplace</Text>
      <PokemonLogo height={hp(20)} width={hp(20)} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="username"
        defaultValue={""}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
          />
        )}
        name="password"
        defaultValue={""}
      />
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
    </View>
  );
};
