import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./screens/TodoListScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import { colors } from "./utils/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: "600",
            },
          }}
        >
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
