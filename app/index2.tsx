import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

type TaskType = {
  id: string;
  title: string;
  completed: boolean;
};

const Index = () => {
  const router = useRouter();

  const [task, setTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTasks = async (updatedTasks: TaskType[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Empty Task', 'Please enter a task first.');
      return;
    }
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedTasks = tasks.filter((item) => item.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const markAllComplete = () => {
    const updatedTasks = tasks.map((item) => ({ ...item, completed: true }));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteCompletedTasks = () => {
    Alert.alert('Delete Completed', 'Delete all completed tasks?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedTasks = tasks.filter((item) => !item.completed);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <View className="flex-1 bg-white pt-[12%] px-[5%]">

      <View className="flex-row items-center mt-8 mb-5">
        <Pressable
          onPress={() => router.dismissTo("/")}
          className="bg-black p-3 rounded-2xl mr-2"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>

        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Enter new task..."
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 mr-2 text-base"
        />

        <Pressable
          onPress={addTask}
          disabled={task.trim() === ''}
          className={`px-5 py-3 rounded-2xl ${task.trim() === '' ? 'bg-gray-400' : 'bg-black'}`}
        >
          <Text className="text-white font-semibold">Add</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-2 mb-6">
        <Ionicons name="search" size={20} color="gray" className="mr-2" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search your tasks..."
          className="flex-1 text-base py-1"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </Pressable>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold mb-4 text-black">Dashboard</Text>
        <View className="flex-row justify-between">
          
          <View className="bg-blue-50 w-[30%] p-4 rounded-3xl items-center border border-blue-100">
            <Ionicons name="list" size={24} color="#3b82f6" />
            <Text className="text-xl font-bold text-blue-600 mt-1">{totalTasks}</Text>
            <Text className="text-[10px] uppercase font-bold text-blue-400">Total</Text>
          </View>

          <View className="bg-orange-50 w-[30%] p-4 rounded-3xl items-center border border-orange-100">
            <Ionicons name="time" size={24} color="#f97316" />
            <Text className="text-xl font-bold text-orange-600 mt-1">{pendingTasks}</Text>
            <Text className="text-[10px] uppercase font-bold text-orange-400">Pending</Text>
          </View>

          <View className="bg-green-50 w-[30%] p-4 rounded-3xl items-center border border-green-100">
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text className="text-xl font-bold text-green-600 mt-1">{completedTasks}</Text>
            <Text className="text-[10px] uppercase font-bold text-green-400">Done</Text>
          </View>

        </View>
      </View>

      <View className="flex-row gap-3 mb-6">
        <Pressable
          onPress={markAllComplete}
          className="flex-1 bg-green-600 py-4 rounded-2xl shadow-sm flex-row justify-center items-center"
        >
          <Text className="text-white text-center font-bold">Mark All Done</Text>
        </Pressable>

        <Pressable
          onPress={deleteCompletedTasks}
          className="flex-1 bg-red-600 py-4 rounded-2xl shadow-sm flex-row justify-center items-center"
        >
          <Ionicons name="trash-bin" size={20} color="white" className="mr-2" />
          <Text className="text-white text-center font-bold">Clear Done</Text>
        </Pressable>
      </View>

      {tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center opacity-50">
          <Ionicons name="clipboard-outline" size={80} color="#CBD5E0" />
          <Text className="text-xl font-bold text-gray-400 mt-4">No Tasks Yet</Text>
        </View>
      ) : (
        <>
          <Text className="text-2xl font-bold mb-4">
            {searchQuery ? 'Search Results' : 'My Tasks'}
          </Text>

          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View
                className={`flex-row items-center justify-between p-[4%] rounded-3xl mb-3 ${
                  item.completed ? 'bg-gray-50 opacity-60' : 'bg-gray-100'
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <Pressable onPress={() => toggleTask(item.id)} className="mr-4">
                    <Ionicons
                      name={item.completed ? 'checkbox' : 'square-outline'}
                      size={28}
                      color={item.completed ? '#10b981' : '#1a202c'}
                    />
                  </Pressable>

                  <Text className={`text-base flex-1 ${item.completed ? 'line-through text-gray-400' : 'text-black font-medium'}`}>
                    {item.title}
                  </Text>
                </View>

                <Pressable onPress={() => deleteTask(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="#dc2626" />
                </Pressable>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Index;