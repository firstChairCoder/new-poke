import { useAtom } from "jotai";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { isAuthenticatedAtom } from "../utils/atoms";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createStackNavigator();
export default function RootStackScreen() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ cardStyle: { backgroundColor: "transparent" } }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ cardStyle: { backgroundColor: "transparent" } }}
            />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: "transparentModal"
            }}
          >
            <Stack.Screen name="CartsModal" component={LoginScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
