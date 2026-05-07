import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-10 bg-white">
      <View className="items-center justify-center">
        <Image
          source={require("./photos/profile1.jpg")}
          style={{ width: 150, height: 150, borderRadius: 100 }}
          className="border-2 border-black"
          resizeMode="cover"
        />
      </View>


      <View className="items-center">
        <Text className="text-black text-[32px] font-bold">Jeffie N. Racal</Text>
        <Text className="text-gray-600 text-[18px]">Junior Full Stack Web Developer</Text>
      </View>

      <View className='flex-row gap-4'>
        <Pressable
          className='bg-black px-6 py-3 rounded-full active:opacity-70'
          onPress={() => router.push('/index2')}
        >
          <Text className='text-white font-semibold'>My Task</Text>
        </Pressable>

        
      </View>
    </View>
  );
}

export default Index;