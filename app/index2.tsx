import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native'
import React from 'react'


const index2 = () => {

  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-10">
      <Text className="text-black text-[36px]">My Projects</Text>
      <Text className="text-black text-[18px] border border-black p-4 rounded-lg">Web Learning App</Text>   
      <Text className="text-black text-[18px] border border-black p-4 rounded-lg">Inventory Manangement System</Text>
      <Text className="text-black text-[18px] border border-black p-4 rounded-lg">Online Voting System</Text>


      <View>
                  <Pressable
                    className="bg-black flex items-center justify-center px-6 py-3 rounded-full"
                    onPress={() => router.dismissTo("/")}>
                    <Text className="text-white">Back to home</Text>
                  </Pressable>
                </View>
    </View>
  )
}

export default index2