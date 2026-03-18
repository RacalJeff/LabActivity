import { Stack, Tabs } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack>

    <Stack.Screen name="index" options={{
      headerShown: false,
    }}
    />

    <Stack.Screen name="index2" options={{
      headerShown: false,
    }}
    />

    <Stack.Screen name="index3" options={{
      headerShown: false,
    }}
    />
  </Stack>;


     
  // return <Tabs tabBar={()=> <TabBar/>}>
  //       <Tabs.Screen 
  //       name="index" 
  //       options={{
  //         headerShown: false,
  //       }}
  //       />

  //       <Tabs.Screen 
  //       name="profile" 
  //       options={{
  //         headerShown: false,
  //       }}
  //       />
  //     </Tabs>


}
