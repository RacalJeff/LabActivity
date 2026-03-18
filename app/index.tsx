import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const ProfilePic = require("./photos/profile1.jpg");

  return (
    <View className="flex-1 items-center justify-center gap-10 bg-white">
      <View className="items-center justify-center">
        <Image
          source={ProfilePic}
          style={{ width: 150, height: 150, borderRadius: 75 }}
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
          <Text className='text-white font-semibold'>View my projects</Text>
        </Pressable>

        <Pressable
          className='bg-black px-6 py-3 rounded-full active:opacity-70'
          onPress={() => router.push('/index3')}
        >
          <Text className='text-white font-semibold'>My skills</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Index;