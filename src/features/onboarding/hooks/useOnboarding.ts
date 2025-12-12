import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/NavigationTypes';

export const useOnboarding = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleStart = () => {
    // Navigate to Permission check
    navigation.navigate('UsageAccess');
  };

  return {
    handleStart,
  };
};