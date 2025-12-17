import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeDashboard from './src/screens/HomeDashboard';
import NotificationsScreen from './src/screens/NotificationsScreen';
import CreditStatusScreen from './src/screens/CreditStatusScreen';
import HomeSearchScreen from './src/screens/HomeSearchScreen';
import ScanUploadScreen from './src/screens/ScanUploadScreen';
import ScanProcessingScreen from './src/screens/ScanProcessingScreen';
import ScanResultScreen from './src/screens/ScanResultScreen';
import ScanDetailScreen from './src/screens/ScanDetailScreen';
import CreateEntryScreen from './src/screens/CreateEntryScreen';
import TemplateSelectionScreen from './src/screens/TemplateSelectionScreen';
import PromptBrandInputScreen from './src/screens/PromptBrandInputScreen';
import GenerationProcessingScreen from './src/screens/GenerationProcessingScreen';
import PreviewOutputScreen from './src/screens/PreviewOutputScreen';
import EditorScreen from './src/screens/EditorScreen';
import SaveShareScreen from './src/screens/SaveShareScreen';
import HistoryOverviewScreen from './src/screens/HistoryOverviewScreen';
import HistoryDetailScreen from './src/screens/HistoryDetailScreen';
import BulkActionsScreen from './src/screens/BulkActionsScreen';
import ProfileOverviewScreen from './src/screens/ProfileOverviewScreen';
import BrandKitListScreen from './src/screens/BrandKitListScreen';
import BrandKitEditorScreen from './src/screens/BrandKitEditorScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SupportScreen from './src/screens/SupportScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ScanStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function TabIcon({ name, focused }) {
  const icons = {
    Home: '🏠',
    Scan: '📷',
    Create: '➕',
    History: '📋',
    Profile: '👤'
  };
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
      {icons[name]}
    </Text>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeDashboard" component={HomeDashboard} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="CreditStatus" component={CreditStatusScreen} />
      <HomeStack.Screen name="HomeSearch" component={HomeSearchScreen} />
    </HomeStack.Navigator>
  );
}

function ScanStackScreen() {
  return (
    <ScanStack.Navigator screenOptions={{ headerShown: false }}>
      <ScanStack.Screen name="ScanUpload" component={ScanUploadScreen} />
      <ScanStack.Screen name="ScanProcessing" component={ScanProcessingScreen} />
      <ScanStack.Screen name="ScanResult" component={ScanResultScreen} />
      <ScanStack.Screen name="ScanDetail" component={ScanDetailScreen} />
    </ScanStack.Navigator>
  );
}

function CreateStackScreen() {
  return (
    <CreateStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateStack.Screen name="CreateEntry" component={CreateEntryScreen} />
      <CreateStack.Screen name="TemplateSelection" component={TemplateSelectionScreen} />
      <CreateStack.Screen name="PromptBrandInput" component={PromptBrandInputScreen} />
      <CreateStack.Screen name="GenerationProcessing" component={GenerationProcessingScreen} />
      <CreateStack.Screen name="PreviewOutput" component={PreviewOutputScreen} />
      <CreateStack.Screen name="Editor" component={EditorScreen} />
      <CreateStack.Screen name="SaveShare" component={SaveShareScreen} />
    </CreateStack.Navigator>
  );
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryOverview" component={HistoryOverviewScreen} />
      <HistoryStack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
      <HistoryStack.Screen name="BulkActions" component={BulkActionsScreen} />
    </HistoryStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileOverview" component={ProfileOverviewScreen} />
      <ProfileStack.Screen name="BrandKitList" component={BrandKitListScreen} />
      <ProfileStack.Screen name="BrandKitEditor" component={BrandKitEditorScreen} />
      <ProfileStack.Screen name="Subscription" component={SubscriptionScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Support" component={SupportScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Scan" component={ScanStackScreen} />
      <Tab.Screen name="Create" component={CreateStackScreen} />
      <Tab.Screen name="History" component={HistoryStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <SplashScreen />
        <StatusBar style="dark" />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {!isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showWelcome && (
            <Stack.Screen name="Welcome">
              {props => <WelcomeScreen {...props} onContinue={() => setShowWelcome(false)} />}
            </Stack.Screen>
          )}
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} onSignIn={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}
