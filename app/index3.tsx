import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native'
import React from 'react'

const index3 = () => {

const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-10">
          <Text className="text-black text-[36px]">My Skills</Text>
          <Text className="text-black text-[18px] border border-black p-4 rounded-lg">HTML</Text>
          <Text className="text-black text-[18px] border border-black p-4 rounded-lg">CSS/TAILWINDCSS</Text>
          <Text className="text-black text-[18px] border border-black p-4 rounded-lg">Javascript</Text>
          <Text className="text-black text-[18px] border border-black p-4 rounded-lg">Node.js</Text>
          <Text className="text-black text-[18px] border border-black p-4 rounded-lg">MySQL</Text>
          
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

export default index3